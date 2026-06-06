"use client";

import { Droplets, Shield, Activity, Heart, Baby, ScanLine, Scissors } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { urologyStats } from "@/data/department-stats";
import {
  urologyHeroTagline,
  urologyIntro,
  whyChooseUrology,
  urologyServices,
  urologyConditions,
  urologyTechnology,
  urologyInfrastructure,
  urologyJourney,
  urologyJourneyPillars,
  urologyHeroImage,
} from "@/data/urology-department";
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
} from "@/components/departments/design";

const serviceIcons = [
  Droplets,
  Shield,
  Activity,
  Heart,
  Baby,
  ScanLine,
  Scissors,
] as const;

export default function UrologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Urology"
        badge="Best urology hospital in India"
        title={
          <>
            Urology <span className="text-red-500">Department</span>
          </>
        }
        tagline={urologyHeroTagline}
        imageSrc={urologyHeroImage}
        imageClassName="object-cover object-[48%_42%] sm:object-[52%_40%] md:object-[55%_38%]"
      />
      <DepartmentHeroStats stats={urologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{urologyIntro.preview}</p>
            <p>{urologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseUrology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Urology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={urologyServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Conditions"
              highlight="We Treat"
              description="Our specialists manage a wide range of urological conditions including:"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={urologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="technology">
          <DepartmentGradientPanel
            eyebrow="Technology"
            title="Advanced"
            highlight="Technology"
            description="Our department is equipped with:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={urologyTechnology} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="infrastructure" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Facilities</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Infrastructure &"
              highlight="Facilities"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={urologyInfrastructure} />
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="urology" />
        <DepartmentPatientCareSection
          heading={urologyJourney.heading}
          body={urologyJourney.body}
          pillars={urologyJourneyPillars}
          ctaHeading={urologyJourney.ctaHeading}
          ctaBody={urologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
