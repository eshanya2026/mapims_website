"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="h-full flex flex-col">
      {submitted ? (
        <p className="text-sm text-slate-300 leading-relaxed rounded-lg bg-slate-900/60 border border-slate-800 px-4 py-6">
          Thank you for subscribing. You will receive health updates, news, and
          event announcements from Adhiparasakthi Hospital.
        </p>
      ) : (
        <>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            Health tips, news, and event updates in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-10 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:border-red-600 focus-visible:ring-red-600/30"
              aria-label="Email for newsletter"
            />
            <Button
              type="submit"
              size="lg"
              className="h-10 w-full gap-2 px-5"
            >
              Subscribe
              <Send className="size-4" />
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-3">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </>
      )}
    </div>
  );
}
