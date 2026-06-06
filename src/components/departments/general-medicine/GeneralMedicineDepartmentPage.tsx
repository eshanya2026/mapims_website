"use client";

import {
  Activity,
  Stethoscope,
  Shield,
  Siren,
  Apple,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { generalMedicineStats } from "@/data/department-stats";
import {
  generalMedicineHeroTagline,
  generalMedicineIntro,
  whyChooseGeneralMedicine,
  generalMedicineServices,
  generalMedicineConditions,
  generalMedicineInfrastructure,
  generalMedicineTechnology,
  generalMedicineExcellenceNote,
  generalMedicineJourney,
  generalMedicineJourneyPillars,
  generalMedicineHeroImage,
} from "@/data/general-medicine-department";
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

const serviceIcons = [Stethoscope, Activity, Siren, Shield, Apple] as const;

export default function GeneralMedicineDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="General Medicine"
        badge="Best general medicine in Chennai"
        title={
          <>
            General Medicine <span className="text-red-500">Department</span>
          </>
        }
        tagline={generalMedicineHeroTagline}
        imageSrc={generalMedicineHeroImage}
        imageClassName="object-cover object-[50%_45%] sm:object-[56%_42%] md:object-[60%_40%]"
      />
      <DepartmentHeroStats stats={generalMedicineStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{generalMedicineIntro.preview}</p>
            <p>{generalMedicineIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseGeneralMedicine} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="General Medicine Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={generalMedicineServices}
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
          <DepartmentChecklistGrid items={generalMedicineConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is supported by:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={generalMedicineInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Healthcare"
              description="We continuously invest in modern medical technologies to provide accurate diagnosis and effective treatment, including:"
              align="center"
            />
            <DepartmentChecklistGrid items={generalMedicineTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Medical Care</span>
                </>
              }
              paragraphs={[generalMedicineExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="general-medicine" />
        <DepartmentPatientCareSection
          heading={generalMedicineJourney.heading}
          body={generalMedicineJourney.body}
          pillars={generalMedicineJourneyPillars}
          ctaHeading={generalMedicineJourney.ctaHeading}
          ctaBody={generalMedicineJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
