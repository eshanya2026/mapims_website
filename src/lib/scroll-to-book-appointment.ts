export const BOOK_APPOINTMENT_ID = "book-appointment";

export function scrollToBookAppointment(behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(BOOK_APPOINTMENT_ID);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}
