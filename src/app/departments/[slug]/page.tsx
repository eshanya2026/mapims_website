import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { departments } from "@/data/departments";
import TransplantDepartmentPage from "@/components/departments/transplant/TransplantDepartmentPage";
import EmergencyCTA from "@/components/home/EmergencyCTA";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return departments.map((dept) => ({ slug: dept.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = departments.find((d) => d.slug === slug);

  if (!department) {
    return { title: "Department | Adhiparasakthi Hospital" };
  }

  return {
    title: `${department.name} | Adhiparasakthi Hospital`,
    description: department.description,
  };
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "multi-organ-transplant") {
    return (
      <>
        <TransplantDepartmentPage />
        <EmergencyCTA />
      </>
    );
  }

  notFound();
}
