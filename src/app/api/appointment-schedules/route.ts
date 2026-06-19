import { NextResponse } from "next/server";

import { getDepartmentScheduleConfig } from "@/lib/appointment-schedules-content";
import { isKnownDepartmentSlug } from "@/lib/department-utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentSlug = searchParams.get("department")?.trim() ?? "";

    if (!departmentSlug || !isKnownDepartmentSlug(departmentSlug)) {
      return NextResponse.json({ error: "Valid department is required." }, { status: 400 });
    }

    const schedule = await getDepartmentScheduleConfig(departmentSlug);

    return NextResponse.json({
      departmentSlug: schedule.departmentSlug,
      enabled: schedule.enabled,
      daySlots: schedule.daySlots,
      advanceDays: schedule.advanceDays,
    });
  } catch (error) {
    console.error("[appointment-schedules GET]", error);
    return NextResponse.json(
      { error: "Unable to load appointment schedule." },
      { status: 500 }
    );
  }
}
