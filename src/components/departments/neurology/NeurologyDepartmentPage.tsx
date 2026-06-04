"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Brain,
  Activity,
  ScanLine,
  Building2,
  Users
} from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import DepartmentPageAside from "@/components/departments/DepartmentPageAside";
import DepartmentHeroBadge from "@/components/departments/DepartmentHeroBadge";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentSpecialistDoctors from "@/components/departments/DepartmentSpecialistDoctors";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { neurologyStats } from "@/data/department-stats";
import {
  neurologyIntro,
  whyChooseNeurology,
  neurologyServices,
  neurologyServicesIntro,
  neurologyInfrastructure,
  neurologyTeamNote,
  neurologyJourney,
  neurologyJourneyPillars,
  neurologyHeroImage,
  neurologySpecialists,
} from "@/data/neurology-department";

const infrastructureIcons = [ScanLine, Activity, Building2, Brain] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="h-0.5 w-12 bg-red-600" />
      <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
        {children}
      </span>
      <div className="h-0.5 w-12 bg-red-600" />
    </div>
  );
}

export default function NeurologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden">
        <HeroBackground
          imageSrc={neurologyHeroImage}
          imageClassName="object-cover object-[50%_42%] sm:object-[56%_40%] md:object-[60%_38%]"
          overlayClassName="bg-gradient-to-r from-slate-950/97 via-slate-900/92 via-36% to-slate-900/10"
        />
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
              <span className="text-white font-medium">Neurology</span>
            </nav>
            <DepartmentHeroBadge>Best neurology in India</DepartmentHeroBadge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="text-red-500">Neurology Department</span>
            </h1>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
              World-class neurological care with advanced diagnostics,
              compassionate support, and personalized treatment for every patient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/#book-appointment"
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 font-medium shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
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

      <DepartmentHeroStats stats={neurologyStats} />

      <div className="container mx-auto px-4 pb-12 md:pb-16 pt-4 md:pt-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
          <DepartmentPageAside />

          <div className="order-1 min-w-0 flex-1 lg:order-2">
            <section
              id="why-choose-us"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="max-w-3xl">
                <SectionLabel>Department</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Why <span className="text-red-600">Choose Us?</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>{neurologyIntro.preview}</p>
                  <p>{neurologyIntro.full}</p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {whyChooseNeurology.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
                  >
                    <div
                      className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-600/5 transition-transform duration-300 group-hover:scale-150"
                      aria-hidden
                    />
                    <CheckCircle2 className="relative mb-4 h-8 w-8 text-red-600 transition-transform duration-300 group-hover:scale-105" />
                    <h3 className="relative mb-2 font-bold text-slate-900 transition-colors group-hover:text-red-600">
                      {item.title}
                    </h3>
                    <p className="relative text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section
              id="services"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="text-center">
                <SectionLabel>Our Speciality</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Our <span className="text-red-600">Neurology Services</span>
                </h2>
                <p className="text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                  {neurologyServicesIntro}
                </p>
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2">
                  {neurologyServices.map((service, index) => {
                    const Icon = Brain;
                    return (
                      <motion.article
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left shadow-sm transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-xl"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
                          <Icon className="h-6 w-6 text-red-600 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-red-600">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section
              id="infrastructure"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 px-8 py-10 md:px-12 md:py-14">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-400/20 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-red-300/15 blur-3xl"
                  aria-hidden
                />
                <div className="relative max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-200">
                    Infrastructure
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                    Advanced Facilities and{" "}
                    <span className="text-red-200">Technology</span>
                  </h2>
                  <p className="mt-4 leading-relaxed text-red-50/90">
                    State-of-the-art diagnostic and critical-care facilities
                    supporting comprehensive neurological treatment.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mx-auto -mt-6 grid max-w-6xl grid-cols-1 gap-5 px-2 sm:grid-cols-2 lg:grid-cols-4 md:-mt-8 md:gap-6 md:px-4">
                {neurologyInfrastructure.map((item, index) => {
                  const Icon = infrastructureIcons[index] ?? Building2;
                  return (
                    <motion.article
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-2xl border border-red-100 bg-white p-6 shadow-lg shadow-red-900/5 transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-red-900/10"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-2xl font-black text-red-100 transition-colors duration-300 group-hover:text-red-200">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item}
                      </p>
                    </motion.article>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="group mx-auto mt-8 flex max-w-6xl flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-6 transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:shadow-red-900/10 md:flex-row md:items-center md:p-8"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/25 transition-transform duration-300 group-hover:scale-105">
                  <Users className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-red-900">
                    {neurologyTeamNote.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-red-800/80 md:text-base">
                    {neurologyTeamNote.description}
                  </p>
                </div>
              </motion.div>
            </section>

            <div id="specialists" className="scroll-mt-28">
              <DepartmentSpecialistDoctors
                departmentSlug="neurology"
                specialists={neurologySpecialists}
                embedded
              />
            </div>

            <DepartmentFAQ departmentSlug="neurology" />
            <DepartmentPatientCareSection
              heading={neurologyJourney.heading}
              body={neurologyJourney.body}
              pillars={neurologyJourneyPillars}
              ctaHeading={neurologyJourney.ctaHeading}
              ctaBody={neurologyJourney.ctaBody}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
