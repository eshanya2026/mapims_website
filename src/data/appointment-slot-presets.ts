/** Mon–Sat OPD: 8:00 AM – 8:00 PM (hourly starts through 7:00 PM) */
export const weekdayTimeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
] as const;

/** Sun OPD: 9:00 AM – 1:00 PM (hourly starts through 12:00 PM) */
export const sundayTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
] as const;

export const appointmentTimeSlots = [...weekdayTimeSlots, ...sundayTimeSlots] as const;

export type AppointmentTimeSlot =
  | (typeof weekdayTimeSlots)[number]
  | (typeof sundayTimeSlots)[number];
