import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const post = await prisma.post.findUnique({ where: { id } });
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
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = parsed.data;
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        author: data.author || null,
        publishedAt:
          data.published && !existing.published ? new Date() : existing.publishedAt,
      },
    });

    revalidateBlogPaths(existing.section, data.section, post.slug);

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.post.delete({ where: { id } });
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
