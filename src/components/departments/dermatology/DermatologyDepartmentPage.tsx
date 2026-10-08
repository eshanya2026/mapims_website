"use client";

import {
  Sparkles,
  Zap,
  ShieldCheck,
  Droplet,
  Smile,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { dermatologyStats } from "@/data/department-stats";
import {
  dermatologyHeroTagline,
  dermatologyIntro,
  whyChooseDermatology,
  dermatologyServices,
  dermatologyConditions,
  dermatologyInfrastructure,
  dermatologyTechnology,
  dermatologyExcellenceNote,
  dermatologyJourney,
  dermatologyJourneyPillars,
  dermatologyHeroImage,
} from "@/data/dermatology-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentIntroText,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentWhyChooseCards,
  DepartmentServicesGrid,
  DepartmentChecklistGrid,
  DepartmentGradientPanel,
  DepartmentExcellenceNote,
} from "@/components/departments/design";

const serviceIcons = [Sparkles, Smile, Zap, Droplet, ShieldCheck] as const;

export default function DermatologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Dermatology"
        badge="Best dermatology in Chennai"
        title={
          <>
            Dermatology <span className="text-red-500">Department</span>
          </>
        }
        tagline={dermatologyHeroTagline}
        imageSrc={dermatologyHeroImage}
        imageClassName="object-cover object-[50%_35%] sm:object-[55%_35%] md:object-[58%_35%]"
      />
      <DepartmentHeroStats stats={dermatologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{dermatologyIntro.preview}</p>
            <p>{dermatologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseDermatology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Dermatology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={dermatologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Conditions"
              highlight="We Treat"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={dermatologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with modern diagnostic, dermatosurgery and laser technologies:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={dermatologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Dermatology Care"
              description="We continuously invest in modern medical and aesthetic technologies to deliver accurate diagnosis, precision dermatosurgery, and effective treatments, including:"
              align="center"
            />
            <DepartmentChecklistGrid items={dermatologyTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Dermatological Care</span>
                </>
              }
              paragraphs={[dermatologyExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="dermatology" />
        <DepartmentPatientCareSection
          heading={dermatologyJourney.heading}
          body={dermatologyJourney.body}
          pillars={dermatologyJourneyPillars}
          ctaHeading={dermatologyJourney.ctaHeading}
          ctaBody={dermatologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
