"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HeartHandshake,
  Clock,
  Building2,
  FileText,
  CreditCard,
  FileCheck2,
  BadgeCheck,
  HelpCircle,
  Landmark,
  Scale,
  Users2,
  Search,
  Download,
} from "lucide-react";
import {
  governmentInsuranceSchemes,
  governmentOrganizations,
  privateInsuranceCompaniesAndTPAs,
  officialInsuranceDocPath,
} from "@/data/international-services/insurance";

const insurancePillars = [
  {
    icon: CreditCard,
    tag: "Cashless Care",
    title: "Cashless Hospitalization",
    desc: "A medical facility where the patient receives covered treatment without paying hospital bills upfront out of pocket; admissible expenses are settled directly between the hospital and the insurance company or TPA.",
  },
  {
    icon: Building2,
    tag: "Hospital-to-Insurer",
    title: "TPA Coordination",
    desc: "The hospital's dedicated liaison submitting medical records, treatment estimates, and bills directly to the insurer's Third Party Administrator (TPA) to secure fast pre-authorizations, query resolutions, and claim approvals.",
  },
  {
    icon: FileText,
    tag: "Required Documents",
    title: "Documentation Support",
    desc: "Guidance preparing mandatory hospital papers: Health Insurance E-card/Policy, Patient Photo ID (Aadhaar/Voter ID), Treating Doctor's Admission Advice note, and diagnostic test reports.",
  },
  {
    icon: Landmark,
    tag: "Welfare Schemes",
    title: "Government Schemes",
    desc: "Guidance and eligibility assistance for Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS) and approved public healthcare benefits.",
  },
];

const cashlessProcess = [
  {
    step: "01",
    title: "Before Admission",
    desc: "Contact our insurance support team to check the applicable insurance arrangements and required documents.",
    icon: Phone,
  },
  {
    step: "02",
    title: "During Admission",
    desc: "Submit the necessary policy details and supporting documents for insurance verification and pre-authorization.",
    icon: FileText,
  },
  {
    step: "03",
    title: "During Hospitalization",
    desc: "Our team can assist with insurance-related queries and coordinate with the insurer or TPA as required.",
    icon: Building2,
  },
  {
    step: "04",
    title: "At Discharge",
    desc: "Assistance is provided with final authorization and claim-related formalities, subject to insurer approval and policy conditions.",
    icon: FileCheck2,
  },
  {
    step: "05",
    title: "Settlements",
    desc: "Direct claim settlement between the hospital and the insurance provider or TPA, ensuring a seamless, transparent closing.",
    icon: BadgeCheck,
  },
];

const insuranceServicesList = [
  {
    number: "01",
    title: "Health Insurance Documentation",
    desc: "Assistance preparing essential hospital papers: Active Insurance E-Card/Policy, Patient Photo ID (Aadhaar/Voter ID), Doctor's Admission Advice, and diagnostic reports.",
    icon: FileText,
    badge: "Required Documents",
  },
  {
    number: "02",
    title: "Cashless Hospitalization Guidance",
    desc: "Assistance with cashless hospitalization where admissible expenses are settled directly between hospital and insurer, eliminating upfront out-of-pocket costs.",
    icon: CreditCard,
    badge: "Cashless Care",
  },
  {
    number: "03",
    title: "Pre-Authorization Support",
    desc: "Support with insurance pre-authorization requests, queries, and prompt approvals.",
    icon: BadgeCheck,
    badge: "Pre-Auth",
  },
  {
    number: "04",
    title: "TPA & Provider Coordination",
    desc: "Hospital-to-insurer liaison: our desk coordinates directly with Third Party Administrators (TPAs) to submit medical files, answer queries, and track claims.",
    icon: Building2,
    badge: "Liaison",
  },
  {
    number: "05",
    title: "Admission & Discharge Assistance",
    desc: "Assistance with insurance-related queries during admission and discharge.",
    icon: Clock,
    badge: "Desk Support",
  },
  {
    number: "06",
    title: "Coverage & Payment Clarity",
    desc: "Guidance on applicable coverage, approvals, and patient payment responsibilities.",
    icon: Scale,
    badge: "Transparency",
  },
  {
    number: "07",
    title: "Government Health Schemes",
    desc: "Support with eligible government health insurance and welfare schemes, where applicable.",
    icon: Landmark,
    badge: "Welfare Schemes",
  },
];

const whyChooseInsurance = [
  {
    title: "Documentation & Procedure Guidance",
    desc: "Checklist assistance for required hospital papers: Insurance card, Aadhaar/photo ID, doctor admission note, and lab reports.",
  },
  {
    title: "Cashless Hospitalization Formalities",
    desc: "Direct coordination enabling patients to access care without paying covered hospital expenses upfront.",
  },
  {
    title: "Active TPA & Insurer Coordination",
    desc: "Dedicated hospital-to-TPA liaison submitting medical records and speeding up claim approvals.",
  },
  {
    title: "Stay-Long Query Resolution",
    desc: "Support for insurance-related queries throughout the hospital stay.",
  },
  {
    title: "Payment Transparency & Approval Clarity",
    desc: "Clear guidance regarding approvals and applicable patient payment responsibilities.",
  },
];

export default function InsuranceServicePage() {
  const [insuranceSearch, setInsuranceSearch] = useState("");

  const query = insuranceSearch.trim().toLowerCase();
  const filteredGovtSchemes = governmentInsuranceSchemes.filter((s) =>
    s.toLowerCase().includes(query)
  );
  const filteredGovtOrgs = governmentOrganizations.filter((o) =>
    o.toLowerCase().includes(query)
  );
  const filteredPrivateInsurers = privateInsuranceCompaniesAndTPAs.filter((p) =>
    p.toLowerCase().includes(query)
  );

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
              Insurance &amp; Corporate Cashless Services
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
                Health Insurance Assistance
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Insurance &amp; Corporate</span>
                <span className="block mt-1">
                  <span className="text-red-500">
                    Cashless Services
                  </span>
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                At Adhiparasakthi Hospitals, Melmaruvathur, we understand that
                managing hospital expenses and insurance formalities can be
                challenging for patients and their families. Our insurance
                support services help patients navigate the necessary
                documentation and procedures associated with health insurance
                and cashless hospitalization.
              </p>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                Our team assists patients and their attendants with
                insurance-related queries and coordinates with insurance
                providers and Third Party Administrators (TPAs), subject to the
                hospital&apos;s empanelment and the patient&apos;s policy terms.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#insurance-list"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById("insurance-list");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth", block: "start" });
                      const searchInput = section.querySelector<HTMLInputElement>("input[type='text']");
                      if (searchInput) {
                        setTimeout(() => searchInput.focus(), 500);
                      }
                    }
                  }}
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50 cursor-pointer"
                >
                  <CreditCard className="h-4 w-4" />
                  Check Insurance Eligibility
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Building2 className="h-4 w-4 text-red-400" />
                  <span>Contact Insurance Desk</span>
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
                    src="/images/services/insurance-tpa-hero.png"
                    alt="Health Insurance and TPA Cashless Hospitalization at Adhiparasakthi Hospitals"
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
            {insurancePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    {pillar.tag && (
                      <span className="rounded-full bg-red-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 transition-colors group-hover:bg-red-100">
                        {pillar.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed sm:text-sm">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cashless Hospitalization Process (Exact User Section) */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Sparkles className="h-3.5 w-3.5" />
              Step-by-Step Flow
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Cashless Hospitalization Process
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Clear stages guiding you through insurance documentation,
              verification, approvals, and final discharge formalities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {cashlessProcess.map((item, idx) => (
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

      {/* 4. List of Insurance We Offer (Clean Structured Showcase) */}
      <section
        id="insurance-list"
        className="section-padding bg-slate-50/70 py-16 sm:py-20 border-t border-slate-200/70"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Empaneled Networks &amp; Corporate Tie-ups
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                List of Insurance We Offer
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
                Melmaruvathur Adhiparasakthi Institute of Medical Sciences &amp; Research is empaneled with major Government Schemes, Public Sector Organizations, and 30+ leading Private Insurance Providers &amp; TPAs for hassle-free cashless hospitalization.
              </p>
            </div>
            <a
              href={officialInsuranceDocPath}
              download="insurance_company_detail_MAPIMS.docx"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:border-red-300 hover:text-red-600 hover:shadow-sm"
            >
              <Download className="h-4 w-4 text-red-600" />
              Download Official List (.docx)
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Government Schemes & Organizations (5 cols) */}
            <div className="space-y-6 lg:col-span-5">
              {/* Box 1: Government Insurance Schemes */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Government Schemes
                      </h3>
                      <p className="text-xs text-slate-500">State &amp; Central welfare coverage</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    {governmentInsuranceSchemes.length} Schemes
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {filteredGovtSchemes.length > 0 ? (
                    filteredGovtSchemes.map((scheme, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-3 text-xs sm:text-sm font-medium text-slate-800 transition hover:bg-emerald-50/50"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{scheme}</span>
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-center text-xs text-slate-400">
                      No government scheme matching &quot;{insuranceSearch}&quot;
                    </li>
                  )}
                </ul>
              </div>

              {/* Box 2: Government Organizations & PSUs */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Public Sector &amp; PSUs
                      </h3>
                      <p className="text-xs text-slate-500">Corporate &amp; department tie-ups</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                    {governmentOrganizations.length} Empaneled
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {filteredGovtOrgs.length > 0 ? (
                    filteredGovtOrgs.map((org, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl bg-slate-50/80 p-3 text-xs sm:text-sm font-medium text-slate-800 transition hover:bg-blue-50/50"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                        <span>{org}</span>
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-center text-xs text-slate-400">
                      No organization matching &quot;{insuranceSearch}&quot;
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Right Column: Private Insurance Companies & Leading TPAs (7 cols) */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Private Insurance &amp; TPAs
                      </h3>
                      <p className="text-xs text-slate-500">Cashless claim settlement network</p>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
                    31 Providers
                  </span>
                </div>

                {/* Subtle Search input inside panel */}
                <div className="mt-4 relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={insuranceSearch}
                    onChange={(e) => setInsuranceSearch(e.target.value)}
                    placeholder="Search provider (e.g., Star Health, HDFC, Medi Assist, Vidal)..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                  />
                  {insuranceSearch && (
                    <button
                      type="button"
                      onClick={() => setInsuranceSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Clean 2-column directory list */}
                <div className="mt-4 max-h-[440px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredPrivateInsurers.length > 0 ? (
                      filteredPrivateInsurers.map((name, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 transition hover:border-red-200 hover:bg-white hover:shadow-xs"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-red-500" />
                          <span className="truncate font-medium">{name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-xs text-slate-500">
                        No private insurer or TPA matching &quot;{insuranceSearch}&quot;.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Support note */}
              <div className="mt-5 border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
                <span>Coverage is subject to individual policy terms and insurer pre-authorization.</span>
                <Link
                  href="/contact#contact-form"
                  className="font-bold text-red-600 hover:underline shrink-0"
                >
                  Verify Your Policy &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Insurance Services (Exact user list) */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Comprehensive Support
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Our Insurance Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Dedicated administrative guidance simplifying insurance claims,
              approvals, and welfare schemes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insuranceServicesList.map((service, idx) => (
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

      {/* 5. Why Choose Our Insurance Support Services? */}
      <section className="section-padding bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Patient Advocacy
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Why Choose Our Insurance Support Services?
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Experienced, transparent, and empathetic support helping patients
              focus on treatment and recovery.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseInsurance.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-md"
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
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1 min-w-0 max-w-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <CreditCard className="h-3.5 w-3.5" />
                  Our Insurance Commitment
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                  Simplifying Healthcare Financial Formalities
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm">
                  At Adhiparasakthi Hospitals, we strive to make insurance-related
                  procedures easier to understand, helping patients and their
                  families focus on treatment and recovery. For information
                  about insurance coverage, cashless hospitalization, or
                  eligible health schemes, please contact Adhiparasakthi
                  Hospitals directly.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/contact#contact-form"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Contact Insurance Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
