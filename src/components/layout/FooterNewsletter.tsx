"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(
    "Thank you for subscribing. Please check your inbox for a confirmation email."
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || submittingRef.current) return;

    submittingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to subscribe right now. Please try again."
        );
      }

      setMessage(
        data.message ??
          "Thank you for subscribing. Please check your inbox for a confirmation email."
      );
      setSubmitted(true);
      setEmail("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to subscribe right now. Please try again."
      );
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  }

  return (
    <div className="flex h-full flex-col">
      {submitted ? (
        <div
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-5 text-sm leading-relaxed text-emerald-100"
        >
          <div className="mb-2 flex items-center gap-2 font-semibold text-emerald-300">
            <CheckCircle2 className="size-4 shrink-0" />
            Subscribed
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm leading-relaxed text-slate-400">
            Health tips, news, and event updates in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-10 flex-1 border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:border-red-600 focus-visible:ring-red-600/30"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Subscribing..." : "Subscribe"}
              <Send className="size-4" />
            </button>
          </form>
          {error ? (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {error}
            </p>
          ) : (
            <p className="mt-3 text-xs text-slate-500">
              We respect your privacy. Unsubscribe anytime.
            </p>
          )}
        </>
      )}
    </div>
  );
}
