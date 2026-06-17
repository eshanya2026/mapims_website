export const INTERNATIONAL_DOCUMENT_MAX_FILES = 10;
export const INTERNATIONAL_DOCUMENT_MAX_SIZE = 10 * 1024 * 1024;

const BLOCKED_EXTENSIONS = new Set([
  "exe",
  "bat",
  "cmd",
  "com",
  "msi",
  "scr",
  "vbs",
  "ps1",
  "sh",
  "dll",
]);

export function getFileExtension(filename: string) {
  const parts = filename.trim().split(".");
  if (parts.length < 2) return "";
  return (parts.pop() ?? "").toLowerCase();
}

export function validateInternationalDocument(file: File) {
  const name = file.name.trim();
  if (!name) {
    return "Please choose a file to upload.";
  }

  const ext = getFileExtension(name);
  if (BLOCKED_EXTENSIONS.has(ext)) {
    return "This file type is not allowed for security reasons.";
  }

  if (file.size > INTERNATIONAL_DOCUMENT_MAX_SIZE) {
    return "Each file must be 10MB or smaller.";
  }

  if (file.size === 0) {
    return "The selected file is empty.";
  }

  return "";
}

export async function uploadInternationalDocument(file: File) {
  const validationError = validateInternationalDocument(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload/international-documents", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string"
        ? data.error
        : "Unable to upload your document."
    );
  }

  if (typeof data.url !== "string" || !data.url) {
    throw new Error("Unable to upload your document.");
  }

  return data.url as string;
}
