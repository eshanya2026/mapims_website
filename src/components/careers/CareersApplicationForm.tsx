"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Copy, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitForm } from "@/lib/submit-form";
import { CareersContactCard } from "@/components/careers/CareersContact";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type SubmittedDetails = {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
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
  const [submittedDetails, setSubmittedDetails] = useState<SubmittedDetails | null>(null);
  const [copied, setCopied] = useState(false);
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
      const applicantName = normalizeSpaces(state.name);
      const applicantEmail = normalizeSpaces(state.email);
      const applicantPhone = normalizeSpaces(state.phone);

      const result = (await submitForm({
        type: "career",
        name: applicantName,
        phone: applicantPhone,
        email: applicantEmail,
        message: normalizeSpaces(state.message),
      })) as { referenceId?: string };

      const referenceId =
        typeof result?.referenceId === "string" ? result.referenceId : null;

      setSubmittedDetails({
        referenceId: referenceId ?? `APP-${Date.now().toString().slice(-6)}`,
        name: applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });

      setSubmitted(true);
      setState(INITIAL_STATE);
      setTouched({ name: false, phone: false, email: false, message: false });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setSubmittedDetails(null);
    setSubmitError("");
    setCopied(false);
    setState(INITIAL_STATE);
    setTouched({ name: false, phone: false, email: false, message: false });
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

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
              {submitted && submittedDetails ? (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
                    <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Message &amp; Application Received!
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Thank you, <span className="font-semibold text-slate-900">{submittedDetails.name}</span>. Your enquiry has been forwarded to our HR &amp; administration team.
                  </p>

                  {/* Reference Number Card */}
                  <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-white p-5 text-left shadow-sm">
                    <div className="flex items-center justify-between border-b border-emerald-100/80 pb-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                          Application Reference No.
                        </span>
                        <p className="mt-0.5 font-mono text-xl font-extrabold tracking-wider text-slate-900">
                          {submittedDetails.referenceId}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(submittedDetails.referenceId);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 active:scale-95"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-3.5 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500">Applicant Name</span>
                        <p className="font-medium text-slate-800">{submittedDetails.name}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Status</span>
                        <p className="font-medium text-emerald-700 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Received &amp; Under Review
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Email</span>
                        <p className="font-medium text-slate-800 truncate">{submittedDetails.email}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Submission Date</span>
                        <p className="font-medium text-slate-800">{submittedDetails.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Next steps notice */}
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-xs leading-relaxed text-slate-600">
                    <p className="font-semibold text-slate-800 mb-1.5">What happens next?</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      <li>A confirmation email has been dispatched to <strong className="text-slate-700">{submittedDetails.email}</strong>.</li>
                      <li>Our HR team will review your enquiry and get back to you via phone or email shortly.</li>
                      <li>Please retain and quote reference <strong className="text-slate-800 font-mono">{submittedDetails.referenceId}</strong> if you follow up with us.</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
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
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
