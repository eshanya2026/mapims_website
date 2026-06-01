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
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.seoTitle} | Adhiparasakthi Hospital`,
    description: service.intro,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
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
