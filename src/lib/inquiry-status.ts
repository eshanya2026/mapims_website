export const GENERAL_INQUIRY_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export const RECRUITMENT_STATUSES = [
  "new",
  "shortlisted",
  "interview_scheduled",
  "selected",
  "joined",
  "rejected",
  "screening",
] as const;

/** @deprecated Use GENERAL_INQUIRY_STATUSES */
export const INQUIRY_STATUSES = GENERAL_INQUIRY_STATUSES;

export type GeneralInquiryStatus = (typeof GENERAL_INQUIRY_STATUSES)[number];
export type RecruitmentStatus = (typeof RECRUITMENT_STATUSES)[number];
export type InquiryStatus = GeneralInquiryStatus | RecruitmentStatus;

export type InquiryStatusAction = {
  status: string;
  label: string;
};

const generalInquiryStatusLabels: Record<GeneralInquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const appointmentStatusLabels: Record<GeneralInquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Appointment Confirmed",
  completed: "Completed Visit",
  cancelled: "Cancelled",
};

const recruitmentStatusLabels: Record<RecruitmentStatus, string> = {
  new: "New",
  interview_scheduled: "Interview scheduled",
  shortlisted: "Shortlisted",
  selected: "Selected",
  joined: "Joined",
  rejected: "Rejected",
  screening: "Screening (legacy)",
};

export function isRecruitmentInquiry(type: string) {
  return type === "career" || type === "job_application";
}

export function isAppointmentInquiry(type: string) {
  return type === "appointment";
}

export function isGeneralInquiryStatus(value: string): value is GeneralInquiryStatus {
  return (GENERAL_INQUIRY_STATUSES as readonly string[]).includes(value);
}

export function isRecruitmentStatus(value: string): value is RecruitmentStatus {
  return (RECRUITMENT_STATUSES as readonly string[]).includes(value);
}

export function isValidInquiryStatusForType(type: string, status: string) {
  if (isRecruitmentInquiry(type)) {
    return isRecruitmentStatus(status);
  }
  if (isAppointmentInquiry(type) || type === "contact" || type === "international") {
    return isGeneralInquiryStatus(status);
  }
  return isGeneralInquiryStatus(status);
}

function getAppointmentWorkflowActions(status: string): InquiryStatusAction[] {
  switch (status) {
    case "new":
      return [
        { status: "contacted", label: "Mark Contacted" },
        { status: "cancelled", label: "Cancelled" },
      ];
    case "read":
    case "archived":
      return [{ status: "contacted", label: "Mark Contacted" }];
    case "contacted":
      return [
        { status: "confirmed", label: "Confirm Appointment" },
        { status: "cancelled", label: "Cancelled" },
      ];
    case "confirmed":
      return [
        { status: "completed", label: "Completed Visit" },
        { status: "cancelled", label: "Cancelled" },
      ];
    case "completed":
    case "cancelled":
      return [];
    default:
      return [];
  }
}

function getGeneralInquiryNextActions(status: string): InquiryStatusAction[] {
  switch (status) {
    case "new":
      return [{ status: "contacted", label: "Mark contacted" }];
    case "read":
    case "archived":
      return [{ status: "contacted", label: "Mark contacted" }];
    case "contacted":
      return [
        { status: "confirmed", label: "Mark confirmed" },
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

function getRecruitmentNextActions(status: string): InquiryStatusAction[] {
  switch (status) {
    case "new":
      return [
        { status: "shortlisted", label: "Shortlist" },
        { status: "rejected", label: "Reject" },
      ];
    case "shortlisted":
      return [
        { status: "interview_scheduled", label: "Schedule interview" },
        { status: "rejected", label: "Reject" },
      ];
    case "interview_scheduled":
      return [
        { status: "reschedule_interview", label: "Reschedule interview" },
        { status: "selected", label: "Mark selected" },
        { status: "rejected", label: "Reject" },
      ];
    case "selected":
      return [{ status: "joined", label: "Mark joined" }];
    case "joined":
    case "rejected":
      return [];
    case "screening":
      return [
        { status: "shortlisted", label: "Shortlist" },
        { status: "rejected", label: "Reject" },
      ];
    case "contacted":
    case "confirmed":
    case "completed":
    case "cancelled":
    case "read":
    case "archived":
      return [
        { status: "shortlisted", label: "Shortlist" },
        { status: "rejected", label: "Reject" },
      ];
    default:
      return [];
  }
}

export function getInquiryNextActions(
  type: string,
  status: string
): InquiryStatusAction[] {
  if (isRecruitmentInquiry(type)) {
    return getRecruitmentNextActions(status);
  }
  if (isAppointmentInquiry(type)) {
    return getAppointmentWorkflowActions(status);
  }
  return getGeneralInquiryNextActions(status);
}

export const QUICK_STATUS_FILTERS = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
] as const;

export type QuickStatusFilter = (typeof QUICK_STATUS_FILTERS)[number]["value"];

/** Maps daily inbox buckets to underlying enquiry statuses (general + recruitment). */
export function matchesQuickStatusFilter(
  type: string,
  status: string,
  filter: QuickStatusFilter
) {
  if (filter === "all") return true;
  if (filter === "new") return status === "new";

  if (isRecruitmentInquiry(type)) {
    switch (filter) {
      case "pending":
        return status === "interview_scheduled" || status === "shortlisted";
      case "confirmed":
        return status === "selected";
      case "completed":
        return status === "joined";
      default:
        return false;
    }
  }

  switch (filter) {
    case "pending":
      return status === "contacted" || status === "read";
    case "confirmed":
      return status === "confirmed";
    case "completed":
      return status === "completed";
    default:
      return false;
  }
}

/** Show the active interview card only while awaiting a post-interview decision. */
export function shouldShowProminentInterviewDetails(status: string) {
  return status === "interview_scheduled";
}

export function getInquiryStatusLabel(type: string, status: string) {
  if (isRecruitmentInquiry(type)) {
    if (isRecruitmentStatus(status)) {
      return recruitmentStatusLabels[status];
    }
    if (status === "contacted") return "Contacted (legacy)";
    if (status === "confirmed") return "Confirmed (legacy)";
    if (status === "completed") return "Completed (legacy)";
    if (status === "cancelled") return "Rejected (legacy)";
  }

  if (isAppointmentInquiry(type) && isGeneralInquiryStatus(status)) {
    return appointmentStatusLabels[status];
  }

  if (isGeneralInquiryStatus(status)) {
    return generalInquiryStatusLabels[status];
  }
  if (status === "read") return "Read";
  if (status === "archived") return "Archived";
  return status;
}

export function getInquiryStatusClassName(type: string, status: string) {
  if (isRecruitmentInquiry(type)) {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-700";
      case "screening":
        return "bg-sky-100 text-sky-700";
      case "shortlisted":
        return "bg-violet-100 text-violet-800 ring-1 ring-violet-200";
      case "interview_scheduled":
        return "bg-blue-100 text-blue-700";
      case "selected":
        return "bg-indigo-100 text-indigo-700";
      case "joined":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
      case "cancelled":
        return "bg-rose-100 text-rose-700";
      case "contacted":
      case "read":
        return "bg-sky-100 text-sky-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  if (isAppointmentInquiry(type)) {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-700";
      case "contacted":
      case "read":
        return "bg-sky-100 text-sky-700";
      case "confirmed":
        return "bg-blue-100 text-blue-800 ring-1 ring-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
      case "archived":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  }

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

/** @deprecated Use GENERAL_INQUIRY_STATUSES */
export const APPOINTMENT_INQUIRY_STATUSES = GENERAL_INQUIRY_STATUSES;

/** @deprecated Use getInquiryNextActions */
export function getAppointmentNextActions(status: string) {
  return getInquiryNextActions("appointment", status);
}
