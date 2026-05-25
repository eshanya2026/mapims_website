import type { Metadata } from "next";
import InternationalServiceHero from "@/components/international/care/InternationalServiceHero";
import InternationalServiceLayout from "@/components/international/care/InternationalServiceLayout";
import InternationalServiceArticle from "@/components/international/care/InternationalServiceArticle";
import EmergencyCTA from "@/components/home/EmergencyCTA";
import { accidentEmergencyService } from "@/data/international-services/accident-emergency";
import { internationalCarePath } from "@/data/international-patient-care";

const service = accidentEmergencyService;

export const metadata: Metadata = {
  title: `${service.seoTitle} | Adhiparasakthi Hospital`,
  description: service.intro,
};

export default function AccidentEmergencyServicesPage() {
  return (
    <main className="min-h-screen">
      <InternationalServiceHero
        badge={service.heroBadge}
        title={service.title}
        titleHighlight={service.titleHighlight}
        subtitle={service.heroSubtitle}
        image={service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "International Patients", href: "/international" },
          { label: "Patient Care", href: internationalCarePath },
          { label: service.breadcrumbLabel },
        ]}
      />
      <InternationalServiceLayout>
        <InternationalServiceArticle service={service} />
      </InternationalServiceLayout>
      <EmergencyCTA />
    </main>
  );
}
