import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }, { publishedAt: "desc" }],
  });
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
    const lastInSection = await prisma.post.findFirst({
      where: { section: data.section },
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });

    const post = await prisma.post.create({
      data: {
        ...data,
        author: data.author || null,
        sortOrder: (lastInSection?.sortOrder ?? -1) + 1,
        publishedAt: data.published ? new Date() : new Date(),
      },
    });

    revalidateBlogPaths(data.section, post.slug);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[admin/posts POST]", error);
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
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
