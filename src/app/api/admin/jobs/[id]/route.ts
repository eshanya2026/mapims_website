import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteJob, findJobById, updateJob } from "@/lib/db/jobs";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { jobSchema } from "@/lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const job = await findJobById(id);
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
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const message =
        fieldErrors.title?.[0] ??
        fieldErrors.applyUrl?.[0] ??
        "Please check the form fields and try again.";
      return NextResponse.json(
        { error: message, details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await findJobById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = parsed.data;
    const job = await updateJob(id, {
      title: data.title,
      slug: data.slug,
      department: data.department,
      location: data.location,
      employmentType: data.employmentType,
      vacancy: data.vacancy,
      summary: data.summary,
      description: data.description,
      requirements: data.requirements,
      qualifications: data.qualifications ?? "",
      applyEmail: data.applyEmail || null,
      applyUrl: data.applyUrl || null,
      published: data.published,
      closingDate: data.closingDate ? new Date(data.closingDate) : null,
    });

    if (!job) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidatePath("/careers");
    revalidatePath(`/careers/${job.slug}`);

    return NextResponse.json(job);
  } catch (error) {
    console.error("[admin/jobs PUT]", error);
    const message = isDuplicateKeyError(error)
      ? "A job with this slug already exists"
      : "Failed to update job";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const existing = await findJobById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteJob(id);
  revalidatePath("/careers");
  revalidatePath(`/careers/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
