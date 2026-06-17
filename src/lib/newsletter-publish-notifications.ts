import type { BlogSection } from "@/data/blog-posts";
import { blogSections } from "@/data/blog-posts";
import type { PostRecord } from "@/lib/db/types";
import { listActiveNewsletterSubscriberEmails } from "@/lib/db/newsletter-subscribers";
import {
  getHrNotificationEmail,
  isMailConfigured,
  sendMail,
  toAbsoluteUrl,
} from "@/lib/mail";

const NEWSLETTER_SECTIONS = new Set<BlogSection>([
  "hospital-news",
  "hospital-events",
]);

type PublishedPost = Pick<
  PostRecord,
  "slug" | "title" | "excerpt" | "section" | "category"
>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function shouldAnnouncePostToNewsletter(section: string) {
  return NEWSLETTER_SECTIONS.has(section as BlogSection);
}

function sectionLabel(section: string) {
  return blogSections.find((item) => item.slug === section)?.label ?? "Update";
}

function emailSubject(post: PublishedPost) {
  const label = sectionLabel(post.section);
  return `MAPIMS — ${label}: ${post.title}`;
}

function buildPublishedPostEmail(post: PublishedPost) {
  const label = sectionLabel(post.section);
  const articleUrl = toAbsoluteUrl(`/blog/${post.slug}`);

  const text = [
    `A new ${label.toLowerCase()} update from Adhiparasakthi Hospitals (MAPIMS).`,
    "",
    post.title,
    "",
    post.excerpt,
    "",
    `Read more: ${articleUrl}`,
    "",
    "Regards,",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#dc2626;text-transform:uppercase;letter-spacing:0.05em;">
        ${escapeHtml(label)}
      </p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0f172a;">
        ${escapeHtml(post.title)}
      </h1>
      <p style="margin:0 0 24px;color:#475569;">${escapeHtml(post.excerpt)}</p>
      <p style="margin:0 0 24px;">
        <a href="${articleUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px;">
          Read full update
        </a>
      </p>
      <p style="margin:0;color:#64748b;font-size:13px;">
        You are receiving this because you subscribed to MAPIMS updates.
      </p>
    </div>
  `.trim();

  return { subject: emailSubject(post), text, html };
}

export async function notifySubscribersOfPublishedPost(post: PublishedPost) {
  if (!shouldAnnouncePostToNewsletter(post.section)) {
    return { sent: 0, failed: 0, skipped: true };
  }

  if (!isMailConfigured()) {
    console.warn(
      "[newsletter] SMTP not configured — skipped publish announcement emails"
    );
    return { sent: 0, failed: 0, skipped: true };
  }

  const emails = await listActiveNewsletterSubscriberEmails();
  if (emails.length === 0) {
    return { sent: 0, failed: 0, skipped: false };
  }

  const { subject, text, html } = buildPublishedPostEmail(post);
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      await sendMail({
        to: email,
        subject,
        text,
        html,
        replyTo: getHrNotificationEmail(),
      });
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error(
        `[newsletter] publish announcement failed for ${email}:`,
        error
      );
    }
  }

  console.info(
    `[newsletter] publish announcement for "${post.slug}": sent=${sent}, failed=${failed}`
  );

  return { sent, failed, skipped: false };
}
