import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePost, findPostById, updatePost } from "@/lib/db/posts";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { postSchema } from "@/lib/validations";

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
    const post = await updatePost(id, {
      ...data,
      author: data.author || null,
      publishedAt:
        data.published && !existing.published ? new Date() : existing.publishedAt,
    });

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidateBlogPaths(existing.section, data.section, post.slug);

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
  revalidatePath(`/blog/${oldSection}`);
  if (newSection) revalidatePath(`/blog/${newSection}`);
  if (slug) revalidatePath(`/blog/${slug}`);
}
