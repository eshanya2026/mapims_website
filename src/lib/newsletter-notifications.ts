import { getHrNotificationEmail, getSiteUrl, sendMail } from "@/lib/mail";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifySubscriberOfNewsletterSignup(email: string) {
  const siteUrl = getSiteUrl();

  const text = [
    "Thank you for subscribing to MAPIMS Hospital updates.",
    "",
    "You will receive health tips, hospital news, and event announcements in your inbox.",
    "",
    `Visit us: ${siteUrl}`,
    "",
    "Adhiparasakthi Hospitals (MAPIMS)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 16px;">Thank you for subscribing to <strong>MAPIMS Hospital</strong> updates.</p>
      <p style="margin:0 0 16px;color:#475569;">
        You will receive health tips, hospital news, and event announcements in your inbox.
      </p>
      <p style="margin:0;color:#475569;">
        <a href="${siteUrl}" style="color:#dc2626;text-decoration:none;">Visit our website</a>
      </p>
      <p style="margin:24px 0 0;color:#475569;">
        Regards,<br />
        Adhiparasakthi Hospitals (MAPIMS)
      </p>
    </div>
  `.trim();

  await sendMail({
    to: email,
    subject: "MAPIMS — Newsletter subscription confirmed",
    text,
    html,
    replyTo: getHrNotificationEmail(),
  });
}

export async function notifyHrOfNewsletterSignup(email: string) {
  const text = [
    "A new newsletter subscription was received on the MAPIMS website.",
    "",
    `Email: ${email}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0f172a;line-height:1.7;">
      <p style="margin:0 0 16px;">A new newsletter subscription was received on the MAPIMS website.</p>
      <p style="margin:0;color:#475569;">
        <strong>Email:</strong>
        <a href="mailto:${escapeHtml(email)}" style="color:#dc2626;text-decoration:none;">${escapeHtml(email)}</a>
      </p>
    </div>
  `.trim();

  await sendMail({
    to: getHrNotificationEmail(),
    subject: `MAPIMS — New newsletter subscriber: ${email}`,
    text,
    html,
    replyTo: email,
  });
}
