import { departments, getDepartmentHref } from "@/data/departments";
import { liveChatContact } from "@/data/live-chat";
import { mapimsHealthCheckupUrl } from "@/data/site-links";

export type LiveChatRelatedAction = {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
  prompt?: string;
};

type ChatTopic =
  | "international"
  | "appointment"
  | "emergency"
  | "health-checkup"
  | "specialities"
  | "cancer"
  | "department"
  | "location"
  | "opd"
  | "general";

const departmentAliases: Record<string, RegExp> = {
  cardiology: /\b(cardiology|cardiac|heart)\b/i,
  orthopaedics: /\b(orthopaedic|orthopedic|bone|fracture)\b/i,
  "joint-replacement": /\b(joint replacement|knee replacement|hip replacement)\b/i,
  "obstetrics-gynaecology": /\b(obstetrics|gynaecology|gynecology|pregnancy|maternity)\b/i,
  nephrology: /\b(nephrology|kidney|renal|dialysis)\b/i,
  paediatric: /\b(paediatric|pediatric|child|children)\b/i,
  diabetology: /\b(diabetology|diabetes|diabetic)\b/i,
  "general-medicine": /\b(general medicine|physician|fever|general physician)\b/i,
  "medical-gastroenterology": /\b(gastroenterology|gastro|stomach|liver|digestive)\b/i,
  ophthalmology: /\b(ophthalmology|eye|vision|cataract)\b/i,
  ent: /\b(\bent\b|ear nose throat|otolaryngology)\b/i,
  urology: /\b(urology|urolog|kidney stone|prostate)\b/i,
  "multi-organ-transplant": /\b(transplant|organ transplant)\b/i,
  oncology: /\b(oncology|cancer|tumou?r|chemotherapy|radiation|malignant)\b/i,
  neurology: /\b(neurology|brain|stroke|seizure|neurological)\b/i,
  "plastic-surgery": /\b(plastic surgery|cosmetic surgery|reconstructive)\b/i,
};

const bookAppointmentAction: LiveChatRelatedAction = {
  id: "book-appointment",
  label: "Book Appointment",
  href: "/#book-appointment",
};

const contactDepartmentAction: LiveChatRelatedAction = {
  id: "contact-department",
  label: "Contact Department",
  href: "/contact",
};

const internationalAction: LiveChatRelatedAction = {
  id: "international",
  label: "International Patient Services",
  href: "/international",
};

const contactInternationalDeskAction: LiveChatRelatedAction = {
  id: "contact-international-desk",
  label: "Contact International Desk",
  href: "/international#contact-international-desk",
};

const healthCheckupAction: LiveChatRelatedAction = {
  id: "health-checkup",
  label: "Health Checkup Packages",
  href: mapimsHealthCheckupUrl,
  external: true,
};

const emergencyAction: LiveChatRelatedAction = {
  id: "emergency",
  label: "Emergency Contact",
  href: liveChatContact.emergencyHref,
};

const specialitiesAction: LiveChatRelatedAction = {
  id: "specialities",
  label: "View Specialities",
  href: "/departments",
};

const locationAction: LiveChatRelatedAction = {
  id: "location",
  label: "Hospital Location",
  href: "/contact",
};

const opdTimingsAction: LiveChatRelatedAction = {
  id: "opd-timings",
  label: "OPD Timings",
  prompt: "What are the OPD timings at MAPIMS?",
};

const cancerAction: LiveChatRelatedAction = {
  id: "cancer-treatments",
  label: "Cancer Treatments",
  href: "/departments/oncology",
};

const topicActions: Record<ChatTopic, LiveChatRelatedAction[]> = {
  international: [internationalAction, contactInternationalDeskAction, contactDepartmentAction],
  appointment: [bookAppointmentAction, specialitiesAction, contactDepartmentAction],
  emergency: [emergencyAction, contactDepartmentAction, bookAppointmentAction],
  "health-checkup": [healthCheckupAction, bookAppointmentAction, contactDepartmentAction],
  specialities: [specialitiesAction, bookAppointmentAction, contactDepartmentAction],
  cancer: [cancerAction, bookAppointmentAction, contactDepartmentAction],
  department: [bookAppointmentAction, specialitiesAction, contactDepartmentAction],
  location: [locationAction, bookAppointmentAction, contactDepartmentAction],
  opd: [opdTimingsAction, bookAppointmentAction, contactDepartmentAction],
  general: [bookAppointmentAction, specialitiesAction, contactDepartmentAction],
};

function detectDepartmentAction(context: string): LiveChatRelatedAction | null {
  for (const department of departments) {
    const pattern = departmentAliases[department.slug];
    if (!pattern?.test(context)) continue;

    return {
      id: department.slug === "oncology" ? "cancer-treatments" : `department-${department.slug}`,
      label: department.slug === "oncology" ? "Cancer Treatments" : `${department.name} Department`,
      href: getDepartmentHref(department.slug),
    };
  }

  return null;
}

function detectTopic(userQuestion: string | null): ChatTopic {
  const context = (userQuestion ?? "").trim().toLowerCase();
  if (!context) return "general";

  if (/\b(international|abroad|foreign patient|travel guidance|visa)\b/i.test(context)) {
    return "international";
  }

  if (/\b(emergency|ambulance|casualty|1066|urgent care)\b/i.test(context)) {
    return "emergency";
  }

  if (/\b(health checkup|health package|master health|preventive|screening)\b/i.test(context)) {
    return "health-checkup";
  }

  if (/\b(cancer|oncology|tumou?r|chemotherapy|radiation|malignant)\b/i.test(context)) {
    return "cancer";
  }

  if (/\b(appointment|appointments|book(?:ing)?|schedule|consultation|slot)\b/i.test(context)) {
    return "appointment";
  }

  if (/\b(opd timing|opd hours|opening hours|visiting hours|sunday opd)\b/i.test(context)) {
    return "opd";
  }

  if (/\b(location|address|directions|where is|melmaruvathur|reach the hospital)\b/i.test(context)) {
    return "location";
  }

  if (/\b(specialit|specialt|which department|what department|departments)\b/i.test(context)) {
    return "specialities";
  }

  if (detectDepartmentAction(context)) {
    return "department";
  }

  return "general";
}

export function getLiveChatRelatedActions(
  userQuestion: string | null,
  _assistantAnswer: string,
  options?: { maxActions?: number }
): LiveChatRelatedAction[] {
  const maxActions = options?.maxActions ?? 3;
  const topic = detectTopic(userQuestion);
  const userContext = (userQuestion ?? "").trim();

  const selected: LiveChatRelatedAction[] = [];
  const seenIds = new Set<string>();

  const addAction = (action: LiveChatRelatedAction) => {
    if (seenIds.has(action.id) || selected.length >= maxActions) return;
    seenIds.add(action.id);
    selected.push(action);
  };

  if (topic === "department" && userContext) {
    const departmentAction = detectDepartmentAction(userContext);
    if (departmentAction) {
      addAction(departmentAction);
    }
  }

  for (const action of topicActions[topic]) {
    addAction(action);
    if (selected.length >= maxActions) break;
  }

  return selected;
}
