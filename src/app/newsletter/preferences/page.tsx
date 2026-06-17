import type { Metadata } from "next";
import Link from "next/link";

import { findNewsletterSubscriberByEmail } from "@/lib/db/newsletter-subscribers";
import { verifyNewsletterSubscriberToken } from "@/lib/newsletter-token";

export const metadata: Metadata = {
  title: "Newsletter Preferences | MAPIMS Hospital",
  robots: { index: false, follow: false },
};

type PreferencesPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function NewsletterPreferencesPage({
  searchParams,
}: PreferencesPageProps) {
  const { token } = await searchParams;
  const email = token ? verifyNewsletterSubscriberToken(token) : null;

  if (!email) {
    return (
      <main className="min-h-screen bg-slate-50 section-padding">
        <div className="page-container max-w-xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">
              Newsletter preferences
            </h1>
            <p className="mt-4 text-slate-600">
              This link is invalid or has expired. Please use the link from your
              latest MAPIMS newsletter email.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const subscriber = await findNewsletterSubscriberByEmail(email);
  const isActive = subscriber?.status === "active";
  const unsubscribeUrl = `/newsletter/unsubscribe?token=${encodeURIComponent(token!)}`;

  return (
    <main className="min-h-screen bg-slate-50 section-padding">
      <div className="page-container max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            MAPIMS Newsletter
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">
            Manage your preferences
          </h1>
          <p className="mt-4 text-slate-600">
            Subscribed email:{" "}
            <span className="font-medium text-slate-900">{email}</span>
          </p>
          <p className="mt-2 text-slate-600">
            {isActive
              ? "You are currently subscribed to hospital news and event updates from MAPIMS."
              : "You are not currently subscribed to MAPIMS updates."}
          </p>

          {isActive ? (
            <Link
              href={unsubscribeUrl}
              className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Unsubscribe
            </Link>
          ) : null}

          <Link
            href="/"
            className="mt-6 block text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
