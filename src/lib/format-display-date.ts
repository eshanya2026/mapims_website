const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const IST_TIMEZONE = "Asia/Kolkata";

function parseDate(value: string | Date): Date | null {
  const date = typeof value === "string" ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? null : date;
}

function getISTParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: Number(read("year")),
    month: Number(read("month")),
    day: Number(read("day")),
    weekday: read("weekday"),
    hour: read("hour"),
    minute: read("minute"),
    dayPeriod: read("dayPeriod"),
  };
}

export function formatDisplayDateTime(value: string | Date): string {
  const date = parseDate(value);
  if (!date) return "—";

  const { day, month, year, hour, minute, dayPeriod } = getISTParts(date);
  const monthLabel = MONTHS_SHORT[month - 1] ?? "";
  return `${day} ${monthLabel} ${year}, ${hour}:${minute} ${dayPeriod.toUpperCase()}`;
}

export function formatDisplayDate(value: string | Date): string {
  const date = parseDate(value);
  if (!date) return "—";

  const { day, month, year } = getISTParts(date);
  const monthLabel = MONTHS_SHORT[month - 1] ?? "";
  return `${day} ${monthLabel} ${year}`;
}

export function formatDisplayDateLong(value: string | Date | null): string {
  const date = value ? parseDate(value) : null;
  if (!date) return "—";

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${read("weekday")}, ${read("day")} ${read("month")} ${read("year")}`;
}

export function formatNewsletterPublishDate(value: string | Date): string {
  const date = parseDate(value);
  if (!date) return "—";

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST_TIMEZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${read("day")} ${read("month")} ${read("year")}`;
}

export function formatDisplayListTime(value: string | Date): string {
  const date = parseDate(value);
  if (!date) return "—";

  const nowParts = getISTParts(new Date());
  const valueParts = getISTParts(date);

  const isToday =
    nowParts.year === valueParts.year &&
    nowParts.month === valueParts.month &&
    nowParts.day === valueParts.day;

  if (isToday) {
    return `${valueParts.hour}:${valueParts.minute} ${valueParts.dayPeriod.toUpperCase()}`;
  }

  const monthLabel = MONTHS_SHORT[valueParts.month - 1] ?? "";
  return `${valueParts.day} ${monthLabel}`;
}

export function formatDisplayTime(value: string | Date): string {
  const date = parseDate(value);
  if (!date) return "—";

  const { hour, minute, dayPeriod } = getISTParts(date);
  return `${hour}:${minute} ${dayPeriod.toUpperCase()}`;
}
