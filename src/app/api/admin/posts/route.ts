import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const post = await prisma.post.create({
      data: {
        ...data,
        author: data.author || null,
        publishedAt: data.published ? new Date() : new Date(),
      },
    });

    revalidateBlogPaths(data.section);

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

function revalidateBlogPaths(section: string) {
  revalidatePath("/");
  revalidatePath(`/blog/${section}`);
  revalidatePath("/blog");
}
