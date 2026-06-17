import type { PostRecord } from "@/lib/db/types";
import { formatNewsletterPublishDate } from "@/lib/format-display-date";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/mail";
import {
  newsletterPreferencesUrl,
  newsletterUnsubscribeUrl,
} from "@/lib/newsletter-token";

type PromoPost = Pick<
  PostRecord,
  "slug" | "title" | "excerpt" | "section" | "image" | "publishedAt"
>;

const BRAND_RED = "#b91c1c";
const BRAND_RED_DARK = "#991b1b";
const LOGO_URL = "/images/adhiparasakthi-hospitals-emblem.png";
const CERT_URL = "/images/nabh-nabl-certifications.png";
const HELPLINE = "1800 599 0999";
const CONTACT_EMAIL = "contact@mapims.edu.in";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sectionConfig(section: string) {
  if (section === "hospital-events") {
    return {
      badge: "Upcoming Event",
      heading: "MAPIMS HOSPITAL EVENTS",
      kicker:
        "You're invited — discover what's happening at Adhiparasakthi Hospitals.",
      cta: "View Event Details",
    };
  }

  return {
    badge: "Hospital Update",
    heading: "MAPIMS HOSPITAL NEWS",
    kicker:
      "We're pleased to share an important update from Adhiparasakthi Hospitals.",
    cta: "Read Full Article",
  };
}

export function promoEmailSubject(post: PromoPost) {
  const config = sectionConfig(post.section);
  if (post.section === "hospital-events") {
    return `Join Us at MAPIMS — ${post.title}`;
  }
  return `New at MAPIMS — ${post.title}`;
}

export function buildPromoNewsletterEmail(
  post: PromoPost,
  subscriberEmail: string
) {
  const config = sectionConfig(post.section);
  const siteUrl = getSiteUrl();
  const articleUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const appointmentUrl = toAbsoluteUrl("/contact");
  const logoUrl = toAbsoluteUrl(LOGO_URL);
  const certUrl = toAbsoluteUrl(CERT_URL);
  const imageUrl = post.image ? toAbsoluteUrl(post.image) : "";
  const publishedOn = formatNewsletterPublishDate(post.publishedAt);
  const preferencesUrl = newsletterPreferencesUrl(subscriberEmail);
  const unsubscribeUrl = newsletterUnsubscribeUrl(subscriberEmail);
  const preheader = `${post.title} — ${post.excerpt.slice(0, 100)}`;

  const text = [
    config.heading,
    "",
    post.title,
    `Published on ${publishedOn}`,
    "",
    config.kicker,
    "",
    post.excerpt,
    "",
    `${config.cta}: ${articleUrl}`,
    `Book an appointment: ${appointmentUrl}`,
    `Helpline: ${HELPLINE}`,
    "",
    "MAPIMS Hospital",
    "Melmaruvathur, Tamil Nadu",
    "",
    `Manage preferences: ${preferencesUrl}`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");

  const heroBlock = imageUrl
    ? `
      <tr>
        <td style="padding:0;line-height:0;font-size:0;">
          <a href="${articleUrl}" style="text-decoration:none;">
            <img
              src="${imageUrl}"
              alt="${escapeHtml(post.title)}"
              width="600"
              style="display:block;width:100%;max-width:600px;height:auto;border:0;"
            />
          </a>
        </td>
      </tr>
    `
    : `
      <tr>
        <td style="padding:48px 32px;background:linear-gradient(135deg,${BRAND_RED} 0%,${BRAND_RED_DARK} 100%);text-align:center;">
          <p style="margin:0;font-size:28px;font-weight:700;line-height:1.3;color:#ffffff;">
            ${escapeHtml(post.title)}
          </p>
        </td>
      </tr>
    `;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(post.title)}</title>
      </head>
      <body style="margin:0;padding:0;background:#eef2f7;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          ${escapeHtml(preheader)}
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;padding:24px 12px;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 18px 48px rgba(15,23,42,0.12);">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,${BRAND_RED} 0%,${BRAND_RED_DARK} 100%);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left" style="vertical-align:middle;">
                          <a href="${siteUrl}" style="text-decoration:none;display:inline-block;">
                            <img
                              src="${logoUrl}"
                              alt="MAPIMS Hospital"
                              width="44"
                              height="44"
                              style="display:inline-block;vertical-align:middle;border:0;"
                            />
                            <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-size:16px;font-weight:700;color:#ffffff;line-height:1.2;">
                              Adhiparasakthi<br />Hospitals
                            </span>
                          </a>
                        </td>
                        <td align="right" style="vertical-align:middle;">
                          <img
                            src="${certUrl}"
                            alt="NABH and NABL certified"
                            width="88"
                            style="display:block;border:0;margin-left:auto;"
                          />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${heroBlock}

                <tr>
                  <td style="padding:28px 32px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#fef2f2;border:1px solid #fecaca;border-radius:999px;padding:8px 14px;">
                          <span style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_RED};">
                            ${escapeHtml(config.badge)}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 32px 8px;">
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND_RED};">
                      ${escapeHtml(config.heading)}
                    </p>
                    <h1 style="margin:0;font-size:30px;line-height:1.25;font-weight:800;color:#0f172a;">
                      ${escapeHtml(post.title)}
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 18px;">
                    <p style="margin:0;font-size:14px;color:#64748b;">
                      Published on ${escapeHtml(publishedOn)}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 24px;">
                    <p style="margin:0 0 14px;font-size:16px;line-height:1.6;font-weight:600;color:#334155;">
                      ${escapeHtml(config.kicker)}
                    </p>
                    <p style="margin:0;font-size:16px;line-height:1.75;color:#475569;">
                      ${escapeHtml(post.excerpt)}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 28px;text-align:center;">
                    <a
                      href="${articleUrl}"
                      style="display:inline-block;background:${BRAND_RED};color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;letter-spacing:0.03em;padding:16px 32px;border-radius:999px;box-shadow:0 10px 24px rgba(185,28,28,0.28);"
                    >
                      ${escapeHtml(config.cta)}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" align="center" style="padding:6px;">
                          <a
                            href="${appointmentUrl}"
                            style="display:block;border:2px solid #e2e8f0;border-radius:14px;padding:14px 12px;text-decoration:none;color:#0f172a;font-size:13px;font-weight:700;"
                          >
                            Book Appointment
                          </a>
                        </td>
                        <td width="50%" align="center" style="padding:6px;">
                          <a
                            href="tel:18005990999"
                            style="display:block;border:2px solid #e2e8f0;border-radius:14px;padding:14px 12px;text-decoration:none;color:#0f172a;font-size:13px;font-weight:700;"
                          >
                            Call ${HELPLINE}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 24px;background:#fff7ed;border-top:1px solid #fed7aa;border-bottom:1px solid #fed7aa;text-align:center;">
                    <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9a3412;">
                      NABH Accredited &nbsp;•&nbsp; 24/7 Emergency Care &nbsp;•&nbsp; Multispeciality Hospital
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 32px;background:#0f172a;text-align:center;">
                    <p style="margin:0 0 6px;font-size:17px;font-weight:700;color:#ffffff;">
                      MAPIMS Hospital
                    </p>
                    <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#94a3b8;">
                      Melmaruvathur, Kancheepuram District<br />
                      Tamil Nadu, India 603319
                    </p>
                    <p style="margin:0 0 6px;font-size:14px;color:#cbd5e1;">
                      <a href="tel:18005990999" style="color:#fca5a5;text-decoration:none;font-weight:700;">${HELPLINE}</a>
                      &nbsp;|&nbsp;
                      <a href="mailto:${CONTACT_EMAIL}" style="color:#fca5a5;text-decoration:none;font-weight:700;">${CONTACT_EMAIL}</a>
                    </p>
                    <p style="margin:18px 0 0;font-size:13px;color:#64748b;">
                      <a href="${siteUrl}" style="color:#94a3b8;text-decoration:underline;">Visit Website</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 32px 28px;background:#020617;text-align:center;">
                    <p style="margin:0 0 10px;font-size:11px;line-height:1.6;color:#64748b;">
                      You are receiving this promotional email because you subscribed to MAPIMS updates.
                    </p>
                    <p style="margin:0;font-size:11px;line-height:1.6;color:#64748b;">
                      <a href="${preferencesUrl}" style="color:#94a3b8;text-decoration:underline;">Manage Preferences</a>
                      &nbsp;|&nbsp;
                      <a href="${unsubscribeUrl}" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim();

  return {
    subject: promoEmailSubject(post),
    text,
    html,
  };
}
