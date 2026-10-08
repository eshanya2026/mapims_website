"use client";

import {
  Scan,
  Layers,
  Activity,
  Radio,
  ShieldCheck,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { radiologyStats } from "@/data/department-stats";
import {
  radiologyHeroTagline,
  radiologyIntro,
  whyChooseRadiology,
  radiologyServices,
  radiologyConditions,
  radiologyInfrastructure,
  radiologyTechnology,
  radiologyExcellenceNote,
  radiologyJourney,
  radiologyJourneyPillars,
  radiologyHeroImage,
} from "@/data/radiology-department";
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

const serviceIcons = [Scan, Layers, Activity, Radio, ShieldCheck] as const;

export default function RadiologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Radiology & Imaging Sciences"
        badge="Advanced Diagnostic & Imaging Center in Chennai & Melmaruvathur"
        title={
          <>
            Radiology & Imaging <span className="text-red-500">Sciences</span>
          </>
        }
        tagline={radiologyHeroTagline}
        imageSrc={radiologyHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={radiologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{radiologyIntro.preview}</p>
            <p>{radiologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseRadiology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Diagnostic Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Radiology & Imaging Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={radiologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Conditions & Indications"
              highlight="We Support"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={radiologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with world-class diagnostic imaging and monitoring technologies:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={radiologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Imaging Sciences"
              description="We continuously invest in leading-edge imaging modalities and digital systems to deliver fast, low-dose, high-precision diagnostics, including:"
              align="center"
            />
            <DepartmentChecklistGrid items={radiologyTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Diagnostic Imaging</span>
                </>
              }
              paragraphs={[radiologyExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="radiology" />
        <DepartmentPatientCareSection
          heading={radiologyJourney.heading}
          body={radiologyJourney.body}
          pillars={radiologyJourneyPillars}
          ctaHeading={radiologyJourney.ctaHeading}
          ctaBody={radiologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
