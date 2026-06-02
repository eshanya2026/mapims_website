"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { internationalDesk } from "@/data/international-patients";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  country: string;
  phone: string;
  email: string;
  treatment: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  country: "",
  phone: "",
  email: "",
  treatment: "",
  message: "",
};

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15";

const labelClass = "mb-1 block text-sm font-semibold text-slate-900";

export default function InternationalDeskForm() {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    country: false,
    phone: false,
    email: false,
    treatment: false,
    message: false,
  });

  const errors = useMemo(() => {
    const name = normalizeSpaces(state.name);
    const phone = normalizeSpaces(state.phone);
    const email = normalizeSpaces(state.email);
    const message = normalizeSpaces(state.message);

    return {
      name: name.length < 2 ? "Please enter your name." : "",
      country: "",
      phone:
        phone.length < 7 || !/^[0-9+() -]{7,}$/.test(phone)
          ? "Please enter a valid phone number with country code."
          : "",
      email:
        email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Please enter a valid email."
          : "",
      treatment: "",
      message: message.length < 10 ? "Please describe your enquiry." : "",
    };
  }, [state]);

  const hasAnyError = Object.values(errors).some(Boolean);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      country: true,
      phone: true,
      email: true,
      treatment: true,
      message: true,
    });
    if (hasAnyError) return;

    const subject = encodeURIComponent(
      "International Desk enquiry — Adhiparasakthi Hospital"
    );
    const body = encodeURIComponent(
      [
        "International Patient Desk — website enquiry",
        "",
        `Name: ${normalizeSpaces(state.name)}`,
        `Country: ${normalizeSpaces(state.country) || "-"}`,
        `Phone: ${normalizeSpaces(state.phone)}`,
        `Email: ${normalizeSpaces(state.email) || "-"}`,
        `Treatment / specialty: ${normalizeSpaces(state.treatment) || "-"}`,
        "",
        "Message:",
        normalizeSpaces(state.message),
      ].join("\n")
    );

    window.location.href = `${internationalDesk.mailto}?subject=${subject}&body=${body}`;
  };

  const fieldError = (key: keyof FormState) =>
    touched[key] ? errors[key] : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-6 md:p-7">
      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
        Send an enquiry
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
        Our international coordinators will respond with guidance on treatment,
        travel, and cost estimates.
      </p>

      <form onSubmit={onSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="intl-name">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id="intl-name"
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={inputClass}
              placeholder="Your name"
              autoComplete="name"
            />
            {fieldError("name") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="intl-country">
              Country
            </label>
            <input
              id="intl-country"
              value={state.country}
              onChange={(e) =>
                setState((s) => ({ ...s, country: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, country: true }))}
              className={inputClass}
              placeholder="e.g. United Kingdom"
              autoComplete="country-name"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="intl-phone">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="intl-phone"
              value={state.phone}
              onChange={(e) =>
                setState((s) => ({ ...s, phone: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              className={inputClass}
              placeholder="+44 … / +971 …"
              autoComplete="tel"
              inputMode="tel"
            />
            {fieldError("phone") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="intl-email">
              Email
            </label>
            <input
              id="intl-email"
              value={state.email}
              onChange={(e) =>
                setState((s) => ({ ...s, email: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={inputClass}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
            {fieldError("email") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="intl-treatment">
              Treatment or department of interest
            </label>
            <input
              id="intl-treatment"
              value={state.treatment}
              onChange={(e) =>
                setState((s) => ({ ...s, treatment: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, treatment: true }))}
              className={inputClass}
              placeholder="e.g. Cardiac surgery, oncology, spine care"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="intl-message">
              Your message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="intl-message"
              value={state.message}
              onChange={(e) =>
                setState((s) => ({ ...s, message: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              className={cn(inputClass, "min-h-[7rem] resize-none")}
              placeholder="Medical reports available, planned travel dates, questions for our coordinators…"
            />
            {fieldError("message") ? (
              <p className="mt-1 text-xs text-red-600">
                {fieldError("message")}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700 sm:w-auto sm:min-w-[220px]"
          >
            <Send className="h-4 w-4" />
            Submit enquiry
          </button>
          <p className="mt-3 text-xs text-slate-500">
            Submits via email to{" "}
            <span className="font-medium text-slate-700">
              {internationalDesk.email}
            </span>
            . Or call{" "}
            <a
              href={internationalDesk.tollFreeTel}
              className="font-medium text-red-600 hover:text-red-700"
            >
              {internationalDesk.tollFreeDisplay}
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
