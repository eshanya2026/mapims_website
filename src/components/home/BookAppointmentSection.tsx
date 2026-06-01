"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ShieldCheck, Users, Phone } from "lucide-react";
import AppointmentBookingBox from "@/components/home/AppointmentBookingBox";

const highlights = [
  {
    icon: Clock,
    title: "Quick Scheduling",
    desc: "Book your appointment online in under 2 minutes.",
  },
  {
    icon: Users,
    title: "Expert Specialists",
    desc: "Choose from 250+ doctors across all departments.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Your health information is kept strictly confidential.",
  },
  {
    icon: Phone,
    title: "Instant Confirmation",
    desc: "Receive SMS confirmation once your booking is approved.",
  },
];

export default function BookAppointmentSection() {
  return (
    <section id="book-appointment" className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Section intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-red-600" />
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
                Patient Services
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Book an <span className="text-red-600">Appointment</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Schedule a consultation with our expert doctors at your convenience. Fill in the form and our team will confirm your appointment shortly. Walk-ins are also welcome during OPD hours.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-6">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">OPD Timings</p>
                <p className="text-sm text-slate-600">
                  Monday – Saturday: 8:00 AM – 8:00 PM<br />
                  Sunday: 9:00 AM – 1:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Booking form */}
          <AppointmentBookingBox idPrefix="section-" variant="section" />
        </div>
      </div>
    </section>
  );
}
