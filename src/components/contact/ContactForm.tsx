"use client";

import { useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitForm } from "@/lib/submit-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

type ContactFormProps = {
  className?: string;
};

export default function ContactForm({ className }: ContactFormProps) {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    phone: false,
    email: false,
    message: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);

  const errors = useMemo(() => {
    const name = normalizeSpaces(state.name);
    const phone = normalizeSpaces(state.phone);
    const email = normalizeSpaces(state.email);
    const message = normalizeSpaces(state.message);

    return {
      name: name.length < 2 ? "Please enter your name." : "",
      phone:
        phone.length > 0 && !/^[0-9+() -]{7,}$/.test(phone)
          ? "Please enter a valid phone number."
          : "",
      email:
        email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Please enter a valid email."
          : "",
      message: message.length < 10 ? "Please add a short message." : "",
    };
  }, [state]);

  const hasAnyError =
    Boolean(errors.name) ||
    Boolean(errors.phone) ||
    Boolean(errors.email) ||
    Boolean(errors.message);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, message: true });
    if (hasAnyError || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");

    try {
      await submitForm({
        type: "contact",
        name: normalizeSpaces(state.name),
        phone: normalizeSpaces(state.phone),
        email: normalizeSpaces(state.email),
        message: normalizeSpaces(state.message),
      });

      setSubmitted(true);
      setState(INITIAL_STATE);
      setTouched({ name: false, phone: false, email: false, message: false });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const fieldError = (key: keyof FormState) =>
    touched[key] ? errors[key] : "";

  return (
    <ScrollReveal
      direction="left"
      delay={0.1}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6 md:p-7",
        className
      )}
    >
      <div className="mb-5 border-b border-slate-100 pb-5">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Send a Message
        </h2>
        <p className="mt-1.5 text-left text-sm leading-relaxed text-slate-600">
          Fill in the form and we will get back to you. You can also call or
          email us directly using the details on the left.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:content-start">
          <div>
            <label
              className="mb-1 block text-sm font-semibold text-slate-900"
              htmlFor="contact-name"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-name"
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15"
              placeholder="Your full name"
              autoComplete="name"
            />
            {fieldError("name") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>
            ) : null}
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-semibold text-slate-900"
              htmlFor="contact-phone"
            >
              Phone
            </label>
            <input
              id="contact-phone"
              value={state.phone}
              onChange={(e) =>
                setState((s) => ({ ...s, phone: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15"
              placeholder="+91 XXXXX XXXXX"
              autoComplete="tel"
              inputMode="tel"
            />
            {fieldError("phone") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              className="mb-1 block text-sm font-semibold text-slate-900"
              htmlFor="contact-email"
            >
              Email
            </label>
            <input
              id="contact-email"
              value={state.email}
              onChange={(e) =>
                setState((s) => ({ ...s, email: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15"
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
            {fieldError("email") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              className="mb-1 block text-sm font-semibold text-slate-900"
              htmlFor="contact-message"
            >
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="contact-message"
              value={state.message}
              onChange={(e) =>
                setState((s) => ({ ...s, message: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              className="min-h-[7.5rem] w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15 sm:min-h-[8.5rem]"
              placeholder="How can we help you?"
            />
            {fieldError("message") ? (
              <p className="mt-1 text-xs text-red-600">
                {fieldError("message")}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          {submitError ? (
            <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {submitError}
            </p>
          ) : null}
          {submitted ? (
            <p className="mb-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              Thank you. Your message has been received and our team will respond soon.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-700/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
          >
            <Send className="h-4 w-4" />
            {loading ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </ScrollReveal>
  );
}
