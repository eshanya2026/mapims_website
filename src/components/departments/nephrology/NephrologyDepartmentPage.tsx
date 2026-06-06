"use client";

import {
  Heart,
  Droplets,
  Activity,
  Shield,
  ScanLine,
  Stethoscope,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { nephrologyStats } from "@/data/department-stats";
import {
  nephrologyHeroTagline,
  nephrologyIntro,
  whyChooseNephrology,
  nephrologyServices,
  nephrologyConditions,
  nephrologyInfrastructure,
  nephrologyTransplantExcellence,
  nephrologyJourney,
  nephrologyJourneyPillars,
  nephrologyHeroImage,
} from "@/data/nephrology-department";
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

const serviceIcons = [
  Heart,
  Droplets,
  Activity,
  Shield,
  ScanLine,
  Stethoscope,
] as const;

export default function NephrologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Nephrology"
        badge="Best nephrology in India"
        title={
          <>
            Nephrology <span className="text-red-500">Department</span>
          </>
        }
        tagline={nephrologyHeroTagline}
        imageSrc={nephrologyHeroImage}
        imageClassName="object-cover object-[55%_45%] sm:object-[62%_42%] md:object-[66%_40%]"
      />
      <DepartmentHeroStats stats={nephrologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{nephrologyIntro.preview}</p>
            <p>{nephrologyIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseNephrology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Nephrology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={nephrologyServices} icons={serviceIcons} />
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
          <DepartmentChecklistGrid items={nephrologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is supported by:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={nephrologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in{" "}
                  <span className="text-red-600">Kidney Transplantation</span>
                </>
              }
              paragraphs={[
                nephrologyTransplantExcellence.intro,
                nephrologyTransplantExcellence.detail,
              ]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="nephrology" />
        <DepartmentPatientCareSection
          heading={nephrologyJourney.heading}
          body={nephrologyJourney.body}
          pillars={nephrologyJourneyPillars}
          ctaHeading={nephrologyJourney.ctaHeading}
          ctaBody={nephrologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
