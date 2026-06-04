"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Building2,
  Users,
  Eye,
  ScanEye,
  Sun,
  Gauge,
  ScanLine,
  CircleDot,
  Glasses,
  Baby,
  Palette,
  Monitor,
  Camera,
  Cpu,
  Waves,
  Gift,
  Star,
  Shield
} from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import DepartmentPageAside from "@/components/departments/DepartmentPageAside";
import DepartmentHeroBadge from "@/components/departments/DepartmentHeroBadge";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentSpecialistDoctors from "@/components/departments/DepartmentSpecialistDoctors";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { ophthalmologyStats } from "@/data/department-stats";
import {
  ophthalmologyIntro,
  whyChooseOphthalmology,
  ophthalmologyServices,
  ophthalmologyServicesIntro,
  ophthalmologyTechnology,
  ophthalmologySpecialityAreas,
  ophthalmologyInfrastructure,
  ophthalmologyAchievementsNote,
  ophthalmologyTeamNote,
  ophthalmologyJourney,
  ophthalmologyJourneyPillars,
  ophthalmologyHeroImage,
  ophthalmologySpecialists,
} from "@/data/ophthalmology-department";

const serviceIcons = [
  Eye,
  Sun,
  Gauge,
  ScanLine,
  CircleDot,
  Glasses,
  Baby,
  Palette,
] as const;
const technologyIcons = [Monitor, Camera, ScanEye, Cpu, Waves] as const;
const infrastructureIcons = [
  Eye,
  Gift,
  Building2,
  Users,
  Shield,
  Star,
] as const;

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

export default function OphthalmologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[50vh] items-center overflow-hidden md:min-h-[55vh]">
        <HeroBackground
          imageSrc={ophthalmologyHeroImage}
          imageClassName="object-cover object-[44%_42%] sm:object-[50%_40%] md:object-[54%_38%]"
          overlayClassName="bg-gradient-to-r from-slate-950/97 via-slate-900/90 via-40% to-slate-900/20"
        />
        <div className="container relative z-20 mx-auto section-padding px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/departments"
                className="transition-colors hover:text-white"
              >
                Departments
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-white">Ophthalmology</span>
            </nav>
            <DepartmentHeroBadge>Best ophthalmology in India</DepartmentHeroBadge>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              <span className="text-red-500">Ophthalmology Department</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Cutting-edge eye care — from routine exams and cataract surgery to
              retina, glaucoma, and refractive vision correction.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#book-appointment"
                className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-8 font-medium text-white shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              <a
                href="tel:+919499059966"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <DepartmentHeroStats stats={ophthalmologyStats} />

      <div className="container mx-auto px-4 pb-12 pt-4 md:pb-16 md:pt-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
          <DepartmentPageAside />

          <div className="order-1 min-w-0 flex-1 lg:order-2">
            <section
              id="why-choose-us"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="max-w-3xl">
                <SectionLabel>Department</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Ophthalmology at{" "}
                  <span className="text-red-600">Melmaruvathur</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-slate-600">
                  <p>{ophthalmologyIntro.preview}</p>
                  <p>{ophthalmologyIntro.full}</p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {whyChooseOphthalmology.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition-all hover:border-red-100 hover:bg-white hover:shadow-lg"
                  >
                    <CheckCircle2 className="mb-4 h-8 w-8 text-red-600" />
                    <h3 className="mb-2 font-bold text-slate-900 group-hover:text-red-600">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
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
                <SectionLabel>Our Services</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Comprehensive <span className="text-red-600">Eye Care</span>
                </h2>
                <p className="mx-auto mb-10 max-w-2xl leading-relaxed text-slate-600">
                  {ophthalmologyServicesIntro}
                </p>
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {ophthalmologyServices.map((item, index) => {
                    const Icon = serviceIcons[index] ?? Eye;
                    return (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left shadow-sm transition-all hover:border-red-100 hover:bg-white hover:shadow-xl"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 transition-colors group-hover:bg-red-600">
                          <Icon className="h-6 w-6 text-red-600 transition-colors group-hover:text-white" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-red-600">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section
              id="technology"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="mb-10 text-center">
                <SectionLabel>Technology</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Advanced <span className="text-red-600">Equipment</span>
                </h2>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ophthalmologyTechnology.map((tech, index) => {
                  const Icon = technologyIcons[index] ?? Monitor;
                  return (
                    <motion.article
                      key={tech.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-red-100 hover:bg-white hover:shadow-lg"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 transition-colors group-hover:bg-red-600">
                        <Icon className="h-5 w-5 text-red-600 transition-colors group-hover:text-white" />
                      </div>
                      <h3 className="mb-2 font-bold text-slate-900 group-hover:text-red-600">
                        {tech.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {tech.description}
                      </p>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            <section
              id="speciality"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="text-center">
                <SectionLabel>Our Speciality</SectionLabel>
                <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
                  Subspecialty <span className="text-red-600">Centres</span>
                </h2>
              </div>
              <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
                {ophthalmologySpecialityAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-800"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="infrastructure"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 px-8 py-10 md:px-12 md:py-14">
                <div className="relative max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-200">
                    Infrastructure & Achievements
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                    World-Class <span className="text-red-200">Eye Care Facilities</span>
                  </h2>
                </div>
              </div>

              <div className="relative z-10 mx-auto -mt-6 grid max-w-6xl grid-cols-1 gap-5 px-2 sm:grid-cols-2 md:-mt-8 md:gap-6 md:px-4 lg:grid-cols-3">
                {ophthalmologyInfrastructure.map((item, index) => {
                  const Icon = infrastructureIcons[index] ?? Building2;
                  return (
                    <motion.article
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-2xl border border-red-100 bg-white p-6 shadow-lg shadow-red-900/5 transition-all hover:shadow-xl"
                    >
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                    </motion.article>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mx-auto mt-6 max-w-6xl rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8"
              >
                <h3 className="text-lg font-bold text-slate-900">Achievements</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {ophthalmologyAchievementsNote}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                whileHover={{ y: -4 }}
                className="group mx-auto mt-6 flex max-w-6xl flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-6 md:flex-row md:items-center md:p-8"
              >
                <Users className="h-14 w-14 shrink-0 text-red-600" />
                <div>
                  <h3 className="text-lg font-bold text-red-900">
                    {ophthalmologyTeamNote.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-red-800/80 md:text-base">
                    {ophthalmologyTeamNote.description}
                  </p>
                </div>
              </motion.div>
            </section>

            <div id="specialists" className="scroll-mt-28 border-b border-slate-100">
              <DepartmentSpecialistDoctors
                departmentSlug="ophthalmology"
                specialists={ophthalmologySpecialists}
                embedded
              />
            </div>

            <DepartmentFAQ departmentSlug="ophthalmology" />
            <DepartmentPatientCareSection
              heading={ophthalmologyJourney.heading}
              body={ophthalmologyJourney.body}
              pillars={ophthalmologyJourneyPillars}
              ctaHeading={ophthalmologyJourney.ctaHeading}
              ctaBody={ophthalmologyJourney.ctaBody}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
