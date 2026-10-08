"use client";

import {
  Siren,
  HeartPulse,
  Ambulance,
  Stethoscope,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { emergencyStats } from "@/data/department-stats";
import {
  emergencyHeroTagline,
  emergencyIntro,
  whyChooseEmergency,
  emergencyServices,
  emergencyConditions,
  emergencyInfrastructure,
  emergencyTechnology,
  emergencyExcellenceNote,
  emergencyJourney,
  emergencyJourneyPillars,
  emergencyHeroImage,
} from "@/data/emergency-department";
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

const serviceIcons = [Siren, HeartPulse, Ambulance, Stethoscope] as const;

export default function EmergencyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Accident & Emergency Medicine"
        badge="24/7 Level-1 Trauma Resuscitation & Emergency Center in Melmaruvathur"
        title={
          <>
            Accident & Emergency <span className="text-red-500">Medicine</span>
          </>
        }
        tagline={emergencyHeroTagline}
        imageSrc={emergencyHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={emergencyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{emergencyIntro.preview}</p>
            <p>{emergencyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseEmergency} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Emergency Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Emergency & Trauma Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={emergencyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Emergency Conditions"
              highlight="We Treat 24/7"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={emergencyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced Emergency"
            highlight="Infrastructure"
            description="Our department is equipped with rapid triage bays, dedicated emergency OT, and on-site emergency diagnostics:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={emergencyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Resuscitation Care"
              description="We continuously invest in modern life-support, mobile ICU, and emergency hemodynamic technologies to safeguard critical lives:"
              align="center"
            />
            <DepartmentChecklistGrid items={emergencyTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Golden Hour Trauma Care</span>
                </>
              }
              paragraphs={[emergencyExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="accident-emergency-services" />
        <DepartmentPatientCareSection
          heading={emergencyJourney.heading}
          body={emergencyJourney.body}
          pillars={emergencyJourneyPillars}
          ctaHeading={emergencyJourney.ctaHeading}
          ctaBody={emergencyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
