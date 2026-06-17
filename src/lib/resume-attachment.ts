import { readFile } from "fs/promises";
import path from "path";
import type { Attachment } from "nodemailer/lib/mailer";

const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function sanitizeFilename(value: string) {
  return value.replace(/[^\w.-]+/g, "_").replace(/^_+|_+$/g, "") || "applicant";
}

function resumeUrlToLocalPath(resumeUrl: string) {
  const pathname = resumeUrl.startsWith("http")
    ? new URL(resumeUrl).pathname
    : resumeUrl;

  const normalized = pathname.replace(/^\/+/, "");
  if (!normalized.startsWith("uploads/resumes/")) {
    return null;
  }

  const absolute = path.join(process.cwd(), "public", normalized);
  const resumesRoot = path.join(process.cwd(), "public", "uploads", "resumes");
  const resolved = path.resolve(absolute);

  if (!resolved.startsWith(resumesRoot)) {
    return null;
  }

  return resolved;
}

export async function buildResumeAttachment(
  resumeUrl: string,
  applicantName: string
): Promise<Attachment | null> {
  const extFromUrl = path.extname(resumeUrl).slice(1).toLowerCase();
  const safeName = sanitizeFilename(applicantName);
  const filename = `${safeName}-resume.${extFromUrl || "pdf"}`;

  if (resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://")) {
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) return null;
      const content = Buffer.from(await response.arrayBuffer());
      return {
        filename,
        content,
        contentType:
          response.headers.get("content-type") ??
          MIME_BY_EXT[extFromUrl] ??
          "application/octet-stream",
      };
    } catch (error) {
      console.error("[resume-attachment] Unable to fetch remote resume:", error);
      return null;
    }
  }

  const localPath = resumeUrlToLocalPath(resumeUrl);
  if (!localPath) return null;

  try {
    const content = await readFile(localPath);
    const ext = path.extname(localPath).slice(1).toLowerCase();

    return {
      filename,
      content,
      contentType: MIME_BY_EXT[ext] ?? "application/octet-stream",
    };
  } catch (error) {
    console.error("[resume-attachment] Unable to read resume file:", error);
    return null;
  }
}
