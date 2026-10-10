"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Activity,
  FileText,
  HeartHandshake,
  UserCheck,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Users,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Accessibility,
} from "lucide-react";

const outpatientPillars = [
  {
    icon: Stethoscope,
    title: "Multi-Specialty OPD",
    desc: "Medical & surgical consultations covering 25+ clinical disciplines.",
  },
  {
    icon: Compass,
    title: "Patient Navigation",
    desc: "Dedicated guidance from registration desk to specialist chambers.",
  },
  {
    icon: Accessibility,
    title: "Elderly & Mobility Support",
    desc: "Wheelchair assistance and compassionate support for senior citizens.",
  },
  {
    icon: Activity,
    title: "Coordinated Diagnostics",
    desc: "Integrated on-site laboratory, ECG, ultrasound, and digital imaging.",
  },
];

const consultationSteps = [
  {
    step: "01",
    title: "Registration & Guidance",
    desc: "Prompt patient registration, digital token generation, and clear directions to the appropriate consulting department.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Specialist Consultation",
    desc: "Comprehensive clinical evaluation, vital signs assessment, and in-depth health discussion with experienced senior doctors.",
    icon: Stethoscope,
  },
  {
    step: "03",
    title: "Diagnostic Investigation",
    desc: "Seamless guidance for necessary blood tests, imaging, and specialized scans as advised by your consulting specialist.",
    icon: Activity,
  },
  {
    step: "04",
    title: "Follow-Up & Care Continuity",
    desc: "Clear prescription guidance, medication counseling, and planned follow-up scheduling to ensure continuous healing.",
    icon: HeartHandshake,
  },
];

const outpatientServicesList = [
  {
    icon: Stethoscope,
    title: "Multi-Specialty Consultations",
    desc: "Medical consultations across various specialties and departments for acute and routine health concerns.",
    tag: "Clinical Care",
  },
  {
    icon: UserCheck,
    title: "Specialist Condition Management",
    desc: "Specialist consultations for the expert evaluation, staging, and tailored management of health conditions.",
    tag: "Specialist Doctors",
  },
  {
    icon: Sparkles,
    title: "Preventive Healthcare & Advice",
    desc: "Preventive healthcare guidance, proactive health screenings, and evidence-based general wellness advice.",
    tag: "Wellness Guidance",
  },
  {
    icon: Compass,
    title: "Registration & Department Direction",
    desc: "Friendly assistance with patient registration, queue navigation, and directions to the appropriate departments.",
    tag: "Patient Navigation",
  },
  {
    icon: Activity,
    title: "Diagnostic Investigation Guidance",
    desc: "Guidance for diagnostic investigations, laboratory testing, and further treatment as advised by the consulting doctor.",
    tag: "Diagnostics Support",
  },
  {
    icon: Clock,
    title: "Follow-Up Care Continuity",
    desc: "Follow-up consultations and review appointments to monitor treatment response and support continuity of care.",
    tag: "Care Continuity",
  },
  {
    icon: Accessibility,
    title: "Elderly & Mobility Assistance",
    desc: "Dedicated patient assistance for elderly individuals, wheelchair users, and those requiring special mobility support.",
    tag: "Compassionate Care",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Visit Support",
    desc: "Courteous guidance and dedicated assistance throughout the outpatient visit from arrival until departure.",
    tag: "Patient Assistance",
  },
];

const whyChoosePoints = [
  {
    title: "Comprehensive Specialty Access",
    desc: "Access to consultations across multiple medical and surgical specialties under one roof.",
  },
  {
    title: "Experienced Healthcare Professionals",
    desc: "Patient-focused care from senior consultants, board-certified physicians, and skilled clinical staff.",
  },
  {
    title: "Dedicated Step-by-Step Guidance",
    desc: "Guidance throughout the outpatient consultation process, from triage to doctor consultation.",
  },
  {
    title: "Comfortable & Supportive Environment",
    desc: "A welcoming, air-conditioned, and supportive environment for patients and their accompanying attendants.",
  },
  {
    title: "Continuity of Medical Care",
    desc: "Assistance with follow-up consultations, scheduled reviews, and coordinated further medical care.",
  },
];

export default function OutpatientServicePage() {
  return (
    <main className="min-h-screen bg-slate-50/60">
      {/* 1. Bespoke OP Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 pt-32 pb-20 text-white md:pt-36 md:pb-28">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-red-600/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="font-semibold text-red-400">
              Outpatient Service (OPD)
            </span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Outpatient Consultation Services
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Comprehensive</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                    Outpatient Services
                  </span>{" "}
                  (OPD)
                </span>
              </h1>

              <p className="mt-3 text-base font-semibold text-slate-300 md:text-lg">
                Outpatient Consultation Services | Adhiparasakthi Hospitals, Melmaruvathur
              </p>

              <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
                The Outpatient Department (OPD) at Adhiparasakthi Hospitals,
                Melmaruvathur, provides patients with access to medical
                consultations, clinical evaluations, and follow-up care across a
                range of medical and surgical specialties. Our team is committed
                to delivering compassionate, patient-centred care in a
                comfortable and supportive environment.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Book OP Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>

            {/* Right Card / Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/services/opd-care-hero.jpg"
                    alt="Outpatient Department Consultation at Adhiparasakthi Hospitals"
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars Strip */}
      <section className="relative z-20 -mt-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outpatientPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3.5 text-base font-bold text-slate-900 group-hover:text-red-700">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Patient Care and Assistance: 4-Step Consultation Journey */}
      <section className="section-padding container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600">
            <Sparkles className="h-3.5 w-3.5" />
            Patient Care and Assistance
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            How We Support Your{" "}
            <span className="text-red-600">Outpatient Consultation</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Our outpatient team helps patients navigate the consultation process,
            from registration to meeting the appropriate specialist. We strive to
            make every visit convenient and comfortable by providing clear
            directions, courteous assistance, and support according to individual
            patient needs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {consultationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-red-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-200">
                      {step.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-red-600 to-rose-400" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Our Outpatient Services (8 Distinct Feature Cards) */}
      <section className="section-padding bg-slate-100/70 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Scope of OP Care
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our <span className="text-red-600">Outpatient Services</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Comprehensive care touchpoints designed for timely diagnosis, expert clinical advice, and stress-free hospital visits.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {outpatientServicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-red-300 hover:shadow-lg"
                >
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-3xl" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-red-600">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-red-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Included in OPD care</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Our Outpatient Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              The Adhiparasakthi Advantage
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our <span className="text-red-600">Outpatient Services?</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Committed to providing accessible, compassionate, and coordinated outpatient care.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoosePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-sm transition hover:bg-white hover:border-red-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100/70 text-red-600 font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-red-600">
                  {point.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Hospital Commitment Banner */}
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Our Outpatient Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Accessible, Compassionate Outpatient Care
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we are committed to supporting
                  the health and well-being of every patient with clear
                  guidance and empathetic clinical care at every stage of their
                  consultation journey.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Book OP Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
