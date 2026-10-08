import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InternationalServiceHero from "@/components/international/care/InternationalServiceHero";
import InternationalServiceArticle from "@/components/international/care/InternationalServiceArticle";
import ProcedureServiceLayout from "@/components/procedures/ProcedureServiceLayout";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  servicesPath,
} from "@/data/hospital-services";

import EmergencyDepartmentPage from "@/components/departments/emergency/EmergencyDepartmentPage";
import SpineSurgeryDepartmentPage from "@/components/departments/spine-surgery/SpineSurgeryDepartmentPage";
import SurgicalOncologyDepartmentPage from "@/components/departments/surgical-oncology/SurgicalOncologyDepartmentPage";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "accident-emergency-services") {
    return {
      title: "Accident & Emergency Medicine | Adhiparasakthi Hospitals",
      description:
        "24/7 Level-1 trauma resuscitation, emergency surgery, and mobile ICU ambulance care in Melmaruvathur.",
    };
  }
  if (slug === "spinal-surgeries") {
    return {
      title: "Spinal Surgeries | Adhiparasakthi Hospitals",
      description:
        "Advanced minimally invasive spine surgery, deformity correction, disc surgery, and spine trauma care.",
    };
  }
  if (slug === "surgical-oncology") {
    return {
      title: "Surgical Oncology | Adhiparasakthi Hospitals",
      description:
        "Comprehensive cancer surgery, multidisciplinary tumor board, and organ-preserving oncoplasty.",
    };
  }
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.seoTitle} | Adhiparasakthi Hospitals`,
    description: service.intro,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  if (slug === "accident-emergency-services") {
    return <EmergencyDepartmentPage />;
  }
  if (slug === "spinal-surgeries") {
    return <SpineSurgeryDepartmentPage />;
  }
  if (slug === "surgical-oncology") {
    return <SurgicalOncologyDepartmentPage />;
  }

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen">
      <InternationalServiceHero
        badge={service.heroBadge}
        title={service.title}
        titleHighlight={service.titleHighlight}
        subtitle={service.heroSubtitle}
        image={service.heroImage ?? service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: servicesPath },
          { label: service.breadcrumbLabel },
        ]}
      />
      <ProcedureServiceLayout>
        <InternationalServiceArticle service={service} />
      </ProcedureServiceLayout>
    </main>
  );
}
