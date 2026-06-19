import { NextResponse } from "next/server";

import { getUpcomingAppointmentDays } from "@/data/appointment-slots";
import { getDepartmentScheduleConfig } from "@/lib/appointment-schedules-content";
import { findBookedAppointmentSlotsByDates } from "@/lib/db/form-submissions";
import { isKnownDepartmentSlug } from "@/lib/department-utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datesParam = searchParams.get("dates");
    const departmentSlug = searchParams.get("department")?.trim() ?? "";

    if (!departmentSlug || !isKnownDepartmentSlug(departmentSlug)) {
      return NextResponse.json({ error: "Valid department is required." }, { status: 400 });
    }

    const schedule = await getDepartmentScheduleConfig(departmentSlug);
    const dateKeys = datesParam
      ? datesParam
          .split(",")
          .map((value) => value.trim())
          .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
      : getUpcomingAppointmentDays(undefined, undefined, schedule).map((day) => day.date);

    const booked = await findBookedAppointmentSlotsByDates(dateKeys, departmentSlug);

    return NextResponse.json({ booked });
  } catch (error) {
    console.error("[appointments/booked-slots GET]", error);
    return NextResponse.json(
      { error: "Unable to load booked appointment slots." },
      { status: 500 }
    );
  }
}
