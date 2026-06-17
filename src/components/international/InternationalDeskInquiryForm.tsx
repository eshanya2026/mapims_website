"use client";

import { useMemo, useRef, useState } from "react";
import { FileUp, Phone, Send, X } from "lucide-react";
import { internationalDesk } from "@/data/international-patients";
import {
  INTERNATIONAL_DOCUMENT_MAX_FILES,
  INTERNATIONAL_DOCUMENT_MAX_SIZE,
  uploadInternationalDocument,
  validateInternationalDocument,
} from "@/lib/international-document-upload";
import { cn } from "@/lib/utils";
import { submitForm } from "@/lib/submit-form";

type FormState = {
  name: string;
  country: string;
  email: string;
  phone: string;
  medicalCondition: string;
  message: string;
};

type PendingDocument = {
  id: string;
  file: File;
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

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-600/15";

export default function InternationalDeskInquiryForm() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [documents, setDocuments] = useState<PendingDocument[]>([]);
  const [documentError, setDocumentError] = useState("");
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    country: false,
    email: false,
    phone: false,
    medicalCondition: false,
    message: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);
  const savedInquiryKeyRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const errors = useMemo(() => {
    const name = trim(state.name);
    const phone = trim(state.phone);
    const email = trim(state.email);
    const message = trim(state.message);

    return {
      name: name.length < 2 ? "Please enter your name." : "",
      country: "",
      email:
        email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Please enter a valid email."
          : "",
      phone:
        phone.length < 7 || !/^[0-9+() -]{7,}$/.test(phone)
          ? "Please enter a valid phone number."
          : "",
      medicalCondition: "",
      message: message.length < 10 ? "Please add your message." : "",
    };
  }, [state]);

  const callbackErrors = useMemo(() => {
    const name = trim(state.name);
    const phone = trim(state.phone);

    return {
      name: name.length < 2 ? "Please enter your name." : "",
      phone:
        phone.length < 7 || !/^[0-9+() -]{7,}$/.test(phone)
          ? "Please enter a valid phone number."
          : "",
    };
  }, [state]);

  const hasError = Object.values(errors).some(Boolean);
  const hasCallbackError = Object.values(callbackErrors).some(Boolean);

  const markAllTouched = () =>
    setTouched({
      name: true,
      country: true,
      email: true,
      phone: true,
      medicalCondition: true,
      message: true,
    });

  const markCallbackTouched = () =>
    setTouched((prev) => ({ ...prev, name: true, phone: true }));

  function inquiryPayload(
    documentUrls: string[],
    options?: { callback?: boolean }
  ) {
    const message = trim(state.message);
    const callbackNote = "[Callback requested — please call the patient back]";
    const body =
      options?.callback && message.length < 10
        ? "Please call me back regarding my international patient inquiry."
        : message;

    return {
      type: "international" as const,
      name: trim(state.name),
      country: trim(state.country),
      email: trim(state.email),
      phone: trim(state.phone),
      medicalCondition: trim(state.medicalCondition),
      message: options?.callback ? `${callbackNote}\n\n${body}` : body,
      documentUrls,
    };
  }

  function inquiryKey(documentUrls: string[], options?: { callback?: boolean }) {
    return JSON.stringify(inquiryPayload(documentUrls, options));
  }

  async function uploadSelectedDocuments() {
    const urls: string[] = [];

    for (const document of documents) {
      const url = await uploadInternationalDocument(document.file);
      urls.push(url);
    }

    return urls;
  }

  async function saveInquiry(options?: { callback?: boolean }) {
    const documentUrls = documents.length > 0 ? await uploadSelectedDocuments() : [];
    const key = inquiryKey(documentUrls, options);

    if (savedInquiryKeyRef.current === key) {
      return;
    }

    await submitForm(inquiryPayload(documentUrls, options));
    savedInquiryKeyRef.current = key;
  }

  function resetForm() {
    savedInquiryKeyRef.current = null;
    setState(INITIAL);
    setDocuments([]);
    setDocumentError("");
    setTouched({
      name: false,
      country: false,
      email: false,
      phone: false,
      medicalCondition: false,
      message: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function addDocuments(fileList: FileList | null) {
    if (!fileList?.length) return;

    setDocumentError("");
    const next: PendingDocument[] = [];
    const errors: string[] = [];

    for (const file of Array.from(fileList)) {
      if (documents.length + next.length >= INTERNATIONAL_DOCUMENT_MAX_FILES) {
        errors.push(`You can upload up to ${INTERNATIONAL_DOCUMENT_MAX_FILES} documents.`);
        break;
      }

      const validationError = validateInternationalDocument(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
        continue;
      }

      const duplicate = [...documents, ...next].some(
        (item) =>
          item.file.name === file.name &&
          item.file.size === file.size &&
          item.file.lastModified === file.lastModified
      );

      if (duplicate) continue;

      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        file,
      });
    }

    if (next.length > 0) {
      setDocuments((prev) => [...prev, ...next]);
    }

    if (errors.length > 0) {
      setDocumentError(errors[0]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeDocument(id: string) {
    setDocuments((prev) => prev.filter((item) => item.id !== id));
    setDocumentError("");
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();
    if (hasError || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");
    setSuccessMessage("");
    setDocumentError("");

    try {
      await saveInquiry();
      setSuccessMessage(
        "Thank you. Our international patient desk has received your inquiry."
      );
      resetForm();
      setTimeout(() => setSuccessMessage(""), 6000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit your inquiry."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const onRequestCallback = async () => {
    markCallbackTouched();
    if (hasCallbackError || submittingRef.current || loading) return;

    submittingRef.current = true;
    setLoading(true);
    setSubmitError("");
    setSuccessMessage("");
    setDocumentError("");

    try {
      await saveInquiry({ callback: true });
      setSuccessMessage(
        `Thank you! Our international desk will call you back shortly at ${trim(state.phone)}.`
      );
      resetForm();
      setTimeout(() => setSuccessMessage(""), 8000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit your callback request."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const err = (key: keyof FormState) => (touched[key] ? errors[key] : "");
  const callbackErr = (key: keyof typeof callbackErrors) =>
    touched[key] ? callbackErrors[key] : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-6 md:p-7">
      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
        Inquiry Form
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Share your details and our international coordinators will respond. You
        can also request a call back at {internationalDesk.phoneDisplay}.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" aria-busy={loading}>
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
            {err("name") || callbackErr("name") ? (
              <p className="mt-1 text-xs text-red-600">{err("name") || callbackErr("name")}</p>
            ) : null}
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
              Email
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
              Phone <span className="text-red-600">*</span>
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
            {err("phone") || callbackErr("phone") ? (
              <p className="mt-1 text-xs text-red-600">{err("phone") || callbackErr("phone")}</p>
            ) : null}
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

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-900" htmlFor="intl-inq-documents">
              Medical reports &amp; documents
            </label>
            <p className="mb-2 text-xs text-slate-500">
              Upload multiple files in any format (PDF, images, Word, ZIP, DICOM, etc.). Up to{" "}
              {INTERNATIONAL_DOCUMENT_MAX_FILES} files, {formatFileSize(INTERNATIONAL_DOCUMENT_MAX_SIZE)} each.
            </p>
            <div
              className={cn(
                "rounded-xl border border-dashed px-4 py-4 transition-colors",
                documentError ? "border-red-300 bg-red-50/50" : "border-slate-200 bg-slate-50/50"
              )}
            >
              <input
                ref={fileInputRef}
                id="intl-inq-documents"
                type="file"
                multiple
                className="sr-only"
                onChange={(e) => addDocuments(e.target.files)}
              />

              {documents.length > 0 ? (
                <ul className="space-y-2">
                  {documents.map((document) => (
                    <li
                      key={document.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2 text-sm text-slate-700">
                        <FileUp className="h-4 w-4 shrink-0 text-red-600" />
                        <span className="truncate">{document.file.name}</span>
                        <span className="shrink-0 text-xs text-slate-400">
                          {formatFileSize(document.file.size)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(document.id)}
                        className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                        aria-label={`Remove ${document.file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={documents.length >= INTERNATIONAL_DOCUMENT_MAX_FILES || loading}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FileUp className="h-4 w-4" />
                {documents.length > 0 ? "Add more documents" : "Choose documents"}
              </button>
            </div>
            {documentError ? (
              <p className="mt-1 text-xs text-red-600">{documentError}</p>
            ) : null}
          </div>
        </div>

        {submitError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{submitError}</p>
        ) : null}
        {successMessage ? (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            {successMessage}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
          <button
            type="button"
            onClick={onRequestCallback}
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Phone className="h-4 w-4" />
            {loading ? "Submitting..." : "Request a Call Back"}
          </button>
        </div>
      </form>
    </div>
  );
}
