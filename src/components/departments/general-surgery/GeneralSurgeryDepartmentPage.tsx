"use client";

import {
  Sparkles,
  ShieldCheck,
  Activity,
  Scissors,
  Stethoscope,
  Zap,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { generalSurgeryStats } from "@/data/department-stats";
import {
  generalSurgeryHeroTagline,
  generalSurgeryIntro,
  whyChooseGeneralSurgery,
  generalSurgeryServices,
  generalSurgeryConditions,
  generalSurgeryInfrastructure,
  generalSurgeryTechnology,
  generalSurgeryExcellenceNote,
  generalSurgeryJourney,
  generalSurgeryJourneyPillars,
  generalSurgeryHeroImage,
} from "@/data/general-surgery-department";
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

const serviceIcons = [
  Sparkles,
  ShieldCheck,
  Activity,
  Scissors,
  Stethoscope,
  Zap,
] as const;

export default function GeneralSurgeryDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="General Surgery"
        badge="Advanced General, Laparoscopic & Acute Trauma Care"
        title={
          <>
            General & <span className="text-red-500">Laparoscopic Surgery</span>
          </>
        }
        tagline={generalSurgeryHeroTagline}
        imageSrc={generalSurgeryHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={generalSurgeryStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{generalSurgeryIntro.preview}</p>
            <p>{generalSurgeryIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseGeneralSurgery} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Surgical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="General Surgery Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={generalSurgeryServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Surgical Conditions"
              highlight="We Treat"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={generalSurgeryConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="State-of-the-Art"
            highlight="Surgical Infrastructure"
            description="Our department is equipped with ultra-modern laminar airflow operating suites, advanced laparoscopic towers, and dedicated recovery units:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={generalSurgeryInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Advanced"
              highlight="Surgical Technology"
              description="We leverage sophisticated laparoscopic and tissue dissection technologies to ensure precision, minimal invasiveness, and optimal patient safety:"
              align="center"
            />
            <DepartmentChecklistGrid items={generalSurgeryTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in{" "}
                  <span className="text-red-600">Surgical Clinical Outcomes</span>
                </>
              }
              paragraphs={[generalSurgeryExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="general-surgery" />
        <DepartmentPatientCareSection
          heading={generalSurgeryJourney.heading}
          body={generalSurgeryJourney.body}
          pillars={generalSurgeryJourneyPillars}
          ctaHeading={generalSurgeryJourney.ctaHeading}
          ctaBody={generalSurgeryJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
