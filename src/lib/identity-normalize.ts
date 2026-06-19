/** Last 10 digits for Indian mobiles; full digits otherwise. */
export function normalizePhoneForMatch(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return digits;
}

export function normalizeEmailForMatch(email: string): string {
  return email.trim().toLowerCase();
}

export function phoneLookupVariants(phone: string): string[] {
  const normalized = normalizePhoneForMatch(phone);
  if (!normalized) return [];

  const variants = new Set([
    normalized,
    `+91${normalized}`,
    `91${normalized}`,
    `0${normalized}`,
    `+91 ${normalized.slice(0, 5)} ${normalized.slice(5)}`,
  ]);

  return [...variants];
}
