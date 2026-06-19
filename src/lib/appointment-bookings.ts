/** Appointment statuses that still hold a date/time slot. */
export const APPOINTMENT_SLOT_OCCUPIED_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "completed",
  "read",
] as const;

export function isAppointmentSlotOccupied(status: string) {
  return (APPOINTMENT_SLOT_OCCUPIED_STATUSES as readonly string[]).includes(status);
}

export function preferredDateToDateKey(preferredDate: Date) {
  const year = preferredDate.getFullYear();
  const month = String(preferredDate.getMonth() + 1).padStart(2, "0");
  const day = String(preferredDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function dateKeyToPreferredDateRange(dateKey: string) {
  const start = new Date(`${dateKey}T00:00:00`);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

const IST_TIMEZONE = "Asia/Kolkata";

export function getTodayDateKeyInIST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function startOfTodayIST() {
  return dateKeyToPreferredDateRange(getTodayDateKeyInIST()).start;
}

export type BookedSlotsByDate = Record<string, string[]>;
