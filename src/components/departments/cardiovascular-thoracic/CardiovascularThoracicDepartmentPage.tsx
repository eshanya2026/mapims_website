"use client";

import {
  Heart,
  Activity,
  Scissors,
  ShieldCheck,
  Wind,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { cardiovascularThoracicStats } from "@/data/department-stats";
import {
  cvtsHeroTagline,
  cvtsIntro,
  whyChooseCVTS,
  cvtsServices,
  cvtsConditions,
  cvtsInfrastructure,
  cvtsTechnology,
  cvtsExcellenceNote,
  cvtsJourney,
  cvtsJourneyPillars,
  cvtsHeroImage,
} from "@/data/cardiovascular-thoracic-department";
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

const serviceIcons = [Heart, Scissors, Wind, ShieldCheck, Activity] as const;

export default function CardiovascularThoracicDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Cardiovascular & Thoracic Surgery"
        badge="Advanced Open-Heart Surgery & Minimally Invasive Thoracic Care"
        title={
          <>
            Cardiovascular &{" "}
            <span className="text-red-500">Thoracic Surgery</span>
          </>
        }
        tagline={cvtsHeroTagline}
        imageSrc={cvtsHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={cardiovascularThoracicStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{cvtsIntro.preview}</p>
            <p>{cvtsIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseCVTS} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Surgical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Cardiothoracic Surgery Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={cvtsServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Cardiothoracic Conditions"
              highlight="We Treat"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={cvtsConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="State-of-the-Art"
            highlight="Cardiothoracic Infrastructure"
            description="Our department is equipped with dedicated laminar-airflow cardiac operating suites, heart-lung machines, and specialized recovery units:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={cvtsInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Advanced"
              highlight="Surgical Technology"
              description="We leverage sophisticated surgical and monitoring technologies to ensure superior precision and patient safety:"
              align="center"
            />
            <DepartmentChecklistGrid items={cvtsTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in{" "}
                  <span className="text-red-600">Cardiothoracic Surgical Outcomes</span>
                </>
              }
              paragraphs={[cvtsExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="cardiovascular-thoracic-surgery" />
        <DepartmentPatientCareSection
          heading={cvtsJourney.heading}
          body={cvtsJourney.body}
          pillars={cvtsJourneyPillars}
          ctaHeading={cvtsJourney.ctaHeading}
          ctaBody={cvtsJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
