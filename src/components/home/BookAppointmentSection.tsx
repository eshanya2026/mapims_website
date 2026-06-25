"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";

import AppointmentScheduleFields from "@/components/home/AppointmentScheduleFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { departments } from "@/data/departments";
import {
  getBookableTimeSlotsForDate,
} from "@/data/appointment-slots";
import { useBookedAppointmentSlots } from "@/hooks/use-booked-appointment-slots";
import { useDepartmentAppointmentSchedule } from "@/hooks/use-department-appointment-schedule";
import { DEFAULT_APPOINTMENT_DEPARTMENT_SLUG } from "@/lib/department-utils";
import { submitForm } from "@/lib/submit-form";

export default function BookAppointmentSection() {
  const [now, setNow] = useState(() => new Date());
  const [bookedRefreshKey, setBookedRefreshKey] = useState(0);
  const [selectedDepartmentSlug, setSelectedDepartmentSlug] = useState(
    DEFAULT_APPOINTMENT_DEPARTMENT_SLUG
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [appointmentReferenceId, setAppointmentReferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const { schedule, loading: scheduleLoading } =
    useDepartmentAppointmentSchedule(selectedDepartmentSlug);
  const { bookedByDate, refreshBookedSlots } = useBookedAppointmentSlots(
    now,
    selectedDepartmentSlug,
    schedule,
    bookedRefreshKey
  );

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const handleDepartmentChange = (departmentSlug: string) => {
    setSelectedDepartmentSlug(departmentSlug);
    setSelectedDate("");
    setSelectedTime("");
    setBookedRefreshKey((value) => value + 1);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const slots = getBookableTimeSlotsForDate(
      date,
      now,
      bookedByDate[date] ?? [],
      schedule
    );
    if (slots[0]) setSelectedTime(slots[0]);
  };

  const resetForm = () => {
    const freshNow = new Date();
    setNow(freshNow);
    setSelectedDepartmentSlug(DEFAULT_APPOINTMENT_DEPARTMENT_SLUG);
    setSelectedDate("");
    setSelectedTime("");
    setSubmitted(false);
    setAppointmentReferenceId(null);
    setError("");
    formRef.current?.reset();
    setBookedRefreshKey((value) => value + 1);
  };

  const selectedSlotIsBooked = (bookedByDate[selectedDate] ?? []).includes(selectedTime);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current || loading || !selectedDepartmentSlug) return;

    submittingRef.current = true;
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const result = await submitForm({
        type: "appointment",
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        departmentSlug: selectedDepartmentSlug,
        date: selectedDate,
        time: selectedTime,
        message: String(formData.get("message") ?? ""),
      });

      setAppointmentReferenceId(
        typeof result.referenceId === "string" ? result.referenceId : null
      );
      setSubmitted(true);
      formRef.current?.reset();
      setBookedRefreshKey((value) => value + 1);
      await refreshBookedSlots();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your request."
      );
      await refreshBookedSlots();
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <section
      id="book-appointment"
      className="section-padding bg-gradient-to-b from-slate-50 via-white to-red-50/30"
    >
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-6xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-10 bg-red-600 sm:w-12" />
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 sm:text-sm">
              Patient Services
            </span>
            <div className="h-[2px] w-10 bg-red-600 sm:w-12" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Book an <span className="text-red-600">Appointment</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Choose your department, pick an available slot, and share your details. Walk-ins are
            also welcome during OPD hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 sm:rounded-3xl sm:shadow-xl"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 sm:h-11 sm:w-11">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">
                  Appointment Request
                </h3>
                <p className="text-sm text-white/85">
                  General Medicine is selected by default — change department to see other
                  schedules
                </p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="space-y-5 p-6 text-center sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Appointment request received
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Thank you. Our patient services team will contact you shortly to confirm
                  your appointment.
                </p>
                {appointmentReferenceId ? (
                  <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      Your appointment reference
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-slate-900">
                      {appointmentReferenceId}
                    </p>
                  </div>
                ) : null}
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-6"
                onClick={resetForm}
              >
                Book another appointment
              </Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} aria-busy={loading}>
              <div className="grid lg:grid-cols-2">
                <div className="border-b border-slate-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Select date &amp; time
                  </p>

                  <AppointmentScheduleFields
                    key={selectedDepartmentSlug}
                    now={now}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    schedule={schedule}
                    bookedByDate={bookedByDate}
                    scheduleLoading={scheduleLoading}
                    onDateChange={handleDateChange}
                    onTimeChange={setSelectedTime}
                  />
                </div>

                <div className="flex flex-col p-4 sm:p-6">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Your details
                  </p>

                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="section-department"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                      >
                        Department / Specialty *
                      </label>
                      <div className="relative">
                        <Stethoscope className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <select
                          id="section-department"
                          name="departmentSlug"
                          required
                          value={selectedDepartmentSlug}
                          onChange={(event) => handleDepartmentChange(event.target.value)}
                          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 transition-colors focus:border-red-600 focus:outline-none focus:ring-3 focus:ring-red-600/20"
                        >
                          {departments.map((department) => (
                            <option key={department.slug} value={department.slug}>
                              {department.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="section-patient-name"
                          className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                        >
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="section-patient-name"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 focus:bg-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="section-patient-phone"
                          className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                        >
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="section-patient-phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="section-patient-email"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="section-patient-email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="section-message"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                      >
                        Reason for Visit
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <textarea
                          id="section-message"
                          name="message"
                          rows={5}
                          placeholder="Briefly describe your symptoms or reason for visit..."
                          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-red-600 focus:outline-none focus:ring-3 focus:ring-red-600/20"
                        />
                      </div>
                    </div>

                    {error ? (
                      <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                      </p>
                    ) : null}

                    <div className="mt-auto space-y-3 pt-2">
                      <Button
                        type="submit"
                        disabled={
                          loading ||
                          !selectedDepartmentSlug ||
                          !schedule.enabled ||
                          !selectedDate ||
                          !selectedTime ||
                          selectedSlotIsBooked
                        }
                        className="h-12 w-full rounded-xl bg-red-600 text-base font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-600/90 hover:shadow-xl"
                      >
                        {loading ? "Submitting..." : "Confirm Appointment"}
                      </Button>

                      <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
                        For emergencies, call{" "}
                        <a href="tel:1066" className="font-bold text-red-600 hover:underline">
                          1066
                        </a>{" "}
                        or ambulance{" "}
                        <a
                          href="tel:+919876543210"
                          className="font-bold text-red-600 hover:underline"
                        >
                          +91 98765 43210
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
