import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createPost,
  listPosts,
  shiftSortOrderInSection,
} from "@/lib/db/posts";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { scheduleNewsletterAnnouncement } from "@/lib/schedule-newsletter-announcement";
import { postSchema } from "@/lib/validations";
import { parseInstagramUrl } from "@/lib/video-embed";
import {
  ensureInstagramVideoCached,
  ensureInstagramThumbnailCached,
  getInstagramPostDate,
} from "@/lib/instagram-video";

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const message =
        fieldErrors.title?.[0] ??
        fieldErrors.slug?.[0] ??
        fieldErrors.image?.[0] ??
        "Please check the form fields and try again.";
      return NextResponse.json(
        { error: message, details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const videoUrl = data.video?.trim() || null;
    let featuredImage = data.image?.trim();

    // In Hospitals News, the 3 key announcement articles stay pinned at sortOrder 0, 1, 2.
    // New video posts start right after them at sortOrder 3.
    const isHospitalNewsVideo =
      data.section === "hospitals-news" && Boolean(videoUrl);
    const targetSortOrder = isHospitalNewsVideo ? 3 : 0;
    await shiftSortOrderInSection(data.section, targetSortOrder);

    if (videoUrl) {
      const ig = parseInstagramUrl(videoUrl);
      if (ig?.id) {
        // Cache Instagram Reel and thumbnail in background
        void ensureInstagramVideoCached(ig.id).catch((err) =>
          console.warn("[admin/posts POST] Failed to cache instagram video:", err)
        );
        void ensureInstagramThumbnailCached(ig.id).catch(() => {});

        // If no custom image or placeholder, automatically use the Instagram thumbnail!
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
      publishedAtDate = new Date();
    }

    const post = await createPost({
      ...data,
      image: featuredImage || "/images/blog/579502f2-f668-42e9-be7a-995936f42cfa.png",
      excerpt: data.excerpt?.trim() || data.title,
      content: data.content?.trim() || "",
      author: data.author?.trim() || "Adhiparasakthi Hospitals",
      video: videoUrl,
      eventDate: data.eventDate || null,
      sortOrder: targetSortOrder,
      publishedAt: publishedAtDate,
    });

    revalidateBlogPaths(data.section, post.slug);
    scheduleNewsletterAnnouncement(post, { wasPublished: false });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[admin/posts POST]", error);
    const message = isDuplicateKeyError(error)
      ? "A post with this slug already exists"
      : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function revalidateBlogPaths(section: string, slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin");
  revalidatePath(`/blog/${section}`);
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}
