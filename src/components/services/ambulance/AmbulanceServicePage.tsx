"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Siren,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Clock,
  Activity,
  HeartPulse,
  Navigation,
  Baby,
  Truck,
  Stethoscope,
  Radio,
  Flame,
  Hospital,
} from "lucide-react";

const ambulancePillars = [
  {
    icon: Siren,
    title: "Golden-Hour Response",
    desc: "Immediate emergency ambulance dispatch across the GST Road highway corridor and Melmaruvathur.",
  },
  {
    icon: Activity,
    title: "Mobile ICU Resuscitation",
    desc: "Advanced mobile intensive care units equipped with transport ventilators, monitors, and defibrillators.",
  },
  {
    icon: Navigation,
    title: "Real-Time GPS Tracking",
    desc: "Continuous onboard telemetry and live coordination with hospital emergency resuscitation bays.",
  },
  {
    icon: HeartPulse,
    title: "Certified EMT Crew",
    desc: "ACLS and BLS certified emergency medical technicians, paramedic nurses, and specialist physician escorts.",
  },
];

const ambulanceWorkflow = [
  {
    step: "01",
    title: "Instant Emergency Call",
    desc: "Call 1066 or +91 94990 59966. Triage coordinators identify patient condition and GPS location.",
    icon: Phone,
  },
  {
    step: "02",
    title: "Immediate Fleet Dispatch",
    desc: "Closest ACLS or BLS ambulance is mobilized within minutes with full onboard medical crew.",
    icon: Siren,
  },
  {
    step: "03",
    title: "On-Scene Care & Transit",
    desc: "Pre-hospital stabilization, airway control, oxygenation, and continuous vital monitoring en route.",
    icon: HeartPulse,
  },
  {
    step: "04",
    title: "Primed ER Bay Handoff",
    desc: "Emergency trauma surgeons, cardiologists, and cath lab alerted and primed before arrival.",
    icon: Hospital,
  },
];

const fleetCapabilities = [
  {
    number: "01",
    title: "Advanced Cardiac Life Support (ACLS) Ambulances",
    desc: "Equipped with transport ventilators, multi-parameter defibrillators with pacing, syringe infusion pumps, and emergency airway management kits.",
    icon: HeartPulse,
    badge: "Mobile ICU",
  },
  {
    number: "02",
    title: "Basic Life Support (BLS) Ambulances",
    desc: "Outfitted with oxygen therapy, pulse oximetry, trauma immobilizers, spine boards, and basic resuscitation supplies.",
    icon: ShieldCheck,
    badge: "Trauma Ready",
  },
  {
    number: "03",
    title: "Neonatal & Pediatric Transport Ambulances",
    desc: "Featuring transport incubators, neonatal ventilators, and specialized pediatric monitoring equipment for fragile newborns and children.",
    icon: Baby,
    badge: "Specialized NICU",
  },
  {
    number: "04",
    title: "Inter-Hospital Critical Care Transport",
    desc: "Safe, continuous intensive monitoring during patient transfers from rural health centers, district hospitals, and regional nursing homes.",
    icon: Truck,
    badge: "Transfer Care",
  },
];

const whyChooseAmbulance = [
  {
    title: "24/7 Instant Dispatch",
    desc: "Direct emergency helpline access with rapid mobilization across Melmaruvathur and GST highway.",
  },
  {
    title: "Fully Equipped Mobile ICU",
    desc: "Critical care ventilators, defibrillators, infusion pumps, and advanced telemetry on board.",
  },
  {
    title: "Pediatric & Neonatal Transport",
    desc: "Specialized incubators and neonatal ventilators dedicated to high-risk newborns and children.",
  },
  {
    title: "Seamless Golden-Hour Coordination",
    desc: "Real-time communication with on-site trauma surgeons, cardiologists, and emergency resuscitation bays.",
  },
];

export default function AmbulanceServicePage() {
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
            <span className="text-red-400 font-semibold">Ambulance Services</span>
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
                <Siren className="h-3.5 w-3.5 text-red-400 animate-pulse" />
                24/7 Emergency Ambulance Services | Adhiparasakthi Hospitals
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-red-500">Emergency Transport</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Adhiparasakthi Hospitals operates a modern, GPS-enabled fleet of
                24/7 emergency ambulances equipped to handle high-acuity medical
                and trauma crises across the GST Road highway corridor,
                Melmaruvathur, and neighboring districts. Staffed by certified
                emergency medical technicians (EMTs), paramedic nurses, and
                experienced drivers, our mobile intensive care units bring
                critical hospital resuscitation directly to the patient&apos;s
                doorstep.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="tel:1066"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Siren className="h-4 w-4 animate-pulse" />
                  Emergency Call: 1066
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Helpline: +91 94990 59966</span>
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
                    src="/images/services/ambulance-emergency-hero.jpg"
                    alt="24/7 Rapid Response Emergency Ambulance at Adhiparasakthi Hospitals"
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
            {ambulancePillars.map((pillar, idx) => (
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

      {/* 3. 4-Stage Response Workflow */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Sparkles className="h-3.5 w-3.5" />
              Rapid Response Protocol
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Golden-Hour Emergency Ambulance Journey
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              From the initial distress call to hospital resuscitation, every
              second is calibrated for patient survival.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ambulanceWorkflow.map((item, idx) => (
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

      {/* 4. Our Emergency Fleet Capabilities (Exact user list) */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Truck className="h-3.5 w-3.5" />
              Fleet Specifications
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Emergency Fleet Capabilities
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Specialized mobile critical care vehicles configured to provide
              intensive hospital resuscitation on wheels.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {fleetCapabilities.map((fleet, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 transition-all hover:border-red-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100/80 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <fleet.icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                    {fleet.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
                  {fleet.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {fleet.desc}
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
            {/* Left Showcase: Highway & Golden-Hour Emergency Response */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <Navigation className="h-3.5 w-3.5" />
                NH-45 Corridor Rescue
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Highway &amp; Golden-Hour Emergency Response
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Strategic positioning and advanced telematics ensure immediate
                pre-hospital intervention when every minute counts.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Strategic Highway NH-45 Positioning
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Rapid rescue during motor vehicle accidents, polytrauma
                      incidents, and highway emergencies along the GST Road corridor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Radio className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Real-Time GPS Tracking &amp; Tele-Communication
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Continuous telemetry between onboard paramedics and
                      hospital emergency resuscitation bays for active guidance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Hospital className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Pre-Arrival Hospital Notification
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Emergency trauma surgeons, cardiologists, and cath labs
                      are primed and awaiting before the ambulance arrives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Community Catchment Accident Care
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Free ambulance transport for emergency road traffic
                      accident victims within designated community catchment areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Showcase: Trained Paramedical & Medical Escort Crew */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <Stethoscope className="h-3.5 w-3.5" />
                Certified Medical Team
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Trained Paramedical &amp; Medical Escort Crew
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Certified emergency clinicians bring ICU-grade clinical
                expertise to the pre-hospital environment.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Certified EMTs &amp; Paramedic Nurses
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      ACLS- and BLS-certified emergency medical technicians
                      providing pre-hospital stabilization, advanced airway
                      support, and CPR en route.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Specialist Physician Escorts
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Specialist doctors and emergency physicians accompany
                      critical, ventilated, or hemodynamically unstable transfers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Sterile Vehicle Maintenance &amp; Infection Control
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Rigorous infection prevention, daily terminal cleaning,
                      and sterile vehicle sanitization meeting clinical hospital
                      standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Our Ambulance Services? */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted Emergency Care
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Ambulance Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Reliable, rapid-response medical transport saving lives during
              critical golden-hour emergencies.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseAmbulance.map((item, idx) => (
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
                  <Siren className="h-3.5 w-3.5 animate-pulse" />
                  24/7 Immediate Dispatch
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Rapid Emergency Ambulance Mobilization
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  For emergency ambulance dispatch in and around Melmaruvathur,
                  call our 24/7 Emergency Helpline immediately at +91 94990 59966
                  or 1066.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <a
                  href="tel:1066"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  <Siren className="h-4 w-4 animate-pulse text-red-600" />
                  Call 1066
                </a>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  +91 94990 59966
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
