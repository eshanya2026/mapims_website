export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload/resume", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Unable to upload your resume."
    );
  }

  if (typeof data.url !== "string" || !data.url) {
    throw new Error("Unable to upload your resume.");
  }

  return data.url as string;
}
