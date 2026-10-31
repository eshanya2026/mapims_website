import type { FormSubmissionRecord } from "@/lib/db/types";
import { formatDisplayDateLong } from "@/lib/format-display-date";
import { sendMail } from "@/lib/mail";

const APPOINTMENT_CONTACT_EMAIL =
  process.env.APPOINTMENT_CONTACT_EMAIL?.trim() ||
  process.env.APPOINTMENT_NOTIFICATION_EMAIL?.trim() ||
  "contact@mapims.online";
const APPOINTMENT_NOTIFICATION_EMAIL =
  process.env.APPOINTMENT_NOTIFICATION_EMAIL?.trim() ||
  "contact@mapims.online";
const HOSPITAL_CONTACT_PHONE =
  process.env.HOSPITAL_CONTACT_PHONE?.trim() || "+91 94990 59966";

/** Set to true when patient appointment confirmation emails should be sent. */
export const PATIENT_APPOINTMENT_CONFIRMATION_EMAIL_ENABLED = true;

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
        <p style="margin:8px 0 0;font-size:13px;color:#991b1b;">Please quote this reference when you visit the hospitals or call to confirm.</p>
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
    "Appointment Desk Contact",
    `Email: ${APPOINTMENT_CONTACT_EMAIL}`,
    `Phone: ${HOSPITAL_CONTACT_PHONE}`,
    "",
    "Regards,",
    "Patient Services & Appointment Desk",
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
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">Appointment Desk Contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${APPOINTMENT_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${APPOINTMENT_CONTACT_EMAIL}</a><br />
          Phone: ${HOSPITAL_CONTACT_PHONE}
        </p>
      </div>
      <p style="margin:0;color:#475569;line-height:1.6;">
        Regards,<br />
        Patient Services &amp; Appointment Desk<br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = referenceId
    ? `MAPIMS — Appointment confirmed (${referenceId})`
    : `MAPIMS — Appointment request received`;

  return { subject, text, html };
}

function buildHospitalAppointmentEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const department = submission.department?.trim() ?? "—";
  const appointmentDate = submission.preferredDate
    ? formatDisplayDateLong(submission.preferredDate)
    : "—";
  const appointmentTime = submission.preferredTime?.trim() ?? "—";
  const referenceId = submission.referenceId?.trim() ?? submission.id;
  const phone = submission.phone?.trim() ?? "—";
  const email = submission.email?.trim() ?? "—";
  const message = submission.message?.trim();

  const subject = `New Appointment Booking - ${name} (${department}) [${referenceId}]`;

  const textLines = [
    "NEW PATIENT APPOINTMENT BOOKING",
    "Melmaruvathur Adhiparasakthi Institute of Medical Sciences (MAPIMS)",
    "==================================================",
    "",
    `Reference ID: ${referenceId}`,
    `Patient Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Department: ${department}`,
    `Date: ${appointmentDate}`,
    `Time Slot: ${appointmentTime}`,
    message ? `Reason for Visit / Note:\n${message}` : undefined,
    "",
    "==================================================",
    "Submitted via MAPIMS Website Appointment Booking Form",
    "You can reply directly to this email to contact the patient.",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;padding:0;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;color:#1e293b;line-height:1.6;">
      <div style="background:linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);padding:24px 28px;color:#ffffff;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fecaca;">Melmaruvathur Adhiparasakthi Institute of Medical Sciences (MAPIMS)</p>
        <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;">
          New Patient Appointment Booking
        </h1>
        <p style="margin:6px 0 0;font-size:13px;color:#fecaca;">
          Reference ID: <strong style="color:#ffffff;font-size:14px;">${escapeHtml(referenceId)}</strong>
        </p>
      </div>

      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
          <tbody>
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#334155;width:150px;border-bottom:1px solid #f1f5f9;">Patient Name</td>
              <td style="padding:8px 12px;color:#0f172a;font-weight:600;border-bottom:1px solid #f1f5f9;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #f1f5f9;">Department</td>
              <td style="padding:8px 12px;color:#dc2626;font-weight:700;border-bottom:1px solid #f1f5f9;">${escapeHtml(department)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #f1f5f9;">Preferred Date</td>
              <td style="padding:8px 12px;color:#334155;font-weight:600;border-bottom:1px solid #f1f5f9;">${escapeHtml(appointmentDate)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #f1f5f9;">Time Slot</td>
              <td style="padding:8px 12px;color:#334155;font-weight:600;border-bottom:1px solid #f1f5f9;">${escapeHtml(appointmentTime)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #f1f5f9;">Phone / Mobile</td>
              <td style="padding:8px 12px;color:#334155;border-bottom:1px solid #f1f5f9;">
                <a href="tel:${escapeHtml(phone)}" style="color:#dc2626;text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #f1f5f9;">Patient Email</td>
              <td style="padding:8px 12px;color:#334155;border-bottom:1px solid #f1f5f9;">
                <a href="mailto:${escapeHtml(email)}" style="color:#dc2626;text-decoration:none;">${escapeHtml(email)}</a>
              </td>
            </tr>
          </tbody>
        </table>

        ${
          message
            ? `<div style="margin:16px 0;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Reason for Visit / Note</p>
                <p style="margin:0;font-size:13px;color:#334155;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
              </div>`
            : ""
        }

        <div style="margin-top:20px;padding:12px 16px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:13px;color:#991b1b;">
          <strong>Quick Action:</strong> You can reply directly to this notification to email the patient at <a href="mailto:${escapeHtml(email)}" style="color:#b91c1c;font-weight:600;">${escapeHtml(email)}</a>.
        </div>

        <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;font-size:12px;color:#94a3b8;">
          Submitted via MAPIMS Website • Reference ID: ${escapeHtml(referenceId)}
        </div>
      </div>
    </div>
  `.trim();

  return { subject, text: textLines, html };
}

export async function notifyPatientOfAppointment(submission: FormSubmissionRecord) {
  if (!PATIENT_APPOINTMENT_CONFIRMATION_EMAIL_ENABLED) {
    return;
  }

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
    replyTo: APPOINTMENT_CONTACT_EMAIL,
  });
}

export async function notifyHospitalOfAppointment(submission: FormSubmissionRecord) {
  if (submission.type !== "appointment") {
    return;
  }

  const notificationEmail = APPOINTMENT_NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    return;
  }

  const { subject, text, html } = buildHospitalAppointmentEmail(submission);

  await sendMail({
    to: notificationEmail,
    subject,
    text,
    html,
    replyTo: submission.email?.trim() || undefined,
  });
}

export async function sendAppointmentReplyEmail({
  submission,
  replyMessage,
  subject: customSubject,
  senderName,
}: {
  submission: FormSubmissionRecord;
  replyMessage: string;
  subject?: string;
  senderName?: string;
}) {
  const recipientEmail = submission.email?.trim();
  if (!recipientEmail) {
    throw new Error("Appointment submission does not have a recipient email address.");
  }

  const patientName = submission.name.trim();
  const subject =
    customSubject?.trim() ||
    `Re: MAPIMS Appointment Request - ${patientName} [${submission.referenceId || submission.id}]`;
  const cleanReply = replyMessage.trim();
  const referenceId = submission.referenceId?.trim() ?? submission.id;

  const textLines = [
    `Dear ${patientName},`,
    "",
    cleanReply,
    "",
    "--------------------------------------------------",
    "APPOINTMENT DETAILS:",
    `Reference ID: ${referenceId}`,
    `Department: ${submission.department || "—"}`,
    submission.preferredDate ? `Date: ${submission.preferredDate}` : undefined,
    submission.preferredTime ? `Time: ${submission.preferredTime}` : undefined,
    "--------------------------------------------------",
    "",
    "Need further assistance?",
    `Appointment Desk Email: ${APPOINTMENT_CONTACT_EMAIL}`,
    `Hospital Phone: ${HOSPITAL_CONTACT_PHONE}`,
    "",
    "Warm regards,",
    senderName ? `${senderName} (Patient Services)` : "Patient Services & Appointment Desk",
    "Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research (MAPIMS)",
    "GST Road, Melmaruvathur, Tamil Nadu 603319",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;padding:0;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;color:#1e293b;line-height:1.6;">
      <div style="background:linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);padding:24px 28px;color:#ffffff;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fecaca;">Melmaruvathur Adhiparasakthi Institute of Medical Sciences (MAPIMS)</p>
        <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;">
          Appointment Desk Update
        </h1>
        <p style="margin:6px 0 0;font-size:13px;color:#fecaca;">
          Reference ID: <strong style="color:#ffffff;font-size:14px;">${escapeHtml(referenceId)}</strong>
        </p>
      </div>

      <div style="padding:24px 28px;">
        <p style="margin:0 0 16px;font-size:15px;color:#0f172a;">Dear <strong>${escapeHtml(patientName)}</strong>,</p>

        <div style="margin:0 0 20px;padding:16px;background:#f8fafc;border-left:4px solid #b91c1c;border-radius:4px;font-size:14px;color:#334155;white-space:pre-wrap;line-height:1.7;">${escapeHtml(cleanReply)}</div>

        <div style="margin:20px 0;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;">
          <p style="margin:0 0 8px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.5px;font-size:11px;">Appointment Summary</p>
          <p style="margin:0 0 4px;color:#475569;"><strong>Department:</strong> ${escapeHtml(submission.department || "—")}</p>
          ${submission.preferredDate ? `<p style="margin:0 0 4px;color:#475569;"><strong>Date:</strong> ${escapeHtml(submission.preferredDate)}</p>` : ""}
          ${submission.preferredTime ? `<p style="margin:0 0 4px;color:#475569;"><strong>Time:</strong> ${escapeHtml(submission.preferredTime)}</p>` : ""}
        </div>

        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b;">
          <p style="margin:0 0 4px;"><strong>Appointment Desk:</strong> <a href="mailto:${APPOINTMENT_CONTACT_EMAIL}" style="color:#b91c1c;text-decoration:none;">${APPOINTMENT_CONTACT_EMAIL}</a></p>
          <p style="margin:0;"><strong>Hospital General Phone:</strong> ${HOSPITAL_CONTACT_PHONE}</p>
        </div>

        <p style="margin:20px 0 0;font-size:13px;color:#475569;">
          Warm regards,<br />
          <strong>${escapeHtml(senderName || "Patient Services & Appointment Desk")}</strong><br />
          Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research (MAPIMS)
        </p>
      </div>
    </div>
  `.trim();

  await sendMail({
    to: recipientEmail,
    subject,
    text: textLines,
    html,
    replyTo: APPOINTMENT_CONTACT_EMAIL,
  });
}
