"use client";

import { Baby, ScanLine, Heart, Shield, Activity, Stethoscope } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { obstetricsGynaecologyStats } from "@/data/department-stats";
import {
  obgynHeroTagline,
  obstetricsGynaecologyIntro,
  whyChooseObgyn,
  obstetricsServices,
  gynaecologyServices,
  obgynInfrastructure,
  obgynExcellenceNote,
  obgynJourney,
  obgynJourneyPillars,
  obgynHeroImage,
} from "@/data/obstetrics-gynaecology-department";
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

const obstetricsIcons = [Baby, ScanLine, Heart, Shield] as const;
const gynaecologyIcons = [Activity, Heart, Stethoscope, Shield, Activity] as const;

export default function ObstetricsGynaecologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Obstetrics & Gynaecology"
        badge="Best obstetrics & gynaecology in India"
        title={
          <>
            Obstetrics & Gynaecology{" "}
            <span className="text-red-500">Department</span>
          </>
        }
        tagline={obgynHeroTagline}
        imageSrc={obgynHeroImage}
      />
      <DepartmentHeroStats stats={obstetricsGynaecologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{obstetricsGynaecologyIntro.preview}</p>
            <p>{obstetricsGynaecologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseObgyn} />
        </DepartmentSection>

        <DepartmentSection id="obstetrics-services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Maternity Care</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Obstetrics Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={obstetricsServices} icons={obstetricsIcons} />
        </DepartmentSection>

        <DepartmentSection id="services" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Women's Health</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Gynaecology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={gynaecologyServices} icons={gynaecologyIcons} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is supported by:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={obgynInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in{" "}
                  <span className="text-red-600">Maternal & Women's Healthcare</span>
                </>
              }
              paragraphs={[obgynExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="obstetrics-gynaecology" />
        <DepartmentPatientCareSection
          heading={obgynJourney.heading}
          body={obgynJourney.body}
          pillars={obgynJourneyPillars}
          ctaHeading={obgynJourney.ctaHeading}
          ctaBody={obgynJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
