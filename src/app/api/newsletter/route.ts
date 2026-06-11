import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/db/newsletter-subscribers";
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

    return NextResponse.json(
      {
        ok: true,
        alreadySubscribed,
        message: alreadySubscribed
          ? "You are already subscribed to our newsletter."
          : "Thank you for subscribing. You will receive health updates, news, and event announcements.",
        id: subscriber.id,
      },
      { status: alreadySubscribed ? 200 : 201 }
    );
  } catch (error) {
    console.error("[newsletter POST]", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again later." },
      { status: 500 }
    );
  }
}
