"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Calendar,
  UserRound,
  Award,
  CheckCircle2,
  Target,
  Eye,
} from "lucide-react";
import ExpandableContent from "@/components/departments/ExpandableContent";
import HeroBackground from "@/components/layout/HeroBackground";
import TransplantExpertCare from "@/components/departments/transplant/TransplantExpertCare";
import TransplantSpecialistDoctors from "@/components/departments/transplant/TransplantSpecialistDoctors";
import FaqAccordion from "@/components/shared/FaqAccordion";
import {
  transplantStats,
  transplantIntro,
  transplantVisionMission,
  kidneyHopeCaseStudy,
  whyChooseTransplant,
  transplantServices,
  liverTransplantProgram,
  kidneyTransplantProgram,
  leadDoctor,
  transplantFaqs,
  transplantGallery,
} from "@/data/transplant-department";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-12 h-0.5 bg-red-600" />
      <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
        {children}
      </span>
      <div className="w-12 h-0.5 bg-red-600" />
    </div>
  );
}

export default function TransplantDepartmentPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden">
        <HeroBackground imageSrc="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" />
        <div className="container mx-auto px-4 z-20 relative section-padding">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/departments"
                className="hover:text-white transition-colors"
              >
                Departments
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Multi Organ Transplant</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Multi-Organ Transplant
              <span className="block text-red-500 mt-2">Liver & Kidney</span>
            </h1>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
              Saving lives through advanced organ transplant medicine with
              government-authorized liver and kidney transplant programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/#book-appointment"
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 font-medium shadow-lg shadow-red-600/30 transition-all"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Appointment
              </Link>
              <a
                href="tel:+919499059966"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-8 h-12 font-medium backdrop-blur-md transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <SectionLabel>Department</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why choose us for <span className="text-red-600">transplant?</span>
              </h2>
              <ExpandableContent preview={<p>{transplantIntro.preview}</p>}>
                <p>{transplantIntro.full}</p>
              </ExpandableContent>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
                alt="Transplant surgical team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {whyChooseTransplant.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50"
              >
                <CheckCircle2 className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <SectionLabel>Services</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Services <span className="text-red-600">Offered</span>
          </h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {transplantServices.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center min-h-[220px]"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  {service.title}
                </h3>
                <UserRound
                  className="w-12 h-12 text-red-600 mb-6 shrink-0"
                  strokeWidth={1.5}
                />
                {service.description ? (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                ) : (
                  <p className="text-base mt-auto">
                    <span className="font-bold text-slate-900">
                      {service.highlight}
                    </span>{" "}
                    <span className="text-slate-500">{service.subtitle}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TransplantExpertCare />

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <SectionLabel>Our Purpose</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Vision & <span className="text-red-600">Mission</span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-red-600 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="p-6 md:p-8 text-slate-600 leading-relaxed">
                {transplantVisionMission.vision}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600 leading-relaxed mb-6">
                  {transplantVisionMission.missionIntro}
                </p>
                <ul className="space-y-4">
                  {transplantVisionMission.missionPoints.map((point) => (
                    <li key={point.title} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {point.title}:
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed mt-1">
                          {point.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-14 md:py-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-25"
            aria-hidden
          />
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/20">
            {transplantStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center lg:px-6 first:lg:pl-0 last:lg:pr-0"
              >
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base font-semibold text-white mt-3">
                  {stat.label}
                </p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transplant Programs */}
      <section className="py-12 md:py-16 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="text-white space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Transplant Programs
                </h2>
                <p className="text-white/80">
                  Comprehensive Care for Liver and Kidney Transplants
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">
                  {liverTransplantProgram.title}
                </h3>
                <ExpandableContent
                  preview={<p className="text-white/90">{liverTransplantProgram.preview}</p>}
                  expandLabel="More Details"
                  collapseLabel="Read Less"
                  contentClassName="text-white/90"
                  variant="light"
                >
                  <p className="mb-4">{liverTransplantProgram.fullIntro}</p>
                  <ul className="space-y-2 list-disc list-inside text-white/90">
                    {liverTransplantProgram.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </ExpandableContent>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">
                  {kidneyTransplantProgram.title}
                </h3>
                <ExpandableContent
                  preview={<p className="text-white/90">{kidneyTransplantProgram.preview}</p>}
                  expandLabel="More Details"
                  collapseLabel="Read Less"
                  contentClassName="text-white/90"
                  variant="light"
                >
                  {kidneyTransplantProgram.fullIntro.map((paragraph) => (
                    <p key={paragraph} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                  <ul className="space-y-2 list-disc list-inside text-white/90">
                    {kidneyTransplantProgram.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </ExpandableContent>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
                alt="Transplant medical team"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOPE kidney transplant case study */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionLabel>Clinical Excellence</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Complex Kidney Transplant with{" "}
            <span className="text-red-600">HOPE Technology</span>
          </h2>
          <ExpandableContent
            preview={<p>{kidneyHopeCaseStudy.preview}</p>}
            expandLabel="More Details"
            collapseLabel="Read Less"
          >
            {kidneyHopeCaseStudy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </ExpandableContent>
        </div>
      </section>

      {/* Lead Doctor */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-start max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img
                src={leadDoctor.image}
                alt={leadDoctor.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {leadDoctor.name}
              </h2>
              <p className="text-red-600 font-semibold mt-1">
                {leadDoctor.credentials}
              </p>
              <p className="text-slate-600 text-sm mt-1 mb-6">
                {leadDoctor.department}
              </p>
              <ExpandableContent
                preview={<p>{leadDoctor.preview}</p>}
                expandLabel="More Details"
                collapseLabel="Read Less"
              >
                <p className="whitespace-pre-line">{leadDoctor.fullBio}</p>
              </ExpandableContent>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-slate-100 bg-white py-12 md:py-16"
        aria-labelledby="transplant-faq-heading"
      >
        <div className="container mx-auto max-w-3xl px-4">
          <header className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-0.5 w-12 bg-red-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                FAQ
              </span>
              <div className="h-0.5 w-12 bg-red-600" />
            </div>
            <h2
              id="transplant-faq-heading"
              className="text-3xl font-bold text-slate-900 md:text-4xl"
            >
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
          </header>
          <FaqAccordion faqs={transplantFaqs} idPrefix="transplant-faq" />
        </div>
      </section>

      <TransplantSpecialistDoctors />

      {/* Certification */}
      <section className="py-12 bg-red-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 text-white text-center md:text-left">
          <Award className="w-12 h-12 shrink-0" />
          <p className="text-lg font-medium max-w-2xl">
            NABH Accredited — Government of Tamil Nadu recognized institute for
            quality healthcare and transplant services.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <SectionLabel>Gallery</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Transplant <span className="text-red-600">Gallery</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {transplantGallery.map((src, i) => (
              <div
                key={src}
                className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100"
              >
                <img
                  src={src}
                  alt={`Transplant gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ADHIPARASAKTHI HOSPITALS & RESEARCH CENTRE
          </h2>
          <a
            href="tel:+919499059966"
            className="text-3xl md:text-4xl font-bold text-red-500 hover:text-red-400 transition-colors"
          >
            +91 94990 59966
          </a>
          <div className="mt-8">
            <Link
              href="/#book-appointment"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full px-10 h-12 font-semibold uppercase tracking-wide transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
