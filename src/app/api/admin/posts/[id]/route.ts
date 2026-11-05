import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePost, findPostById, updatePost } from "@/lib/db/posts";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { scheduleNewsletterAnnouncement } from "@/lib/schedule-newsletter-announcement";
import { postSchema } from "@/lib/validations";
import { parseInstagramUrl } from "@/lib/video-embed";
import {
  ensureInstagramVideoCached,
  ensureInstagramThumbnailCached,
  getInstagramPostDate,
} from "@/lib/instagram-video";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const post = await findPostById(id);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const message =
        fieldErrors.title?.[0] ??
        fieldErrors.slug?.[0] ??
        "Please check the form fields and try again.";
      return NextResponse.json(
        { error: message, details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await findPostById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = parsed.data;
    const videoUrl = data.video?.trim() || null;
    let featuredImage = data.image?.trim() || existing.image;

    if (videoUrl) {
      const ig = parseInstagramUrl(videoUrl);
      if (ig?.id) {
        // Cache Instagram Reel and thumbnail in background
        void ensureInstagramVideoCached(ig.id).catch((err) =>
          console.warn("[admin/posts PUT] Failed to cache instagram video:", err)
        );
        void ensureInstagramThumbnailCached(ig.id).catch(() => {});

        // If current image is empty or default placeholder, automatically use the reel thumbnail!
        if (
          !featuredImage ||
          featuredImage === "/images/blog/579502f2-f668-42e9-be7a-995936f42cfa.png"
        ) {
          featuredImage = `/uploads/videos/ig-${ig.id}-thumb.jpg`;
        }
      }
    }

    let publishedAtDate = data.publishedAt ? new Date(data.publishedAt) : null;
    if ((!publishedAtDate || isNaN(publishedAtDate.getTime())) && videoUrl) {
      const ig = parseInstagramUrl(videoUrl);
      if (ig?.id) {
        publishedAtDate = getInstagramPostDate(ig.id);
      }
    }
    if (!publishedAtDate || isNaN(publishedAtDate.getTime())) {
      publishedAtDate =
        data.published && !existing.published ? new Date() : existing.publishedAt;
    }

    const post = await updatePost(id, {
      ...data,
      image: featuredImage || "/images/blog/579502f2-f668-42e9-be7a-995936f42cfa.png",
      excerpt: data.excerpt?.trim() || data.title || existing.excerpt,
      content: data.content?.trim() || existing.content || "",
      author: data.author?.trim() || existing.author || "Adhiparasakthi Hospitals",
      video: videoUrl,
      eventDate: data.eventDate || null,
      publishedAt: publishedAtDate,
    });

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidateBlogPaths(existing.section, data.section, post.slug);
    scheduleNewsletterAnnouncement(post, { wasPublished: existing.published });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[admin/posts PUT]", error);
    const message = isDuplicateKeyError(error)
      ? "A post with this slug already exists"
      : "Failed to update post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const existing = await findPostById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deletePost(id);
  revalidateBlogPaths(existing.section, undefined, existing.slug);

  return NextResponse.json({ ok: true });
}

function revalidateBlogPaths(
  oldSection: string,
  newSection?: string,
  slug?: string
) {
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
  revalidatePath(`/blog/${oldSection}`);
  if (newSection) revalidatePath(`/blog/${newSection}`);
  if (slug) revalidatePath(`/blog/${slug}`);
}
