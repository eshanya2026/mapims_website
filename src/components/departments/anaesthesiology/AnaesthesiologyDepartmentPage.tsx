"use client";

import {
  Syringe,
  HeartPulse,
  Activity,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { anaesthesiologyStats } from "@/data/department-stats";
import {
  anaesthesiologyHeroTagline,
  anaesthesiologyIntro,
  whyChooseAnaesthesiology,
  anaesthesiologyServices,
  anaesthesiologyConditions,
  anaesthesiologyInfrastructure,
  anaesthesiologyTechnology,
  anaesthesiologyExcellenceNote,
  anaesthesiologyJourney,
  anaesthesiologyJourneyPillars,
  anaesthesiologyHeroImage,
} from "@/data/anaesthesiology-department";
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

const serviceIcons = [Syringe, HeartPulse, Activity, ShieldCheck, Stethoscope] as const;

export default function AnaesthesiologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Anaesthesiology"
        badge="Advanced Perioperative, Critical Care & Pain Medicine"
        title={
          <>
            Anaesthesiology & <span className="text-red-500">Critical Care</span>
          </>
        }
        tagline={anaesthesiologyHeroTagline}
        imageSrc={anaesthesiologyHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={anaesthesiologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{anaesthesiologyIntro.preview}</p>
            <p>{anaesthesiologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseAnaesthesiology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Anaesthesia & Critical Care Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={anaesthesiologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Surgical & Critical Indications"
              highlight="We Support"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={anaesthesiologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with modern modular operating suites and critical care technologies:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={anaesthesiologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Anaesthesia Care"
              description="We continuously invest in advanced monitoring, precision delivery systems, and ultrasound-guided tools to ensure absolute patient safety, including:"
              align="center"
            />
            <DepartmentChecklistGrid items={anaesthesiologyTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Perioperative & Critical Care</span>
                </>
              }
              paragraphs={[anaesthesiologyExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="anaesthesiology" />
        <DepartmentPatientCareSection
          heading={anaesthesiologyJourney.heading}
          body={anaesthesiologyJourney.body}
          pillars={anaesthesiologyJourneyPillars}
          ctaHeading={anaesthesiologyJourney.ctaHeading}
          ctaBody={anaesthesiologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
