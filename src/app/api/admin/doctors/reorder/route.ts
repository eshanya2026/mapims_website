import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  listDoctors,
  reorderDoctors,
  reorderDoctorsByPlacement,
} from "@/lib/db/doctors";
import { doctorReorderSchema } from "@/lib/validations";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = doctorReorderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid reorder payload" }, { status: 400 });
    }

    const { placement, orderedIds } = parsed.data;

    if (placement === "home" || placement === "about") {
      const flag = placement === "home" ? "showOnHome" : "showOnAbout";
      const placementDoctors = await listDoctors({ [flag]: true });
      const placementIds = new Set(placementDoctors.map((doctor) => doctor.id));

      if (orderedIds.length !== placementDoctors.length) {
        return NextResponse.json(
          { error: `Reorder must include every doctor shown on the ${placement} page` },
          { status: 400 }
        );
      }

      if (orderedIds.some((id) => !placementIds.has(id))) {
        return NextResponse.json(
          { error: `One or more doctors are not shown on the ${placement} page` },
          { status: 400 }
        );
      }

      await reorderDoctorsByPlacement(placement, orderedIds);
    } else {
      const doctors = await listDoctors();
      const doctorIds = new Set(doctors.map((doctor) => doctor.id));

      if (orderedIds.length !== doctors.length) {
        return NextResponse.json(
          { error: "Reorder must include every doctor" },
          { status: 400 }
        );
      }

      if (orderedIds.some((id) => !doctorIds.has(id))) {
        return NextResponse.json({ error: "One or more doctors were not found" }, { status: 400 });
      }

      await reorderDoctors(orderedIds);
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/departments");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/doctors/reorder PUT]", error);
    return NextResponse.json({ error: "Failed to reorder doctors" }, { status: 500 });
  }
}
