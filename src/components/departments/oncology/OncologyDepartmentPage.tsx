"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Microscope,
  Radiation,
  Scissors,
  Building2,
  Users,
  ScanLine
} from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import DepartmentPageAside from "@/components/departments/DepartmentPageAside";
import DepartmentHeroBadge from "@/components/departments/DepartmentHeroBadge";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentSpecialistDoctors from "@/components/departments/DepartmentSpecialistDoctors";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { oncologyStats } from "@/data/department-stats";
import {
  oncologyIntro,
  whyChooseOncology,
  oncologyPrograms,
  oncologyServices,
  oncologyInfrastructure,
  oncologyJourney,
  oncologyJourneyPillars,
  oncologyHeroImage,
  oncologySpecialists,
} from "@/data/oncology-department";


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

const serviceIcons = [Microscope, Radiation, Scissors] as const;
const infrastructureIcons = [ScanLine, Radiation, Building2] as const;

export default function OncologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-center overflow-hidden">
        <HeroBackground imageSrc={oncologyHeroImage} />
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
              <span className="text-white font-medium">Oncology</span>
            </nav>
            <DepartmentHeroBadge>Best oncology in India</DepartmentHeroBadge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="text-red-500">Oncology Department</span>
            </h1>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
              World-class cancer care through cutting-edge treatments,
              compassionate support, and a patient-centered approach.
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

      <DepartmentHeroStats stats={oncologyStats} />

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
              <p>{oncologyIntro.preview}</p>
              <p>{oncologyIntro.full}</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {whyChooseOncology.map((item, index) => (
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
        id="care-programs"
        className="scroll-mt-28 border-b border-slate-100 bg-slate-50 py-12 md:py-16"
      >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <SectionLabel>Our Speciality</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Care <span className="text-red-600">Beyond Treatment</span>
            </h2>
            <p className="text-slate-600 mt-3 leading-relaxed">
              Integrated support from reconstruction and palliative care to
              screening and genetic counseling.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {oncologyPrograms.map((program, index) => (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-100 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
                  <Heart className="h-7 w-7 text-red-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-2 font-bold text-slate-900 transition-colors group-hover:text-red-600">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {program.description}
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
            Our <span className="text-red-600">Oncology Services</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Our Oncology Department specializes in treating a wide spectrum of
            cancers with an integrated approach that combines medical, surgical,
            and radiation oncology.
          </p>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
            {oncologyServices.map((service, index) => {
              const Icon = serviceIcons[index] ?? Microscope;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-slate-100 bg-slate-50 p-8 text-left shadow-sm transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-xl"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 transition-colors duration-300 group-hover:bg-red-600">
                    <Icon className="h-7 w-7 text-red-600 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
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
                Achievements
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                Infrastructure &{" "}
                <span className="text-red-200">Excellence</span>
              </h2>
              <p className="mt-4 leading-relaxed text-red-50/90">
                State-of-the-art facilities and a multidisciplinary team dedicated
                to your care.
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-6 grid max-w-5xl grid-cols-1 gap-5 px-2 sm:grid-cols-3 md:-mt-8 md:gap-6 md:px-4">
            {oncologyInfrastructure.map((item, index) => {
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
            className="group mx-auto mt-8 flex max-w-5xl flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-6 transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:shadow-red-900/10 md:flex-row md:items-center md:p-8"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/25 transition-transform duration-300 group-hover:scale-105">
              <Users className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-red-900">
                Our Multidisciplinary Team
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-red-800/80 md:text-base">
                Highly skilled oncologists, surgeons, radiation specialists,
                nurses, and support staff working together for every patient.
              </p>
            </div>
          </motion.div>
      </section>

      <div id="specialists" className="scroll-mt-28">
        <DepartmentSpecialistDoctors
          departmentSlug="oncology"
          specialists={oncologySpecialists}
          embedded
        />
      </div>

      <DepartmentFAQ departmentSlug="oncology" />
            <DepartmentPatientCareSection
              heading={oncologyJourney.heading}
              body={oncologyJourney.body}
              pillars={oncologyJourneyPillars}
              ctaHeading={oncologyJourney.ctaHeading}
              ctaBody={oncologyJourney.ctaBody}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
