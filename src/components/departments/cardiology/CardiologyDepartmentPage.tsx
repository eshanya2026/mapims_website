"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Stethoscope,
  Shield,
  Baby,
  Zap,
  ScanLine,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { cardiologyStats } from "@/data/department-stats";
import {
  cardiologyHeroTagline,
  cardiologyIntro,
  cardiologyWhyChooseStats,
  cardiologyServices,
  cardiologyCcu,
  cardiologyInfrastructureIntro,
  cardiologyInfrastructureHighlights,
  cardiologyJourney,
  cardiologyJourneyPillars,
  cardiologyHeroImage,
} from "@/data/cardiology-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentIntroText,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentServicesGrid,
  DepartmentChecklistGrid,
  DepartmentGradientPanel,
} from "@/components/departments/design";

const serviceIcons = [
  Heart,
  Activity,
  Stethoscope,
  Baby,
  Zap,
  Shield,
  ScanLine,
] as const;

export default function CardiologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Cardiology"
        badge="Top cardiology services in Chennai"
        title={
          <>
            Cardiology <span className="text-red-500">Department</span>
          </>
        }
        tagline={cardiologyHeroTagline}
        imageSrc={cardiologyHeroImage}
      />
      <DepartmentHeroStats stats={cardiologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{cardiologyIntro.preview}</p>
            <p>{cardiologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {cardiologyWhyChooseStats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-400" />
                <p className="text-2xl font-bold text-red-600 md:text-3xl">
                  {stat.highlight}
                </p>
                <p className="mt-2 text-xs font-semibold leading-snug text-slate-700 md:text-sm">
                  {stat.label}
                </p>
              </motion.article>
            ))}
          </div>
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Cardiology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={cardiologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="speciality" variant="muted">
          <DepartmentSectionLabel>Critical Care</DepartmentSectionLabel>
          <DepartmentSectionHeading
            title={
              <span className="text-red-600">{cardiologyCcu.heading}</span>
            }
            description={cardiologyCcu.preview}
          />
          <h3 className="mb-4 text-lg font-bold text-slate-900">Key Facilities</h3>
          <DepartmentChecklistGrid items={cardiologyCcu.facilities} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Excellence"
            title="Infrastructure &"
            highlight="Excellence"
            description={cardiologyInfrastructureIntro}
          />
          <div className="mt-8">
            <h3 className="mb-6 text-center text-lg font-bold text-slate-900">
              Highlights
            </h3>
            <DepartmentChecklistGrid items={cardiologyInfrastructureHighlights} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="cardiology" />
        <DepartmentPatientCareSection
          heading={cardiologyJourney.heading}
          body={cardiologyJourney.body}
          pillars={cardiologyJourneyPillars}
          ctaHeading={cardiologyJourney.ctaHeading}
          ctaBody={cardiologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
