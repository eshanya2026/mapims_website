"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Building2,
  FileText,
  CreditCard,
  FileCheck2,
  Send,
  AlertCircle,
  Landmark,
} from "lucide-react";
import { submitForm } from "@/lib/submit-form";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const INSURANCE_EMAIL =
  process.env.NEXT_PUBLIC_INSURANCE_EMAIL?.trim() || "Insurance@mapims.org";
const INSURANCE_PHONE =
  process.env.NEXT_PUBLIC_INSURANCE_PHONE?.trim() || "9499059970";
const HOSPITAL_PHONE =
  process.env.NEXT_PUBLIC_HOSPITAL_PHONE?.trim() || "+91 94990 59966";

const INITIAL_STATE: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export default function InsuranceContactPage() {
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
          ? "Please enter a valid phone number (at least 7 digits)."
          : "",
      email:
        email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Please enter a valid email address."
          : "",
      message:
        message.length < 10
          ? "Please describe your query (minimum 10 characters)."
          : "",
    };
  }, [state]);

  const hasAnyError =
    Boolean(errors.name) ||
    Boolean(errors.phone) ||
    Boolean(errors.email) ||
    Boolean(errors.message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });

    if (hasAnyError || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");

    try {
      await submitForm({
        type: "insurance",
        name: normalizeSpaces(state.name),
        phone: normalizeSpaces(state.phone),
        email: normalizeSpaces(state.email),
        message: normalizeSpaces(state.message),
      });

      setSubmitted(true);
      setState(INITIAL_STATE);
      setTouched({
        name: false,
        phone: false,
        email: false,
        message: false,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your insurance query. Please call 9499059970 directly."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.22),rgba(255,255,255,0))]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="relative container mx-auto px-4 pt-12 pb-14 sm:px-6 lg:pt-16 lg:pb-20">
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services/insurance" className="transition hover:text-white">
              Insurance &amp; TPA
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="font-semibold text-red-400">Contact Insurance Desk</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Dedicated Insurance Helpdesk
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Direct Desk: 9499059970
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              <span>Contact Hospital</span>{" "}
              <span className="text-red-500">Insurance Desk</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Connect directly with our dedicated Hospital Insurance &amp; TPA team at Adhiparasakthi
              Hospitals, Melmaruvathur. We assist patients with cashless hospitalization,
              pre-authorizations, corporate insurance, and government welfare health schemes (CMCHIS).
            </p>

            {/* Quick Action Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${INSURANCE_PHONE.replace(/[^0-9+]/g, "")}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
              >
                <Phone className="h-4 w-4" />
                <span>Call Insurance Desk: {INSURANCE_PHONE}</span>
              </a>
              <a
                href={`mailto:${INSURANCE_EMAIL}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
              >
                <Mail className="h-4 w-4 text-red-400" />
                <span>{INSURANCE_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Body: Contact Information + Query Form */}
      <section className="section-padding container mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Insurance Desk Details & Checklist (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Primary Contact Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Hospital Insurance &amp; TPA Desk
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adhiparasakthi Hospitals, Melmaruvathur
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-4 w-4 text-red-600 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">
                      Direct Insurance Helpline
                    </span>
                    <a
                      href="tel:9499059970"
                      className="text-base font-bold text-slate-900 hover:text-red-600 transition"
                    >
                      9499059970
                    </a>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      Dedicated line for insurance verification &amp; cashless queries
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">
                      Hospital General Desk
                    </span>
                    <a
                      href={`tel:${HOSPITAL_PHONE.replace(/[^0-9+]/g, "")}`}
                      className="font-medium text-slate-700 hover:text-red-600 transition"
                    >
                      {HOSPITAL_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="mt-0.5 h-4 w-4 text-red-600 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">
                      Insurance Desk Email
                    </span>
                    <a
                      href={`mailto:${INSURANCE_EMAIL}`}
                      className="font-bold text-slate-900 hover:text-red-600 transition"
                    >
                      {INSURANCE_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">
                      Desk Location
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ground Floor, Main Hospital Block, Adhiparasakthi Hospitals,
                      Melmaruvathur, Tamil Nadu 603319
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500">
                      Operating Hours
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Emergency Admissions: <strong>24/7 Round-the-Clock</strong>
                      <br />
                      Cashless Helpdesk: <strong>Mon – Sat, 8:00 AM – 8:00 PM</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents Checklist Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
                <FileCheck2 className="h-4 w-4" />
                Required Documents Checklist
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Keep These Ready for Cashless Processing
              </h3>

              <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Active Health Insurance E-Card / Policy Copy</strong> (Original or Digital PDF)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Patient Government Photo ID Proof</strong> (Aadhaar Card, Voter ID, or Driving License)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Treating Doctor&apos;s Admission Advice Note</strong> &amp; Prescriptions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Recent Diagnostic Test Reports</strong> (Blood tests, X-ray, CT, MRI, ECG, etc.)
                  </span>
                </li>
              </ul>
            </div>

            {/* Government Health Schemes Note */}
            <div className="rounded-3xl border border-red-200/80 bg-red-50/50 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                <Landmark className="h-4 w-4 text-red-600" />
                Government Health Schemes
              </div>
              <h4 className="mt-2 text-sm font-bold text-slate-900">
                CMCHIS &amp; Public Sector Empanelment
              </h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                We actively process claims under the <strong>Chief Minister&apos;s Comprehensive Health Insurance Scheme (CMCHIS)</strong> and public sector undertaking benefits. Contact our desk for eligibility verification with your ration card/smart card.
              </p>
            </div>
          </div>

          {/* Right Column: Dedicated Insurance Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-lg shadow-slate-200/50">
              <div className="border-b border-slate-100 pb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                  <CreditCard className="h-3.5 w-3.5" />
                  Policy Verification &amp; Query Form
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Verify Your Policy or Submit Query
                </h2>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                  Fill in your details below. Your submission is delivered directly to{" "}
                  <strong className="text-slate-900">{INSURANCE_EMAIL}</strong>.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center text-emerald-900"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-emerald-950">
                    Insurance Query Submitted Successfully!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-800 sm:text-sm">
                    Thank you. Your request has been transmitted directly to our Insurance Helpdesk at{" "}
                    <strong>{INSURANCE_EMAIL}</strong>. Our coordinator will review your policy details
                    and call you back shortly.
                  </p>
                  <div className="mt-5 rounded-xl bg-white p-4 text-xs text-slate-700 shadow-sm border border-emerald-200/60">
                    <p className="font-semibold text-slate-900">Need Immediate Assistance?</p>
                    <p className="mt-1">
                      Call our Insurance Desk directly at{" "}
                      <a href={`tel:${INSURANCE_PHONE.replace(/[^0-9+]/g, "")}`} className="font-bold text-red-600 hover:underline">
                        {INSURANCE_PHONE}
                      </a>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-6 text-xs font-bold text-white transition hover:bg-emerald-700"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="ins-name"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                      >
                        Patient / Attendant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ins-name"
                        type="text"
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                        onBlur={() => setTouched({ ...touched, name: true })}
                        placeholder="e.g. Ramesh Kumar"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        required
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="ins-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                      >
                        Mobile / Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ins-phone"
                        type="tel"
                        value={state.phone}
                        onChange={(e) => setState({ ...state, phone: e.target.value })}
                        onBlur={() => setTouched({ ...touched, phone: true })}
                        placeholder="e.g. 9876543210"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        required
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="ins-email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="ins-email"
                      type="email"
                      value={state.email}
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                      onBlur={() => setTouched({ ...touched, email: true })}
                      placeholder="e.g. ramesh@example.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="ins-message"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Query Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="ins-message"
                      rows={4}
                      value={state.message}
                      onChange={(e) => setState({ ...state, message: e.target.value })}
                      onBlur={() => setTouched({ ...touched, message: true })}
                      placeholder="Please mention treatment requirement, policy details, or specific query..."
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      required
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 disabled:opacity-60 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>{loading ? "Submitting Query..." : "Submit Insurance Query"}</span>
                    </button>
                    <p className="mt-3 text-center text-xs text-slate-500">
                      Submissions are routed directly to <strong>{INSURANCE_EMAIL}</strong>. For urgent queries, please call <strong>{INSURANCE_PHONE}</strong>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
