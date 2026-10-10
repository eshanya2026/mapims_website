"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Pill,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Clock,
  ClipboardCheck,
  PackageCheck,
  ThermometerSnowflake,
  FileQuestion,
  HelpCircle,
  Activity,
  HeartPulse,
} from "lucide-react";

const pharmacyPillars = [
  {
    icon: Pill,
    title: "24/7 Medication Access",
    desc: "Uninterrupted dispensing of prescribed medications for outpatient, emergency, and admitted patients.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Safe Handling & Storage",
    desc: "Strict temperature-monitored storage preserving medication potency and clinical safety.",
  },
  {
    icon: ClipboardCheck,
    title: "Prescription Verification",
    desc: "Licensed pharmacists reviewing dosage instructions, administration timings, and precautions.",
  },
  {
    icon: HeartHandshake,
    title: "Patient & Attendant Support",
    desc: "Compassionate guidance addressing prescription queries, dosage clarification, and proper drug usage.",
  },
];

const pharmacyWorkflow = [
  {
    step: "01",
    title: "Prescription Review",
    desc: "Verification of doctor prescription, dosage parameters, and patient-specific instructions.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Accurate Dispensing",
    desc: "Standardized dispensing of authentic medications, surgical consumables, and healthcare essentials.",
    icon: PackageCheck,
  },
  {
    step: "03",
    title: "Dosage Counseling",
    desc: "Clear explanation of administration timings, dietary requirements, and precautions.",
    icon: Pill,
  },
  {
    step: "04",
    title: "Ongoing Assistance",
    desc: "Dedicated support for medication availability queries, refills, and attendant assistance.",
    icon: FileQuestion,
  },
];

const pharmacyServicesList = [
  {
    number: "01",
    title: "Prescription Dispensing",
    desc: "Dispensing of prescribed medications in accordance with applicable regulations.",
    icon: Pill,
    badge: "Dispensing",
  },
  {
    number: "02",
    title: "OPD & Inpatient Support",
    desc: "Support for medication requirements during outpatient consultations and hospital stays.",
    icon: Activity,
    badge: "Clinical Care",
  },
  {
    number: "03",
    title: "Medication Availability",
    desc: "Availability of medicines for various medical conditions, subject to stock.",
    icon: PackageCheck,
    badge: "Availability",
  },
  {
    number: "04",
    title: "Healthcare Essentials",
    desc: "Supply of healthcare essentials and medical consumables, as available.",
    icon: HeartPulse,
    badge: "Consumables",
  },
  {
    number: "05",
    title: "Proper Storage & Handling",
    desc: "Proper storage and handling of medicines in accordance with applicable requirements.",
    icon: ThermometerSnowflake,
    badge: "Storage Safety",
  },
  {
    number: "06",
    title: "Usage & Dosage Guidance",
    desc: "Guidance on medication usage, dosage instructions, and precautions.",
    icon: ClipboardCheck,
    badge: "Counseling",
  },
  {
    number: "07",
    title: "Prescription Queries Support",
    desc: "Assistance with prescription-related queries and medication information.",
    icon: HelpCircle,
    badge: "Patient Support",
  },
];

const whyChoosePharmacy = [
  {
    title: "Prescribed Medication Support",
    desc: "Reliable support for prescribed medication requirements across medical and surgical disciplines.",
  },
  {
    title: "Safety & Proper Storage",
    desc: "Strict attention to medication safety, regulatory compliance, and proper temperature storage.",
  },
  {
    title: "Appropriate Use Guidance",
    desc: "Clear guidance on the appropriate use of medicines, timing, and precautions for patients.",
  },
  {
    title: "Prescription Query Assistance",
    desc: "Responsive assistance with prescription-related queries and medication availability details.",
  },
  {
    title: "Integrated Healthcare Support",
    desc: "Seamless pharmaceutical support as an integral part of the patient's healthcare journey.",
  },
];

export default function PharmacyServicePage() {
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
            <span className="font-semibold text-red-400">24-Hour Pharmacy</span>
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
                Hospital Pharmacy &amp; Prescription Services
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">24-Hour</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                    Pharmacy Services
                  </span>
                </span>
              </h1>

              <p className="mt-3 text-base font-semibold text-slate-300 md:text-lg">
                Hospital Pharmacy &amp; Prescription Services | Adhiparasakthi Hospitals, Melmaruvathur
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                The Pharmacy Services at Adhiparasakthi Hospitals, Melmaruvathur,
                support patients by providing access to prescribed medications and
                pharmaceutical care as part of their treatment. Our pharmacy team
                is committed to safe medication dispensing, appropriate storage,
                and guidance on the proper use of medicines.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Pill className="h-4 w-4" />
                  Contact Hospital Desk
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <HelpCircle className="h-4 w-4 text-red-400" />
                  <span>General Inquiries</span>
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
                    src="/images/services/pharmacy-dispensing-hero.png"
                    alt="24-Hour Pharmacy Services at Adhiparasakthi Hospitals"
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
          {pharmacyPillars.map((pillar, idx) => {
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

      {/* 3. Pharmacy Dispensing Flow */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <Sparkles className="h-3.5 w-3.5" />
            Reliable Dispensing
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Medication Dispensing &amp; Guidance Process
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Structured verification, regulated dispensing, and personalized instructions ensuring patient safety.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pharmacyWorkflow.map((step, idx) => {
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

      {/* 4. Our Pharmacy Services - 7 Key Cards */}
      <section className="section-padding bg-slate-100/60 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Pill className="h-3.5 w-3.5" />
              Scope of Pharmacy
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Pharmacy Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Providing access to prescribed medications, healthcare essentials, and professional guidance.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pharmacyServicesList.map((svc, idx) => {
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
                    <span>Adhiparasakthi Pharmacy</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Safe Medication Practices + Patient Support & Assistance */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            Quality &amp; Patient Support
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Safe Medication Practices &amp; Patient Assistance
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Dedicated to safety, proper storage, and clear medication understanding for every patient.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Safe Medication Practices */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-red-50/25 to-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-red-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Medication Safety
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Safe Medication Practices
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                We recognize the importance of medication safety in patient care.
                Our pharmacy team supports the appropriate dispensing and handling
                of medicines and provides guidance to help patients understand their
                prescriptions, administration instructions, and relevant precautions.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <ClipboardCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Appropriate Dispensing Protocols</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Rigorous checks on prescription validity, dosages, and administration schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <ThermometerSnowflake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Proper Climate &amp; Cold Storage</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Appropriate storage conditions for temperature-sensitive drugs and consumables.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Patient Administration Instructions</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Guidance on correct dosage, administration timings, and important precautions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Patient Support & Assistance */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-red-50/20 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-slate-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
                <HeartHandshake className="h-3.5 w-3.5" />
                Patient Assistance
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Patient Support &amp; Assistance
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Our pharmacy services aim to make access to prescribed medicines
                convenient for patients and their attendants. Patients can seek
                assistance regarding prescriptions, medication availability, and
                instructions for the proper use of medicines.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Convenient Access for Patients</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Easy access for outpatient attendees, emergency cases, and hospital attendants.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <PackageCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Medication Availability Guidance</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Clear communication on stock status and timely support for required prescriptions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <FileQuestion className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Prescription Query Resolution</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Pharmacists readily available to answer medicine-related questions and doubts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Pharmacy Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Quality &amp; Care
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Pharmacy Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Responsible, patient-focused pharmaceutical support throughout your healthcare journey.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoosePharmacy.map((item, idx) => (
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
                  <Pill className="h-3.5 w-3.5" />
                  Our Pharmacy Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Responsible Pharmacy Services &amp; Patient-Focused Guidance
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we strive to support safe and effective
                  treatment through responsible pharmacy services and patient-focused
                  medication guidance. For information about pharmacy services,
                  medication availability, or operating hours, please contact
                  Adhiparasakthi Hospitals directly.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Contact Hospital Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
