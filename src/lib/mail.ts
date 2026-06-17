import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

const DEFAULT_HR_EMAIL = "shreytech26@gmail.com";

type SendMailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
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

export function getSiteUrl() {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const netlify = process.env.URL?.trim() || process.env.DEPLOY_PRIME_URL?.trim();
  if (netlify) return netlify.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3001";
}

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

function getMailFrom() {
  const from = process.env.SMTP_FROM?.trim();
  if (from) return from;
  return `"MAPIMS Hospital" <${process.env.SMTP_USER}>`;
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
    from: getMailFrom(),
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
