import type { DepartmentScheduleConfig } from "@/lib/appointment-schedule-config";
import { createDefaultScheduleConfig } from "@/lib/appointment-schedule-config";
import {
  getPublishedAppointmentSchedule,
  listAppointmentSchedules,
  listEnabledAppointmentSchedules,
} from "@/lib/db/appointment-schedules";
import { toDepartmentScheduleConfig } from "@/lib/appointment-schedule-config";

export async function getDepartmentScheduleConfig(
  departmentSlug: string
): Promise<DepartmentScheduleConfig> {
  const record = await getPublishedAppointmentSchedule(departmentSlug);
  return toDepartmentScheduleConfig(departmentSlug, record);
}

export async function listDepartmentScheduleConfigs() {
  const records = await listAppointmentSchedules();

  return records.map((record) =>
    toDepartmentScheduleConfig(record.departmentSlug, record)
  );
}

export async function listBookableDepartmentScheduleConfigs() {
  const records = await listEnabledAppointmentSchedules();
  return records.map((record) =>
    toDepartmentScheduleConfig(record.departmentSlug, record)
  );
}

export function getFallbackScheduleConfig(departmentSlug?: string | null) {
  return createDefaultScheduleConfig(departmentSlug || "general-medicine");
}

export { toDepartmentScheduleConfig };
