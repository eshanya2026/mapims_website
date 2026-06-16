import type { FormSubmissionRecord } from "@/lib/db/types";
import {
  applicationReferenceHtml,
  applicationReferenceText,
} from "@/lib/application-reference";
import { formTypeLabels } from "@/lib/form-type-labels";
import { getHrNotificationEmail, sendMail } from "@/lib/mail";
import { buildResumeAttachment } from "@/lib/resume-attachment";

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
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;vertical-align:top;width:140px;">${label}</td><td style="padding:8px 12px;color:#475569;">${safe}</td></tr>`;
}

function fieldLine(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  return `${label}: ${value.trim()}\n`;
}

function fieldParagraph(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  return `<p style="margin:8px 0 0;color:#475569;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value.trim())}</p>`;
}

function buildHrJobApplicationEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const position = submission.jobTitle?.trim() ?? "—";
  const email = submission.email?.trim() ?? "—";
  const phone = submission.phone?.trim() ?? "—";
  const referenceLines = applicationReferenceText(submission);
  const referenceHtml = applicationReferenceHtml(submission);

  const text = [
    "A new career application has been submitted through the MAPIMS Careers Portal.",
    "",
    referenceLines || undefined,
    referenceLines ? "" : undefined,
    `Candidate Name: ${name}`,
    `Position Applied: ${position}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    fieldLine("Current Location", submission.currentLocation),
    fieldLine("Qualification", submission.qualification),
    fieldLine("Total Experience", submission.totalExperience),
    fieldLine(
      "Medical Council Registration No.",
      submission.medicalCouncilRegistrationNo
    ),
    fieldLine("Notice Period", submission.noticePeriod),
    submission.message ? `Message:\n${submission.message.trim()}\n` : undefined,
    "",
    "Resume: attached to this email",
    "",
    "Please review the application and update the candidate status in the CMS.",
    "",
    "Regards,",
    "",
    "MAPIMS Careers Portal",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;color:#475569;">
        A new career application has been submitted through the MAPIMS Careers Portal.
      </p>
      ${referenceHtml}
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 8px;color:#475569;"><strong>Candidate Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px;color:#475569;"><strong>Position Applied:</strong> ${escapeHtml(position)}</p>
        <p style="margin:0 0 8px;color:#475569;">
          <strong>Email:</strong>
          <a href="mailto:${escapeHtml(email)}" style="color:#dc2626;text-decoration:none;">${escapeHtml(email)}</a>
        </p>
        <p style="margin:0 0 8px;color:#475569;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${fieldParagraph("Current Location", submission.currentLocation)}
        ${fieldParagraph("Qualification", submission.qualification)}
        ${fieldParagraph("Total Experience", submission.totalExperience)}
        ${fieldParagraph(
          "Medical Council Registration No.",
          submission.medicalCouncilRegistrationNo
        )}
        ${fieldParagraph("Notice Period", submission.noticePeriod)}
        ${submission.message?.trim()
          ? `<p style="margin:12px 0 0;color:#475569;white-space:pre-wrap;"><strong>Message:</strong><br />${escapeHtml(submission.message.trim())}</p>`
          : ""}
      </div>
      <p style="margin:0 0 16px;color:#475569;">Resume: attached to this email</p>
      <p style="margin:0 0 24px;color:#475569;">
        Please review the application and update the candidate status in the CMS.
      </p>
      <p style="margin:0;color:#475569;">
        Regards,<br /><br />
        <strong>MAPIMS Careers Portal</strong>
      </p>
    </div>
  `.trim();

  const subject = submission.referenceId
    ? `New career application ${submission.referenceId}: ${position} — ${name}`
    : `New career application: ${position} — ${name}`;

  return {
    subject,
    text,
    html,
    replyTo: submission.email ?? undefined,
  };
}

function buildHrEmailContent(submission: FormSubmissionRecord) {
  if (submission.type === "job_application") {
    return buildHrJobApplicationEmail(submission);
  }

  const typeLabel = formTypeLabels[submission.type] ?? submission.type;
  const rows: string[] = [];
  const lines: string[] = [`New ${typeLabel}`, ""];

  const referenceLines = applicationReferenceText(submission);
  if (referenceLines) {
    lines.push(referenceLines, "");
  }

  if (submission.referenceId) {
    rows.push(fieldRow("Reference No.", submission.referenceId));
  }

  rows.push(fieldRow("Name", submission.name));
  lines.push(fieldLine("Name", submission.name));

  if (submission.email) {
    rows.push(fieldRow("Email", submission.email));
    lines.push(fieldLine("Email", submission.email));
  }

  if (submission.phone) {
    rows.push(fieldRow("Phone", submission.phone));
    lines.push(fieldLine("Phone", submission.phone));
  }

  if (submission.message) {
    rows.push(
      `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;vertical-align:top;">Message</td><td style="padding:8px 12px;color:#475569;white-space:pre-wrap;">${escapeHtml(submission.message)}</td></tr>`
    );
    lines.push(`Message:\n${submission.message}\n`);
  }

  const subject = `New ${typeLabel}: ${submission.name}`;

  const referenceBlock = applicationReferenceHtml(submission);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${escapeHtml(typeLabel)}</h2>
      <p style="margin:0 0 16px;color:#64748b;">A new form submission was received on the MAPIMS website.</p>
      ${referenceBlock}
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>
  `.trim();

  return {
    subject,
    text: lines.join("\n").trim(),
    html,
    replyTo: submission.email ?? undefined,
  };
}

const HR_CONTACT_EMAIL = "contact@mapims.online";
const HR_CONTACT_PHONE = "+91 94990 59959";

function buildCandidateConfirmationEmail(submission: FormSubmissionRecord) {
  const name = submission.name.trim();
  const role = submission.jobTitle?.trim() ?? "the role you applied for";

  const text = [
    `Dear ${name},`,
    "",
    `Thank you for applying for the position of ${role} at Adhiparasakthi Hospitals (MAPIMS).`,
    "",
    "We have successfully received your application and our recruitment team will review your profile carefully.",
    "",
    "If your qualifications and experience match our requirements, we will contact you regarding the next stage of the recruitment process.",
    "",
    "We appreciate your interest in joining MAPIMS and wish you the very best.",
    "",
    "HR Contact",
    `Email: ${HR_CONTACT_EMAIL}`,
    `Phone: ${HR_CONTACT_PHONE}`,
    "",
    "Regards,",
    "Human Resources",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;color:#475569;">
        Thank you for applying for the position of
        <strong>${escapeHtml(role)}</strong> at Adhiparasakthi Hospitals (MAPIMS).
      </p>
      <p style="margin:0 0 16px;color:#475569;">
        We have successfully received your application and our recruitment team will review your profile carefully.
      </p>
      <p style="margin:0 0 16px;color:#475569;">
        If your qualifications and experience match our requirements, we will contact you regarding the next stage of the recruitment process.
      </p>
      <p style="margin:0 0 20px;color:#475569;">
        We appreciate your interest in joining MAPIMS and wish you the very best.
      </p>
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">HR Contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${HR_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${HR_CONTACT_EMAIL}</a><br />
          Phone: ${HR_CONTACT_PHONE}
        </p>
      </div>
      <p style="margin:0;color:#475569;line-height:1.6;">
        Regards,<br />
        Human Resources<br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = `MAPIMS — Application received for ${role}`;

  return { subject, text, html };
}

export async function notifyHrOfFormSubmission(submission: FormSubmissionRecord) {
  if (submission.type !== "job_application") {
    return;
  }

  const { subject, text, html, replyTo } = buildHrEmailContent(submission);

  const attachments =
    submission.type === "job_application" && submission.resumeUrl
      ? [await buildResumeAttachment(submission.resumeUrl, submission.name)].filter(
          (item): item is NonNullable<typeof item> => item !== null
        )
      : [];

  await sendMail({
    to: getHrNotificationEmail(),
    subject,
    text,
    html,
    replyTo,
    attachments: attachments.length > 0 ? attachments : undefined,
  });
}

export async function notifyCandidateOfJobApplication(submission: FormSubmissionRecord) {
  if (submission.type !== "job_application") {
    return;
  }

  const candidateEmail = submission.email?.trim();
  if (!candidateEmail) {
    return;
  }

  const { subject, text, html } = buildCandidateConfirmationEmail(submission);

  await sendMail({
    to: candidateEmail,
    subject,
    text,
    html,
    replyTo: getHrNotificationEmail(),
  });
}
