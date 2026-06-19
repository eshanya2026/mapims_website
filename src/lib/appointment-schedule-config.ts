import {
  sundayTimeSlots,
  weekdayTimeSlots,
} from "@/data/appointment-slot-presets";

export const SCHEDULE_DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type ScheduleDayKey = (typeof SCHEDULE_DAY_KEYS)[number];

export const SCHEDULE_DAY_LABELS: Record<ScheduleDayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export type DaySlotsMap = Record<ScheduleDayKey, string[]>;

export type DepartmentScheduleConfig = {
  departmentSlug: string;
  enabled: boolean;
  daySlots: DaySlotsMap;
  advanceDays: number;
};

export const DEFAULT_ADVANCE_DAYS = 6;

export const PRESET_WEEKDAY_SLOTS = [...weekdayTimeSlots];
export const PRESET_SUNDAY_SLOTS = [...sundayTimeSlots];

export function weekdayIndexToScheduleDayKey(weekday: number): ScheduleDayKey {
  const map: ScheduleDayKey[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return map[weekday] ?? "monday";
}

export function getPresetOptionsForDay(day: ScheduleDayKey) {
  return day === "sunday" ? PRESET_SUNDAY_SLOTS : PRESET_WEEKDAY_SLOTS;
}

export function createDefaultDaySlots(): DaySlotsMap {
  return {
    sunday: [...PRESET_SUNDAY_SLOTS],
    monday: [...PRESET_WEEKDAY_SLOTS],
    tuesday: [...PRESET_WEEKDAY_SLOTS],
    wednesday: [...PRESET_WEEKDAY_SLOTS],
    thursday: [...PRESET_WEEKDAY_SLOTS],
    friday: [...PRESET_WEEKDAY_SLOTS],
    saturday: [...PRESET_WEEKDAY_SLOTS],
  };
}

export function createDefaultScheduleConfig(
  departmentSlug: string
): DepartmentScheduleConfig {
  return {
    departmentSlug,
    enabled: true,
    daySlots: createDefaultDaySlots(),
    advanceDays: DEFAULT_ADVANCE_DAYS,
  };
}

export function normalizeDaySlotsFromRecord(
  record?: {
    daySlots?: Partial<DaySlotsMap> | null;
    weekdaySlots?: string[];
    sundaySlots?: string[];
  } | null
): DaySlotsMap {
  const defaults = createDefaultDaySlots();

  if (record?.daySlots && typeof record.daySlots === "object") {
    const normalized = { ...defaults };

    for (const key of SCHEDULE_DAY_KEYS) {
      const slots = record.daySlots[key];
      if (Array.isArray(slots)) {
        normalized[key] = sortTimeSlots(slots);
      }
    }

    return normalized;
  }

  const weekday =
    record?.weekdaySlots && record.weekdaySlots.length > 0
      ? sortTimeSlots(record.weekdaySlots)
      : defaults.monday;
  const sunday =
    record?.sundaySlots && record.sundaySlots.length > 0
      ? sortTimeSlots(record.sundaySlots)
      : defaults.sunday;

  return {
    sunday,
    monday: weekday,
    tuesday: weekday,
    wednesday: weekday,
    thursday: weekday,
    friday: weekday,
    saturday: weekday,
  };
}

export function toDepartmentScheduleConfig(
  departmentSlug: string,
  record?: {
    enabled: boolean;
    daySlots?: Partial<DaySlotsMap> | null;
    weekdaySlots?: string[];
    sundaySlots?: string[];
    advanceDays: number;
  } | null
): DepartmentScheduleConfig {
  const defaults = createDefaultScheduleConfig(departmentSlug);

  if (!record) {
    return defaults;
  }

  return {
    departmentSlug,
    enabled: record.enabled,
    daySlots: normalizeDaySlotsFromRecord(record),
    advanceDays: record.advanceDays > 0 ? record.advanceDays : defaults.advanceDays,
  };
}

export function getSlotsForScheduleDay(
  config: DepartmentScheduleConfig,
  day: ScheduleDayKey
): readonly string[] {
  return config.daySlots[day] ?? [];
}

export function countActiveScheduleDays(daySlots: DaySlotsMap) {
  return SCHEDULE_DAY_KEYS.filter((key) => daySlots[key].length > 0).length;
}

export function sortTimeSlots(slots: readonly string[]) {
  return [...slots].sort((left, right) => {
    const leftMinutes = parseSlotMinutes(left);
    const rightMinutes = parseSlotMinutes(right);
    return leftMinutes - rightMinutes;
  });
}

/** Normalizes typed input like "9:30 am" to "09:30 AM", or null if invalid. */
export function normalizeTimeSlotInput(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  const hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    return null;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

function parseSlotMinutes(slot: string) {
  const match = slot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}
