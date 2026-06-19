/** Statuses that count as an active upcoming appointment for one-client-per-booking rules. */
export const APPOINTMENT_ACTIVE_IDENTITY_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "read",
] as const;

export const APPOINTMENT_IP_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
export const APPOINTMENT_IP_RATE_LIMIT_MAX = 5;

export const ACTIVE_APPOINTMENT_EXISTS_MESSAGE =
  "You already have an upcoming appointment. Please contact patient services on +91 94990 59966 to reschedule or cancel before booking again.";

export const APPOINTMENT_RATE_LIMIT_MESSAGE =
  "Too many booking attempts from your connection. Please try again in about an hour.";
