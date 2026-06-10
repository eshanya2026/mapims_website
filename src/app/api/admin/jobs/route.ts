import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createJob, listJobs } from "@/lib/db/jobs";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { jobSchema } from "@/lib/validations";

export async function GET() {
  const jobs = await listJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
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

    const data = parsed.data;
    const job = await createJob({
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
      postedAt: new Date(),
      closingDate: data.closingDate ? new Date(data.closingDate) : null,
    });

    revalidatePath("/careers");

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("[admin/jobs POST]", error);
    const message = isDuplicateKeyError(error)
      ? "A job with this slug already exists"
      : "Failed to create job";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
