import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/lib/validations";

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = jobSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const job = await prisma.job.create({
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

    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
