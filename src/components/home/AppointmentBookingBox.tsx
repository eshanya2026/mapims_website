"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, Stethoscope, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

type AppointmentBookingBoxProps = {
  idPrefix?: string;
  variant?: "hero" | "section";
  className?: string;
};

export default function AppointmentBookingBox({
  idPrefix = "",
  variant = "hero",
  className,
}: AppointmentBookingBoxProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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

        <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm appearance-none focus:outline-none focus:ring-3 focus:ring-red-600/20 focus:border-red-600 transition-colors"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

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

          <Button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-600/90 text-white rounded-xl text-base font-semibold shadow-lg shadow-red-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {submitted ? "Request Submitted ✓" : "Confirm Appointment"}
          </Button>

          <p className="text-center text-xs text-slate-500">
            For emergencies, call{" "}
            <a href="tel:1066" className="font-bold text-red-600 hover:underline">
              1066
            </a>{" "}
            or ambulance{" "}
            <a href="tel:+919876543210" className="font-bold text-red-600 hover:underline">
              +91 98765 43210
            </a>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
