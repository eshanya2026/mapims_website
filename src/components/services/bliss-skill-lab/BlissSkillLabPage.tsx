"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HeartHandshake,
  Award,
  Calendar,
  GraduationCap,
  Stethoscope,
  HeartPulse,
  Baby,
  AlertTriangle,
  Users,
  Layers,
  BookOpen,
  FileText,
  ExternalLink,
  Eye,
  X,
  Download,
} from "lucide-react";

const labPillars = [
  {
    icon: Stethoscope,
    title: "High-Fidelity Mannequins",
    desc: "Computerized patient simulators replicating realistic human physiology, pulses, heart sounds, and breath sounds.",
  },
  {
    icon: HeartPulse,
    title: "Emergency Resuscitation",
    desc: "Immersive CPR, defibrillation, acute trauma crisis management, and rapid code blue response execution.",
  },
  {
    icon: Baby,
    title: "Maternal & Child Simulation",
    desc: "Specialized labour room delivery simulations, postpartum hemorrhage management, and neonatal care.",
  },
  {
    icon: GraduationCap,
    title: "Competency-Based Drills",
    desc: "Structured clinical milestones and supervised procedural training for healthcare professionals and postgraduates.",
  },
];

const clinicalSkillsModules = [
  {
    number: "01",
    title: "High-Fidelity Simulation Training",
    desc: "Interactive scenarios using computerized full-body adult and pediatric mannequins that react pharmacologically and physiologically in real time.",
    icon: Stethoscope,
    badge: "Core Simulation",
  },
  {
    number: "02",
    title: "Critical Care Simulation",
    desc: "Intensive care protocols covering mechanical ventilator management, central line placement, invasive hemodynamic monitoring, and septic shock stabilization.",
    icon: HeartPulse,
    badge: "ICU Training",
  },
  {
    number: "03",
    title: "Paediatric Care Training",
    desc: "Focused neonatal and pediatric resuscitation, difficult airway management, seizure protocols, and pediatric acute decompensation drills.",
    icon: Baby,
    badge: "Pediatrics",
  },
  {
    number: "04",
    title: "Labour Room & Maternal Care Simulation",
    desc: "Hands-on maternal care including normal delivery, shoulder dystocia management, eclampsia protocols, and postpartum hemorrhage control.",
    icon: HeartHandshake,
    badge: "Obstetrics",
  },
  {
    number: "05",
    title: "Emergency Response & Resuscitation Training",
    desc: "Golden-hour trauma management, high-performance CPR, automated & manual defibrillation, and multi-casualty triage drills.",
    icon: AlertTriangle,
    badge: "Emergency Care",
  },
  {
    number: "06",
    title: "Hands-on Clinical Skills Development",
    desc: "Procedural practice in vascular access, bag-valve-mask ventilation, endotracheal intubation, lumbar puncture, thoracostomy, and surgical suturing.",
    icon: Layers,
    badge: "Clinical Procedures",
  },
  {
    number: "07",
    title: "Scenario-Based Team Training",
    desc: "Inter-professional crisis resource management (CRM), closed-loop communication, team coordination, and situational leadership in high-stress settings.",
    icon: Users,
    badge: "Team Dynamics",
  },
];

const trainingPrograms = [
  {
    icon: HeartPulse,
    title: "Basic Cardiac Life Support (BCLS)",
    desc: "Essential life-saving CPR training, AED operation, foreign-body airway obstruction relief, and high-quality chest compressions for adult, child, and infant scenarios.",
    tag: "Life Support Certification",
  },
  {
    icon: Activity,
    title: "Advanced Cardiac Life Support (ACLS)",
    desc: "Advanced airway management, ECG rhythm recognition, pharmacological interventions, electrical therapies, and coordinated cardiac arrest resuscitation.",
    tag: "Advanced Certification",
  },
  {
    icon: AlertTriangle,
    title: "Advance Trauma Life Support (ATLS)",
    desc: "Systematic initial assessment, airway control, trauma resuscitation, cervical spine immobilization, and urgent management of acute life-threatening trauma.",
    tag: "Trauma Life Support",
  },
  {
    icon: Baby,
    title: "Pediatric Advance Life Support (PALS)",
    desc: "Comprehensive resuscitation algorithms for pediatric emergencies, respiratory failure management, vascular access, and pediatric shock stabilization.",
    tag: "Pediatric Certification",
  },
  {
    icon: Baby,
    title: "Neonatal Life Support (NLS)",
    desc: "Evidence-based resuscitation and stabilization of newly born infants, positive-pressure bag-valve-mask ventilation, heart rate assessment, and thermal regulation.",
    tag: "Neonatal Resuscitation",
  },
  {
    icon: HeartPulse,
    title: "Compression-Only Life Support (COLS)",
    desc: "High-performance, continuous hands-only chest compression techniques ensuring uninterrupted coronary and cerebral perfusion during sudden cardiac arrest.",
    tag: "Resuscitation Drill",
  },
  {
    icon: Users,
    title: "Training for Healthcare Professionals",
    desc: "Tailored upskilling workshops for staff nurses, Technicians, emergency room medical officers, critical care specialists, and multidisciplinary hospital teams.",
    tag: "Professional Upskilling",
  },
  {
    icon: BookOpen,
    title: "Training for Undergraduate Students",
    desc: "Structured clinical foundation drills, procedural competencies, examination techniques, and simulation-based basic bedside skills training for undergraduate students.",
    tag: "Undergraduate Education",
  },
  {
    icon: GraduationCap,
    title: "Training for Postgraduate Students",
    desc: "Curriculum-aligned simulation training allowing medical and surgical residents to master complex procedures and acute patient safety protocols before live patient care.",
    tag: "Academic Residency",
  },
  {
    icon: AlertTriangle,
    title: "Emergency & Resuscitation Skills Training",
    desc: "Dedicated crisis simulation modules testing rapid decision-making, clinical stabilization, and prompt intervention during acute medical and surgical collapses.",
    tag: "Emergency Protocols",
  },
  {
    icon: Layers,
    title: "Continuous Clinical Skills Development",
    desc: "Regular clinical competency assessments, evidence-based refresher sessions, and procedural drills reinforcing highest hospital safety standards.",
    tag: "Continuous Learning",
  },
];

const trainingRecognitionPoints = [
  {
    title: "IRCF (Indian Resuscitation Council Federation)",
    subtitle: "Comprehensive Resuscitation Training Centre (CRTC)",
    desc: "Officially authorizes Bangaru Lakshmi Institute of Simulation Skills (BLISS), MAPIMS as its Comprehensive Resuscitation Training Centre (CRTC) to conduct recognized resuscitation courses.",
    badge: "National Federation CRTC",
    validity: "Valid: 15th Apr 2025 – 15th Apr 2027",
    hasCertificate: true,
    certificatePdf: "/images/services/skill%20certificate-331_2.pdf",
    certificateImage: "/images/services/bliss-skill-ircf-certificate.webp",
  },
  {
    title: "The Tamil Nadu Dr. M.G.R. Medical University Nodal Center",
    subtitle: "Nodal Center for NLS and ACLS",
    desc: "Officially designated Nodal Center for conducting certified Neonatal Life Support (NLS) and Advanced Cardiac Life Support (ACLS) programs under The Tamil Nadu Dr. M.G.R. Medical University.",
    badge: "University Nodal Center",
    validity: "Designated Nodal Center",
    hasCertificate: false,
  },
];

const heroSlides = [
  {
    id: 1,
    src: "/images/services/bliss-skill-slide-1.webp",
    alt: "High-Fidelity Clinical Simulation ICU Suite and Patient Manikin at Bliss Skill Lab",
    badge: "Clinical Simulation",
    tagline: "High-Fidelity Simulation ICU Suite",
    icon: Stethoscope,
  },
  {
    id: 2,
    src: "/images/services/bliss-skill-slide-2.webp",
    alt: "Smart Simulation Lecture Hall & Training Classroom at Bliss Skill Lab",
    badge: "Smart Lecture Theater",
    tagline: "Interactive Smart Classroom & Training Hall",
    icon: GraduationCap,
  },
  {
    id: 3,
    src: "/images/services/bliss-skill-slide-3.webp",
    alt: "Life Support and CPR Resuscitation Drills at Bliss Skill Lab",
    badge: "Life Support Drills",
    tagline: "High-Performance CPR & Resuscitation",
    icon: HeartPulse,
  },
];

export default function BlissSkillLabPage() {
  const [certificateOpen, setCertificateOpen] = useState(false);
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
              Bliss Skill Simulation Lab
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
                Simulation-Based Medical Education
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
                <span className="block">Bliss Skill</span>
                <span className="block mt-1">
                  <span className="text-red-500">Simulation Lab</span>
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                The <strong className="text-white font-semibold">Bliss Skill Simulation Lab</strong> at Adhiparasakthi
                Hospitals provides a structured learning environment for healthcare
                professionals and postgraduate students to develop and strengthen
                essential clinical, emergency, and patient-care skills through
                simulation-based training.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#training-programs"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-600/50"
                >
                  <Calendar className="h-4 w-4" />
                  View Training Programs
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+919499059966"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-red-400" />
                  <span>Enquiry Desk: +91 94990 59966</span>
                </a>
              </div>
            </motion.div>

            {/* Right Card / Interactive Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
                {/* Main Hero Image Slide */}
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
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Badge: Facility Status & Counter */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      BLISS Simulation Facility
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
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                      }
                      className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-red-600 hover:scale-110 border border-white/20 cursor-pointer shadow-lg"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
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
            {labPillars.map((pillar, idx) => (
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

      {/* 3. Simulation & Clinical Skills Training */}
      <section className="section-padding py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <Stethoscope className="h-3.5 w-3.5" />
              Advanced Clinical Modalities
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Simulation &amp; Clinical Skills Training
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Hands-on practical training modules bridging clinical theory and real-world bedside performance.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clinicalSkillsModules.map((item, index) => {
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
                    <span>Hands-on Supervised Training</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Professional Training Programs */}
      <section
        id="training-programs"
        className="section-padding bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/70"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <GraduationCap className="h-3.5 w-3.5" />
              Curriculum &amp; Certifications
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Professional Training Programs
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Accredited life support certifications and ongoing skill development programs for physicians, residents, and nurses.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainingPrograms.map((program, idx) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-red-200 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                      {program.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {program.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Training & Recognition */}
      <section className="section-padding py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Quality &amp; Standards
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Training &amp; Recognition
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Dedicated to clinical excellence, evidence-based practices, and recognized academic accreditation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto items-stretch">
            {trainingRecognitionPoints.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/60 p-6 sm:p-7 transition hover:border-red-200 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30 shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-red-50 border border-red-200/80 px-3 py-1 text-xs font-semibold text-red-700">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-1 text-xs font-semibold text-red-600">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {item.desc}
                  </p>

                  {/* IRCF Certificate Interactive Preview & PDF link */}
                  {item.hasCertificate && item.certificateImage && (
                    <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                      <div
                        onClick={() => setCertificateOpen(true)}
                        className="group/cert relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer"
                        title="Click to view full certificate"
                      >
                        <Image
                          src={item.certificateImage}
                          alt="IRCF CRTC Certificate - Bangaru Lakshmi Institute of Simulation Skills (BLISS), MAPIMS"
                          fill
                          className="object-cover object-top transition duration-500 group-hover/cert:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent opacity-90 transition group-hover/cert:opacity-95" />

                        <div className="absolute top-2.5 left-2.5 rounded-md bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 shadow-sm border border-red-100">
                          Official Certificate
                        </div>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                          <div>
                            <p className="text-xs font-bold leading-tight">IRCF Authorization</p>
                            <p className="text-[10px] text-slate-300">CRTC Centre • 2025–2027</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCertificateOpen(true);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-md transition hover:bg-red-700 cursor-pointer"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                          <FileText className="h-4 w-4 text-red-600 shrink-0" />
                          <span className="truncate font-semibold">IRCF CRTC Certificate</span>
                        </div>
                        <a
                          href={item.certificatePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-800 hover:text-red-600 hover:border-red-300 shadow-sm transition"
                        >
                          <ExternalLink className="h-3 w-3 text-slate-500" />
                          <span>View PDF</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* University Nodal Center Scope Highlights */}
                  {!item.hasCertificate && (
                    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <GraduationCap className="h-4 w-4 text-red-600" />
                        <span>University Nodal Mandate</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Designated Nodal Center for Neonatal Life Support (NLS)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Designated Nodal Center for Advanced Cardiac Life Support (ACLS)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Conducted under Dr. M.G.R. Medical University academic regulations</span>
                        </li>
                      </ul>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Official Medical University Center</span>
                        <span className="font-semibold text-red-600">Academic Accreditation</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-2 text-xs pt-4 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5 font-semibold text-red-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Officially Recognized Accreditation</span>
                  </div>
                  {item.validity && (
                    <span className="text-[11px] font-medium text-slate-500">
                      {item.validity}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hospital Commitment / Training Excellence Banner */}
          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 text-white shadow-xl sm:p-10 border border-red-800/40">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1 min-w-0 max-w-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  Academic &amp; Clinical Excellence
                </span>
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                  Conducted in Accordance With Recognized Bodies
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-red-50 sm:text-sm max-w-3xl">
                  Where applicable, training programs are conducted in accordance with
                  the requirements of recognized professional and academic bodies. The
                  facility helps healthcare professionals improve clinical preparedness,
                  teamwork, communication, and response to emergency situations.
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

      {/* IRCF Certificate Lightbox Modal */}
      <AnimatePresence>
        {certificateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCertificateOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-slate-50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      IRCF Authorization Certificate
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      CRTC Centre • Valid 15 Apr 2025 – 15 Apr 2027
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/images/services/skill%20certificate-331_2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-red-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setCertificateOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200/80 text-slate-600 transition hover:bg-slate-300 hover:text-slate-900 cursor-pointer"
                    aria-label="Close certificate preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body / Image */}
              <div className="overflow-y-auto p-4 sm:p-6 bg-slate-100/60 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[1594/2149] rounded-xl overflow-hidden shadow-lg border border-slate-300/70 bg-white">
                  <Image
                    src="/images/services/bliss-skill-ircf-certificate.webp"
                    alt="Indian Resuscitation Council Federation Certificate"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 px-5 py-3 bg-white flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-1.5">
                <span className="truncate">Bangaru Lakshmi Institute of Simulation Skills (BLISS), MAPIMS</span>
                <span className="font-semibold text-red-600 shrink-0">Valid: 15 Apr 2025 to 15 Apr 2027</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
