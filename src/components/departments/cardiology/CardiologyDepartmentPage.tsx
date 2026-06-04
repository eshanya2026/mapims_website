"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Activity,
  ScanLine,
  Building2,
  Users,
  Stethoscope,
  Shield,
  Clock
} from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import DepartmentPageAside from "@/components/departments/DepartmentPageAside";
import DepartmentHeroBadge from "@/components/departments/DepartmentHeroBadge";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentSpecialistDoctors from "@/components/departments/DepartmentSpecialistDoctors";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { cardiologyStats } from "@/data/department-stats";
import {
  cardiologyIntro,
  whyChooseCardiology,
  cardiologyServices,
  cardiologyServicesIntro,
  cardiologySpeciality,
  cardiologyInfrastructure,
  cardiologyTeamNote,
  cardiologyAchievementsNote,
  cardiologyHod,
  cardiologyJourney,
  cardiologyJourneyPillars,
  cardiologyHeroImage,
  cardiologySpecialists,
} from "@/data/cardiology-department";

const serviceIcons = [Heart, Activity, Stethoscope, Heart, Activity, Shield, ScanLine] as const;
const infrastructureIcons = [
  ScanLine,
  Activity,
  Shield,
  Building2,
  Heart,
  Activity,
  Stethoscope,
  Users,
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

export default function CardiologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[50vh] items-center overflow-hidden md:min-h-[55vh]">
        <HeroBackground imageSrc={cardiologyHeroImage} />
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
              <span className="font-medium text-white">Cardiology</span>
            </nav>
            <DepartmentHeroBadge>Top cardiology services in Chennai</DepartmentHeroBadge>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              <span className="text-red-500">Cardiology Department</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              World-class heart care for adults and children — from prevention
              to advanced interventional and critical care.
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

      <DepartmentHeroStats stats={cardiologyStats} />

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
                  Why <span className="text-red-600">Choose Us?</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-slate-600">
                  <p>{cardiologyIntro.preview}</p>
                  <p>{cardiologyIntro.full}</p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {whyChooseCardiology.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
                  >
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
                <SectionLabel>Treatments</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Key <span className="text-red-600">Treatments & Services</span>
                </h2>
                <p className="mx-auto mb-10 max-w-3xl leading-relaxed text-slate-600">
                  {cardiologyServicesIntro}
                </p>
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2">
                  {cardiologyServices.map((service, index) => {
                    const Icon = serviceIcons[index] ?? Heart;
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
                        <p className="text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section
              id="speciality"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="max-w-3xl">
                <SectionLabel>Our Speciality</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  <span className="text-red-600">{cardiologySpeciality.heading}</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-slate-600">
                  <p>{cardiologySpeciality.preview}</p>
                  <p>{cardiologySpeciality.full}</p>
                </div>
              </div>
            </section>

            <section
              id="infrastructure"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 px-8 py-10 md:px-12 md:py-14">
                <div className="relative max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-200">
                    Infrastructure
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                    State-of-the-Art{" "}
                    <span className="text-red-200">Facilities & Equipment</span>
                  </h2>
                  <p className="mt-4 leading-relaxed text-red-50/90">
                    Cutting-edge CCU technology with 24/7 specialist staffing for
                    the most critical cardiac and thoracic conditions.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mx-auto -mt-6 grid max-w-6xl grid-cols-1 gap-5 px-2 sm:grid-cols-2 md:-mt-8 md:gap-6 md:px-4 lg:grid-cols-4">
                {cardiologyInfrastructure.map((item, index) => {
                  const Icon = infrastructureIcons[index] ?? Building2;
                  return (
                    <motion.article
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-2xl border border-red-100 bg-white p-6 shadow-lg shadow-red-900/5 transition-all duration-300 hover:border-red-200 hover:shadow-xl"
                    >
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
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
                className="group mx-auto mt-6 flex max-w-6xl flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-start md:p-8"
              >
                <Clock className="h-10 w-10 shrink-0 text-red-600" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Achievements</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                    {cardiologyAchievementsNote}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                whileHover={{ y: -4 }}
                className="group mx-auto mt-6 flex max-w-6xl flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-6 transition-all hover:border-red-300 hover:shadow-lg md:flex-row md:items-center md:p-8"
              >
                <Users className="h-14 w-14 shrink-0 text-red-600" />
                <div>
                  <h3 className="text-lg font-bold text-red-900">
                    {cardiologyTeamNote.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-red-800/80 md:text-base">
                    {cardiologyTeamNote.description}
                  </p>
                </div>
              </motion.div>
            </section>

            <section
              id="leadership"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <SectionLabel>Leadership</SectionLabel>
              <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-[240px_1fr]">
                <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
                  <img
                    src={cardiologyHod.image}
                    alt={cardiologyHod.name}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {cardiologyHod.name}
                  </h2>
                  <p className="mt-1 font-semibold text-red-600">
                    {cardiologyHod.qualification}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{cardiologyHod.department}</p>
                  <p className="mt-6 leading-relaxed text-slate-600">
                    {cardiologyHod.message}
                  </p>
                </div>
              </div>
            </section>

            <div id="specialists" className="scroll-mt-28 border-b border-slate-100">
              <DepartmentSpecialistDoctors
                departmentSlug="cardiology"
                specialists={cardiologySpecialists}
                embedded
              />
            </div>

            <DepartmentFAQ departmentSlug="cardiology" />
            <DepartmentPatientCareSection
              heading={cardiologyJourney.heading}
              body={cardiologyJourney.body}
              pillars={cardiologyJourneyPillars}
              ctaHeading={cardiologyJourney.ctaHeading}
              ctaBody={cardiologyJourney.ctaBody}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
