import { createHmac, timingSafeEqual } from "crypto";

import { toAbsoluteUrl } from "@/lib/mail";

function getNewsletterSecret() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  return secret;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function signPayload(payload: string) {
  return createHmac("sha256", getNewsletterSecret())
    .update(`newsletter:${payload}`)
    .digest("base64url");
}

export function createNewsletterSubscriberToken(email: string) {
  const normalized = normalizeEmail(email);
  const payload = Buffer.from(normalized, "utf8").toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

export function verifyNewsletterSubscriberToken(token: string): string | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = signPayload(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    return normalizeEmail(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function newsletterPreferencesUrl(email: string) {
  return toAbsoluteUrl(
    `/newsletter/preferences?token=${encodeURIComponent(createNewsletterSubscriberToken(email))}`
  );
}

export function newsletterUnsubscribeUrl(email: string) {
  return toAbsoluteUrl(
    `/newsletter/unsubscribe?token=${encodeURIComponent(createNewsletterSubscriberToken(email))}`
  );
}

export function newsletterOneClickUnsubscribeUrl(email: string) {
  return toAbsoluteUrl(
    `/api/newsletter/unsubscribe?token=${encodeURIComponent(createNewsletterSubscriberToken(email))}`
  );
}

const NEWSLETTER_CONTACT_EMAIL = "contact@mapims.edu.in";

export function buildNewsletterListHeaders(email: string) {
  const oneClickUrl = newsletterOneClickUnsubscribeUrl(email);
  const mailto = `mailto:${NEWSLETTER_CONTACT_EMAIL}?subject=${encodeURIComponent("Unsubscribe MAPIMS Newsletter")}`;

  return {
    "List-Unsubscribe": `<${oneClickUrl}>, <${mailto}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    "List-ID": "mapims-hospital-news.mapims.edu.in",
  };
}
