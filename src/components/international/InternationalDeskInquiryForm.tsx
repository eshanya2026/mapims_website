"use client";

import { useMemo, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { internationalDesk } from "@/data/international-patients";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  country: string;
  email: string;
  phone: string;
  medicalCondition: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  country: "",
  email: "",
  phone: "",
  medicalCondition: "",
  message: "",
};

function trim(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15";

export default function InternationalDeskInquiryForm() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    country: false,
    email: false,
    phone: false,
    medicalCondition: false,
    message: false,
  });

  const errors = useMemo(() => {
    const name = trim(state.name);
    const phone = trim(state.phone);
    const email = trim(state.email);
    const message = trim(state.message);

    return {
      name: name.length < 2 ? "Please enter your name." : "",
      country: "",
      email:
        email.length < 1
          ? "Please enter your email."
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? "Please enter a valid email."
            : "",
      phone:
        phone.length < 7 || !/^[0-9+() -]{7,}$/.test(phone)
          ? "Please enter a valid phone or WhatsApp number."
          : "",
      medicalCondition: "",
      message: message.length < 10 ? "Please add your message." : "",
    };
  }, [state]);

  const hasError = Object.values(errors).some(Boolean);

  const markAllTouched = () =>
    setTouched({
      name: true,
      country: true,
      email: true,
      phone: true,
      medicalCondition: true,
      message: true,
    });

  const buildBody = () =>
    [
      "International Patient Desk — website inquiry",
      "",
      `Name: ${trim(state.name)}`,
      `Country: ${trim(state.country) || "-"}`,
      `Email: ${trim(state.email)}`,
      `Phone/WhatsApp: ${trim(state.phone)}`,
      `Medical condition: ${trim(state.medicalCondition) || "-"}`,
      "",
      "Message:",
      trim(state.message),
    ].join("\n");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();
    if (hasError) return;

    const subject = encodeURIComponent(
      "International Patient Inquiry — Adhiparasakthi Hospital"
    );
    const body = encodeURIComponent(buildBody());
    window.location.href = `${internationalDesk.mailto}?subject=${subject}&body=${body}`;
  };

  const onWhatsApp = () => {
    markAllTouched();
    if (hasError) return;

    const text = encodeURIComponent(buildBody());
    window.open(`${internationalDesk.whatsappUrl}?text=${text}`, "_blank");
  };

  const err = (key: keyof FormState) => (touched[key] ? errors[key] : "");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-6 md:p-7">
      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
        Inquiry Form
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Share your details and our international coordinators will respond.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-name">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="intl-inq-name"
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={inputClass}
              autoComplete="name"
            />
            {err("name") ? <p className="mt-1 text-xs text-red-600">{err("name")}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-country">
              Country
            </label>
            <input
              id="intl-inq-country"
              value={state.country}
              onChange={(e) => setState((s) => ({ ...s, country: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, country: true }))}
              className={inputClass}
              autoComplete="country-name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="intl-inq-email"
              type="email"
              value={state.email}
              onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={inputClass}
              autoComplete="email"
            />
            {err("email") ? <p className="mt-1 text-xs text-red-600">{err("email")}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-phone">
              Phone / WhatsApp <span className="text-red-600">*</span>
            </label>
            <input
              id="intl-inq-phone"
              value={state.phone}
              onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              className={inputClass}
              autoComplete="tel"
              inputMode="tel"
            />
            {err("phone") ? <p className="mt-1 text-xs text-red-600">{err("phone")}</p> : null}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-condition">
              Medical condition
            </label>
            <input
              id="intl-inq-condition"
              value={state.medicalCondition}
              onChange={(e) =>
                setState((s) => ({ ...s, medicalCondition: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, medicalCondition: true }))}
              className={inputClass}
              placeholder="e.g. cardiac surgery, oncology, orthopaedics"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-message">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="intl-inq-message"
              value={state.message}
              onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              className={cn(inputClass, "min-h-[6.5rem] resize-none")}
              placeholder="Travel dates, reports available, questions for our desk…"
            />
            {err("message") ? (
              <p className="mt-1 text-xs text-red-600">{err("message")}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700"
          >
            <Send className="h-4 w-4" />
            Submit Inquiry
          </button>
          <button
            type="button"
            onClick={onWhatsApp}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-emerald-600 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </button>
        </div>
      </form>
    </div>
  );
}
