"use client";

import { Wind, ShieldAlert, Activity, Moon, HeartPulse } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { pulmonologyStats } from "@/data/department-stats";
import {
  pulmonologyHeroTagline,
  pulmonologyIntro,
  whyChoosePulmonology,
  pulmonologyServices,
  pulmonologyConditions,
  pulmonologyTechnology,
  pulmonologyInfrastructure,
  pulmonologyJourney,
  pulmonologyJourneyPillars,
  pulmonologyHeroImage,
} from "@/data/pulmonology-department";
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
  Wind,
  ShieldAlert,
  Activity,
  Moon,
  HeartPulse,
] as const;

export default function PulmonologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Pulmonology"
        badge="Expert Respiratory Care"
        title={
          <>
            Pulmonology <span className="text-red-500">Department</span>
          </>
        }
        tagline={pulmonologyHeroTagline}
        imageSrc={pulmonologyHeroImage}
        imageClassName="object-cover object-[50%_35%]"
      />
      <DepartmentHeroStats stats={pulmonologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Care Built Around You</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{pulmonologyIntro.preview}</p>
            <p>{pulmonologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChoosePulmonology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Pulmonology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={pulmonologyServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="conditions">
          <DepartmentGradientPanel
            eyebrow="Clinical Scope"
            title="Conditions We"
            highlight="Assess & Treat"
            description="Our pulmonary specialists evaluate and manage a comprehensive range of lung and airway disorders:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={pulmonologyConditions} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="infrastructure" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Facilities</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Infrastructure &"
              highlight="Clinical Support"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={pulmonologyInfrastructure} />
        </DepartmentSection>

        <DepartmentSection id="technology">
          <DepartmentGradientPanel
            eyebrow="Technology & Quality"
            title="Coordinated,"
            highlight="Evidence-Based Care"
            description="We use appropriate diagnostic investigations and coordinated multidisciplinary care to support timely diagnosis, treatment and follow-up:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={pulmonologyTechnology} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="pulmonology" />
        <DepartmentPatientCareSection
          heading={pulmonologyJourney.heading}
          body={pulmonologyJourney.body}
          pillars={pulmonologyJourneyPillars}
          ctaHeading={pulmonologyJourney.ctaHeading}
          ctaBody={pulmonologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
