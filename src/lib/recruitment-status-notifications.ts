import type { FormSubmissionRecord } from "@/lib/db/types";
import {
  applicationReferenceHtml,
  applicationReferenceText,
} from "@/lib/application-reference";
import { formatDisplayDateLong } from "@/lib/format-display-date";
import { getHrNotificationEmail, getSiteUrl, sendMail } from "@/lib/mail";
import { isRecruitmentInquiry, isRecruitmentStatus } from "@/lib/inquiry-status";

const HR_CONTACT_EMAIL = "contact@mapims.online";
const HR_CONTACT_PHONE = "+91 94990 59959";

type StatusEmailContent = {
  subject: string;
  headline: string;
  body: string;
  textBody?: string;
  htmlBody?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function applicationLabel(inquiry: FormSubmissionRecord) {
  if (inquiry.type === "job_application" && inquiry.jobTitle) {
    return inquiry.jobTitle;
  }
  return "your application at MAPIMS";
}

function formatInterviewDate(value: Date | null) {
  if (!value) return "";
  return formatDisplayDateLong(value);
}

function formatInterviewMode(mode: FormSubmissionRecord["interviewMode"]) {
  if (mode === "online") return "Online";
  if (mode === "offline") return "Offline";
  return "";
}

function formatInterviewTimeDisplay(time: string | null) {
  if (!time?.trim()) return "";

  const match = time.trim().match(/^(\d{1,2}):(\d{2})/);
  if (!match) return time.trim();

  let hours = Number.parseInt(match[1], 10);
  const minutes = match[2];
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
}

function interviewDetailLines(inquiry: FormSubmissionRecord) {
  const lines: string[] = [];

  const date = formatInterviewDate(inquiry.interviewDate);
  if (date) lines.push(`Date: ${date}`);

  const time = formatInterviewTimeDisplay(inquiry.interviewTime);
  if (time) lines.push(`Time: ${time}`);

  if (inquiry.interviewInterviewer) {
    lines.push(`Interviewer: ${inquiry.interviewInterviewer}`);
  }

  const mode = formatInterviewMode(inquiry.interviewMode);
  if (mode) lines.push(`Mode: ${mode}`);

  return lines;
}

function interviewScheduledEmailContent(inquiry: FormSubmissionRecord): StatusEmailContent {
  const name = inquiry.name.trim();
  const role = applicationLabel(inquiry);
  const referenceLines = applicationReferenceText(inquiry);
  const detailLines = interviewDetailLines(inquiry);

  const text = [
    `Dear ${name},`,
    "",
    `We are pleased to inform you that your interview for the position of ${role} at MAPIMS has been scheduled.`,
    "",
    referenceLines || undefined,
    referenceLines ? "" : undefined,
    "Interview Details",
    "",
    ...detailLines,
    "",
    "Please be available at the scheduled time and keep your phone and email accessible for any updates regarding the interview.",
    "",
    "If you have any questions or require assistance, please contact our HR team.",
    "",
    "We look forward to speaking with you.",
    "",
    "Regards,",
    "",
    "Human Resources",
    "MAPIMS Hospital",
    `Email: ${HR_CONTACT_EMAIL}`,
    `Phone: ${HR_CONTACT_PHONE}`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const detailRowsHtml = detailLines
    .map((line) => {
      const separator = line.indexOf(": ");
      if (separator === -1) return "";
      const label = line.slice(0, separator);
      const value = line.slice(separator + 2);
      return `<p style="margin:0 0 8px;color:#475569;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
    })
    .join("");

  const referenceHtml = applicationReferenceHtml(inquiry);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 20px;color:#475569;">
        We are pleased to inform you that your interview for the position of
        <strong>${escapeHtml(role)}</strong> at MAPIMS has been scheduled.
      </p>
      ${referenceHtml}
      <div style="margin:0 0 24px;padding:16px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0c4a6e;">Interview Details</p>
        ${detailRowsHtml || `<p style="margin:0;color:#475569;">Our HR team will share the interview schedule with you shortly.</p>`}
      </div>
      <p style="margin:0 0 16px;color:#475569;">
        Please be available at the scheduled time and keep your phone and email accessible for any updates regarding the interview.
      </p>
      <p style="margin:0 0 16px;color:#475569;">
        If you have any questions or require assistance, please contact our HR team.
      </p>
      <p style="margin:0 0 24px;color:#475569;">
        We look forward to speaking with you.
      </p>
      <p style="margin:0;color:#475569;">
        Regards,<br /><br />
        <strong>Human Resources</strong><br />
        MAPIMS Hospital<br />
        Email: <a href="mailto:${HR_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${HR_CONTACT_EMAIL}</a><br />
        Phone: ${HR_CONTACT_PHONE}
      </p>
    </div>
  `.trim();

  const subject = inquiry.referenceId
    ? `MAPIMS — Interview scheduled (${inquiry.referenceId})`
    : "MAPIMS — Interview scheduled";

  return {
    subject,
    headline: "Interview scheduled",
    body: `Your interview for ${escapeHtml(role)} at MAPIMS has been scheduled.`,
    textBody: text,
    htmlBody: html,
  };
}

function shortlistedEmailContent(inquiry: FormSubmissionRecord): StatusEmailContent {
  const name = inquiry.name.trim();
  const role = applicationLabel(inquiry);
  const referenceLines = applicationReferenceText(inquiry);

  const text = [
    `Dear ${name},`,
    "",
    `We are pleased to inform you that you have been shortlisted for the position of ${role} at Adhiparasakthi Hospitals (MAPIMS).`,
    "",
    "Your application has been reviewed successfully, and our HR team will contact you shortly regarding the next stage of the recruitment process.",
    referenceLines ? "" : undefined,
    referenceLines || undefined,
    "",
    "HR Contact",
    "",
    `Email: ${HR_CONTACT_EMAIL}`,
    `Phone: ${HR_CONTACT_PHONE}`,
    "",
    "Thank you for your interest in joining MAPIMS.",
    "",
    "Regards,",
    "",
    "Human Resources",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const referenceHtml = applicationReferenceHtml(inquiry);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;color:#475569;">
        We are pleased to inform you that you have been shortlisted for the position of
        <strong>${escapeHtml(role)}</strong> at Adhiparasakthi Hospitals (MAPIMS).
      </p>
      <p style="margin:0 0 20px;color:#475569;">
        Your application has been reviewed successfully, and our HR team will contact you shortly regarding the next stage of the recruitment process.
      </p>
      ${referenceHtml}
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">HR Contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${HR_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${HR_CONTACT_EMAIL}</a><br />
          Phone: ${HR_CONTACT_PHONE}
        </p>
      </div>
      <p style="margin:0 0 24px;color:#475569;">
        Thank you for your interest in joining MAPIMS.
      </p>
      <p style="margin:0;color:#475569;">
        Regards,<br /><br />
        <strong>Human Resources</strong><br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = inquiry.referenceId
    ? `MAPIMS — You've been shortlisted (${inquiry.referenceId})`
    : "MAPIMS — You've been shortlisted";

  return {
    subject,
    headline: "You've been shortlisted",
    body: `You have been shortlisted for ${escapeHtml(role)} at MAPIMS.`,
    textBody: text,
    htmlBody: html,
  };
}

function selectedEmailContent(inquiry: FormSubmissionRecord): StatusEmailContent {
  const name = inquiry.name.trim();
  const role = applicationLabel(inquiry);
  const referenceLines = applicationReferenceText(inquiry);

  const text = [
    `Dear ${name},`,
    "",
    "Congratulations!",
    "",
    `We are pleased to inform you that you have been selected for the position of ${role} at Adhiparasakthi Hospitals (MAPIMS).`,
    "",
    "Our HR team will contact you shortly regarding offer documentation, onboarding requirements, and joining formalities.",
    referenceLines ? "" : undefined,
    referenceLines || undefined,
    "",
    "HR Contact",
    "",
    `Email: ${HR_CONTACT_EMAIL}`,
    `Phone: ${HR_CONTACT_PHONE}`,
    "",
    "We look forward to welcoming you to the MAPIMS family.",
    "",
    "Regards,",
    "",
    "Human Resources",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const referenceHtml = applicationReferenceHtml(inquiry);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#0f172a;">Congratulations!</p>
      <p style="margin:0 0 16px;color:#475569;">
        We are pleased to inform you that you have been selected for the position of
        <strong>${escapeHtml(role)}</strong> at Adhiparasakthi Hospitals (MAPIMS).
      </p>
      <p style="margin:0 0 20px;color:#475569;">
        Our HR team will contact you shortly regarding offer documentation, onboarding requirements, and joining formalities.
      </p>
      ${referenceHtml}
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">HR Contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${HR_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${HR_CONTACT_EMAIL}</a><br />
          Phone: ${HR_CONTACT_PHONE}
        </p>
      </div>
      <p style="margin:0 0 24px;color:#475569;">
        We look forward to welcoming you to the MAPIMS family.
      </p>
      <p style="margin:0;color:#475569;">
        Regards,<br /><br />
        <strong>Human Resources</strong><br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = inquiry.referenceId
    ? `MAPIMS — Congratulations! You have been selected (${inquiry.referenceId})`
    : "MAPIMS — Congratulations! You have been selected";

  return {
    subject,
    headline: "Congratulations!",
    body: `You have been selected for ${escapeHtml(role)} at MAPIMS.`,
    textBody: text,
    htmlBody: html,
  };
}

function rejectedEmailContent(inquiry: FormSubmissionRecord): StatusEmailContent {
  const name = inquiry.name.trim();
  const role = applicationLabel(inquiry);
  const referenceLines = applicationReferenceText(inquiry);

  const text = [
    `Dear ${name},`,
    "",
    `Thank you for your interest in the position of ${role} at Adhiparasakthi Hospitals (MAPIMS).`,
    "",
    "After careful consideration, we regret to inform you that you have not been selected for this position at this time.",
    "",
    "We sincerely appreciate the time and effort you invested in the application and interview process. Your qualifications and experience were reviewed thoroughly, and this decision was made after careful evaluation of all candidates.",
    "",
    "We encourage you to apply for future opportunities that match your skills and experience. We wish you success in your professional career and future endeavors.",
    referenceLines ? "" : undefined,
    referenceLines || undefined,
    "",
    "HR Contact",
    "",
    `Email: ${HR_CONTACT_EMAIL}`,
    `Phone: ${HR_CONTACT_PHONE}`,
    "",
    "Thank you for considering MAPIMS as a potential employer.",
    "",
    "Regards,",
    "",
    "Human Resources",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const referenceHtml = applicationReferenceHtml(inquiry);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 20px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;color:#475569;">
        Thank you for your interest in the position of
        <strong>${escapeHtml(role)}</strong> at Adhiparasakthi Hospitals (MAPIMS).
      </p>
      <p style="margin:0 0 16px;color:#475569;">
        After careful consideration, we regret to inform you that you have not been selected for this position at this time.
      </p>
      <p style="margin:0 0 16px;color:#475569;">
        We sincerely appreciate the time and effort you invested in the application and interview process. Your qualifications and experience were reviewed thoroughly, and this decision was made after careful evaluation of all candidates.
      </p>
      <p style="margin:0 0 20px;color:#475569;">
        We encourage you to apply for future opportunities that match your skills and experience. We wish you success in your professional career and future endeavors.
      </p>
      ${referenceHtml}
      <div style="margin:0 0 24px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">HR Contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${HR_CONTACT_EMAIL}" style="color:#dc2626;text-decoration:none;">${HR_CONTACT_EMAIL}</a><br />
          Phone: ${HR_CONTACT_PHONE}
        </p>
      </div>
      <p style="margin:0 0 24px;color:#475569;">
        Thank you for considering MAPIMS as a potential employer.
      </p>
      <p style="margin:0;color:#475569;">
        Regards,<br /><br />
        <strong>Human Resources</strong><br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  const subject = inquiry.referenceId
    ? `MAPIMS — Update on your application (${inquiry.referenceId})`
    : "MAPIMS — Update on your application";

  return {
    subject,
    headline: "Application update",
    body: `Update on your application for ${escapeHtml(role)} at MAPIMS.`,
    textBody: text,
    htmlBody: html,
  };
}

function getStatusEmailContent(
  inquiry: FormSubmissionRecord,
  status: string
): StatusEmailContent | null {
  const role = applicationLabel(inquiry);

  switch (status) {
    case "screening":
      return {
        subject: `MAPIMS — Your application is under screening`,
        headline: "Application under screening",
        body: `Thank you for your interest in MAPIMS. Your application for <strong>${escapeHtml(role)}</strong> is now under screening. Our HR team is reviewing your profile and will update you on the next steps.`,
      };
    case "shortlisted":
      return shortlistedEmailContent(inquiry);
    case "interview_scheduled":
      return interviewScheduledEmailContent(inquiry);
    case "selected":
      return selectedEmailContent(inquiry);
    case "joined":
      return {
        subject: `MAPIMS — Welcome to the team`,
        headline: "Welcome to MAPIMS",
        body: `Welcome aboard! We are delighted that you have <strong>joined</strong> MAPIMS as part of our team for <strong>${escapeHtml(role)}</strong>. We look forward to working with you.`,
      };
    case "rejected":
      return rejectedEmailContent(inquiry);
    default:
      return null;
  }
}

function buildCandidateEmail(
  inquiry: FormSubmissionRecord,
  content: StatusEmailContent
) {
  if (content.htmlBody && content.textBody) {
    return {
      subject: content.subject,
      text: content.textBody,
      html: content.htmlBody,
    };
  }

  const name = escapeHtml(inquiry.name.trim());
  const careersUrl = `${getSiteUrl()}/careers`;
  const referenceText = applicationReferenceText(inquiry);
  const referenceHtml = applicationReferenceHtml(inquiry);

  const text = [
    `Dear ${inquiry.name.trim()},`,
    "",
    content.headline,
    "",
    referenceText || undefined,
    "",
    content.textBody ?? content.body.replace(/<[^>]+>/g, ""),
    "",
    `HR contact: ${HR_CONTACT_EMAIL}`,
    `Phone: ${HR_CONTACT_PHONE}`,
    "",
    "When contacting HR, please quote your Application ID.",
    "",
    "Adhiparasakthi Hospitals (MAPIMS)",
    careersUrl,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.6;">
      <div style="border-bottom:3px solid #dc2626;padding-bottom:16px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;font-weight:600;color:#dc2626;text-transform:uppercase;letter-spacing:0.05em;">MAPIMS Careers</p>
        <h1 style="margin:8px 0 0;font-size:22px;color:#0f172a;">${escapeHtml(content.headline)}</h1>
      </div>
      <p style="margin:0 0 16px;">Dear ${name},</p>
      ${referenceHtml}
      <p style="margin:0 0 16px;color:#475569;">${content.body}</p>
      <div style="margin:24px 0;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#334155;">HR contact</p>
        <p style="margin:0;color:#475569;">
          Email: <a href="mailto:${HR_CONTACT_EMAIL}" style="color:#dc2626;">${HR_CONTACT_EMAIL}</a><br />
          Phone: ${HR_CONTACT_PHONE}
        </p>
        <p style="margin:12px 0 0;font-size:13px;color:#64748b;">
          When you contact HR, please quote your Application ID.
        </p>
      </div>
      <p style="margin:0;color:#64748b;font-size:13px;">
        Adhiparasakthi Hospitals (MAPIMS)<br />
        <a href="${careersUrl}" style="color:#dc2626;">View careers</a>
      </p>
    </div>
  `.trim();

  return { subject: content.subject, text, html };
}

export async function notifyCandidateOfRecruitmentStatusChange(
  inquiry: FormSubmissionRecord,
  previousStatus: string,
  nextStatus: string,
  options?: { sendEmail?: boolean }
) {
  if (options?.sendEmail === false) {
    console.info(
      `[recruitment-status-notifications] skipped email for ${inquiry.id} (${nextStatus})`
    );
    return;
  }
  if (!isRecruitmentInquiry(inquiry.type)) {
    console.warn("[recruitment-status-notifications] skipped: not a recruitment inquiry");
    return;
  }

  const candidateEmail = inquiry.email?.trim();
  if (!candidateEmail) {
    console.warn(
      `[recruitment-status-notifications] skipped: no email for inquiry ${inquiry.id}`
    );
    return;
  }

  if (previousStatus === nextStatus) {
    console.warn(
      `[recruitment-status-notifications] skipped: status unchanged (${nextStatus})`
    );
    return;
  }

  if (!isRecruitmentStatus(nextStatus) || nextStatus === "new") {
    console.warn(
      `[recruitment-status-notifications] skipped: invalid target status (${nextStatus})`
    );
    return;
  }

  const content = getStatusEmailContent(inquiry, nextStatus);
  if (!content) return;

  const { subject, text, html } = buildCandidateEmail(inquiry, content);

  await sendMail({
    to: candidateEmail,
    subject,
    text,
    html,
    replyTo: getHrNotificationEmail(),
  });

  console.info(
    `[recruitment-status-notifications] sent "${nextStatus}" email to ${candidateEmail}`
  );
}
