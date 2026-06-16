"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitForm } from "@/lib/submit-form";
import { CareersContactCard } from "@/components/careers/CareersContact";

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

export default function CareersApplicationForm() {
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
        phone.length < 7 || !/^[0-9+() -]{7,}$/.test(phone)
          ? "Please enter a valid phone number."
          : "",
      email:
        email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Please enter a valid email."
          : "",
      message: message.length < 10 ? "Please add a short message." : "",
    };
  }, [state]);

  const hasAnyError = Object.values(errors).some(Boolean);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched({ name: true, phone: true, email: true, message: true });

    if (hasAnyError || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");

    try {
      await submitForm({
        type: "career",
        name: normalizeSpaces(state.name),
        phone: normalizeSpaces(state.phone),
        email: normalizeSpaces(state.email),
        message: normalizeSpaces(state.message),
      });

      setSubmitted(true);
      setState(INITIAL_STATE);
      setTouched({ name: false, phone: false, email: false, message: false });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  const fieldError = (key: keyof FormState) => (touched[key] ? errors[key] : "");

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-600/15";

  return (
    <section
      id="apply"
      className="scroll-mt-28 border-t border-slate-200 bg-white py-12 sm:py-16 md:py-20"
      aria-labelledby="careers-apply-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl"
        >
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Get in touch
            </p>
            <h2
              id="careers-apply-heading"
              className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Send us a message
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              For career opportunities, service enquiries, or general questions — fill in
              the form and our team will get back to you.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <CareersContactCard className="lg:sticky lg:top-24" />

            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    className="mb-1.5 block text-sm font-semibold text-slate-900"
                    htmlFor="career-name"
                  >
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="career-name"
                    value={state.name}
                    onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    className={inputClass}
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                  {fieldError("name") ? (
                    <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>
                  ) : null}
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-semibold text-slate-900"
                    htmlFor="career-email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="career-email"
                    type="email"
                    value={state.email}
                    onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                    className={inputClass}
                    autoComplete="email"
                    placeholder="you@email.com"
                  />
                  {fieldError("email") ? (
                    <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>
                  ) : null}
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-semibold text-slate-900"
                    htmlFor="career-phone"
                  >
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="career-phone"
                    value={state.phone}
                    onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
                    onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                    className={inputClass}
                    autoComplete="tel"
                    placeholder="+91 ..."
                  />
                  {fieldError("phone") ? (
                    <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="mb-1.5 block text-sm font-semibold text-slate-900"
                    htmlFor="career-message"
                  >
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="career-message"
                    value={state.message}
                    onChange={(e) => setState((prev) => ({ ...prev, message: e.target.value }))}
                    onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                    rows={5}
                    className={cn(inputClass, "resize-y")}
                    placeholder="Tell us how we can help — careers, services, or any other enquiry..."
                  />
                  {fieldError("message") ? (
                    <p className="mt-1 text-xs text-red-600">{fieldError("message")}</p>
                  ) : null}
                </div>
              </div>

              {submitError ? (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              ) : null}

              {submitted ? (
                <p className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Thank you — your message has been sent. We will contact you soon.
                </p>
              ) : null}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
