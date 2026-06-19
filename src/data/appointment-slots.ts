import {
  appointmentTimeSlots,
  sundayTimeSlots,
  weekdayTimeSlots,
  type AppointmentTimeSlot,
} from "@/data/appointment-slot-presets";
import type { DepartmentScheduleConfig } from "@/lib/appointment-schedule-config";
import { createDefaultScheduleConfig } from "@/lib/appointment-schedule-config";
import {
  weekdayIndexToScheduleDayKey,
} from "@/lib/appointment-schedule-config";

export {
  appointmentTimeSlots,
  sundayTimeSlots,
  weekdayTimeSlots,
  type AppointmentTimeSlot,
};

const IST_TIMEZONE = "Asia/Kolkata";

export type AppointmentDayOption = {
  date: string;
  dayNum: number;
  dayName: string;
  monthLabel: string;
};

type IstParts = {
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
};

function readPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((part) => part.type === type)?.value ?? "";
}

export function getIstParts(date = new Date()): IstParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(readPart(parts, "year")),
    month: Number(readPart(parts, "month")),
    day: Number(readPart(parts, "day")),
    weekday: weekdayMap[readPart(parts, "weekday")] ?? 0,
    hour: Number(readPart(parts, "hour")),
    minute: Number(readPart(parts, "minute")),
  };
}

export function toDateKey(parts: Pick<IstParts, "year" | "month" | "day">) {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function getTodayDateKey(now = new Date()) {
  return toDateKey(getIstParts(now));
}

export function isValidDateKey(dateKey: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return false;

  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return false;

  const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return !Number.isNaN(utcDate.getTime());
}

export function parseTimeSlotMinutes(slot: string) {
  const match = slot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function getWeekdayForDateKey(dateKey: string) {
  if (!isValidDateKey(dateKey)) return -1;

  const [year, month, day] = dateKey.split("-").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  if (Number.isNaN(utcDate.getTime())) return -1;

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TIMEZONE,
    weekday: "short",
  }).formatToParts(utcDate);

  const weekday = readPart(parts, "weekday");
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return weekdayMap[weekday] ?? 0;
}

function resolveScheduleConfig(config?: DepartmentScheduleConfig | null) {
  return config ?? createDefaultScheduleConfig("general-medicine");
}

export function getTimeSlotsForDateKey(
  dateKey: string,
  config?: DepartmentScheduleConfig | null
): readonly string[] {
  const schedule = resolveScheduleConfig(config);
  if (!schedule.enabled || !isValidDateKey(dateKey)) return [];

  const weekday = getWeekdayForDateKey(dateKey);
  if (weekday < 0) return [];

  const dayKey = weekdayIndexToScheduleDayKey(weekday);
  return schedule.daySlots[dayKey] ?? [];
}

export function getUpcomingAppointmentDays(
  count = 6,
  now = new Date(),
  config?: DepartmentScheduleConfig | null
): AppointmentDayOption[] {
  const schedule = resolveScheduleConfig(config);
  const window = config ? schedule.advanceDays : count;
  const days: AppointmentDayOption[] = [];
  const ist = getIstParts(now);

  for (let index = 0; index < window; index += 1) {
    const date = new Date(Date.UTC(ist.year, ist.month - 1, ist.day + index, 12, 0, 0));
    const parts = getIstParts(date);

    days.push({
      date: toDateKey(parts),
      dayNum: parts.day,
      dayName: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][parts.weekday] ?? "",
      monthLabel: new Intl.DateTimeFormat("en-IN", {
        timeZone: IST_TIMEZONE,
        month: "short",
      }).format(date),
    });
  }

  return days;
}

export function getAvailableTimeSlotsForDate(
  dateKey: string,
  now = new Date(),
  config?: DepartmentScheduleConfig | null
) {
  if (!isValidDateKey(dateKey)) return [];

  const todayKey = getTodayDateKey(now);
  const ist = getIstParts(now);
  const currentMinutes = ist.hour * 60 + ist.minute;
  const slotsForDay = getTimeSlotsForDateKey(dateKey, config);

  return slotsForDay.filter((slot) => {
    const slotMinutes = parseTimeSlotMinutes(slot);
    if (slotMinutes === null) return false;

    if (dateKey === todayKey) {
      return slotMinutes > currentMinutes;
    }

    return true;
  });
}

export function getBookableTimeSlotsForDate(
  dateKey: string,
  now = new Date(),
  bookedTimes: readonly string[] = [],
  config?: DepartmentScheduleConfig | null
) {
  const booked = new Set(bookedTimes);
  return getAvailableTimeSlotsForDate(dateKey, now, config).filter((slot) => !booked.has(slot));
}

export function getFirstAvailableDate(
  now = new Date(),
  bookedByDate: Record<string, readonly string[]> = {},
  config?: DepartmentScheduleConfig | null
) {
  const days = getUpcomingAppointmentDays(undefined, now, config);
  return (
    days.find(
      (day) =>
        getBookableTimeSlotsForDate(day.date, now, bookedByDate[day.date] ?? [], config).length >
        0
    )?.date ??
    days[0]?.date ??
    ""
  );
}

export function getDefaultAppointmentDate(
  now = new Date(),
  bookedByDate: Record<string, readonly string[]> = {},
  config?: DepartmentScheduleConfig | null
) {
  return getFirstAvailableDate(now, bookedByDate, config);
}

export function getDefaultAppointmentTime(
  dateKey?: string,
  now = new Date(),
  bookedByDate: Record<string, readonly string[]> = {},
  config?: DepartmentScheduleConfig | null
) {
  const date = dateKey && isValidDateKey(dateKey)
    ? dateKey
    : getDefaultAppointmentDate(now, bookedByDate, config);

  if (!isValidDateKey(date)) return "";

  return (
    getBookableTimeSlotsForDate(date, now, bookedByDate[date] ?? [], config)[0] ??
    getTimeSlotsForDateKey(date, config)[0] ??
    ""
  );
}

export function normalizeAppointmentSelection(
  selectedDate: string,
  selectedTime: string,
  now = new Date(),
  bookedByDate: Record<string, readonly string[]> = {},
  config?: DepartmentScheduleConfig | null
) {
  const days = getUpcomingAppointmentDays(undefined, now, config);
  const validDates = new Set(days.map((day) => day.date));

  let date = selectedDate;
  if (!isValidDateKey(date) || !validDates.has(date)) {
    date = getFirstAvailableDate(now, bookedByDate, config);
  }

  if (!isValidDateKey(date)) {
    return { date: "", time: "", availableSlots: [], days };
  }

  const bookedForDate = bookedByDate[date] ?? [];
  const availableSlots = getBookableTimeSlotsForDate(date, now, bookedForDate, config);
  let time = selectedTime;

  if (!availableSlots.includes(time)) {
    time = availableSlots[0] ?? "";
  }

  return { date, time, availableSlots, days };
}
