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

Our emergency services and trauma resuscitation are available 24/7.`;
}

export function buildWardPricingChatAnswer(): string {
  return `🛏️ Inpatient Ward Facilities & Room Charges

MAPIMS offers transparent accommodation tailored to patient care and recovery:

1. General Ward:
• 100% Free Consultation & Bed Charges
• 100% Free prescribed essential inpatient medicines
• 50% Special Concession on lab tests & diagnostic scans
• Supported by community welfare with 24/7 nursing supervision

2. Special Ward Rooms:
• Sharing Room: ₹1,500 / per day
• Deluxe Room: ₹2,500 / per day (AC private room with attached bath)
• Super Deluxe Room: ₹3,500 / per day (spacious executive room)
• Suite Room: ₹4,800 / per day (bedroom + private living lounge)

📞 Admission Desk: ${liveChatContact.phone}`;
}

export function buildSurgeryPackagesChatAnswer(): string {
  return `🩺 Special Concession Surgery Packages

MAPIMS provides special packages for selected surgical procedures to ensure affordable, high-quality care:

• ENT Surgery Concession Packages:
  - Adenotonsillectomy (Adult & Paediatric)
  - Septoplasty
  - FESS / Polypectomy (Endoscopic Sinus Surgery)
  - Tympanoplasty (Ear Drum Repair)
  - Cortical Mastoidectomy / MRM
  📞 ENT Enquiries: 044-2752 8528 / 9499 905 995 / 8917 671 9999

• General & Laparoscopic Surgery:
  - Laparoscopic Gallbladder Removal (Cholecystectomy)
  - Laparoscopic Appendectomy
  - Hernia Repair (Inguinal, Umbilical, Ventral)
  - Proctology (Piles / MIPH, Fissure, Fistula)

📞 General Hospital Desk: ${liveChatContact.phone}`;
}

export function buildUpcomingEventsChatAnswer(): string {
  return `✨ Upcoming Events & Medical Programs

1. ECG Ignited and Echocardiogram Primer Workshop (Incoming Event):
• Dates: October 30 & 31, 2026 (2-day workshop)
• Theme: “Learn | Interpret | Improve”
• Course Director: Dr. M. Chenninappan
• Venue: Diamond Jubilee Auditorium, Adhiparasakthi Hospital
• Organized by: Dept. of Internal Medicine (endorsed by API Chengalpattu Branch)

2. AACE 2026 – ECHOSMART:
• Date: November 15, 2026 (Sunday)
• Focus: Cardiac Ultrasound Basics & Hemodynamic Assessment
• Venue: BLISS Skill Lab, 4th Floor
• Chairperson: Prof. Dr. Kumaresan S (Dept. of Anaesthesia & Critical Care)
• Registration Fee: ₹1,500/- (Max 50 seats, CME credits applied)
• Contacts: +91 81485 28890 / +91 63790 75140

Check our Hospitals Events page on the website for schedules and registration.`;
}

export function buildInsuranceChatAnswer(): string {
  return `🛡️ Health Insurance & Cashless Hospitalization

MAPIMS has an active dedicated Insurance Desk:

• Cashless Hospitalization:
Empanelled with leading private and corporate health insurance companies & TPAs (Star Health, Medi Assist, MD India, Paramount, Heritage, Vidal, etc.).

• Government Healthcare Scheme:
Empanelled under Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS / Kalaignar Kaappeettu Thittam).

📞 Insurance Desk Phone: ${liveChatContact.insurancePhone}
📧 Insurance Email: ${liveChatContact.insuranceEmail}
Working Hours: Monday to Saturday, 9:00 AM – 6:00 PM`;
}

const starterAnswerBuilders: Record<string, () => string> = {
  "book-appointment": buildAppointmentChatAnswer,
  international: buildInternationalPatientChatAnswer,
  specialities: buildSpecialitiesChatAnswer,
  emergency: buildEmergencyChatAnswer,
  "health-checkup": buildHealthCheckupChatAnswer,
  "inpatient-ward-pricing": buildWardPricingChatAnswer,
  "surgery-packages": buildSurgeryPackagesChatAnswer,
  "upcoming-events": buildUpcomingEventsChatAnswer,
  insurance: buildInsuranceChatAnswer,
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
