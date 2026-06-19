import type { FormSubmissionRecord } from "@/lib/db/types";
import { formatDisplayDateLong } from "@/lib/format-display-date";
import { sendMail } from "@/lib/mail";

const HOSPITAL_CONTACT_EMAIL = "contact@mapims.edu.in";
const HOSPITAL_CONTACT_PHONE = "+91 94990 59966";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildAppointmentConfirmationEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const department = submission.department?.trim() ?? "—";
  const appointmentDate = submission.preferredDate
    ? formatDisplayDateLong(submission.preferredDate)
    : "—";
  const appointmentTime = submission.preferredTime?.trim() ?? "—";
  const referenceId = submission.referenceId?.trim() ?? "";
  const phone = submission.phone?.trim() ?? "—";

  const referenceText = referenceId
    ? [`Appointment Reference: ${referenceId}`, ""]
    : [];
  const referenceHtml = referenceId
    ? `<div style="margin:0 0 20px;padding:14px 16px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
        <p style="margin:0;font-size:14px;color:#7f1d1d;"><strong>Appointment Reference:</strong> ${escapeHtml(referenceId)}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#991b1b;">Please quote this reference when you visit the hospital or call to confirm.</p>
      </div>`
    : "";

  const text = [
    `Dear ${name},`,
    "",
    "Thank you for booking an appointment at Adhiparasakthi Hospitals (MAPIMS).",
    "",
    ...referenceText,
    `Department: ${department}`,
    `Date: ${appointmentDate}`,
    `Time: ${appointmentTime}`,
    `Phone: ${phone}`,
    submission.message?.trim() ? `Reason for visit: ${submission.message.trim()}` : undefined,
    "",
    "This is a request confirmation. Our front office team may contact you to verify your appointment.",
    "",
    "Hospital Contact",
    `Email: ${HOSPITAL_CONTACT_EMAIL}`,
    `Phone: ${HOSPITAL_CONTACT_PHONE}`,
    "",
    "Regards,",
    "Patient Services",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;color:#475569;">
        Thank you for booking an appointment at Adhiparasakthi Hospitals (MAPIMS).
      </p>
      ${referenceHtml}
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 8px;color:#475569;"><strong>Department:</strong> ${escapeHtml(department)}</p>
        <p style="margin:0 0 8px;color:#475569;"><strong>Date:</strong> ${escapeHtml(appointmentDate)}</p>
        <p style="margin:0 0 8px;color:#475569;"><strong>Time:</strong> ${escapeHtml(appointmentTime)}</p>
        <p style="margin:0 0 8px;color:#475569;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${
          submission.message?.trim()
            ? `<p style="margin:8px 0 0;color:#475569;white-space:pre-wrap;"><strong>Reason for visit:</strong><br />${escapeHtml(submission.message.trim())}</p>`
            : ""
        }
      </div>
      <p style="margin:0 0 20px;color:#475569;">
        This is a request confirmation. Our front office team may contact you to verify your appointment.
      </p>
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">Hospital Contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${HOSPITAL_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${HOSPITAL_CONTACT_EMAIL}</a><br />
          Phone: ${HOSPITAL_CONTACT_PHONE}
        </p>
      </div>
      <p style="margin:0;color:#475569;line-height:1.6;">
        Regards,<br />
        Patient Services<br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = referenceId
    ? `MAPIMS — Appointment confirmed (${referenceId})`
    : `MAPIMS — Appointment request received`;

  return { subject, text, html };
}

export async function notifyPatientOfAppointment(submission: FormSubmissionRecord) {
  if (submission.type !== "appointment") {
    return;
  }

  const patientEmail = submission.email?.trim();
  if (!patientEmail) {
    return;
  }

  const { subject, text, html } = buildAppointmentConfirmationEmail(submission);

  await sendMail({
    to: patientEmail,
    subject,
    text,
    html,
    replyTo: HOSPITAL_CONTACT_EMAIL,
  });
}
