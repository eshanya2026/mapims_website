import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createPost,
  getMaxSortOrderInSection,
  listPosts,
} from "@/lib/db/posts";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { postSchema } from "@/lib/validations";

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
    const maxSortOrder = await getMaxSortOrderInSection(data.section);

    const post = await createPost({
      ...data,
      author: data.author || null,
      sortOrder: maxSortOrder + 1,
      publishedAt: new Date(),
    });

    revalidateBlogPaths(data.section, post.slug);

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
  revalidatePath(`/blog/${section}`);
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}
