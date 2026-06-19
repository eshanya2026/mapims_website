import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { departments } from "@/data/departments";
import {
  ensureAppointmentSchedulesForDepartments,
  listAppointmentSchedules,
  upsertAppointmentSchedule,
} from "@/lib/db/appointment-schedules";
import { requireApiPath } from "@/lib/admin-api-auth";
import { countActiveScheduleDays } from "@/lib/appointment-schedule-config";
import { getDepartmentNameBySlug } from "@/lib/department-utils";
import { appointmentScheduleSchema } from "@/lib/validations";

function revalidateAppointmentPaths() {
  revalidatePath("/");
}

export async function GET() {
  const guard = await requireApiPath("/api/admin/appointment-schedules");
  if (guard.error) return guard.error;

  await ensureAppointmentSchedulesForDepartments();
  const schedules = await listAppointmentSchedules();
  const scheduleBySlug = new Map(
    schedules.map((schedule) => [schedule.departmentSlug, schedule])
  );

  const items = departments.map((department) => {
    const schedule = scheduleBySlug.get(department.slug);
    return {
      id: schedule?.id ?? null,
      departmentSlug: department.slug,
      departmentName: department.name,
      enabled: schedule?.enabled ?? true,
      activeDays: schedule ? countActiveScheduleDays(schedule.daySlots) : 0,
      advanceDays: schedule?.advanceDays ?? 6,
      notes: schedule?.notes ?? "",
      updatedAt: schedule?.updatedAt?.toISOString() ?? null,
    };
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const guard = await requireApiPath("/api/admin/appointment-schedules");
  if (guard.error) return guard.error;

  try {
    const body = await request.json();
    const departmentSlug = String(body.departmentSlug ?? "").trim();

    if (!departmentSlug) {
      return NextResponse.json({ error: "Department is required." }, { status: 400 });
    }

    const departmentName = getDepartmentNameBySlug(departmentSlug);
    if (departmentName === departmentSlug && !departments.some((d) => d.slug === departmentSlug)) {
      return NextResponse.json({ error: "Unknown department." }, { status: 400 });
    }

    const parsed = appointmentScheduleSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Please check the schedule fields and try again.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const schedule = await upsertAppointmentSchedule(departmentSlug, parsed.data);
    revalidateAppointmentPaths();

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("[admin/appointment-schedules POST]", error);
    return NextResponse.json({ error: "Failed to save appointment schedule." }, { status: 500 });
  }
}
