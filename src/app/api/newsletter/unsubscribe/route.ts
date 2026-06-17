import { NextResponse } from "next/server";

import { unsubscribeFromNewsletter } from "@/lib/db/newsletter-subscribers";
import { getSiteUrl } from "@/lib/mail";
import { verifyNewsletterSubscriberToken } from "@/lib/newsletter-token";

async function unsubscribeWithToken(token: string | null) {
  if (!token) return null;

  const email = verifyNewsletterSubscriberToken(token);
  if (!email) return null;

  await unsubscribeFromNewsletter(email);
  return email;
}

export async function POST(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get("token");
    const email = await unsubscribeWithToken(token);

    if (!email) {
      return NextResponse.json({ error: "Invalid unsubscribe link." }, { status: 400 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[newsletter unsubscribe POST]", error);
    return NextResponse.json(
      { error: "Unable to unsubscribe right now." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const siteUrl = getSiteUrl();

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe`);
  }

  return NextResponse.redirect(
    `${siteUrl}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`
  );
}
