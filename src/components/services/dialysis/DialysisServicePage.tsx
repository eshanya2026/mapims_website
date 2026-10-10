"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Clock,
  HeartPulse,
  Droplets,
  Calendar,
  Building2,
  Stethoscope,
  Sparkle,
  Zap,
} from "lucide-react";

const dialysisPillars = [
  {
    icon: Droplets,
    title: "Hemodialysis Care",
    desc: "Dedicated kidney support with monitored blood purification and electrolyte balancing.",
  },
  {
    icon: ShieldCheck,
    title: "Infection Prevention",
    desc: "Rigorous sterilization and dedicated protocols for sensitive patient conditions.",
  },
  {
    icon: HeartPulse,
    title: "ICU Renal Support",
    desc: "Continuous dialysis capabilities for critically ill patients in Intensive Care Units.",
  },
  {
    icon: HeartHandshake,
    title: "Continuous Nursing",
    desc: "Attentive clinical support and personal monitoring throughout every dialysis session.",
  },
];

const dialysisWorkflow = [
  {
    step: "01",
    title: "Pre-Dialysis Assessment",
    desc: "Clinical evaluation of weight, blood pressure, access site, and personalized fluid targets.",
    icon: Stethoscope,
  },
  {
    step: "02",
    title: "Machine Priming & Setup",
    desc: "Strict aseptic connection to specialized dialyzers configured for patient-specific parameters.",
    icon: Droplets,
  },
  {
    step: "03",
    title: "Monitored Session",
    desc: "Continuous real-time vital observation and nursing assistance throughout the filtration cycle.",
    icon: Activity,
  },
  {
    step: "04",
    title: "Post-Dialysis Care",
    desc: "Access care, vital stabilization, session recovery, and future schedule guidance.",
    icon: HeartHandshake,
  },
];

const dialysisServicesList = [
  {
    number: "01",
    title: "Kidney Function Support",
    desc: "Hemodialysis treatment for patients who require kidney function support.",
    icon: Droplets,
    badge: "Hemodialysis",
  },
  {
    number: "02",
    title: "Condition-Guided Care",
    desc: "Dialysis care guided by the patient's medical condition and personalized treatment plan.",
    icon: Activity,
    badge: "Personalized",
  },
  {
    number: "03",
    title: "ICU Dialysis Support",
    desc: "Dialysis support for eligible critically ill patients in the Intensive Care Unit (ICU).",
    icon: HeartPulse,
    badge: "Critical Care",
  },
  {
    number: "04",
    title: "Infection-Control Precautions",
    desc: "Dedicated arrangements for patients who require special infection-control precautions.",
    icon: ShieldCheck,
    badge: "Safety Protocols",
  },
  {
    number: "05",
    title: "Nursing Assistance",
    desc: "Assistance and dedicated nursing support throughout the entire dialysis procedure.",
    icon: HeartHandshake,
    badge: "Clinical Nursing",
  },
  {
    number: "06",
    title: "Treatment Journey Guidance",
    desc: "Ongoing care and guidance to support patients during their long-term treatment journey.",
    icon: Clock,
    badge: "Ongoing Support",
  },
];

const whyChooseDialysis = [
  {
    title: "Dedicated Care for Hemodialysis",
    desc: "Focused renal care and blood purification delivered with compassion and professional rigor.",
  },
  {
    title: "Individual Clinical Needs",
    desc: "Dialysis parameters customized to the unique medical history, fluid targets, and lab profiles of each patient.",
  },
  {
    title: "Continuous Nursing Assistance",
    desc: "Attentive bedside monitoring by trained dialysis nurses throughout every minute of treatment.",
  },
  {
    title: "Rigorous Hygiene & Infection Control",
    desc: "Stringent machine disinfection, sterile water treatment, and specialized patient safeguards.",
  },
  {
    title: "Hospital-Backed Renal Care",
    desc: "Seamless nephrology, laboratory, and critical care backup within Adhiparasakthi Hospitals.",
  },
];

export default function DialysisServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28 pb-16 lg:pt-36 lg:pb-24 text-white">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-red-500/10 blur-[100px]" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-red-400 font-semibold">
              Dialysis Services (Hemodialysis)
            </span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-red-400" />
                Renal Care &amp; Hemodialysis Services | Adhiparasakthi Hospitals
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-red-500">Dialysis Services</span>{" "}
                <span className="text-slate-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  (Hemodialysis)
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                The Dialysis Centre at Adhiparasakthi Hospitals, Melmaruvathur,
                provides hemodialysis services for patients with kidney failure
                and other conditions requiring renal support. Our team focuses
                on delivering safe, supportive, and patient-centred care to help
                patients manage their treatment needs and maintain their
                quality of life.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Book Dialysis Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Building2 className="h-4 w-4 text-red-400" />
                  <span>Contact Hospital Desk</span>
                </Link>
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
                    src="/images/services/dialysis-hemodialysis-hero.png"
                    alt="Hemodialysis Machine and Treatment at Adhiparasakthi Hospitals"
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
      <section className="relative z-10 -mt-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dialysisPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed sm:text-sm">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 4-Stage Treatment Journey */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Sparkles className="h-3.5 w-3.5" />
              Treatment Journey
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Hemodialysis Session Workflow
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              A carefully structured and monitored process prioritizing patient
              comfort, hygiene, and clinical safety.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dialysisWorkflow.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-red-600/40">
                    {item.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Dialysis Services (Exact user list) */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Droplets className="h-3.5 w-3.5" />
              Comprehensive Care
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Dialysis Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Safe, supportive, and patient-centred renal care delivered by an
              experienced clinical team.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dialysisServicesList.map((service, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 transition-all hover:border-red-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100/80 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                    {service.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-Depth Dual Showcase Section */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left Showcase: Our Dialysis Centre */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <Building2 className="h-3.5 w-3.5" />
                Centre Facilities
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Our Dialysis Centre
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Our centre is equipped to support patients requiring
                hemodialysis, with a focus on appropriate treatment procedures,
                infection prevention, and patient comfort. The care team works
                to support continuity of treatment according to each
                patient&apos;s clinical needs.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Appropriate Treatment Procedures
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Standardized clinical protocols adhering strictly to
                      prescribed fluid removal and dialyzer clearance rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Infection Prevention &amp; Safety
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Dedicated isolation arrangements, rigorous machine
                      disinfection, and strict sterile barrier standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Patient Comfort &amp; Continuity
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Ergonomic dialysis recliners and scheduled slots ensuring
                      seamless treatment continuity week after week.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Showcase: Patient Care & Support */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <HeartPulse className="h-3.5 w-3.5" />
                Compassionate Assistance
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Patient Care &amp; Support
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                We understand that dialysis is often an ongoing treatment
                requiring regular hospital visits. Our team aims to provide a
                supportive environment, assist patients throughout their
                sessions, and offer guidance regarding treatment schedules and
                follow-up care.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Supportive Session Environment
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      A calm, caring atmosphere designed to reduce patient
                      fatigue and stress during routine therapy visits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Flexible Schedule Planning
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Personalized scheduling coordination ensuring dependable
                      and recurring dialysis timing for families.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Follow-Up &amp; Care Guidance
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Regular clinical reviews, nutritional recommendations, and
                      guidance for vascular access maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Dialysis Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Quality Care
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Dialysis Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Safe, supportive, and dedicated clinical support for every patient
              requiring renal care.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseDialysis.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100/70 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Hospital Commitment Banner (Last Position) */}
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <Droplets className="h-3.5 w-3.5" />
                  Our Renal Care Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Compassionate Renal Care &amp; Support
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we are committed to providing
                  compassionate renal care and supporting patients throughout
                  their dialysis journey. For information about dialysis
                  services, treatment availability, and appointments, please
                  contact Adhiparasakthi Hospitals directly.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Contact Hospital Desk
                </Link>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Calendar className="h-4 w-4" />
                  Dialysis Appointments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
