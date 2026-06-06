"use client";

import { Eye, ScanEye, Sun, Gauge, CircleDot, Baby, Palette } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { ophthalmologyStats } from "@/data/department-stats";
import {
  ophthalmologyHeroTagline,
  ophthalmologyIntro,
  whyChooseOphthalmology,
  ophthalmologyServices,
  ophthalmologySpecializedCare,
  ophthalmologyInfrastructure,
  ophthalmologyExcellence,
  ophthalmologyJourney,
  ophthalmologyJourneyPillars,
  ophthalmologyHeroImage,
} from "@/data/ophthalmology-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentWhyChooseCards,
  DepartmentServicesGrid,
  DepartmentChecklistGrid,
  DepartmentGradientPanel,
  DepartmentExcellenceNote,
} from "@/components/departments/design";

const serviceIcons = [Sun, Gauge, ScanEye, CircleDot, Baby, Palette] as const;

export default function OphthalmologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Ophthalmology"
        badge="Best ophthalmology in India"
        title={
          <>
            Ophthalmology <span className="text-red-500">Department</span>
          </>
        }
        tagline={ophthalmologyHeroTagline}
        imageSrc={ophthalmologyHeroImage}
        imageClassName="object-cover object-[50%_45%] sm:object-[56%_42%] md:object-[60%_40%]"
      />
      <DepartmentHeroStats stats={ophthalmologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{ophthalmologyIntro.preview}</p>
            <p>{ophthalmologyIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseOphthalmology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Ophthalmology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={ophthalmologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="specialized-care" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Specialized"
              highlight="Eye Care"
              description="We provide expert treatment for:"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={ophthalmologySpecializedCare} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={ophthalmologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Eye Care</span>
                </>
              }
              paragraphs={[
                ophthalmologyExcellence.intro,
                ophthalmologyExcellence.detail,
              ]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="ophthalmology" />
        <DepartmentPatientCareSection
          heading={ophthalmologyJourney.heading}
          body={ophthalmologyJourney.body}
          pillars={ophthalmologyJourneyPillars}
          ctaHeading={ophthalmologyJourney.ctaHeading}
          ctaBody={ophthalmologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
