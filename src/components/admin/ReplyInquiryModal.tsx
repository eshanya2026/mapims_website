"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ReplyInquiryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiryId: string;
  candidateName: string;
  recipientEmail: string;
  phone?: string | null;
  medicalCondition?: string | null;
  originalMessage?: string | null;
  currentStatus: string;
  inquiryType: string;
  onReplied?: (updated?: Record<string, unknown>) => void | Promise<void>;
};

type QuickTemplate = {
  label: string;
  subject: string;
  message: string;
};

function getInquiryTypeConfig(type: string, candidateName: string) {
  const safeName = candidateName?.trim() || "Patient";

  if (type === "insurance") {
    return {
      title: "Reply to Insurance Query",
      subtitle: "Send an official response email directly to the patient from Insurance@mapims.org",
      fromLabel: "MAPIMS Insurance Desk <Insurance@mapims.org>",
      fromEmail: "Insurance@mapims.org",
      defaultSubject: `Re: MAPIMS Insurance Desk Query - ${safeName}`,
      phoneFallback: "9499059970",
      queryLabel: "Insurance Query",
      templates: [
        {
          label: "Verification in Progress",
          subject: "Re: Insurance Claim & Policy Verification - In Progress",
          message:
            `Dear ${safeName},\n\nWe have received your insurance query and our Insurance Desk & TPA Cell is currently verifying your policy details with the insurance provider. We will update you shortly regarding your claim eligibility and coverage.\n\nIf you have any urgent queries, feel free to call our direct Insurance Helpline at 9499059970.`,
        },
        {
          label: "Documents / Card Required",
          subject: "Re: MAPIMS Insurance Desk - Additional Documents Required",
          message:
            `Dear ${safeName},\n\nTo proceed with your insurance claim / cashless hospitalization pre-authorization, kindly provide the following documents:\n1. Copy of your Health Insurance e-Card / Policy Document\n2. Patient Photo ID Proof (Aadhaar / PAN / Voter ID)\n3. Doctor Consultation / Admission Slip (if already issued)\n\nYou may reply directly to this email at Insurance@mapims.org with the attached documents or visit our Insurance Helpdesk on campus.`,
        },
        {
          label: "Pre-Auth / Claim Approved",
          subject: "Re: MAPIMS Insurance Desk - Claim Pre-Authorization Update",
          message:
            `Dear ${safeName},\n\nWe are pleased to inform you that your insurance claim / pre-authorization request has been reviewed and processed by our TPA desk. Please visit the Insurance Desk counter at the main hospital reception with your original ID for final verification.\n\nHelpline: 9499059970`,
        },
        {
          label: "General Query Response",
          subject: "Re: MAPIMS Insurance Desk Query Response",
          message:
            `Dear ${safeName},\n\nThank you for reaching out to the MAPIMS Insurance Desk. Regarding your inquiry, our insurance coordinators are available to assist you with all cashless and reimbursement claims across major government and private TPAs.\n\nPlease feel free to contact our direct Insurance Helpline at 9499059970 (Mon–Sat, 8:00 AM – 6:00 PM).`,
        },
      ] as QuickTemplate[],
    };
  }

  if (type === "international") {
    return {
      title: "Reply to International Patient Enquiry",
      subtitle: "Send an official response email directly to the patient from contact@mapims.edu.in",
      fromLabel: "MAPIMS International Patient Desk <contact@mapims.edu.in>",
      fromEmail: "contact@mapims.edu.in",
      defaultSubject: `Re: International Patient Desk - Adhiparasakthi Hospitals - ${safeName}`,
      phoneFallback: "1800 599 0999",
      queryLabel: "International Patient Enquiry",
      templates: [
        {
          label: "Pre-Arrival & Case Review",
          subject: `Re: International Patient Consultation & Review - ${safeName}`,
          message:
            `Dear ${safeName},\n\nThank you for contacting the International Patient Desk at Adhiparasakthi Hospitals (MAPIMS). Our dedicated team assists international patients with specialist doctor evaluations, estimated treatment packages, medical visa invitation letters, and airport transfers.\n\nKindly share your recent medical records and reports by replying directly to this email (contact@mapims.edu.in) so our clinical team can evaluate your case.\n\nWarm regards,\nInternational Patient Coordinator\nAdhiparasakthi Hospitals`,
        },
        {
          label: "Medical Reports Required",
          subject: `Re: Medical Reports Required - International Patient Desk`,
          message:
            `Dear ${safeName},\n\nTo help our specialists review your case and provide an accurate treatment plan and estimate, please reply to this email with your available medical records, diagnostic scans, and current prescriptions.\n\nWarm regards,\nInternational Patient Coordinator\nAdhiparasakthi Hospitals\nEmail: contact@mapims.edu.in`,
        },
        {
          label: "Visa & Travel Assistance",
          subject: `Re: Medical Visa & Travel Assistance - Adhiparasakthi Hospitals`,
          message:
            `Dear ${safeName},\n\nOur International Patient Desk provides complete assistance with Medical Visa invitation letters for you and your attendant, as well as complimentary airport pick-up coordination.\n\nPlease share your passport copy and tentative travel dates so we can issue your official medical visa invitation letter.\n\nWarm regards,\nInternational Patient Coordinator\nAdhiparasakthi Hospitals\nEmail: contact@mapims.edu.in`,
        },
      ] as QuickTemplate[],
    };
  }

  if (type === "appointment") {
    return {
      title: "Reply to Appointment Booking",
      subtitle: "Send an official response email directly to the patient from contact@mapims.edu.in",
      fromLabel: "MAPIMS Appointment Desk <contact@mapims.edu.in>",
      fromEmail: "contact@mapims.edu.in",
      defaultSubject: `Re: Appointment Booking - Adhiparasakthi Hospitals - ${safeName}`,
      phoneFallback: "+91 94990 59966",
      queryLabel: "Appointment Request",
      templates: [
        {
          label: "Slot Confirmed",
          subject: `Re: Appointment Confirmed - Adhiparasakthi Hospitals`,
          message:
            `Dear ${safeName},\n\nThank you for booking an appointment with Adhiparasakthi Hospitals. Your appointment has been scheduled with our doctor.\n\nPlease arrive 15 minutes before your scheduled time at the hospital reception and bring any previous medical records or scan reports.\n\nHelpline: +91 94990 59966\n\nWarm regards,\nAppointment Desk\nAdhiparasakthi Hospitals`,
        },
        {
          label: "Rescheduling Request",
          subject: `Re: Appointment Rescheduling - Adhiparasakthi Hospitals`,
          message:
            `Dear ${safeName},\n\nRegarding your appointment request with Adhiparasakthi Hospitals, we would like to offer an updated time slot that best fits your preference.\n\nPlease reply to this email or call our appointment helpline at +91 94990 59966 to confirm your convenient date and time.\n\nWarm regards,\nAppointment Desk\nAdhiparasakthi Hospitals`,
        },
      ] as QuickTemplate[],
    };
  }

  // Default: "contact" (General Contact Form)
  return {
    title: "Reply to Contact Enquiry",
    subtitle: "Send an official response email directly to the patient from contact@mapims.edu.in",
    fromLabel: "Adhiparasakthi Hospitals <contact@mapims.edu.in>",
    fromEmail: "contact@mapims.edu.in",
    defaultSubject: `Re: Enquiry Response - Adhiparasakthi Hospitals - ${safeName}`,
    phoneFallback: "+91 94990 59966",
    queryLabel: "Patient Enquiry",
    templates: [
      {
        label: "General Response",
        subject: `Re: Response to Your Enquiry - Adhiparasakthi Hospitals`,
        message:
          `Dear ${safeName},\n\nThank you for contacting Adhiparasakthi Hospitals (MAPIMS). Regarding your enquiry, our team has reviewed your message and is glad to assist you.\n\nIf you have any further questions or require immediate support, please feel free to reply directly to this email at contact@mapims.edu.in or call our hospital helpline at +91 94990 59966.\n\nWarm regards,\nPatient Services Team\nAdhiparasakthi Hospitals`,
      },
      {
        label: "OPD & Visit Guidance",
        subject: `Re: Hospital Visit & OPD Timings - Adhiparasakthi Hospitals`,
        message:
          `Dear ${safeName},\n\nThank you for reaching out. Adhiparasakthi Hospitals (MAPIMS) is located on GST Road, Melmaruvathur, Tamil Nadu 603319.\n\nOur Outpatient Department (OPD) functions Monday to Saturday from 8:00 AM to 8:00 PM (Sunday 9:00 AM to 1:00 PM). Emergency, Casualty, Blood Bank, and Pharmacy are open 24/7.\n\nWarm regards,\nPatient Services Team\nAdhiparasakthi Hospitals\nHelpline: +91 94990 59966`,
      },
      {
        label: "Doctor Appointment Info",
        subject: `Re: Doctor Consultation & Appointment - Adhiparasakthi Hospitals`,
        message:
          `Dear ${safeName},\n\nThank you for reaching out to Adhiparasakthi Hospitals. To consult with our specialists across Cardiology, Orthopaedics, General Surgery, Paediatrics, ENT, Ophthalmology, and other departments, you can book an appointment through our website or call +91 94990 59966.\n\nWarm regards,\nPatient Services Team\nAdhiparasakthi Hospitals`,
      },
    ] as QuickTemplate[],
  };
}

export default function ReplyInquiryModal({
  open,
  onOpenChange,
  inquiryId,
  candidateName,
  recipientEmail,
  phone,
  medicalCondition,
  originalMessage,
  currentStatus,
  inquiryType,
  onReplied,
}: ReplyInquiryModalProps) {
  const config = useMemo(
    () => getInquiryTypeConfig(inquiryType, candidateName),
    [inquiryType, candidateName]
  );

  const [subject, setSubject] = useState(config.defaultSubject);
  const [message, setMessage] = useState("");
  const [nextStatus, setNextStatus] = useState<string>("completed");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setSubject(config.defaultSubject);
      setMessage("");
      setError(null);
      setSuccess(false);
    }
  }, [open, config.defaultSubject]);

  function applyTemplate(template: QuickTemplate) {
    setSubject(template.subject);
    setMessage(template.message);
    setError(null);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a reply message before sending.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          subject: subject.trim() || config.defaultSubject,
          status: nextStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reply email.");
      }

      setSuccess(true);
      window.setTimeout(async () => {
        setSuccess(false);
        onOpenChange(false);
        setMessage("");
        setSubject(config.defaultSubject);
        await onReplied?.(data);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                {config.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Send an official response email directly to the patient from{" "}
                <span className="font-semibold text-slate-700">{config.fromEmail}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {success ? (
          <div className="my-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-14 w-14 text-emerald-600 animate-in zoom-in-75 duration-300" />
            <h3 className="mt-3 text-lg font-bold text-slate-900">Email Dispatched!</h3>
            <p className="mt-1 text-sm text-slate-600">
              Reply has been sent to <strong>{recipientEmail}</strong> from{" "}
              <strong>{config.fromEmail}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 pt-2">
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {/* Email Routing Summary Strip */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold">From:</span>
                  <span className="font-mono text-slate-900">
                    {config.fromLabel}
                  </span>
                </div>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                  Verified SMTP
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Mail className="h-4 w-4 text-red-600" />
                  <span className="font-semibold">To (Recipient):</span>
                  <span className="font-semibold text-slate-900">
                    {candidateName} &lt;{recipientEmail}&gt;
                  </span>
                </div>
                {phone ? (
                  <span className="text-slate-500">Phone: <strong>{phone}</strong></span>
                ) : null}
              </div>
            </div>

            {/* Original Query Box */}
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 text-xs">
              <div className="flex items-center justify-between font-semibold text-amber-900 mb-1">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> {config.queryLabel}:
                </span>
                {medicalCondition ? (
                  <span className="font-mono text-amber-800">
                    {inquiryType === "insurance" ? `UHID: ${medicalCondition}` : medicalCondition}
                  </span>
                ) : null}
              </div>
              <p className="text-slate-700 whitespace-pre-wrap italic">
                &ldquo;{originalMessage || "No message provided"}&rdquo;
              </p>
            </div>

            {/* Quick Templates */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Quick Response Templates:
                </label>
                <span className="text-[11px] text-slate-400">Click to fill</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {config.templates.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => applyTemplate(tmpl)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    + {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="reply-subject"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Subject
              </label>
              <input
                id="reply-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Message */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="reply-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Reply Message *
                </label>
                <span className="text-[11px] text-slate-400">
                  {message.length} characters
                </span>
              </div>
              <textarea
                id="reply-message"
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your official response to the patient here..."
                required
                className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-900 leading-relaxed focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Next Status */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Update Status After Sending:
              </label>
              <div className="flex flex-wrap gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="nextStatus"
                    value="completed"
                    checked={nextStatus === "completed"}
                    onChange={(e) => setNextStatus(e.target.value)}
                    className="accent-red-600"
                  />
                  <span className="font-medium text-slate-800">
                    Mark as Completed (Resolved)
                  </span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="nextStatus"
                    value="contacted"
                    checked={nextStatus === "contacted"}
                    onChange={(e) => setNextStatus(e.target.value)}
                    className="accent-red-600"
                  />
                  <span className="font-medium text-slate-800">
                    Mark as Contacted (Pending Follow-up)
                  </span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="nextStatus"
                    value={currentStatus}
                    checked={nextStatus === currentStatus}
                    onChange={(e) => setNextStatus(e.target.value)}
                    className="accent-red-600"
                  />
                  <span className="text-slate-600">
                    Keep Current Status ({currentStatus})
                  </span>
                </label>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !message.trim()}
                className="bg-red-600 hover:bg-red-700 text-white gap-1.5"
              >
                {loading ? (
                  <>Sending Email...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Email to Patient
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
