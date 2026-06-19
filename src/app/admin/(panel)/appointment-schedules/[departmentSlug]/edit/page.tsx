import {
  ensureAppointmentSchedulesForDepartments,
  findAppointmentScheduleByDepartmentSlug,
} from "@/lib/db/appointment-schedules";
import { departments } from "@/data/departments";
import {
  createDefaultDaySlots,
  DEFAULT_ADVANCE_DAYS,
  normalizeDaySlotsFromRecord,
} from "@/lib/appointment-schedule-config";
import AppointmentScheduleForm from "@/components/admin/AppointmentScheduleForm";
import { notFound } from "next/navigation";

type EditAppointmentSchedulePageProps = {
  params: Promise<{ departmentSlug: string }>;
};

export default async function EditAppointmentSchedulePage({
  params,
}: EditAppointmentSchedulePageProps) {
  const { departmentSlug } = await params;
  const department = departments.find((item) => item.slug === departmentSlug);

  if (!department) {
    notFound();
  }

  await ensureAppointmentSchedulesForDepartments();
  const schedule = await findAppointmentScheduleByDepartmentSlug(departmentSlug);

  return (
    <AppointmentScheduleForm
      departmentSlug={department.slug}
      departmentName={department.name}
      initial={{
        enabled: schedule?.enabled ?? true,
        daySlots: schedule
          ? normalizeDaySlotsFromRecord(schedule)
          : createDefaultDaySlots(),
        advanceDays: schedule?.advanceDays ?? DEFAULT_ADVANCE_DAYS,
        notes: schedule?.notes ?? "",
      }}
    />
  );
}
