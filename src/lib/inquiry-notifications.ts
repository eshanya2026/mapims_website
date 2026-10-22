import type { FormSubmissionRecord } from "@/lib/db/types";
import { getHrNotificationEmail, sendMail } from "@/lib/mail";

const HOSPITAL_CONTACT_EMAIL = "contact@mapims.edu.in";
const HOSPITAL_CONTACT_PHONE = "+91 94990 59966";
const INTERNATIONAL_DESK_PHONE = "1800 599 0999";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRow(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  const safe = escapeHtml(value.trim());
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;vertical-align:top;width:150px;border-bottom:1px solid #f1f5f9;">${label}</td><td style="padding:8px 12px;color:#475569;border-bottom:1px solid #f1f5f9;">${safe}</td></tr>`;
}

function fieldLine(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  return `${label}: ${value.trim()}`;
}

export function buildInquiryConfirmationEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const isInternational = submission.type === "international";
  const title = isInternational
    ? "International Patient Inquiry"
    : "Query / Message";

  const intro = isInternational
    ? "Thank you for reaching out to the International Patient Desk at Adhiparasakthi Hospitals (MAPIMS). We have received your inquiry and our international patient coordinators will review your requirements and contact you shortly."
    : "Thank you for contacting Adhiparasakthi Hospitals (MAPIMS). We have received your query and our team will get in touch with you as soon as possible.";

  const textLines = [
    `Dear ${name},`,
    "",
    intro,
    "",
    "Submission Details:",
    `Inquiry Type: ${title}`,
    `Name: ${name}`,
    submission.email ? `Email: ${submission.email.trim()}` : undefined,
    fieldLine("Mobile / Phone", submission.phone),
    isInternational && submission.country ? fieldLine("Country", submission.country) : undefined,
    isInternational && submission.medicalCondition
      ? fieldLine("Medical Condition", submission.medicalCondition)
      : undefined,
    submission.message?.trim() ? `Message:\n${submission.message.trim()}` : undefined,
    "",
    "Hospitals Contact",
    `Email: ${HOSPITAL_CONTACT_EMAIL}`,
    ...(isInternational
      ? [
          `Toll Free: ${INTERNATIONAL_DESK_PHONE}`,
          `Phone: ${HOSPITAL_CONTACT_PHONE}`,
        ]
      : [`Phone: ${HOSPITAL_CONTACT_PHONE}`]),
    "",
    "Regards,",
    isInternational ? "International Patient Desk" : "Patient Services",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const rows = [
    fieldRow("Inquiry Type", title),
    fieldRow("Name", name),
    submission.email ? fieldRow("Email", submission.email) : "",
    fieldRow("Mobile / Phone", submission.phone),
    isInternational ? fieldRow("Country", submission.country) : "",
    isInternational ? fieldRow("Medical Condition", submission.medicalCondition) : "",
    submission.documentUrls && submission.documentUrls.length > 0
      ? fieldRow("Uploaded Reports", `${submission.documentUrls.length} file(s) received`)
      : "",
  ]
    .filter(Boolean)
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;color:#475569;">
        ${escapeHtml(intro)}
      </p>

      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#334155;">Your Inquiry Summary</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>
            ${rows}
          </tbody>
        </table>
        ${
          submission.message?.trim()
            ? `<div style="margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#334155;">Message:</p>
                <p style="margin:0;font-size:13px;color:#475569;white-space:pre-wrap;">${escapeHtml(submission.message.trim())}</p>
              </div>`
            : ""
        }
      </div>

      <div style="margin:0 0 24px;padding:16px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#991b1b;">Hospital Contact Details</p>
        <p style="margin:0;font-size:13px;color:#7f1d1d;line-height:1.6;">
          Email: <a href="mailto:${HOSPITAL_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;font-weight:600;">${HOSPITAL_CONTACT_EMAIL}</a><br />
          ${
            isInternational
              ? `Toll Free: <strong>${INTERNATIONAL_DESK_PHONE}</strong><br />Phone: <strong>${HOSPITAL_CONTACT_PHONE}</strong>`
              : `Phone: <strong>${HOSPITAL_CONTACT_PHONE}</strong>`
          }
        </p>
      </div>

      <p style="margin:0;color:#475569;line-height:1.6;">
        Regards,<br />
        ${isInternational ? "International Patient Desk" : "Patient Services"}<br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = isInternational
    ? "MAPIMS — International Patient Inquiry Received"
    : "MAPIMS — Thank you for contacting us (Query Received)";

  return { subject, text: textLines, html };
}

export async function notifyPatientOfInquiry(submission: FormSubmissionRecord) {
  const patientEmail = submission.email?.trim();
  if (!patientEmail) {
    return;
  }

  const { subject, text, html } = buildInquiryConfirmationEmail(submission);

  await sendMail({
    to: patientEmail,
    subject,
    text,
    html,
    replyTo: HOSPITAL_CONTACT_EMAIL,
  });
}

export async function notifyHospitalOfInquiry(submission: FormSubmissionRecord) {
  const notificationEmail =
    process.env.INQUIRY_NOTIFICATION_EMAIL?.trim() || getHrNotificationEmail();
  if (!notificationEmail) {
    return;
  }

  const isInternational = submission.type === "international";
  const typeLabel = isInternational
    ? "International Patient Inquiry"
    : "Get in Touch Query";

  const subject = `[MAPIMS Website] New ${typeLabel}: ${submission.name.trim()}`;
  const { text, html } = buildInquiryConfirmationEmail(submission);

  await sendMail({
    to: notificationEmail,
    subject,
    text,
    html,
    replyTo: submission.email?.trim() || undefined,
  });
}
