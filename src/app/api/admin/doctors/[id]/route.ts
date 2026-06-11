import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteDoctor, findDoctorById, updateDoctor } from "@/lib/db/doctors";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { doctorSchema } from "@/lib/validations";

type RouteContext = { params: Promise<{ id: string }> };

function revalidateDoctorPaths() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/departments");
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
