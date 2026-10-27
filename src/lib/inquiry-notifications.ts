import type { FormSubmissionRecord } from "@/lib/db/types";
import { getHrNotificationEmail, getSiteUrl, sendMail } from "@/lib/mail";

const HOSPITAL_CONTACT_EMAIL =
  process.env.HOSPITAL_CONTACT_EMAIL?.trim() || "contact@mapims.edu.in";
const HOSPITAL_CONTACT_PHONE =
  process.env.HOSPITAL_CONTACT_PHONE?.trim() || "+91 94990 59966";
const INTERNATIONAL_DESK_PHONE =
  process.env.INTERNATIONAL_DESK_PHONE?.trim() || "1800 599 0999";
const INSURANCE_CONTACT_EMAIL =
  process.env.INSURANCE_NOTIFICATION_EMAIL?.trim() || "Insurance@mapims.org";
const INSURANCE_CONTACT_PHONE =
  process.env.INSURANCE_CONTACT_PHONE?.trim() ||
  process.env.NEXT_PUBLIC_INSURANCE_PHONE?.trim() ||
  "9499059970";

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
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;vertical-align:top;width:160px;border-bottom:1px solid #f1f5f9;">${label}</td><td style="padding:8px 12px;color:#475569;border-bottom:1px solid #f1f5f9;">${safe}</td></tr>`;
}

function fieldLine(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  return `${label}: ${value.trim()}`;
}

export function buildInquiryConfirmationEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const isInternational = submission.type === "international";
  const isInsurance = submission.type === "insurance";
  const isCallback = Boolean(
    submission.message?.includes("[Callback requested") ||
      submission.message?.toLowerCase().includes("please call")
  );

  const title = isInsurance
    ? "Insurance Desk & Policy Verification Query"
    : isInternational
      ? isCallback
        ? "International Patient Callback Request"
        : "International Patient Inquiry"
      : "Query / Message";

  const intro = isInsurance
    ? "Thank you for contacting the Insurance Desk at Adhiparasakthi Hospitals (MAPIMS). We have received your insurance query / policy verification request. Our insurance coordinators will review your details and contact you shortly."
    : isInternational
      ? isCallback
        ? "Thank you for requesting a callback from the International Patient Desk at Adhiparasakthi Hospitals (MAPIMS). We have received your request and our international coordinators will review your details and call you back shortly."
        : "Thank you for reaching out to the International Patient Desk at Adhiparasakthi Hospitals (MAPIMS). We have received your inquiry and our international patient coordinators will review your requirements and contact you shortly."
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
    isInsurance && submission.medicalCondition
      ? fieldLine("Insurance Details", submission.medicalCondition)
      : undefined,
    isInternational && submission.country ? fieldLine("Country", submission.country) : undefined,
    isInternational && submission.medicalCondition
      ? fieldLine("Medical Condition", submission.medicalCondition)
      : undefined,
    submission.message?.trim() ? `Message:\n${submission.message.trim()}` : undefined,
    "",
    isInsurance ? "Insurance Desk Contact" : "Hospitals Contact",
    `Email: ${isInsurance ? INSURANCE_CONTACT_EMAIL : HOSPITAL_CONTACT_EMAIL}`,
    ...(isInsurance
      ? [
          `Direct Insurance Helpline: ${INSURANCE_CONTACT_PHONE}`,
          `Hospital General Phone: ${HOSPITAL_CONTACT_PHONE}`,
        ]
      : isInternational
        ? [
            `Toll Free: ${INTERNATIONAL_DESK_PHONE}`,
            `Phone: ${HOSPITAL_CONTACT_PHONE}`,
          ]
        : [`Phone: ${HOSPITAL_CONTACT_PHONE}`]),
    "",
    "Regards,",
    isInsurance
      ? "Insurance Helpdesk"
      : isInternational
        ? "International Patient Desk"
        : "Patient Services",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const rows = [
    fieldRow("Inquiry Type", title),
    fieldRow("Name", name),
    submission.email ? fieldRow("Email", submission.email) : "",
    fieldRow("Mobile / Phone", submission.phone),
    isInsurance ? fieldRow("Insurance Details", submission.medicalCondition) : "",
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
        <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#991b1b;">
          ${isInsurance ? "Insurance Desk Contact Details" : "Hospital Contact Details"}
        </p>
        <p style="margin:0;font-size:13px;color:#7f1d1d;line-height:1.6;">
          Email: <a href="mailto:${isInsurance ? INSURANCE_CONTACT_EMAIL : HOSPITAL_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;font-weight:600;">${isInsurance ? INSURANCE_CONTACT_EMAIL : HOSPITAL_CONTACT_EMAIL}</a><br />
          ${
            isInsurance
              ? `Direct Insurance Helpline: <strong>${INSURANCE_CONTACT_PHONE}</strong><br />Hospital General Phone: <strong>${HOSPITAL_CONTACT_PHONE}</strong>`
              : isInternational
                ? `Toll Free: <strong>${INTERNATIONAL_DESK_PHONE}</strong><br />Phone: <strong>${HOSPITAL_CONTACT_PHONE}</strong>`
                : `Phone: <strong>${HOSPITAL_CONTACT_PHONE}</strong>`
          }
        </p>
      </div>

      <p style="margin:0;color:#475569;line-height:1.6;">
        Regards,<br />
        ${isInsurance ? "Insurance Helpdesk" : isInternational ? "International Patient Desk" : "Patient Services"}<br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = isInsurance
    ? "MAPIMS — Insurance Desk Query Received"
    : isInternational
      ? isCallback
        ? "MAPIMS — International Patient Callback Request Received"
        : "MAPIMS — International Patient Inquiry Received"
      : "MAPIMS — Thank you for contacting us (Query Received)";

  return { subject, text: textLines, html };
}

function adminRow(label: string, value: string | null | undefined, linkHref?: string) {
  if (!value?.trim()) return "";
  const safe = escapeHtml(value.trim());
  const content = linkHref
    ? `<a href="${escapeHtml(linkHref)}" style="color:#0f172a;font-weight:600;text-decoration:underline;">${safe}</a>`
    : safe;
  return `<tr><td style="padding:9px 0;font-size:13px;font-weight:600;color:#64748b;width:150px;border-bottom:1px solid #f1f5f9;vertical-align:top;">${label}</td><td style="padding:9px 0;font-size:13px;color:#1e293b;border-bottom:1px solid #f1f5f9;">${content}</td></tr>`;
}

export function buildHospitalInquiryEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const isInternational = submission.type === "international";
  const isInsurance = submission.type === "insurance";
  const isCallback = Boolean(
    submission.message?.includes("[Callback requested") ||
      submission.message?.toLowerCase().includes("please call")
  );

  const cleanMessage = submission.message?.trim() || "";

  const typeLabel = isInsurance
    ? "Insurance Desk & Policy Verification Query"
    : isInternational
      ? isCallback
        ? "International Patient Callback Request"
        : "International Patient Inquiry"
      : "Website Query";

  const subject = isInsurance
    ? `[MAPIMS Insurance Desk] Query: ${name}`
    : isInternational
      ? isCallback
        ? `[MAPIMS] Callback Request: ${name}${submission.country ? ` (${submission.country})` : ""}`
        : `[MAPIMS] International Inquiry: ${name}${submission.country ? ` (${submission.country})` : ""}`
      : `[MAPIMS] Website Query: ${name}`;

  const siteUrl = getSiteUrl();

  const formattedDocuments = (submission.documentUrls || []).map((url, i) => {
    const fullUrl = url.startsWith("http")
      ? url
      : `${siteUrl}${url.startsWith("/") ? "" : "/"}${url}`;
    return { name: `Report / Document ${i + 1}`, url: fullUrl };
  });

  const textLines = [
    `MAPIMS HOSPITALS — ${typeLabel.toUpperCase()}`,
    "--------------------------------------------------",
    isCallback ? "Note: The patient has requested a phone callback." : "",
    "",
    `Patient Name: ${name}`,
    `Phone / Mobile: ${submission.phone || "—"}`,
    `Email: ${submission.email || "—"}`,
    isInternational && submission.country ? `Country: ${submission.country}` : undefined,
    isInternational && submission.medicalCondition
      ? `Medical Condition: ${submission.medicalCondition}`
      : undefined,
    submission.referenceId ? `Reference ID: ${submission.referenceId}` : undefined,
    formattedDocuments.length > 0
      ? `Uploaded Reports:\n${formattedDocuments.map((d) => `- ${d.name}: ${d.url}`).join("\n")}`
      : undefined,
    cleanMessage ? `\nMessage:\n${cleanMessage}` : undefined,
    "",
    "--------------------------------------------------",
    "Submitted via the MAPIMS website international desk.",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const rows = [
    adminRow("Inquiry Type", typeLabel),
    adminRow("Patient Name", name),
    submission.phone
      ? adminRow("Phone / Mobile", submission.phone, `tel:${submission.phone.trim()}`)
      : "",
    submission.email
      ? adminRow("Email", submission.email, `mailto:${submission.email.trim()}`)
      : "",
    isInsurance && submission.medicalCondition
      ? adminRow("UHID / Details", submission.medicalCondition)
      : "",
    isInternational ? adminRow("Country", submission.country) : "",
    isInternational ? adminRow("Medical Condition", submission.medicalCondition) : "",
    submission.referenceId ? adminRow("Reference ID", submission.referenceId) : "",
    formattedDocuments.length > 0
      ? `<tr><td style="padding:9px 0;font-size:13px;font-weight:600;color:#64748b;width:150px;border-bottom:1px solid #f1f5f9;vertical-align:top;">Uploaded Reports</td><td style="padding:9px 0;font-size:13px;color:#1e293b;border-bottom:1px solid #f1f5f9;">${formattedDocuments
          .map(
            (doc) =>
              `<a href="${escapeHtml(doc.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-right:12px;color:#2563eb;text-decoration:underline;font-size:13px;">${escapeHtml(doc.name)}</a>`
          )
          .join("")}</td></tr>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;padding:24px 28px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;color:#1e293b;line-height:1.6;">
      <div style="border-bottom:1px solid #e2e8f0;padding-bottom:14px;margin-bottom:18px;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#dc2626;">Adhiparasakthi Hospitals (MAPIMS)</p>
        <h1 style="margin:4px 0 0;font-size:18px;font-weight:700;color:#0f172a;">
          ${isInternational ? (isCallback ? "International Patient Callback Request" : "International Patient Inquiry") : "New Website Query"}
        </h1>
      </div>

      ${
        isCallback
          ? `<div style="margin:0 0 18px;padding:10px 14px;background:#f8fafc;border-left:3px solid #dc2626;border-radius:4px;">
              <strong style="font-size:13px;color:#0f172a;">Callback Requested:</strong>
              <span style="font-size:13px;color:#475569;"> The patient has requested to be contacted by phone.</span>
            </div>`
          : ""
      }

      <table style="width:100%;border-collapse:collapse;font-size:13px;margin:0 0 16px;">
        <tbody>
          ${rows}
        </tbody>
      </table>

      ${
        cleanMessage
          ? `<div style="margin:16px 0;padding:12px 14px;background:#f8fafc;border:1px solid #f1f5f9;border-radius:6px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Message / Note</p>
              <p style="margin:0;font-size:13px;color:#334155;white-space:pre-wrap;line-height:1.6;">${escapeHtml(cleanMessage)}</p>
            </div>`
          : ""
      }

      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;font-size:12px;color:#94a3b8;">
        Submitted via MAPIMS Website • Reference ID: ${escapeHtml(submission.referenceId || submission.id)}
      </div>
    </div>
  `.trim();

  return { subject, text: textLines, html };
}

export async function notifyPatientOfInquiry(submission: FormSubmissionRecord) {
  const patientEmail = submission.email?.trim();
  if (!patientEmail) {
    return;
  }

  const isInsurance = submission.type === "insurance";
  const { subject, text, html } = buildInquiryConfirmationEmail(submission);

  await sendMail({
    to: patientEmail,
    subject,
    text,
    html,
    replyTo: isInsurance ? INSURANCE_CONTACT_EMAIL : HOSPITAL_CONTACT_EMAIL,
  });
}

export async function notifyHospitalOfInquiry(submission: FormSubmissionRecord) {
  const isInsurance = submission.type === "insurance";
  const notificationEmail = isInsurance
    ? process.env.INSURANCE_NOTIFICATION_EMAIL?.trim() || INSURANCE_CONTACT_EMAIL
    : process.env.INQUIRY_NOTIFICATION_EMAIL?.trim() || getHrNotificationEmail();
  if (!notificationEmail) {
    return;
  }

  const { subject, text, html } = buildHospitalInquiryEmail(submission);

  await sendMail({
    to: notificationEmail,
    subject,
    text,
    html,
    replyTo: submission.email?.trim() || undefined,
  });
}

export async function sendInsuranceReplyEmail({
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
    throw new Error("Patient inquiry does not have a recipient email address.");
  }

  const patientName = submission.name.trim();
  const subject =
    customSubject?.trim() || `Re: MAPIMS Insurance Desk Query - ${patientName}`;
  const insuranceEmail =
    process.env.INSURANCE_NOTIFICATION_EMAIL?.trim() || INSURANCE_CONTACT_EMAIL;
  const insurancePhone =
    process.env.INSURANCE_CONTACT_PHONE?.trim() ||
    process.env.NEXT_PUBLIC_INSURANCE_PHONE?.trim() ||
    "9499059970";
  const hospitalPhone =
    process.env.HOSPITAL_CONTACT_PHONE?.trim() || "+91 94990 59966";

  const cleanReply = replyMessage.trim();
  const cleanOriginal = submission.message?.trim() || "";

  const textLines = [
    `Dear ${patientName},`,
    "",
    cleanReply,
    "",
    "--------------------------------------------------",
    "ORIGINAL QUERY DETAILS:",
    `Patient Name: ${patientName}`,
    submission.medicalCondition
      ? `Patient UHID / Details: ${submission.medicalCondition}`
      : undefined,
    submission.phone ? `Contact Phone: ${submission.phone}` : undefined,
    cleanOriginal ? `Your Message:\n${cleanOriginal}` : undefined,
    "--------------------------------------------------",
    "",
    "Need further assistance?",
    `Direct Insurance Helpline: ${insurancePhone}`,
    `Insurance Desk Email: ${insuranceEmail}`,
    `Hospital General Phone: ${hospitalPhone}`,
    "",
    "Warm regards,",
    senderName ? `${senderName} (Insurance Desk)` : "Insurance Desk & TPA Cell",
    "Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research (MAPIMS)",
    "GST Road, Melmaruvathur, Tamil Nadu 603319",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;padding:0;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;color:#1e293b;line-height:1.6;">
      <!-- Header Banner -->
      <div style="background:linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);padding:24px 28px;color:#ffffff;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fecaca;">Melmaruvathur Adhiparasakthi Institute of Medical Sciences (MAPIMS)</p>
        <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;">
          Insurance Desk &amp; TPA Services
        </h1>
      </div>

      <div style="padding:28px;">
        <p style="margin:0 0 16px;font-size:15px;color:#0f172a;font-weight:600;">Dear ${escapeHtml(patientName)},</p>

        <!-- Response Body -->
        <div style="margin:0 0 24px;padding:18px 20px;background:#f8fafc;border-left:4px solid #dc2626;border-radius:6px;font-size:14px;color:#1e293b;line-height:1.7;white-space:pre-wrap;">${escapeHtml(cleanReply)}</div>

        <!-- Original Query Box -->
        <div style="margin:0 0 24px;padding:16px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#475569;">
            Your Original Inquiry
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#334155;">
            <tbody>
              ${
                submission.medicalCondition
                  ? `<tr><td style="padding:4px 0;width:140px;color:#64748b;font-weight:600;">UHID / Details:</td><td style="padding:4px 0;font-weight:600;color:#0f172a;">${escapeHtml(submission.medicalCondition)}</td></tr>`
                  : ""
              }
              ${
                submission.phone
                  ? `<tr><td style="padding:4px 0;width:140px;color:#64748b;font-weight:600;">Contact Phone:</td><td style="padding:4px 0;">${escapeHtml(submission.phone)}</td></tr>`
                  : ""
              }
              ${
                cleanOriginal
                  ? `<tr><td style="padding:4px 0;width:140px;color:#64748b;font-weight:600;vertical-align:top;">Query Message:</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(cleanOriginal)}</td></tr>`
                  : ""
              }
            </tbody>
          </table>
        </div>

        <!-- Contact Box -->
        <div style="margin:0 0 24px;padding:16px 20px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#991b1b;">
            Insurance Helpdesk Contact
          </p>
          <p style="margin:0;font-size:13px;color:#7f1d1d;line-height:1.6;">
            <strong>Direct Insurance Helpline:</strong> <a href="tel:${escapeHtml(insurancePhone)}" style="color:#dc2626;text-decoration:none;font-weight:700;">${escapeHtml(insurancePhone)}</a><br />
            <strong>Official Insurance Email:</strong> <a href="mailto:${escapeHtml(insuranceEmail)}" style="color:#dc2626;text-decoration:none;font-weight:700;">${escapeHtml(insuranceEmail)}</a><br />
            <strong>Hospital Main Line:</strong> ${escapeHtml(hospitalPhone)}
          </p>
        </div>

        <!-- Signature -->
        <div style="border-top:1px solid #e2e8f0;padding-top:16px;font-size:13px;color:#475569;line-height:1.6;">
          <p style="margin:0 0 4px;font-weight:700;color:#0f172a;">${senderName ? escapeHtml(senderName) : "Insurance Desk Coordinator"}</p>
          <p style="margin:0;color:#64748b;">
            Insurance &amp; TPA Services Helpdesk<br />
            Melmaruvathur Adhiparasakthi Institute of Medical Sciences and Research (MAPIMS)<br />
            GST Road, Melmaruvathur, Tamil Nadu 603319
          </p>
        </div>
      </div>
    </div>
  `.trim();

  const fromAddress = `"MAPIMS Insurance Desk" <${process.env.SMTP_USER || "Insurance@mapims.org"}>`;

  await sendMail({
    to: recipientEmail,
    from: fromAddress,
    replyTo: insuranceEmail,
    subject,
    text: textLines,
    html,
  });

  return { success: true };
}

