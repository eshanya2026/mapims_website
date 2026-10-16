"use client";

import { useMemo, useRef, useState } from "react";
import { Check, CheckCircle2, Copy, FileUp, Send, X } from "lucide-react";
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

type SubmittedDetails = {
  referenceId: string;
  applicantName: string;
  email: string;
  phone: string;
  role: string;
  date: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  currentLocation: string;
  qualification: string;
  totalExperience: string;
  medicalCouncilRegistrationNo: string;
  noticePeriod: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  currentLocation: "",
  qualification: "",
  totalExperience: "",
  medicalCouncilRegistrationNo: "",
  noticePeriod: "",
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
    currentLocation: false,
    qualification: false,
    totalExperience: false,
    medicalCouncilRegistrationNo: false,
    noticePeriod: false,
    message: false,
    resume: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<SubmittedDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const errors = useMemo(() => {
    const name = normalizeSpaces(state.name);
    const phone = normalizeSpaces(state.phone);
    const email = normalizeSpaces(state.email);
    const qualification = normalizeSpaces(state.qualification);
    const totalExperience = normalizeSpaces(state.totalExperience);

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
      currentLocation: "",
      qualification:
        qualification.length < 2 ? "Please enter your qualification." : "",
      totalExperience:
        totalExperience.length < 1 ? "Please enter your total experience." : "",
      medicalCouncilRegistrationNo: "",
      noticePeriod: "",
      message: "",
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
      currentLocation: false,
      qualification: false,
      totalExperience: false,
      medicalCouncilRegistrationNo: false,
      noticePeriod: false,
      message: false,
      resume: false,
    });
    setSubmitError("");
    setSubmitted(false);
    setSubmittedDetails(null);
    setCopied(false);
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
      currentLocation: true,
      qualification: true,
      totalExperience: true,
      medicalCouncilRegistrationNo: true,
      noticePeriod: true,
      message: true,
      resume: true,
    });

    if (hasAnyError || !resumeFile || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");

    try {
      const resumeUrl = await uploadResume(resumeFile);

      const applicantName = normalizeSpaces(state.name);
      const applicantEmail = normalizeSpaces(state.email);
      const applicantPhone = normalizeSpaces(state.phone);

      const result = await submitForm({
        type: "job_application",
        jobSlug,
        jobTitle,
        name: applicantName,
        phone: applicantPhone,
        email: applicantEmail,
        currentLocation: normalizeSpaces(state.currentLocation),
        qualification: normalizeSpaces(state.qualification),
        totalExperience: normalizeSpaces(state.totalExperience),
        medicalCouncilRegistrationNo: normalizeSpaces(state.medicalCouncilRegistrationNo),
        noticePeriod: normalizeSpaces(state.noticePeriod),
        message: normalizeSpaces(state.message),
        resumeUrl,
      });

      const referenceId =
        typeof result.referenceId === "string" ? result.referenceId : null;

      setSubmittedDetails({
        referenceId: referenceId ?? `APP-${Date.now().toString().slice(-6)}`,
        applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        role: jobTitle,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });

      setSubmitted(true);
      setState(INITIAL_STATE);
      setResumeFile(null);
      setTouched({
        name: false,
        email: false,
        phone: false,
        currentLocation: false,
        qualification: false,
        totalExperience: false,
        medicalCouncilRegistrationNo: false,
        noticePeriod: false,
        message: false,
        resume: false,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-900";
  const requiredMark = <span className="text-red-600">*</span>;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        {submitted && submittedDetails ? (
          <div className="py-2 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
              <CheckCircle2 className="h-9 w-9 text-emerald-600 animate-in zoom-in-75 duration-300" />
            </div>

            <DialogTitle className="text-2xl font-bold text-slate-900">
              Application Submitted!
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm text-slate-600">
              Your application for <span className="font-semibold text-slate-900">{submittedDetails.role}</span> has been received successfully.
            </DialogDescription>

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
                  <p className="font-medium text-slate-800">{submittedDetails.applicantName}</p>
                </div>
                <div>
                  <span className="text-slate-500">Current Status</span>
                  <p className="font-medium text-emerald-700 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Received &amp; Under Review
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Position Applied</span>
                  <p className="font-medium text-slate-800">{submittedDetails.role}</p>
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
                <li>A confirmation record has been logged for <strong className="text-slate-700">{submittedDetails.email}</strong>.</li>
                <li>Our HR talent acquisition team will review your qualifications and reach out if shortlisted.</li>
                <li>Please quote reference <strong className="text-slate-800 font-mono">{submittedDetails.referenceId}</strong> if you contact HR regarding this application.</li>
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
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
            <label className={labelClass} htmlFor="apply-name">
              Full Name {requiredMark}
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
              <label className={labelClass} htmlFor="apply-email">
                Email {requiredMark}
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
              <label className={labelClass} htmlFor="apply-phone">
                Phone {requiredMark}
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
            <label className={labelClass} htmlFor="apply-location">
              Current Location
            </label>
            <input
              id="apply-location"
              value={state.currentLocation}
              onChange={(e) =>
                setState((prev) => ({ ...prev, currentLocation: e.target.value }))
              }
              onBlur={() => setTouched((prev) => ({ ...prev, currentLocation: true }))}
              className={inputClass}
              placeholder="City, state"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="apply-qualification">
                Qualification {requiredMark}
              </label>
              <input
                id="apply-qualification"
                value={state.qualification}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, qualification: e.target.value }))
                }
                onBlur={() => setTouched((prev) => ({ ...prev, qualification: true }))}
                className={inputClass}
                placeholder="e.g. MBBS, MD Radiology"
              />
              {fieldError("qualification") ? (
                <p className="mt-1 text-xs text-red-600">{fieldError("qualification")}</p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="apply-experience">
                Total Experience {requiredMark}
              </label>
              <input
                id="apply-experience"
                value={state.totalExperience}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, totalExperience: e.target.value }))
                }
                onBlur={() => setTouched((prev) => ({ ...prev, totalExperience: true }))}
                className={inputClass}
                placeholder="e.g. 8 years"
              />
              {fieldError("totalExperience") ? (
                <p className="mt-1 text-xs text-red-600">{fieldError("totalExperience")}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="apply-mci">
                Medical Council Registration No.
              </label>
              <p className="mb-1.5 text-xs text-slate-500">Doctors only</p>
              <input
                id="apply-mci"
                value={state.medicalCouncilRegistrationNo}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    medicalCouncilRegistrationNo: e.target.value,
                  }))
                }
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, medicalCouncilRegistrationNo: true }))
                }
                className={inputClass}
                placeholder="Registration number"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="apply-notice">
                Notice Period
              </label>
              <input
                id="apply-notice"
                value={state.noticePeriod}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, noticePeriod: e.target.value }))
                }
                onBlur={() => setTouched((prev) => ({ ...prev, noticePeriod: true }))}
                className={inputClass}
                placeholder="e.g. 30 days"
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="apply-message">
              Message
            </label>
            <textarea
              id="apply-message"
              value={state.message}
              onChange={(e) => setState((prev) => ({ ...prev, message: e.target.value }))}
              onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
              rows={3}
              className={cn(inputClass, "resize-y")}
              placeholder="Any additional information (optional)"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="apply-resume">
              Resume Upload {requiredMark}
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

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
            {loading ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </>
    )}
  </DialogContent>
</Dialog>
  );
}
