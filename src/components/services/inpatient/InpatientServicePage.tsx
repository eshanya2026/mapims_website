"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bed,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  Sparkles,
  Stethoscope,
  Pill,
  Users,
  Activity,
  FileCheck2,
  Building2,
} from "lucide-react";

const inpatientPillars = [
  {
    icon: Bed,
    title: "Continuous Observation",
    desc: "Round-the-clock clinical monitoring and supportive care for admitted patients.",
  },
  {
    icon: Building2,
    title: "Comfortable Accommodation",
    desc: "A range of accommodation options to suit patients' needs and preferences.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Nursing Care",
    desc: "Empathetic nursing and compassionate attendant support throughout the stay.",
  },
  {
    icon: Activity,
    title: "Coordinated Treatment",
    desc: "Diagnostic investigations, surgical care, and doctor-guided treatment protocols.",
  },
];

const admissionSteps = [
  {
    step: "01",
    title: "Admission Guidance",
    desc: "Assistance with admission formalities, documentation, room allocation, and patient orientation.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Medical Monitoring & Care",
    desc: "Continuous clinical observation, prescribed medications, diagnostic tests, and doctor reviews.",
    icon: Stethoscope,
  },
  {
    step: "03",
    title: "Surgical & Recovery Support",
    desc: "Specialized pre-operative preparation, surgical coordination, and post-procedure recovery care.",
    icon: Activity,
  },
  {
    step: "04",
    title: "Discharge & Continued Care",
    desc: "Comprehensive discharge summary, clear medication instructions, and scheduled follow-up visits.",
    icon: FileCheck2,
  },
];

const inpatientServicesList = [
  {
    number: "01",
    title: "Hospital Admission",
    desc: "Hospital admission for medical conditions, surgical procedures, and other treatment needs.",
    icon: Bed,
    badge: "Admission",
  },
  {
    number: "02",
    title: "Accommodation Options",
    desc: "A range of accommodation options to suit patients' needs and preferences.",
    icon: Building2,
    badge: "Comfort",
  },
  {
    number: "03",
    title: "Dedicated Nursing Care",
    desc: "Dedicated nursing care and assistance throughout the hospital stay.",
    icon: HeartHandshake,
    badge: "24/7 Care",
  },
  {
    number: "04",
    title: "Medical Monitoring & Treatment",
    desc: "Medical monitoring, treatment, and support as advised by the treating doctor.",
    icon: Activity,
    badge: "Clinical Care",
  },
  {
    number: "05",
    title: "Diagnostics & Medications",
    desc: "Assistance with diagnostic investigations and prescribed medications.",
    icon: Pill,
    badge: "Pharmacy & Lab",
  },
  {
    number: "06",
    title: "Pre & Post-Surgical Care",
    desc: "Care and support for patients before and after surgical procedures.",
    icon: ShieldCheck,
    badge: "Surgical Support",
  },
  {
    number: "07",
    title: "Patient & Attendant Guidance",
    desc: "Guidance for patients and their attendants regarding hospital procedures and care requirements.",
    icon: Users,
    badge: "Family Support",
  },
  {
    number: "08",
    title: "Discharge & Follow-Up Care",
    desc: "Discharge guidance, medication instructions, and follow-up care recommendations.",
    icon: FileCheck2,
    badge: "Continuity",
  },
];

const whyChooseInpatient = [
  {
    title: "Tailored Medical Care",
    desc: "Medical care tailored to individual patient needs and clinical conditions.",
  },
  {
    title: "Experienced Healthcare Professionals",
    desc: "Support from experienced healthcare professionals, specialists, and clinicians.",
  },
  {
    title: "Dedicated Nursing Care",
    desc: "Dedicated nursing care and empathetic patient assistance around the clock.",
  },
  {
    title: "Comfortable Accommodation Options",
    desc: "Comfortable accommodation options designed for restful patient recovery.",
  },
  {
    title: "Guidance Throughout the Stay",
    desc: "Guidance throughout admission, treatment, and discharge processes.",
  },
  {
    title: "Continued Care & Follow-Up",
    desc: "Continued care through structured follow-up consultations and recovery guidance.",
  },
];

export default function InpatientServicePage() {
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
            <span className="font-semibold text-red-400">Inpatient Service</span>
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
                Inpatient Admission &amp; Hospital Care
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Comprehensive</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                    Inpatient Services
                  </span>{" "}
                  (IPD)
                </span>
              </h1>

              <p className="mt-3 text-base font-semibold text-slate-300 md:text-lg">
                Inpatient Admission &amp; Hospital Care | Adhiparasakthi Hospitals, Melmaruvathur
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                The Inpatient Department (IPD) at Adhiparasakthi Hospitals,
                Melmaruvathur, provides comprehensive medical care for patients who
                require hospital admission, continuous observation, medical
                treatment, or surgical procedures. Our team is committed to
                ensuring patient comfort, safety, and well-being throughout the
                hospital stay.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Plan Hospital Admission
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
                    src="/images/services/inpatient-room-hero.jpg"
                    alt="Inpatient Care and Hospital Admission at Adhiparasakthi Hospitals"
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

      {/* 2. Key Inpatient Pillars */}
      <section className="relative -mt-8 z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inpatientPillars.map((pillar, idx) => {
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

      {/* 3. Patient Journey / Inpatient Stay Flow */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <Sparkles className="h-3.5 w-3.5" />
            Seamless Inpatient Experience
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Admission &amp; Hospital Care Journey
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            From arrival and room orientation to continuous clinical care, pre/post-operative support, and discharge guidance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, idx) => {
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

      {/* 4. Our Inpatient Services - 8 Key Cards */}
      <section className="section-padding bg-slate-100/60 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Bed className="h-3.5 w-3.5" />
              Clinical Scope
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Inpatient Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Comprehensive hospitalization services designed around patient safety, compassionate nursing, and high clinical standards.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inpatientServicesList.map((svc, idx) => {
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
                    <span>Adhiparasakthi IPD Care</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Patient Comfort & Support + Admission & Discharge Assistance */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <HeartHandshake className="h-3.5 w-3.5" />
            Patient Experience &amp; Assistance
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Comfort, Care &amp; Guidance Throughout Your Stay
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Ensuring patient safety, peaceful recovery, and clear communication for families from admission to discharge.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Patient Comfort & Support */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-red-50/25 to-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-red-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600">
                <HeartHandshake className="h-3.5 w-3.5" />
                Patient Well-Being
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Patient Comfort &amp; Support
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                We strive to provide a clean, comfortable, and supportive environment
                for patients during their hospital stay. Our healthcare team assists
                patients with their care needs and helps families understand the
                treatment and recovery process.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Bed className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Serene &amp; Clean Accommodation</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Hygienic, comfortable wards and private room choices designed for peaceful healing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Attentive Nursing Assistance</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Compassionate nursing staff assisting patients with all clinical and daily care needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Family Updates &amp; Education</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Helping families clearly understand every stage of the treatment and recovery process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Admission & Discharge Assistance */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-red-50/20 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-slate-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
                <FileCheck2 className="h-3.5 w-3.5" />
                Formalities &amp; Care Guidance
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Admission &amp; Discharge Assistance
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Our team guides patients and their attendants through the admission
                process, explains the necessary formalities, and provides assistance
                with discharge procedures. Patients receive relevant instructions
                regarding medications, follow-up visits, and continued care after discharge.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <ClipboardCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Seamless Admission Formalities</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Clear guidance for patients and attendants through registration desks and documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Prescription &amp; Discharge Briefing</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Detailed medication schedules, dietary advice, and post-discharge recovery guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <FileCheck2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Scheduled Follow-Up Consultations</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Structured follow-up visit dates supporting smooth continuity of care at home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Inpatient Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Patient-Centred Hospitalization
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Inpatient Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Committed to providing compassionate inpatient care in a supportive environment, helping patients and their families feel informed and cared for at every stage.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseInpatient.map((item, idx) => (
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

          {/* Hospital Commitment Banner */}
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Our Inpatient Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Compassionate Hospital Care at Every Stage
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we are committed to providing
                  compassionate inpatient care in a supportive environment,
                  helping patients and their families feel informed and cared for
                  at every stage of their hospital journey.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Contact Admissions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
