import type { FormSubmissionRecord } from "@/lib/db/types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function referenceItems(
  submission: Pick<FormSubmissionRecord, "referenceId" | "jobTitle">
) {
  const items: Array<{ label: string; value: string }> = [];

  if (submission.referenceId) {
    items.push({ label: "Reference No.", value: submission.referenceId });
  }
  if (submission.jobTitle) {
    items.push({ label: "Position", value: submission.jobTitle });
  }

  return items;
}

export function formatApplicationReferenceLines(
  submission: Pick<FormSubmissionRecord, "referenceId" | "jobTitle">
) {
  return referenceItems(submission).map((item) => `${item.label}: ${item.value}`);
}

export function applicationReferenceText(
  submission: Pick<FormSubmissionRecord, "referenceId" | "jobTitle">
) {
  return formatApplicationReferenceLines(submission).join("\n");
}

export function applicationReferenceHtml(
  submission: Pick<FormSubmissionRecord, "referenceId" | "jobTitle">
) {
  const items = referenceItems(submission);
  if (items.length === 0) return "";

  return `
    <div style="margin:0 0 16px;padding:14px 16px;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;">
      ${items
        .map(
          (item) =>
            `<p style="margin:0 0 4px;font-size:14px;color:#7f1d1d;"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</p>`
        )
        .join("")}
    </div>
  `.trim();
}
