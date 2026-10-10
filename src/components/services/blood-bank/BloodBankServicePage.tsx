"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Activity,
  Layers,
  TestTube2,
  Users,
  Clock,
  HeartPulse,
  Syringe,
} from "lucide-react";

const bloodBankPillars = [
  {
    icon: Droplets,
    title: "Blood & Component Access",
    desc: "Facilitating access to blood and blood components for medical, surgical, and emergency care.",
  },
  {
    icon: TestTube2,
    title: "Grouping & Compatibility",
    desc: "Standardized blood grouping, antibody screening, and cross-matching protocols.",
  },
  {
    icon: Activity,
    title: "Clinical Coordination",
    desc: "Seamless collaboration with emergency, intensive care, and surgical theatres.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Quality Protocols",
    desc: "Adherence to safety procedures for donor screening, storage, and compatibility testing.",
  },
];

const bloodBankWorkflow = [
  {
    step: "01",
    title: "Donor Screening & Testing",
    desc: "Health screening, voluntary donor assessment, and mandatory infectious marker testing.",
    icon: Syringe,
  },
  {
    step: "02",
    title: "Component Separation & Storage",
    desc: "Systematic preparation and monitored temperature storage of blood and blood components.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Grouping & Compatibility",
    desc: "Meticulous ABO and Rh grouping, cross-matching, and patient compatibility verification.",
    icon: TestTube2,
  },
  {
    step: "04",
    title: "Clinical Issue & Transfusion",
    desc: "Timely dispatch and coordinated support for medical procedures, surgeries, and emergency needs.",
    icon: HeartPulse,
  },
];

const bloodBankServicesList = [
  {
    number: "01",
    title: "Blood Availability & Issue",
    desc: "Blood availability and issue for patients requiring transfusion, subject to stock and compatibility.",
    icon: Droplets,
    badge: "Transfusion Issue",
  },
  {
    number: "02",
    title: "Grouping & Compatibility Testing",
    desc: "Blood grouping and compatibility testing as required for clinical accuracy and patient safety.",
    icon: TestTube2,
    badge: "Laboratory Testing",
  },
  {
    number: "03",
    title: "Blood Components Availability",
    desc: "Availability of blood components, subject to the facilities and services provided by the hospital.",
    icon: Layers,
    badge: "Components",
  },
  {
    number: "04",
    title: "Medical & Surgical Support",
    desc: "Support for blood transfusion requirements during medical treatment, surgical procedures, and emergencies.",
    icon: Activity,
    badge: "Clinical Care",
  },
  {
    number: "05",
    title: "Department Coordination",
    desc: "Coordination with clinical departments to support timely blood transfusion services across the hospital.",
    icon: Clock,
    badge: "24/7 Support",
  },
  {
    number: "06",
    title: "Patient & Family Guidance",
    desc: "Guidance for patients and families regarding blood requirements and transfusion procedures.",
    icon: Users,
    badge: "Family Counseling",
  },
  {
    number: "07",
    title: "Voluntary Blood Donation",
    desc: "Support for voluntary blood donation initiatives, where organized by the hospital.",
    icon: HeartHandshake,
    badge: "Community Initiative",
  },
];

const whyChooseBloodBank = [
  {
    title: "Support for Transfusion Patients",
    desc: "Dedicated support for patients requiring blood transfusions during routine care and critical situations.",
  },
  {
    title: "Safety & Quality Procedures",
    desc: "Strict attention to blood safety and quality procedures at every phase of processing and issue.",
  },
  {
    title: "Clinical Department Coordination",
    desc: "Proactive coordination with medical, intensive care, and surgical departments for timely access.",
  },
  {
    title: "Responsible Handling & Storage",
    desc: "Responsible handling, continuous monitoring, and temperature-controlled storage of blood components.",
  },
  {
    title: "Guidance for Patients & Families",
    desc: "Compassionate assistance and clear guidance for patients and their accompanying families.",
  },
];

export default function BloodBankServicePage() {
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
            <span className="font-semibold text-red-400">Blood Bank</span>
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
                Blood Bank Services
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Blood Bank</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                    Services
                  </span>
                </span>
              </h1>

              <p className="mt-3 text-base font-semibold text-slate-300 md:text-lg">
                Blood Bank Services | Adhiparasakthi Hospitals, Melmaruvathur
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                The Blood Bank at Adhiparasakthi Hospitals, Melmaruvathur, supports
                patient care by facilitating access to blood and blood components
                for patients who require transfusion as part of their medical
                treatment, surgical procedures, or emergency care. We are committed
                to maintaining appropriate safety standards and ensuring the
                responsible handling of blood throughout the transfusion process.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Droplets className="h-4 w-4" />
                  Contact Blood Bank
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
                    src="/images/services/blood-bank-lab-hero.jpg"
                    alt="Blood Bank Services at Adhiparasakthi Hospitals"
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

      {/* 2. Key Blood Bank Pillars */}
      <section className="relative -mt-8 z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bloodBankPillars.map((pillar, idx) => {
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

      {/* 3. Transfusion Workflow / Safety Steps */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <Sparkles className="h-3.5 w-3.5" />
            Quality &amp; Precision
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Blood Safety &amp; Transfusion Process
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Systematic screening, compatibility assessments, and temperature-controlled storage ensuring patient safety.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bloodBankWorkflow.map((step, idx) => {
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

      {/* 4. Our Blood Bank Services - 7 Key Cards */}
      <section className="section-padding bg-slate-100/60 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Droplets className="h-3.5 w-3.5" />
              Comprehensive Support
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Blood Bank Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Facilitating safe blood issue, component preparation, and clinical coordination for diverse healthcare needs.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bloodBankServicesList.map((svc, idx) => {
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
                    <span>Adhiparasakthi Blood Bank</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Blood Safety & Quality + Emergency Transfusion Support */}
      <section className="section-padding container mx-auto px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            Safety &amp; Preparedness
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Rigorous Protocols &amp; Emergency Readiness
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Dedicated to maintaining uncompromising safety benchmarks and rapid coordination for critical transfusions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Blood Safety & Quality */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-red-50/25 to-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-red-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-50 px-3.5 py-1 text-xs font-bold text-red-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Blood Safety &amp; Quality
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Safety Standards &amp; Testing
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                We recognize the importance of blood safety in patient care.
                Our services follow applicable standards and procedures for donor
                screening, blood testing, storage, handling, and compatibility
                assessment to help ensure the safe use of blood and blood components.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Syringe className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Standardized Donor Screening</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Rigorous health assessments and infectious disease screening prior to blood collection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <TestTube2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Compatibility &amp; Cross-Matching</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Precision ABO/Rh grouping and antibody screening to ensure absolute recipient compatibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-red-100">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Controlled Cold-Chain Storage</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Calibrated refrigeration, deep freezers, and continuous digital temperature tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Emergency Transfusion Support */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-red-50/20 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-200/80 group flex flex-col justify-between">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-slate-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700">
                <Activity className="h-3.5 w-3.5" />
                Emergency Transfusion Support
              </span>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Rapid Clinical Coordination
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Our Blood Bank supports the hospital&apos;s clinical teams in addressing
                blood requirements for emergency treatment, surgeries, and other
                medical conditions requiring transfusion. Blood is provided following
                the necessary procedures and compatibility assessments, in accordance
                with applicable protocols.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Trauma &amp; Emergency Readiness</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Expedited blood issue for acute trauma, critical care resuscitation, and obstetrics emergencies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Surgical Theatre Standby</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Pre-scheduled blood cross-matching and standby support for major operative procedures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm transition-colors group-hover:border-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Continuous Clinical Alignment</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Close coordination between blood bank personnel and primary physicians to ensure safe transfusions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Blood Bank Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Quality &amp; Trust
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Blood Bank Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Dedicated to delivering safe, responsible, and coordinated blood bank and transfusion care.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseBloodBank.map((item, idx) => (
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
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Our Blood Bank Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Safe, Responsible &amp; Coordinated Blood Care
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we are committed to supporting
                  patient care through safe, responsible, and coordinated blood bank
                  and transfusion services.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Contact Blood Bank
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
