import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createDoctor, getMaxDoctorSortOrder, listDoctors } from "@/lib/db/doctors";
import { isDuplicateKeyError } from "@/lib/db/utils";
import { doctorSchema } from "@/lib/validations";

function revalidateDoctorPaths() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/departments");
}

export async function GET() {
  const doctors = await listDoctors();
  return NextResponse.json(doctors);
}

export async function POST(request: Request) {
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

    const data = parsed.data;
    const maxSortOrder = await getMaxDoctorSortOrder();
    const maxHomeSortOrder = data.showOnHome
      ? await getMaxDoctorSortOrder("homeSortOrder")
      : -1;
    const maxAboutSortOrder = data.showOnAbout
      ? await getMaxDoctorSortOrder("aboutSortOrder")
      : -1;

    const doctor = await createDoctor({
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
      sortOrder: data.sortOrder ?? maxSortOrder + 1,
      homeSortOrder: data.showOnHome ? maxHomeSortOrder + 1 : 0,
      aboutSortOrder: data.showOnAbout ? maxAboutSortOrder + 1 : 0,
      published: data.published,
    });

    revalidateDoctorPaths();

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error("[admin/doctors POST]", error);
    const message = isDuplicateKeyError(error)
      ? "A doctor with this slug already exists"
      : "Failed to create doctor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
