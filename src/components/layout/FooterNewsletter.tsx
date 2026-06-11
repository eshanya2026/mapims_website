"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(
    "Thank you for subscribing. You will receive health updates, news, and event announcements from Adhiparasakthi Hospital."
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submittingRef.current) return;

    submittingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
          "Thank you for subscribing. You will receive health updates, news, and event announcements from Adhiparasakthi Hospital."
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
        <p className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-6 text-sm leading-relaxed text-slate-300">
          {message}
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm leading-relaxed text-slate-400">
            Health tips, news, and event updates in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-10 flex-1 border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:border-red-600 focus-visible:ring-red-600/30"
              aria-label="Email for newsletter"
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-10 w-full gap-2 px-5"
            >
              {loading ? "Subscribing..." : "Subscribe"}
              <Send className="size-4" />
            </Button>
          </form>
          {error ? (
            <p className="mt-3 text-xs text-red-400">{error}</p>
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
