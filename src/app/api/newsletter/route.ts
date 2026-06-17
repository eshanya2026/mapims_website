import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/db/newsletter-subscribers";
import {
  notifyHrOfNewsletterSignup,
  notifySubscriberOfNewsletterSignup,
} from "@/lib/newsletter-notifications";
import { newsletterSubscribeSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSubscribeSchema.safeParse(body);

    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Please enter a valid email address.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { subscriber, alreadySubscribed } = await subscribeToNewsletter(
      parsed.data.email
    );

    if (!alreadySubscribed) {
      try {
        await notifySubscriberOfNewsletterSignup(parsed.data.email);
      } catch (emailError) {
        console.error("[newsletter POST] subscriber email failed:", emailError);
      }

      try {
        await notifyHrOfNewsletterSignup(parsed.data.email);
      } catch (emailError) {
        console.error("[newsletter POST] HR email failed:", emailError);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        alreadySubscribed,
        message: alreadySubscribed
          ? "You are already subscribed to our newsletter."
          : "Thank you for subscribing. Please check your inbox for a confirmation email.",
        id: subscriber.id,
      },
      { status: alreadySubscribed ? 200 : 201 }
    );
  } catch (error) {
    console.error("[newsletter POST]", error);
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Newsletter service is temporarily unavailable. Please try again later."
        : "Unable to subscribe right now. Please try again later.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
