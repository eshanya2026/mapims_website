import type { BlogSection } from "@/data/blog-posts";
import type { PostRecord } from "@/lib/db/types";
import { listActiveNewsletterSubscriberEmails } from "@/lib/db/newsletter-subscribers";
import {
  getHrNotificationEmail,
  isMailConfigured,
  sendMail,
} from "@/lib/mail";
import { buildPromoNewsletterEmail } from "@/lib/newsletter-promo-email";
import { buildNewsletterListHeaders } from "@/lib/newsletter-token";

const NEWSLETTER_SECTIONS = new Set<BlogSection>([
  "hospital-news",
  "hospital-events",
]);

type PublishedPost = Pick<
  PostRecord,
  "slug" | "title" | "excerpt" | "section" | "category" | "image" | "publishedAt"
>;

export function shouldAnnouncePostToNewsletter(section: string) {
  return NEWSLETTER_SECTIONS.has(section as BlogSection);
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

  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    const { subject, text, html } = buildPromoNewsletterEmail(post, email);

    try {
      await sendMail({
        to: email,
        subject,
        text,
        html,
        replyTo: getHrNotificationEmail(),
        headers: buildNewsletterListHeaders(email),
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
