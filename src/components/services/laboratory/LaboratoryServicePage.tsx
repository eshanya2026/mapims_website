"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Clock,
  Activity,
  Dna,
  Microscope,
  Stethoscope,
  FileCheck2,
  Award,
  Calendar,
  Building2,
  Syringe,
  HeartPulse,
  Lock,
  CreditCard,
  Zap,
} from "lucide-react";

const labPillars = [
  {
    icon: FlaskConical,
    title: "Advanced Technology",
    desc: "Fully automated, high-throughput diagnostic analyzers ensuring precise and reliable clinical results.",
  },
  {
    icon: Microscope,
    title: "Comprehensive Scope",
    desc: "From routine health screenings to complex molecular assays, immunology, and specialized toxicology.",
  },
  {
    icon: Zap,
    title: "Rapid STAT Turnaround",
    desc: "Streamlined 24/7 emergency processing enabling clinicians to make rapid, timely medical decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Stringent Quality Assurance",
    desc: "National and international quality benchmarks with rigorous daily multi-level calibration controls.",
  },
];

const labWorkflow = [
  {
    step: "01",
    title: "Barcoded Sample Collection",
    desc: "Gentle phlebotomy and strict barcoding ensuring positive patient identification and sample integrity.",
    icon: Syringe,
  },
  {
    step: "02",
    title: "Automated Analysis",
    desc: "High-precision closed-system testing across biochemistry, hematology, and serology platforms.",
    icon: FlaskConical,
  },
  {
    step: "03",
    title: "Pathologist Verification",
    desc: "Multi-tier quality review by consultant pathologists and clinical biochemists before sign-off.",
    icon: FileCheck2,
  },
  {
    step: "04",
    title: "Integrated Reporting",
    desc: "Fast digital report delivery directly to treating physicians, hospital departments, and patient portal.",
    icon: Activity,
  },
];

const scopeOfServices = [
  {
    number: "01",
    title: "Hematology",
    desc: "Comprehensive blood tests including complete blood counts (CBC), peripheral smears, coagulation studies, and hemoglobin electrophoresis.",
    icon: HeartPulse,
    badge: "Blood Studies",
  },
  {
    number: "02",
    title: "Clinical Chemistry",
    desc: "High-throughput biochemical analyses assessing renal parameters, liver function profiles, electrolyte balance, lipid panels, and glycemic markers.",
    icon: FlaskConical,
    badge: "Biochemistry",
  },
  {
    number: "03",
    title: "Microbiology",
    desc: "Advanced culture and antimicrobial sensitivity testing (AST) for accurate identification of bacterial and fungal infections.",
    icon: Microscope,
    badge: "Infection Care",
  },
  {
    number: "04",
    title: "Immunology",
    desc: "Specialized immunoassays for autoimmune disorders, immune system profiling, rheumatologic evaluations, and inflammatory biomarkers.",
    icon: ShieldCheck,
    badge: "Immune Health",
  },
  {
    number: "05",
    title: "Serology",
    desc: "Sensitive antibody and antigen screenings for viral, bacterial, and infectious pathogens including hepatitis, dengue, and fever profiles.",
    icon: Dna,
    badge: "Serology",
  },
  {
    number: "06",
    title: "Endocrinology",
    desc: "Precision hormone assays evaluating thyroid dysfunction, adrenal axis hormones, reproductive profiles, and metabolic endocrine disorders.",
    icon: Activity,
    badge: "Hormone Profiles",
  },
  {
    number: "07",
    title: "Toxicology",
    desc: "Specialized clinical testing for pharmaceutical drug levels, toxin exposure, heavy metals, and therapeutic drug monitoring (TDM).",
    icon: Award,
    badge: "Toxicology",
  },
];

const whyChooseLab = [
  {
    title: "Advanced Technology",
    desc: "We utilize cutting-edge diagnostic equipment to ensure precise and reliable results.",
  },
  {
    title: "Wide Range of Tests",
    desc: "From routine blood tests to specialized assays, we offer a complete suite of diagnostic services.",
  },
  {
    title: "Rapid Turnaround",
    desc: "Our efficient processes guarantee quick results, helping your healthcare team make timely decisions.",
  },
  {
    title: "Expert Team",
    desc: "Our skilled laboratory technicians and pathologists are dedicated to delivering high-quality diagnostic support.",
  },
  {
    title: "Quality Assurance",
    desc: "We adhere to stringent quality control protocols to maintain the highest standards of accuracy and reliability.",
  },
  {
    title: "Patient-Centric Care",
    desc: "We prioritize patient comfort and confidentiality throughout the entire diagnostic journey.",
  },
];

export default function LaboratoryServicePage() {
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
            <span className="text-red-400 font-semibold">Central Laboratory</span>
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
                Diagnostic Laboratory Services | Adhiparasakthi Hospitals
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-red-500">Central Laboratory</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Welcome to the Central Laboratory at Adhiparasakthi Hospitals,
                your hub for accurate and timely diagnostic testing. Our
                state-of-the-art laboratory is equipped with the latest
                technology to provide comprehensive diagnostic services
                essential for effective treatment and patient care.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Diagnostic Test
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Contact Lab Desk</span>
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
                    src="/images/services/central-laboratory-hero.jpg"
                    alt="Central Diagnostic Laboratory at Adhiparasakthi Hospitals"
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
            {labPillars.map((pillar, idx) => (
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

      {/* 3. 4-Stage Diagnostic Workflow */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Sparkles className="h-3.5 w-3.5" />
              Quality Testing Process
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Precision Diagnostic Workflow
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Standardized laboratory processing designed for absolute accuracy,
              speed, and patient safety.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {labWorkflow.map((item, idx) => (
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

      {/* 4. Our Scope of Services (Exact user list) */}
      <section className="section-padding bg-white py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <FlaskConical className="h-3.5 w-3.5" />
              Laboratory Scope
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Scope of Diagnostic Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Extensive analytical capabilities covering primary, secondary,
              and super-specialty laboratory disciplines.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scopeOfServices.map((service, idx) => (
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
            {/* Left Showcase: Why Choose Our Central Laboratory? */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Laboratory Excellence
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Why Choose Our Central Laboratory?
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Uncompromising commitment to analytical accuracy, advanced
                automation, and patient-centered service.
              </p>

              <div className="mt-8 space-y-4">
                {whyChooseLab.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Showcase: Must-Know Information */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <Award className="h-3.5 w-3.5" />
                Essential Highlights
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Must-Know Information
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Key features ensuring seamless service delivery, round-the-clock
                STAT testing, and digital accessibility.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Accredited Laboratory
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Our laboratory is accredited by national and international
                      standards, guaranteeing verified analytical rigor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Integrated Hospital Services
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Seamlessly integrated with all clinical OPD, IPD, and ICU
                      departments for coordinated patient care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Emergency STAT Testing
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Fast-track emergency testing services available 24/7 for
                      critical trauma, cardiac, and ICU medical situations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Secure Patient Portal
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      Access your verified test reports and diagnostic records
                      online through our secure patient portal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Insurance &amp; Billing
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                      We accept a wide range of insurance plans and offer
                      transparent, upfront pricing with no hidden charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital Commitment Banner (Last Position) */}
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <FlaskConical className="h-3.5 w-3.5" />
                  Diagnostic Excellence
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Where Diagnostic Precision Meets Compassion
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  Experience exceptional diagnostic services at Adhiparasakthi
                  Hospitals&apos; Central Laboratory—where precision meets
                  compassion. For more information or to schedule a test, contact
                  us today!
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Schedule a Test
                </Link>
                <Link
                  href="/#book-appointment"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  Contact Lab Helpdesk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
