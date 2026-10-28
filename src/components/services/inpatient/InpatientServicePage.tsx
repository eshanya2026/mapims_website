"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ClipboardCheck,
  Sparkles,
  Stethoscope,
  Pill,
  Users,
  Activity,
  FileCheck2,
  Building2,
  Maximize2,
  X,
  Tag,
  Check,
  Info,
} from "lucide-react";

export type SpecialWardRoom = {
  id: string;
  name: string;
  type: string;
  price: number;
  priceLabel: string;
  period: string;
  badge: string;
  popular?: boolean;
  description: string;
  images: {
    src: string;
    label: string;
    alt: string;
  }[];
  features: string[];
};

const specialWardRooms: SpecialWardRoom[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    type: "Private Air-Conditioned Room",
    price: 2500,
    priceLabel: "₹2,500",
    period: "/ per day",
    badge: "Private & Comfortable",
    description:
      "Comfortable air-conditioned private room designed for peaceful patient recovery with an adjustable patient bed, dedicated attendant cot, bedside storage, and 24/7 nursing care.",
    images: [
      {
        src: "/images/services/inpatient/deluxe-room-1.png",
        label: "Deluxe Room",
        alt: "Deluxe Inpatient Room with Patient Bed and Attendant Cot at Adhiparasakthi Hospitals",
      },
    ],
    features: [
      "Fully Air-Conditioned Private Patient Room",
      "Ergonomic Patient Bed with Side Safety Rails",
      "Dedicated Attendant Cot with Bedding",
      "Bedside Storage Locker, Wardrobe & Intercom",
      "Central Medical Oxygen & Vacuum Suction Console",
      "Attached Private Bathroom with Daily Sanitization",
    ],
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Room",
    type: "Premium Private Room",
    price: 3500,
    priceLabel: "₹3,500",
    period: "/ per day",
    badge: "Premium Comfort",
    description:
      "Spacious designer air-conditioned private room featuring an advanced multi-function patient bed, dedicated attendant day diwan, wall-mounted entertainment TV, and personal care amenities.",
    images: [
      {
        src: "/images/services/inpatient/super-deluxe-room.png",
        label: "Super Deluxe Room",
        alt: "Super Deluxe Inpatient Room at Adhiparasakthi Hospitals",
      },
    ],
    features: [
      "Spacious Private Air-Conditioned Room with Designer Finish",
      "Advanced Multi-Function Patient Bed with Side Rails",
      "Dedicated Attendant Diwan / Day Bed with Cushioning",
      "Wall-Mounted LED Television & Direct Nurse Call Bell",
      "Attached Modern Restroom with Hot Water Facility",
      "Bedside Oxygen Console, Food Tray Table & Storage",
    ],
  },
  {
    id: "suite",
    name: "Suite Room",
    type: "Ultra-Luxury Suite",
    price: 4800,
    priceLabel: "₹4,800",
    period: "/ per day",
    badge: "Ultra Luxury & Privacy",
    popular: true,
    description:
      "Exclusive two-room suite featuring a private master patient bedroom, an independent attendant living & dining lounge with sofa recliner, dining table, and premium hospital amenities.",
    images: [
      {
        src: "/images/services/inpatient/suite-room-main.png",
        label: "Master Suite & Patient Bed",
        alt: "Suite Room Master Patient Bedroom with Fowler Bed at Adhiparasakthi Hospitals",
      },
      {
        src: "/images/services/inpatient/suite-room-lounge.png",
        label: "Attendant Lounge & Dining Area",
        alt: "Suite Room Attendant Living and Dining Lounge at Adhiparasakthi Hospitals",
      },
    ],
    features: [
      "Separate Patient Master Bedroom & Attendant Living Lounge",
      "Motorized Paramount Fowler Bed & Dedicated Medical Console",
      "Leatherette Recliner Sofa, Dining Table & Attendant Cot",
      "Central Air Conditioning, LED TV & Food Pantry Counter",
      "Attached Private Restroom with Hot Water Facility",
      "24/7 Dedicated Nursing Call & Priority Doctor Reviews",
    ],
  },
  {
    id: "sharing",
    name: "Sharing Room",
    type: "Twin Sharing AC",
    price: 1500,
    priceLabel: "₹1,500",
    period: "/ per day",
    badge: "Economical & Comfortable",
    description:
      "Air-conditioned twin-sharing accommodation offering clean, hygienic recovery with full privacy curtain partitions, dedicated patient beds, attendant seating, and bedside storage lockers.",
    images: [
      {
        src: "/images/services/inpatient/sharing-room-1.png",
        label: "Bed & Locker View",
        alt: "Twin Sharing Room Bed and Privacy Setup at Adhiparasakthi Hospitals",
      },
      {
        src: "/images/services/inpatient/sharing-room-2.png",
        label: "Room Overview",
        alt: "Twin Sharing Inpatient Room Overview at Adhiparasakthi Hospitals",
      },
    ],
    features: [
      "Air-Conditioned Twin Sharing Room with Privacy Curtains",
      "Adjustable Patient Bed with Side Rails & Oxygen Point",
      "Comfortable Attendant Seating & Personal Storage Locker",
      "Shared Hygienic Bathroom with Regular Sanitization",
      "24/7 Clinical Monitoring & Round-the-Clock Nursing",
      "Free IP Pharmacy Access for Essential Prescribed Drugs",
    ],
  },
];

const generalWardBenefits = [
  {
    title: "100% Free Essential Medicines",
    desc: "Prescribed essential inpatient medicines provided completely free of charge to general ward patients.",
    badge: "Free IP Pharmacy",
    icon: Pill,
    highlight: true,
  },
  {
    title: "50% Special Concession on Diagnostics",
    desc: "50% direct discount on all laboratory investigations, diagnostic scans, and clinical testing.",
    badge: "50% Concession",
    icon: Activity,
    highlight: true,
  },
  {
    title: "Clean, Well-Ventilated Multi-Bed Wards",
    desc: "Spacious wards with ample airflow, privacy curtains between beds, and regular sanitization.",
    badge: "Hygienic Facility",
    icon: Bed,
    highlight: false,
  },
  {
    title: "24/7 Qualified Nursing & Doctor Rounds",
    desc: "Continuous vital signs tracking, timely medication administration, and regular specialist rounds.",
    badge: "Continuous Care",
    icon: Stethoscope,
    highlight: false,
  },
];

const generalWardAmenities = [
  "Spacious multi-bed ward with curtained privacy screens around each bed",
  "Central medical oxygen ports and vacuum suction line at bedside",
  "24/7 Dedicated nursing station and round-the-clock Resident Medical Officers",
  "Regular consultant physician and surgeon clinical evaluation rounds",
  "Clean attendant waiting halls and hygienic drinking water facilities",
  "Emergency code response and immediate critical care transfer backup",
];

const inpatientPillars = [
  {
    icon: Bed,
    title: "Continuous Observation",
    desc: "Round-the-clock clinical monitoring and supportive care for admitted patients.",
  },
  {
    icon: Pill,
    title: "Free IP Pharmacy",
    desc: "Free IP pharmacy dispensing for certain prescribed essential medications.",
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
    title: "Dedicated Nursing Care",
    desc: "Dedicated nursing care and assistance throughout the hospital stay.",
    icon: HeartHandshake,
    badge: "24/7 Care",
  },
  {
    number: "03",
    title: "Medical Monitoring & Treatment",
    desc: "Medical monitoring, treatment, and support as advised by the treating doctor.",
    icon: Activity,
    badge: "Clinical Care",
  },
  {
    number: "04",
    title: "Diagnostics & Medications",
    desc: "Assistance with diagnostic investigations and prescribed medications.",
    icon: Pill,
    badge: "Pharmacy & Lab",
  },
  {
    number: "05",
    title: "Pre & Post-Surgical Care",
    desc: "Care and support for patients before and after surgical procedures.",
    icon: ShieldCheck,
    badge: "Surgical Support",
  },
  {
    number: "06",
    title: "Patient & Attendant Guidance",
    desc: "Guidance for patients and their attendants regarding hospital procedures and care requirements.",
    icon: Users,
    badge: "Family Support",
  },
  {
    number: "07",
    title: "Discharge & Follow-Up Care",
    desc: "Discharge guidance, medication instructions, and follow-up care recommendations.",
    icon: FileCheck2,
    badge: "Continuity",
  },
  {
    number: "08",
    title: "Free IP Pharmacy for Certain Drugs",
    desc: "Complimentary IP pharmacy dispensing for designated essential medicines and prescribed inpatient medications to support accessible healing.",
    icon: Pill,
    badge: "Free IP Pharmacy",
  },
];

const whyChooseInpatient = [
  {
    title: "Tailored Medical Care",
    desc: "Medical care tailored to individual patient needs and clinical conditions.",
  },
  {
    title: "Free IP Pharmacy for Certain Drugs",
    desc: "Free IP pharmacy support for prescribed essential medications during hospitalization to ease patient care.",
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
  const [wardTab, setWardTab] = useState<"all" | "general" | "special">("all");
  const [roomImageIndexes, setRoomImageIndexes] = useState<Record<string, number>>({
    suite: 0,
    "super-deluxe": 0,
    deluxe: 0,
    sharing: 0,
  });
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    title: string;
    price?: string;
  } | null>(null);

  const handleNextRoomImage = (roomId: string, total: number) => {
    setRoomImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] ?? 0) + 1) % total,
    }));
  };

  const handlePrevRoomImage = (roomId: string, total: number) => {
    setRoomImageIndexes((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] ?? 0) - 1 + total) % total,
    }));
  };

  const handleSetRoomImage = (roomId: string, index: number) => {
    setRoomImageIndexes((prev) => ({
      ...prev,
      [roomId]: index,
    }));
  };

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
                  <span className="text-red-500">
                    Inpatient Services
                  </span>{" "}
                  (IPD)
                </span>
              </h1>

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
                  href="/contact#contact-form"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Plan Hospital Admission
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#available-ward-facilities"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Bed className="h-4 w-4 text-red-400" />
                  <span>Available Ward Facilities</span>
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
                    src="/images/services/inpatient-room-hero.jpg"
                    alt="Inpatient Care and Hospital Admission at Adhiparasakthi Hospitals"
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* IPD Highlight Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-emerald-500/30 bg-slate-950/85 p-3.5 backdrop-blur-md shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Pill className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            IPD Highlight
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          Free IP Pharmacy for Certain Drugs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Key Inpatient Pillars */}
      <section className="relative -mt-8 z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* 2.5 Available Ward Facilities (General Ward & Special Ward) */}
      <section
        id="available-ward-facilities"
        className="section-padding bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70 scroll-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Building2 className="h-3.5 w-3.5" />
              Ward Accommodation &amp; Rooms
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Available Ward Facilities
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Explore our comprehensive inpatient accommodation — from community-focused General Wards with free essential medicines to premium air-conditioned Special Wards with private attendant amenities.
            </p>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-xl mx-auto">
              <button
                type="button"
                onClick={() => setWardTab("all")}
                className={`flex-1 min-w-[120px] rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  wardTab === "all"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                All Facilities
              </button>
              <button
                type="button"
                onClick={() => setWardTab("general")}
                className={`flex-1 min-w-[140px] rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  wardTab === "general"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                1. General Ward
              </button>
              <button
                type="button"
                onClick={() => setWardTab("special")}
                className={`flex-1 min-w-[140px] rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  wardTab === "special"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                2. Special Ward
              </button>
            </div>
          </div>

          {/* 1. GENERAL WARD SECTION */}
          {(wardTab === "all" || wardTab === "general") && (
            <div className="mt-14">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-xs font-black text-white">
                      1
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      General Ward Facilities
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    Subsidized community inpatient care with 100% free medicines and 50% concession on diagnostic tests.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  Special Inpatient Scheme
                </span>
              </div>

              {/* General Ward Card */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg shadow-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left Column: Welfare Benefits & Details */}
                  <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
                          Equitable Healthcare
                        </span>
                        <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                          100% Free Essential Drugs
                        </span>
                        <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                          50% Lab Concession
                        </span>
                      </div>

                      <h4 className="mt-4 text-xl sm:text-2xl font-bold text-slate-900">
                        Accessible &amp; Compassionate Inpatient Care
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        Adhiparasakthi Hospitals operates extensive, well-ventilated General Wards with a commitment to dignified, patient-first recovery. Patients admitted to general wards receive comprehensive clinical treatment backed by landmark welfare relief benefits.
                      </p>

                      {/* 4 Feature Highlights */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {generalWardBenefits.map((benefit, idx) => {
                          const Icon = benefit.icon;
                          return (
                            <div
                              key={idx}
                              className={`rounded-2xl p-4 border transition-all ${
                                benefit.highlight
                                  ? "bg-red-50/40 border-red-200/80 shadow-sm"
                                  : "bg-slate-50 border-slate-200/70"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                    benefit.highlight
                                      ? "bg-red-600 text-white"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                                    {benefit.badge}
                                  </span>
                                  <h5 className="text-xs font-bold text-slate-900 leading-tight">
                                    {benefit.title}
                                  </h5>
                                </div>
                              </div>
                              <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                                {benefit.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Amenities List */}
                      <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200/70">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Key General Ward Facilities
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {generalWardAmenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700">
                                ✓
                              </span>
                              <span className="leading-tight">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                      <Link
                        href="/contact#contact-form"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-xs font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition"
                      >
                        <Calendar className="h-4 w-4" />
                        Inquire for Admission
                      </Link>
                      <a
                        href="tel:+919499059966"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                      >
                        <Phone className="h-4 w-4 text-red-600" />
                        Admissions: +91 94990 59966
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Showcase */}
                  <div className="relative bg-slate-900 lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 text-white min-h-[360px]">
                    <div className="absolute inset-0">
                      <Image
                        src="/images/service-inpatient-ipd.jpg"
                        alt="General Ward and Inpatient Care at Adhiparasakthi Hospitals"
                        fill
                        className="object-cover opacity-35"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
                    </div>

                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        <Bed className="h-3.5 w-3.5" />
                        Community Inpatient Wing
                      </span>
                      <h4 className="mt-4 text-xl sm:text-2xl font-bold text-white">
                        Compassionate Healing for All
                      </h4>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        Round-the-clock supportive care delivered by senior specialists, resident doctors, and dedicated nursing teams.
                      </p>
                    </div>

                    {/* Inpatient Scheme Banner Callout */}
                    <div className="relative z-10 mt-6 rounded-2xl border border-emerald-500/40 bg-slate-900/90 p-4 backdrop-blur-md shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            Welfare Benefit
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-white">
                            Zero Medicine Cost for General Ward
                          </p>
                          <p className="text-[11px] text-slate-300">
                            Plus 50% discount on laboratory investigations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SPECIAL WARD SECTION */}
          {(wardTab === "all" || wardTab === "special") && (
            <div className="mt-16">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-xs font-black text-white">
                      2
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                      Special Ward Facilities
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    4 Room Types offering personalized comfort, air-conditioned privacy, attendant day beds, and dedicated nursing care.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Total 4 Room Types
                  </span>
                </div>
              </div>

              {/* 4 Special Ward Room Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {specialWardRooms.map((room) => {
                  const currentImgIdx = roomImageIndexes[room.id] ?? 0;
                  const currentImage = room.images[currentImgIdx] ?? room.images[0];
                  const hasMultipleImages = room.images.length > 1;

                  return (
                    <div
                      key={room.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md hover:shadow-2xl hover:border-red-300 transition-all duration-300"
                    >
                      {/* Top Visual Image Section */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                        <Image
                          src={currentImage.src}
                          alt={currentImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                          onClick={() =>
                            setLightboxImage({
                              src: currentImage.src,
                              alt: currentImage.alt,
                              title: `${room.name} (${currentImage.label})`,
                              price: `${room.priceLabel} ${room.period}`,
                            })
                          }
                          priority={room.id === "deluxe" || room.id === "suite"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                        {/* Top Left: Room Badge */}
                        <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-1.5">
                          <span className="rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-sm">
                            {room.badge}
                          </span>
                        </div>

                        {/* Top Right: Daily Tariff Badge */}
                        <div className="absolute top-3 right-3 z-10 pointer-events-none">
                          <div className="flex items-center gap-1.5 rounded-full bg-red-600/95 px-3.5 py-1 text-xs font-extrabold text-white shadow-lg backdrop-blur-md border border-white/25">
                            <Tag className="h-3 w-3" />
                            <span>{room.priceLabel}</span>
                            <span className="text-[10px] font-medium text-white/90">
                              {room.period}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Bar: Image Controls & Zoom */}
                        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                          {/* Image Switcher Pills for Suite & Sharing */}
                          {hasMultipleImages ? (
                            <div className="pointer-events-auto flex items-center gap-1 rounded-xl bg-slate-950/80 p-1 backdrop-blur-md border border-white/15">
                              {room.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetRoomImage(room.id, idx);
                                  }}
                                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                                    currentImgIdx === idx
                                      ? "bg-red-600 text-white shadow-sm"
                                      : "text-slate-300 hover:text-white hover:bg-white/10"
                                  }`}
                                >
                                  {img.label}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="pointer-events-auto rounded-lg bg-slate-950/75 px-2.5 py-1 text-[11px] font-semibold text-slate-300 backdrop-blur-md border border-white/10">
                              {currentImage.label}
                            </span>
                          )}

                          {/* Full Screen Zoom Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxImage({
                                src: currentImage.src,
                                alt: currentImage.alt,
                                title: `${room.name} - ${currentImage.label}`,
                                price: `${room.priceLabel} ${room.period}`,
                              });
                            }}
                            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950/80 text-white hover:bg-red-600 transition backdrop-blur-md border border-white/20 cursor-pointer shadow-md"
                            aria-label={`View full photo of ${room.name}`}
                          >
                            <Maximize2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-col justify-between flex-1 p-6 sm:p-7">
                        <div>
                          {/* Title & Tariff Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                                {room.type}
                              </span>
                              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                {room.name}
                              </h4>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="block text-2xl font-black text-red-600 leading-none">
                                {room.priceLabel}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500">
                                {room.period}
                              </span>
                            </div>
                          </div>

                          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {room.description}
                          </p>

                          {/* Amenities / Features List */}
                          <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                              Room Amenities &amp; Inclusions:
                            </span>
                            <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                              {room.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2">
                                  <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-700">
                                    ✓
                                  </span>
                                  <span className="leading-tight">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom Actions */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                          <Link
                            href="/contact#contact-form"
                            className="inline-flex h-11 flex-1 min-w-[150px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-xs font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition"
                          >
                            <Calendar className="h-4 w-4" />
                            Book / Inquire Room
                          </Link>
                          <a
                            href="tel:+919499059966"
                            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition"
                          >
                            <Phone className="h-3.5 w-3.5 text-red-600" />
                            <span>Inpatient Helpline</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
      <section id="inpatient-services" className="section-padding bg-slate-100/60 py-16 sm:py-20 border-t border-slate-200/70 scroll-mt-20">
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
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1 min-w-0 max-w-none">
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
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Link
                  href="/contact#contact-form"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                >
                  Contact Admissions
                </Link>
                <Link
                  href="#inpatient-services"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Bed className="h-4 w-4" />
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Room Photos */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-3xl border border-white/20 bg-slate-950 p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full max-h-[75vh] overflow-hidden rounded-2xl bg-black">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 text-white">
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    {lightboxImage.title}
                  </h3>
                  {lightboxImage.price && (
                    <p className="text-xs sm:text-sm font-semibold text-red-400">
                      Tariff: {lightboxImage.price}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-red-600 transition cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
