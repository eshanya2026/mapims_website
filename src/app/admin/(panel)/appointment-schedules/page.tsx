import {
  ensureAppointmentSchedulesForDepartments,
  listAppointmentSchedules,
} from "@/lib/db/appointment-schedules";
import { departments } from "@/data/departments";
import { countActiveScheduleDays } from "@/lib/appointment-schedule-config";
import AppointmentSchedulesAdminList, {
  type AdminAppointmentScheduleRecord,
} from "@/components/admin/AppointmentSchedulesAdminList";

export default async function AdminAppointmentSchedulesPage() {
  await ensureAppointmentSchedulesForDepartments();
  const schedules = await listAppointmentSchedules();
  const scheduleBySlug = new Map(
    schedules.map((schedule) => [schedule.departmentSlug, schedule])
  );

  const items: AdminAppointmentScheduleRecord[] = departments.map((department) => {
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

  return <AppointmentSchedulesAdminList schedules={items} />;
}
