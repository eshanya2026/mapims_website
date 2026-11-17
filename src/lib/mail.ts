import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

const DEFAULT_HR_EMAIL = "shreytech26@gmail.com";

type SendMailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: Attachment[];
  headers?: Record<string, string>;
};

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function isMailConfigured() {
  return isSmtpConfigured();
}

export function getHrNotificationEmail() {
  return process.env.HR_NOTIFICATION_EMAIL?.trim() || DEFAULT_HR_EMAIL;
}

function isLocalhostUrl(url: string) {
  try {
    const parsed = new URL(url.includes("://") ? url : `http://${url}`);
    const host = parsed.hostname.toLowerCase();
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host.endsWith(".local")
    );
  } catch {
    return false;
  }
}

function normalizeSiteUrl(url: string) {
  const trimmed = url.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getSiteUrl() {
  // 1. Explicit deployed / production site URL override
  const deployed =
    process.env.DEPLOYED_SITE_URL?.trim() ||
    process.env.PRODUCTION_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (deployed && !isLocalhostUrl(deployed)) {
    return normalizeSiteUrl(deployed);
  }

  // 2. Hosting platform production URLs (Vercel, Netlify)
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionUrl) {
    return normalizeSiteUrl(productionUrl);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  const netlify = process.env.URL?.trim() || process.env.DEPLOY_PRIME_URL?.trim();
  if (netlify) {
    return normalizeSiteUrl(netlify);
  }

  // 3. Explicit SITE_URL (only if it is a real public / non-localhost URL)
  const explicit = process.env.SITE_URL?.trim();
  if (explicit && !isLocalhostUrl(explicit)) {
    return normalizeSiteUrl(explicit);
  }

  // 4. Default fallback for outgoing emails / notifications:
  // Outgoing emails to patients and subscribers must NEVER contain dead localhost links.
  return "https://adhiparasakthihospitals.com";
}

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

function getMailFrom() {
  const from = process.env.SMTP_FROM?.trim();
  if (from) return from;
  return `"MAPIMS Hospitals" <${process.env.SMTP_USER}>`;
}

export async function sendMail(options: SendMailOptions) {
  if (!isSmtpConfigured()) {
    const message = `[mail] SMTP not configured — cannot send email to ${options.to}`;
    console.warn(message);
    throw new Error(message);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: options.from || getMailFrom(),
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
    headers: options.headers,
  });

  return true;
}
