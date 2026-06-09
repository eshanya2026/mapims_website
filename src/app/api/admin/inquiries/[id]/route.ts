import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquiryStatusSchema } from "@/lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const inquiry = await prisma.formSubmission.findUnique({ where: { id } });

  if (!inquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(inquiry);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = inquiryStatusSchema.safeParse(body.status);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const existing = await prisma.formSubmission.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const inquiry = await prisma.formSubmission.update({
      where: { id },
      data: { status: parsed.data },
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("[admin/inquiries PATCH]", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const existing = await prisma.formSubmission.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.formSubmission.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
