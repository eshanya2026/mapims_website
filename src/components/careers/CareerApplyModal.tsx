"use client";

import { useMemo, useRef, useState } from "react";
import { CheckCircle2, FileUp, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { submitForm } from "@/lib/submit-form";
import { uploadResume } from "@/lib/upload-resume";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

function normalizeSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

type CareerApplyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobSlug: string;
  jobTitle: string;
};

export default function CareerApplyModal({
  open,
  onOpenChange,
  jobSlug,
  jobTitle,
}: CareerApplyModalProps) {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [touched, setTouched] = useState<Record<keyof FormState | "resume", boolean>>({
    name: false,
    email: false,
    phone: false,
    address: false,
    message: false,
    resume: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationReferenceId, setApplicationReferenceId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      address: "",
      message: message.length < 10 ? "Please add a short message." : "",
      resume: resumeFile ? "" : "Please upload your resume.",
    };
  }, [state, resumeFile]);

  const hasAnyError = Object.values(errors).some(Boolean);

  function resetForm() {
    setState(INITIAL_STATE);
    setResumeFile(null);
    setTouched({
      name: false,
      email: false,
      phone: false,
      address: false,
      message: false,
      resume: false,
    });
    setSubmitError("");
    setSubmitted(false);
    setApplicationReferenceId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !loading) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      address: true,
      message: true,
      resume: true,
    });

    if (hasAnyError || !resumeFile || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");

    try {
      const resumeUrl = await uploadResume(resumeFile);

      const result = await submitForm({
        type: "job_application",
        jobSlug,
        jobTitle,
        name: normalizeSpaces(state.name),
        phone: normalizeSpaces(state.phone),
        email: normalizeSpaces(state.email),
        address: normalizeSpaces(state.address),
        message: normalizeSpaces(state.message),
        resumeUrl,
      });

      setApplicationReferenceId(
        typeof result.referenceId === "string" ? result.referenceId : null
      );
      setSubmitted(true);
      setState(INITIAL_STATE);
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setTimeout(() => {
        setSubmitted(false);
        setApplicationReferenceId(null);
        handleOpenChange(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit your application."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  const fieldError = (key: keyof FormState | "resume") =>
    touched[key] ? errors[key] : "";

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-600/15";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-900">
            Apply for this role
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {jobTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="apply-name">
              Full name <span className="text-red-600">*</span>
            </label>
            <input
              id="apply-name"
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="apply-email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="apply-email"
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
              <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="apply-phone">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                id="apply-phone"
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
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="apply-address">
              Address <span className="text-xs font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="apply-address"
              value={state.address}
              onChange={(e) => setState((prev) => ({ ...prev, address: e.target.value }))}
              onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
              className={inputClass}
              autoComplete="street-address"
              placeholder="City, state"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="apply-message">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="apply-message"
              value={state.message}
              onChange={(e) => setState((prev) => ({ ...prev, message: e.target.value }))}
              onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
              rows={4}
              className={cn(inputClass, "resize-y")}
              placeholder="Briefly tell us why you are a good fit for this role..."
            />
            {fieldError("message") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("message")}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900" htmlFor="apply-resume">
              Resume <span className="text-red-600">*</span>
            </label>
            <div
              className={cn(
                "rounded-xl border border-dashed px-4 py-4 transition-colors",
                fieldError("resume") ? "border-red-300 bg-red-50/50" : "border-slate-200 bg-slate-50/50"
              )}
            >
              <input
                ref={fileInputRef}
                id="apply-resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setResumeFile(file);
                  setTouched((prev) => ({ ...prev, resume: true }));
                }}
              />
              {resumeFile ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2 text-sm text-slate-700">
                    <FileUp className="h-4 w-4 shrink-0 text-red-600" />
                    <span className="truncate">{resumeFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                    aria-label="Remove resume"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-red-200 hover:text-red-600"
                >
                  <FileUp className="h-4 w-4" />
                  Choose PDF or Word file (max 5MB)
                </button>
              )}
            </div>
            {fieldError("resume") ? (
              <p className="mt-1 text-xs text-red-600">{fieldError("resume")}</p>
            ) : null}
          </div>

          {submitError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          {submitted ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              <p className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Application received successfully.
              </p>
              {applicationReferenceId ? (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-white px-3 py-2.5 text-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Your reference
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold text-red-700">
                    Application ID: {applicationReferenceId}
                  </p>
                  <p className="mt-1 text-sm">
                    Position: <span className="font-medium">{jobTitle}</span>
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    Save this ID and quote it when you contact HR. A confirmation email has been sent to you.
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-xs text-emerald-700">
                  A confirmation email has been sent with your application details.
                </p>
              )}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
            {loading ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
