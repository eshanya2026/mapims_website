import type { Metadata } from "next";
import Link from "next/link";

import { unsubscribeFromNewsletter } from "@/lib/db/newsletter-subscribers";
import { verifyNewsletterSubscriberToken } from "@/lib/newsletter-token";

export const metadata: Metadata = {
  title: "Unsubscribe | MAPIMS Hospital",
  robots: { index: false, follow: false },
};

type UnsubscribePageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function NewsletterUnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const { token } = await searchParams;
  const email = token ? verifyNewsletterSubscriberToken(token) : null;

  if (!email) {
    return (
      <main className="min-h-screen bg-slate-50 section-padding">
        <div className="page-container max-w-xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">
              Unsubscribe
            </h1>
            <p className="mt-4 text-slate-600">
              This unsubscribe link is invalid or has expired.
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

  await unsubscribeFromNewsletter(email);

  return (
    <main className="min-h-screen bg-slate-50 section-padding">
      <div className="page-container max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            MAPIMS Newsletter
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">
            You have been unsubscribed
          </h1>
          <p className="mt-4 text-slate-600">
            <span className="font-medium text-slate-900">{email}</span> will no
            longer receive MAPIMS hospital news and event updates.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
