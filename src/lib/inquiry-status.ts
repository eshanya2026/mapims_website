export const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export type InquiryStatusAction = {
  status: string;
  label: string;
};

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function isInquiryStatus(value: string): value is InquiryStatus {
  return (INQUIRY_STATUSES as readonly string[]).includes(value);
}

function confirmedActionLabel(type: string) {
  if (type === "appointment") return "Confirm appointment";
  return "Mark confirmed";
}

export function getInquiryNextActions(
  type: string,
  status: string
): InquiryStatusAction[] {
  switch (status) {
    case "new":
      return [{ status: "contacted", label: "Mark contacted" }];
    case "read":
    case "archived":
      return [{ status: "contacted", label: "Mark contacted" }];
    case "contacted":
      return [
        { status: "confirmed", label: confirmedActionLabel(type) },
        { status: "cancelled", label: "Cancel" },
      ];
    case "confirmed":
      return [
        { status: "completed", label: "Mark completed" },
        { status: "cancelled", label: "Cancel" },
      ];
    default:
      return [];
  }
}

export function getInquiryStatusLabel(_type: string, status: string) {
  if (isInquiryStatus(status)) {
    return inquiryStatusLabels[status];
  }
  if (status === "read") return "Read";
  if (status === "archived") return "Archived";
  return status;
}

export function getInquiryStatusClassName(_type: string, status: string) {
  switch (status) {
    case "new":
      return "bg-amber-100 text-amber-700";
    case "contacted":
    case "read":
      return "bg-sky-100 text-sky-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "cancelled":
    case "archived":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

/** @deprecated Use INQUIRY_STATUSES */
export const APPOINTMENT_INQUIRY_STATUSES = INQUIRY_STATUSES;

/** @deprecated Use getInquiryNextActions */
export function getAppointmentNextActions(status: string) {
  return getInquiryNextActions("appointment", status);
}
