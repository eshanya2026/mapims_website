"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { mapimsHealthCheckupUrl } from "@/data/site-links";
import {
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Activity,
  FileText,
  Stethoscope,
  Apple,
  Clock,
  ClipboardList,
  AlertCircle,
  CalendarCheck2,
} from "lucide-react";

const checkupPillars = [
  {
    icon: HeartPulse,
    title: "Proactive Health Assessment",
    desc: "Comprehensive health evaluations to assess general health and detect concerns early.",
  },
  {
    icon: Stethoscope,
    title: "Physician Consultations",
    desc: "In-depth reviews with qualified doctors to discuss results and health history.",
  },
  {
    icon: Activity,
    title: "Individualized Screening",
    desc: "Assessments tailored to age, family medical background, and lifestyle factors.",
  },
  {
    icon: Apple,
    title: "Lifestyle & Nutrition Care",
    desc: "Actionable medical advice on diet, physical activity, and long-term wellness habits.",
  },
];

const checkupWorkflow = [
  {
    step: "01",
    title: "Reception & Registration",
    desc: "Smooth morning reception, file verification, token issuance, and vitals assessment.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Coordinated Diagnostics",
    desc: "Comprehensive blood sampling, ECG, digital imaging, and specialized screening tests.",
    icon: Activity,
  },
  {
    step: "03",
    title: "Physician Consultation",
    desc: "Detailed medical evaluation with doctor to review findings and clinical history.",
    icon: Stethoscope,
  },
  {
    step: "04",
    title: "Report & Guidance",
    desc: "Compiled diagnostic summary, preventive advice, and follow-up care recommendations.",
    icon: FileText,
  },
];

const preventiveServicesList = [
  {
    number: "01",
    title: "Comprehensive Health Assessments",
    desc: "Comprehensive health assessments based on individual health needs.",
    icon: HeartPulse,
    badge: "Health Assessment",
  },
  {
    number: "02",
    title: "Preventive Risk Screening",
    desc: "Preventive screening to help identify potential health risks before symptoms develop.",
    icon: ShieldCheck,
    badge: "Early Detection",
  },
  {
    number: "03",
    title: "Medical Consultations",
    desc: "Medical consultations to review health concerns and checkup results in detail.",
    icon: Stethoscope,
    badge: "Doctor Review",
  },
  {
    number: "04",
    title: "Tailored Health Evaluations",
    desc: "Health assessments tailored to age, medical history, and lifestyle.",
    icon: Activity,
    badge: "Personalized",
  },
  {
    number: "05",
    title: "Nutrition & Lifestyle Guidance",
    desc: "Guidance on nutrition, physical activity, and healthy lifestyle habits.",
    icon: Apple,
    badge: "Wellness Care",
  },
  {
    number: "06",
    title: "Follow-Up & Continuity Care",
    desc: "Follow-up consultations and recommendations for further evaluation, when required.",
    icon: CalendarCheck2,
    badge: "Continuity",
  },
];

const preparingInstructions = [
  {
    title: "Follow Preparation Instructions",
    desc: "Follow the preparation instructions provided for your selected checkup package.",
  },
  {
    title: "Carry Previous Medical Records",
    desc: "Carry previous medical reports, prescriptions, and relevant health records.",
  },
  {
    title: "Inform Healthcare Team",
    desc: "Inform the healthcare team about existing medical conditions and current medications.",
  },
  {
    title: "Observe Fasting Protocols",
    desc: "Follow any fasting or other test-specific instructions communicated during appointment booking.",
  },
];

const whyChooseCheckup = [
  {
    title: "Proactive Health Maintenance",
    desc: "A proactive approach to maintaining long-term health and well-being.",
  },
  {
    title: "Qualified Professionals",
    desc: "Health assessments guided by qualified healthcare professionals and specialists.",
  },
  {
    title: "Needs-Based Screening",
    desc: "Screening and consultations designed around individual patient needs.",
  },
  {
    title: "Informed Health Decisions",
    desc: "Medical guidance and clear reporting to support informed health decisions.",
  },
  {
    title: "Follow-Up & Lifestyle Advice",
    desc: "Actionable recommendations for follow-up care and healthy lifestyle practices.",
  },
];

export default function MasterHealthCheckupPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.22),rgba(255,255,255,0))]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />

        <div className="relative container mx-auto px-4 pt-12 pb-16 sm:px-6 lg:pt-16 lg:pb-24">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="font-semibold text-red-400">Master Health Checkup</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Comprehensive Health Checkup Services
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Master Health</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                    Checkup
                  </span>
                </span>
              </h1>

              <p className="mt-3 text-base font-semibold text-slate-300 md:text-lg">
                Comprehensive Health Checkup Services | Adhiparasakthi Hospitals, Melmaruvathur
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                At Adhiparasakthi Hospitals, Melmaruvathur, we believe that preventive
                healthcare plays an important role in maintaining long-term health and
                well-being. Our Master Health Checkup services help individuals assess
                their general health, identify potential health concerns, and receive
                appropriate medical guidance.
              </p>

              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Our healthcare team supports patients throughout the checkup process,
                from registration and health assessment to medical consultation and
                follow-up recommendations.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={mapimsHealthCheckupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <HeartPulse className="h-4 w-4" />
                  <span>Book Health Checkup</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <CalendarCheck2 className="h-4 w-4 text-red-400" />
                  <span>Book Appointment</span>
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
                    src="/images/services/master-health-checkup-hero.jpg"
                    alt="Master Health Checkup at Adhiparasakthi Hospitals"
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
      <section className="relative -mt-8 z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {checkupPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Checkup Journey / Experience Flow */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <Sparkles className="h-3.5 w-3.5" />
            Seamless Process
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Your Health Checkup Experience
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            We aim to make the health checkup process convenient and comfortable through organized registration, coordinated investigations, and appropriate medical guidance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {checkupWorkflow.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-red-100">{step.step}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Our Preventive Healthcare Services - 6 Cards */}
      <section className="section-padding bg-slate-100/60 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <HeartPulse className="h-3.5 w-3.5" />
              Clinical Scope
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Preventive Healthcare Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Personalized screening and expert consultations helping you protect long-term vitality and health.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preventiveServicesList.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        {svc.badge}
                      </span>
                      <span className="text-xs font-bold text-red-600/80">
                        {svc.number}
                      </span>
                    </div>

                    <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-red-600 pt-3 border-t border-slate-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>Adhiparasakthi Preventive Health</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Experience & Preparing for Checkup - Upgraded Dual Showcase */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <HeartHandshake className="h-3.5 w-3.5" />
            Patient Guidance &amp; Care
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Checkup Journey &amp; Preparation Guidelines
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Everything you need for a smooth, well-organized checkup experience from arrival through doctor review.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Your Health Checkup Experience */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-red-50/25 to-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-red-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600">
                <Sparkles className="h-3.5 w-3.5" />
                Your Experience
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Convenient &amp; Organized Care
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                We aim to make the health checkup process convenient and comfortable
                through organized registration, coordinated investigations, and
                appropriate medical guidance. Our team assists patients with the
                necessary procedures and helps them understand the next steps in
                their healthcare journey.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Organized Registration &amp; Reception</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Minimal waiting time with prompt file setup and dedicated health checkup desk support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Coordinated Same-Day Investigations</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Seamless routing through blood collection, cardiology tests, ultrasound, and digital imaging.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Clear Guidance on Next Steps</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Assisting patients through review consultations and preventive lifestyle recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Preparing for Your Health Checkup */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-red-50/20 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-slate-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
                <AlertCircle className="h-3.5 w-3.5" />
                Preparation Guidelines
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Preparing for Your Health Checkup
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                To help ensure accurate test results and a smooth consultation experience,
                please review these recommended preparation steps prior to your visit:
              </p>

              <div className="mt-8 space-y-3.5">
                {preparingInstructions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Master Health Checkup Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              The Preventive Advantage
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Master Health Checkup Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Proactive, evidence-based health assessments guided by qualified clinical professionals.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseCheckup.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100/70 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
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
                  <HeartPulse className="h-3.5 w-3.5" />
                  Our Preventive Care Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Take a Proactive Step Towards Better Health
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we encourage regular health assessments
                  and preventive care to help individuals make informed decisions about
                  their health and well-being. Contact Adhiparasakthi Hospitals to learn
                  more about our Master Health Checkup services and available packages.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <a
                  href={mapimsHealthCheckupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  <span>Book Health Checkup</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
