import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteDoctor, findDoctorById, updateDoctor } from "@/lib/db/doctors";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { doctorSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = { params: Promise<{ id: string }> };

function revalidateDoctorPaths() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/departments");
  revalidatePath("/departments/[slug]");
  revalidatePath("/admin/doctors");
  revalidatePath("/admin/doctors/[id]/edit");
  revalidatePath("/admin");
  revalidatePath("/api/doctors");
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const doctor = await findDoctorById(id);
  if (!doctor) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(doctor);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = doctorSchema.safeParse(body);

    if (!parsed.success) {
      const message =
        parsed.error.flatten().fieldErrors.name?.[0] ??
        parsed.error.flatten().fieldErrors.slug?.[0] ??
        "Please check the form fields and try again.";
      return NextResponse.json(
        { error: message, details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await findDoctorById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = parsed.data;
    const doctor = await updateDoctor(id, {
      name: data.name,
      slug: data.slug,
      designation: data.designation,
      specialty: data.specialty,
      departmentSlug: data.departmentSlug ?? "",
      degree: data.degree ?? "",
      experience: data.experience ?? "",
      bio: data.bio ?? "",
      image: data.image,
      accent: data.accent,
      showOnHome: data.showOnHome,
      showOnAbout: data.showOnAbout,
      sortOrder: data.sortOrder ?? existing.sortOrder,
      published: data.published,
    });

    if (!doctor) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidateDoctorPaths();

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("[admin/doctors PUT]", error);
    const message = isDuplicateKeyError(error)
      ? "A doctor with this slug already exists"
      : "Failed to update doctor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const existing = await findDoctorById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (typeof body.published === "boolean") {
      updates.published = body.published;
    }
    if (typeof body.showOnHome === "boolean") {
      updates.showOnHome = body.showOnHome;
    }
    if (typeof body.showOnAbout === "boolean") {
      updates.showOnAbout = body.showOnAbout;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const doctor = await updateDoctor(id, updates);
    if (!doctor) {
      return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
    }

    revalidateDoctorPaths();
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("[admin/doctors PATCH]", error);
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const existing = await findDoctorById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteDoctor(id);
  revalidateDoctorPaths();

  return NextResponse.json({ ok: true });
}

