"use client";

import { Ear, Wind, Mic, Baby, Scissors } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { entStats } from "@/data/department-stats";
import {
  entHeroTagline,
  entIntro,
  whyChooseEnt,
  entServices,
  entCentersOfExcellence,
  entInfrastructure,
  entExcellence,
  entJourney,
  entJourneyPillars,
  entHeroImage,
} from "@/data/ent-department";
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

const serviceIcons = [Ear, Wind, Mic, Baby, Scissors] as const;

export default function EntDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="ENT"
        badge="Best ENT hospital in India"
        title={
          <>
            ENT (Otorhinolaryngology){" "}
            <span className="text-red-500">Department</span>
          </>
        }
        tagline={entHeroTagline}
        imageSrc={entHeroImage}
        imageClassName="object-cover object-[50%_48%] sm:object-[56%_45%] md:object-[60%_42%]"
      />
      <DepartmentHeroStats stats={entStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{entIntro.preview}</p>
            <p>{entIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseEnt} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="ENT Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={entServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="centers-of-excellence" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Centers of"
              highlight="Excellence"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={entCentersOfExcellence} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={entInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">ENT Care</span>
                </>
              }
              paragraphs={[entExcellence.intro, entExcellence.detail]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="ent" />
        <DepartmentPatientCareSection
          heading={entJourney.heading}
          body={entJourney.body}
          pillars={entJourneyPillars}
          ctaHeading={entJourney.ctaHeading}
          ctaBody={entJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
