"use client";

import { useRef, useState } from "react";
import { submitForm } from "@/lib/submit-form";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Stethoscope,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getAvailableTimeSlotsForDate,
  getDefaultAppointmentDate,
} from "@/data/appointment-slots";

const departments = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Orthopaedics",
  "Oncology",
  "Nephrology",
  "Gastroenterology",
  "Pediatrics",
  "Pulmonology",
  "Dermatology",
  "ENT",
  "Ophthalmology",
  "General Surgery",
  "Emergency",
];

type AppointmentBookingBoxProps = {
  idPrefix?: string;
  variant?: "hero" | "section";
  className?: string;
  selectedDate?: string;
  selectedTime?: string;
  availableTimeSlots?: string[];
  onDateChange?: (date: string) => void;
  onTimeChange?: (time: string) => void;
  onSubmitted?: () => void;
  hideDateTimeFields?: boolean;
};

export default function AppointmentBookingBox({
  idPrefix = "",
  variant = "hero",
  className,
  selectedDate,
  selectedTime,
  availableTimeSlots,
  onDateChange,
  onTimeChange,
  onSubmitted,
  hideDateTimeFields = false,
}: AppointmentBookingBoxProps) {
  const [submitted, setSubmitted] = useState(false);
  const [appointmentReferenceId, setAppointmentReferenceId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current || loading) return;

    const form = formRef.current;
    if (!form) return;

    submittingRef.current = true;
    setLoading(true);
    setError("");

    const formData = new FormData(form);

    try {
      const result = await submitForm({
        type: "appointment",
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        department: String(formData.get("department") ?? ""),
        date: String(formData.get("date") ?? ""),
        time: String(formData.get("time") ?? ""),
        message: String(formData.get("message") ?? ""),
      });

      form.reset();
      setAppointmentReferenceId(
        typeof result.referenceId === "string" ? result.referenceId : null
      );
      onSubmitted?.();
      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your request."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const fieldId = (name: string) => `${idPrefix}${name}`;

  const wrapperProps =
    variant === "hero"
      ? {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.2 },
        }
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
        };

  const timeOptions =
    variant === "section" && availableTimeSlots?.length
      ? availableTimeSlots
      : getAvailableTimeSlotsForDate(selectedDate || getDefaultAppointmentDate());

  return (
    <motion.div {...wrapperProps} className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border shadow-xl sm:rounded-3xl sm:shadow-2xl",
          variant === "hero"
            ? "border-white/40 bg-white/95 backdrop-blur-xl"
            : "border-slate-100 bg-white shadow-slate-200/50"
        )}
      >
        <div className="bg-red-600 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white sm:text-lg">
                {variant === "hero" ? "Book an Appointment" : "Appointment Request Form"}
              </h3>
              <p className="text-sm text-white/80">
                {variant === "hero"
                  ? "Schedule your visit in minutes"
                  : "Fill in your details and we will confirm shortly"}
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="space-y-5 p-6 sm:p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
                Appointment request received
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Thank you. Our patient services team has received your request and
                will contact you shortly to confirm your appointment.
              </p>
              {appointmentReferenceId ? (
                <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                    Your appointment reference
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-slate-900">
                    {appointmentReferenceId}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Please quote this ID when you call the hospital.
                  </p>
                </div>
              ) : null}
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl px-6"
              onClick={() => {
                setSubmitted(false);
                setAppointmentReferenceId(null);
              }}
            >
              Book another appointment
            </Button>
          </div>
        ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4 p-4 sm:space-y-5 sm:p-6"
          aria-busy={loading}
        >
          {hideDateTimeFields && selectedDate && selectedTime ? (
            <>
              <input type="hidden" name="date" value={selectedDate} />
              <input type="hidden" name="time" value={selectedTime} />
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Preferred slot
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDate} · {selectedTime}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Update your slot using the date &amp; time picker above.
                </p>
              </div>
            </>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor={fieldId("patient-name")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id={fieldId("patient-name")}
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor={fieldId("patient-phone")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id={fieldId("patient-phone")}
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={fieldId("patient-email")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id={fieldId("patient-email")}
                name="email"
                type="email"
                placeholder="your@email.com"
                className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={fieldId("department")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Department / Specialty *
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
              <select
                id={fieldId("department")}
                name="department"
                required
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm appearance-none focus:outline-none focus:ring-3 focus:ring-red-600/20 focus:border-red-600 transition-colors"
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!hideDateTimeFields ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor={fieldId("appointment-date")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Preferred Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Input
                  id={fieldId("appointment-date")}
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate ?? undefined}
                  onChange={(event) => onDateChange?.(event.target.value)}
                  className="pl-10 h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor={fieldId("time-slot")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Preferred Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
                <select
                  id={fieldId("time-slot")}
                  name="time"
                  required
                  value={selectedTime ?? ""}
                  onChange={(event) => onTimeChange?.(event.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm appearance-none focus:outline-none focus:ring-3 focus:ring-red-600/20 focus:border-red-600 transition-colors"
                >
                  <option value="">Select time</option>
                  {timeOptions.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          ) : null}

          <div className="space-y-1.5">
            <label htmlFor={fieldId("message")} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Reason for Visit
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                id={fieldId("message")}
                name="message"
                rows={3}
                placeholder="Briefly describe your symptoms or reason for visit..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm resize-none focus:outline-none focus:ring-3 focus:ring-red-600/20 focus:border-red-600 transition-colors placeholder:text-slate-400"
              />
            </div>
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-red-600 hover:bg-red-600/90 text-white rounded-xl text-base font-semibold shadow-lg shadow-red-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {loading ? "Submitting..." : "Confirm Appointment"}
          </Button>

          <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
            For emergencies, call{" "}
            <a href="tel:1066" className="font-bold text-red-600 hover:underline">
              1066
            </a>
            <span className="hidden sm:inline"> or ambulance </span>
            <span className="sm:hidden">
              <br />
              or ambulance{" "}
            </span>
            <a href="tel:+919876543210" className="font-bold text-red-600 hover:underline">
              +91 98765 43210
            </a>
          </p>
        </form>
        )}
      </div>
    </motion.div>
  );
}
