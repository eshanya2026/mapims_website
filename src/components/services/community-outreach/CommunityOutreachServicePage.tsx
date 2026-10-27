"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HeartHandshake,
  Calendar,
  Users,
  Eye,
  Activity,
  FileText,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const outreachPillars = [
  {
    icon: Heart,
    title: "Free Medical Camps",
    desc: "Comprehensive multi-specialty clinical consultations and basic tests delivered directly in local community centers and rural villages.",
  },
  {
    icon: Activity,
    title: "Preventive Screening",
    desc: "Early detection screening for diabetes, hypertension, cardiac risk factors, and chronic illnesses before complications arise.",
  },
  {
    icon: Eye,
    title: "Community Eye Care",
    desc: "Free community eye screening camps, visual acuity tests, cataract identification, and specialized ophthalmology referrals.",
  },
  {
    icon: FileText,
    title: "Government Scheme Support",
    desc: "Guidance and enrollment assistance for eligible patients under CMCHIS and approved healthcare insurance programs.",
  },
];

const communityServices = [
  {
    number: "01",
    title: "Free Medical & Health Screening Camps",
    desc: "On-ground medical checkup camps organized in rural and semi-urban localities, featuring general physicians, specialists, and nursing support.",
    icon: Heart,
    badge: "Medical Camps",
  },
  {
    number: "02",
    title: "Community Health Awareness Programs",
    desc: "Interactive educational sessions promoting hygiene, maternal and child nutrition, infectious disease prevention, and healthy lifestyle choices.",
    icon: GraduationCap,
    badge: "Health Awareness",
  },
  {
    number: "03",
    title: "Preventive Health Screening Initiatives",
    desc: "Point-of-care vital sign monitoring, random blood sugar tests, blood pressure checks, and BMI assessments to identify silent health concerns.",
    icon: Activity,
    badge: "Early Detection",
  },
  {
    number: "04",
    title: "Eye Screening & Community Eye Camps",
    desc: "Dedicated vision evaluation camps providing preliminary refractive error assessments, cataract screenings, and guidance for elderly community members.",
    icon: Eye,
    badge: "Vision Care",
  },
  {
    number: "05",
    title: "Health Education & Wellness Activities",
    desc: "Structured workshops, demonstrations, and wellness camps empowering community members to take proactive ownership of family well-being.",
    icon: Users,
    badge: "Wellness",
  },
  {
    number: "06",
    title: "Referral Support for Further Medical Care",
    desc: "Streamlined referral pathways ensuring camp patients identified with critical or chronic illnesses receive prompt evaluation at Adhiparasakthi Hospitals.",
    icon: HeartHandshake,
    badge: "Hospital Referrals",
  },
];

const schemeHighlights = [
  {
    title: "CMCHIS Welfare Assistance",
    desc: "Guidance for eligible families on obtaining cashless treatment under the Tamil Nadu Chief Minister's Comprehensive Health Insurance Scheme for approved surgical and medical procedures.",
    icon: ShieldCheck,
  },
  {
    title: "Supported Insurance Guidance",
    desc: "Assistance with pre-authorizations, documentation, and benefit utilization under supported health insurance programs and TPAs.",
    icon: FileText,
  },
  {
    title: "Transparent Protocol Compliance",
    desc: "All healthcare scheme support is delivered transparently in accordance with government criteria, necessary medical authorizations, and prevailing scheme rules.",
    icon: CheckCircle2,
  },
];

const heroSlides = [
  {
    id: 1,
    src: "/images/services/community-outreach-camp-1.webp",
    alt: "Free Community Eye Care & Medical Camp 2026 at Adhiparasakthi Hospitals",
    badge: "Free Eye Care Camp",
    tagline: "Specialist Eye Screening & Treatment Drive",
    icon: Eye,
    objectPosition: "object-center",
  },
  {
    id: 2,
    src: "/images/services/community-outreach-camp-2.webp",
    alt: "Doctors Conducting Rural Medical Consultations & Health Checkups",
    badge: "Rural Medical Outreach",
    tagline: "Free Clinical Consultations & Health Checks",
    icon: HeartHandshake,
    objectPosition: "object-[center_28%]",
  },
];

export default function CommunityOutreachServicePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28 pb-16 lg:pt-36 lg:pb-24 text-white">
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
              Community Outreach
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
                Extending Healthcare Beyond the Hospital
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Community</span>
                <span className="block mt-1">
                  <span className="text-red-500">Outreach</span>
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Adhiparasakthi Hospitals is committed to making healthcare accessible
                to the community through outreach activities, health awareness
                initiatives, medical camps, and support for eligible government and
                insurance healthcare schemes.
              </p>

              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                Our community outreach programs focus on promoting preventive
                healthcare, early identification of health concerns, and access to
                appropriate medical guidance and treatment.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#community-services"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  Explore Outreach Services
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Outreach Desk: +91 94990 59966</span>
                </a>
              </div>
            </motion.div>

            {/* Right Card / Visual Showcase Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={heroSlides[currentSlide].src}
                        alt={heroSlides[currentSlide].alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 550px"
                        className={cn(
                          "object-cover transition-transform duration-700 hover:scale-105",
                          heroSlides[currentSlide].objectPosition
                        )}
                        priority={currentSlide === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Badge: Outreach Status & Counter */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Free Medical Camp Drive
                    </span>
                    <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300 backdrop-blur-md border border-white/10">
                      {currentSlide + 1} / {heroSlides.length}
                    </span>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                      }
                      className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-red-600 hover:scale-110 border border-white/20 cursor-pointer shadow-lg"
                      aria-label="Previous camp image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                      }
                      className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-red-600 hover:scale-110 border border-white/20 cursor-pointer shadow-lg"
                      aria-label="Next camp image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Bottom Caption Pill & Indicators */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="rounded-xl bg-slate-950/80 p-2.5 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shrink-0">
                          {heroSlides[currentSlide].badge}
                        </span>
                        <p className="text-xs font-semibold text-white truncate">
                          {heroSlides[currentSlide].tagline}
                        </p>
                      </div>

                      {/* Slide Indicator Dots */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {heroSlides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={cn(
                              "h-1.5 rounded-full transition-all cursor-pointer",
                              idx === currentSlide
                                ? "w-5 bg-red-500"
                                : "w-1.5 bg-white/40 hover:bg-white/70"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
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
            {outreachPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/40 transition-all hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Community Healthcare Services */}
      <section id="community-services" className="section-padding py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Heart className="h-3.5 w-3.5" />
              Community Initiatives
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Community Healthcare Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Bringing high-quality healthcare directly to villages, schools, and civic centers with compassion and clinical excellence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communityServices.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Free Community Healthcare</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Healthcare Scheme Support */}
      <section className="section-padding bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Financial Accessibility
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Healthcare Scheme Support
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              We assist eligible patients in accessing treatment through applicable government healthcare schemes and supported health insurance programs, subject to eligibility, authorization, and prevailing scheme guidelines.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {schemeHighlights.map((scheme, idx) => {
              const Icon = scheme.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-red-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                    {scheme.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {scheme.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Serving Our Community & Our Commitment */}
      <section className="section-padding py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <MapPin className="h-3.5 w-3.5" />
              Serving Our Community
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Improving Health Awareness Across Melmaruvathur
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Through regular outreach activities, Adhiparasakthi Hospitals works to improve health awareness and extend healthcare services to communities in and around Melmaruvathur.
            </p>
          </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 transition hover:border-red-200 hover:bg-white hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Preventive Healthcare First
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Our healthcare teams participate in community-based initiatives aimed at encouraging early diagnosis, preventive care, and timely access to medical services before complications arise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 transition hover:border-red-200 hover:bg-white hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Grassroots Medical Education
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Empowering rural families, schools, and civic groups with actionable knowledge on nutrition, hygiene, disease prevention, and emergency first aid.
                  </p>
                </div>
              </div>
            </div>

            {/* Hospital Commitment Banner (Last Position - Full Width Horizontal Rectangle) */}
            <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
              <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="flex-1 min-w-0 max-w-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    <Heart className="h-3.5 w-3.5" />
                    Our Commitment
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    Compassionate &amp; Socially Responsible Healthcare
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm max-w-3xl">
                    We remain committed to compassionate and socially responsible healthcare by extending our services beyond the hospital and supporting the health and well-being of the communities we serve.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <a
                    href="tel:+919499059966"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-red-700 shadow-md transition hover:bg-red-50"
                  >
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Call: +91 94990 59966</span>
                  </a>
                  <Link
                    href="/contact#contact-form"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    Enquire Online
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
