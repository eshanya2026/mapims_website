import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = jobSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = parsed.data;
    const job = await prisma.job.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        department: data.department,
        location: data.location,
        employmentType: data.employmentType,
        summary: data.summary,
        description: data.description,
        requirements: data.requirements,
        applyEmail: data.applyEmail || null,
        applyUrl: data.applyUrl || null,
        published: data.published,
        closingDate: data.closingDate ? new Date(data.closingDate) : null,
      },
    });

    revalidatePath("/careers");
    revalidatePath(`/careers/${job.slug}`);

    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const existing = await prisma.job.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.job.delete({ where: { id } });
  revalidatePath("/careers");
  revalidatePath(`/careers/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
