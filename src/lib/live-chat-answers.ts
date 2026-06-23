import { liveChatContact } from "@/data/live-chat";
import { internationalDesk } from "@/data/international-patients";
import { mapimsHealthCheckupUrl } from "@/data/site-links";

const CANNED_REPLY_DELAY_MS = 900;

export function buildUnknownQuestionFallback(): string {
  return `Thank you for your question. For the most accurate information, please contact our team directly.

📞 ${liveChatContact.phone}
📧 ${liveChatContact.email}

Our staff will be happy to assist you.`;
}

export function buildAppointmentChatAnswer(): string {
  return `📅 Book an Appointment

You can book an appointment through any of the following options:

• Online appointment form on our website
• Phone: ${liveChatContact.phone}
• Email: ${liveChatContact.email}

If you need help choosing a department or doctor, let me know your symptoms or medical concern.`;
}

export function buildHealthCheckupChatAnswer(): string {
  return `🩺 Health Checkup Packages

MAPIMS offers preventive health screening packages including:

• Master Health Checkup
• Complete Health Checkup
• Cardio Health Checkup
• Well Women Executive Checkup

📅 Book Online:
${mapimsHealthCheckupUrl}

📞 Phone:
${liveChatContact.phone}

📧 Email:
${liveChatContact.email}`;
}

export function buildInternationalPatientChatAnswer(): string {
  return `🌍 International Patient Services

MAPIMS welcomes patients from India and abroad.

We assist with:

• Appointment scheduling
• Treatment planning
• Medical opinions
• Travel guidance
• Accommodation support
• Patient coordination

📞 International Desk:
${internationalDesk.phoneDisplay}

📧 Email:
${internationalDesk.email}`;
}

export function buildSpecialitiesChatAnswer(): string {
  return `🏥 Our Major Specialities Include:

• Cardiology
• Orthopaedics
• Joint Replacement
• Obstetrics & Gynaecology
• Nephrology
• Paediatrics
• Diabetology
• General Medicine
• Gastroenterology
• Ophthalmology
• ENT
• Urology
• Oncology
• Neurology
• Plastic Surgery
• Multi Organ Transplant

For more details, visit the Specialities section on our website.

Would you like information about a specific department?`;
}

export function buildEmergencyChatAnswer(): string {
  return `🚑 Emergency Care

For medical emergencies, please call the hospital immediately.

📞 Emergency / Ambulance: ${liveChatContact.emergency}
📞 Hospital Contact: ${liveChatContact.phone}

Our emergency services are available 24/7.`;
}

const starterAnswerBuilders: Record<string, () => string> = {
  "book-appointment": buildAppointmentChatAnswer,
  international: buildInternationalPatientChatAnswer,
  specialities: buildSpecialitiesChatAnswer,
  emergency: buildEmergencyChatAnswer,
  "health-checkup": buildHealthCheckupChatAnswer,
};

export function getStarterAnswer(starterId: string): string | undefined {
  const builder = starterAnswerBuilders[starterId];
  return builder?.();
}

export function getCannedReplyDelayMs() {
  return CANNED_REPLY_DELAY_MS;
}

export function formatChatReply(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
