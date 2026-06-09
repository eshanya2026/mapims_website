const inFlightSubmissions = new Map<string, Promise<unknown>>();

function submissionKey(payload: Record<string, unknown>) {
  return JSON.stringify(payload);
}

export async function submitForm(payload: Record<string, unknown>) {
  const key = submissionKey(payload);
  const existing = inFlightSubmissions.get(key);
  if (existing) {
    return existing;
  }

  const promise = (async () => {
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        typeof data.error === "string"
          ? data.error
          : "Unable to submit the form. Please try again."
      );
    }

    return data;
  })();

  inFlightSubmissions.set(key, promise);

  try {
    return await promise;
  } finally {
    if (inFlightSubmissions.get(key) === promise) {
      inFlightSubmissions.delete(key);
    }
  }
}
