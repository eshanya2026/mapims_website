import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { departments } from "@/data/departments";
import CardiologyDepartmentPage from "@/components/departments/cardiology/CardiologyDepartmentPage";
import ObstetricsGynaecologyDepartmentPage from "@/components/departments/obstetrics-gynaecology/ObstetricsGynaecologyDepartmentPage";
import OrthopaedicsDepartmentPage from "@/components/departments/orthopaedics/OrthopaedicsDepartmentPage";
import JointReplacementDepartmentPage from "@/components/departments/joint-replacement/JointReplacementDepartmentPage";
import NephrologyDepartmentPage from "@/components/departments/nephrology/NephrologyDepartmentPage";
import PaediatricDepartmentPage from "@/components/departments/paediatric/PaediatricDepartmentPage";
import DiabetologyDepartmentPage from "@/components/departments/diabetology/DiabetologyDepartmentPage";
import GeneralMedicineDepartmentPage from "@/components/departments/general-medicine/GeneralMedicineDepartmentPage";
import MedicalGastroenterologyDepartmentPage from "@/components/departments/medical-gastroenterology/MedicalGastroenterologyDepartmentPage";
import PlasticSurgeryDepartmentPage from "@/components/departments/plastic-surgery/PlasticSurgeryDepartmentPage";
import OphthalmologyDepartmentPage from "@/components/departments/ophthalmology/OphthalmologyDepartmentPage";
import EntDepartmentPage from "@/components/departments/ent/EntDepartmentPage";
import UrologyDepartmentPage from "@/components/departments/urology/UrologyDepartmentPage";
import NeurologyDepartmentPage from "@/components/departments/neurology/NeurologyDepartmentPage";
import OncologyDepartmentPage from "@/components/departments/oncology/OncologyDepartmentPage";
import TransplantDepartmentPage from "@/components/departments/transplant/TransplantDepartmentPage";
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

  if (slug === "cardiology") {
    return <CardiologyDepartmentPage />;
  }

  if (slug === "orthopaedics") {
    return <OrthopaedicsDepartmentPage />;
  }

  if (slug === "obstetrics-gynaecology") {
    return <ObstetricsGynaecologyDepartmentPage />;
  }

  if (slug === "joint-replacement") {
    return <JointReplacementDepartmentPage />;
  }

  if (slug === "multi-organ-transplant") {
    return <TransplantDepartmentPage />;
  }

  if (slug === "oncology") {
    return <OncologyDepartmentPage />;
  }

  if (slug === "neurology") {
    return <NeurologyDepartmentPage />;
  }

  if (slug === "nephrology") {
    return <NephrologyDepartmentPage />;
  }

  if (slug === "paediatric") {
    return <PaediatricDepartmentPage />;
  }

  if (slug === "diabetology") {
    return <DiabetologyDepartmentPage />;
  }

  if (slug === "general-medicine") {
    return <GeneralMedicineDepartmentPage />;
  }

  if (slug === "medical-gastroenterology") {
    return <MedicalGastroenterologyDepartmentPage />;
  }

  if (slug === "plastic-surgery") {
    return <PlasticSurgeryDepartmentPage />;
  }

  if (slug === "ophthalmology") {
    return <OphthalmologyDepartmentPage />;
  }

  if (slug === "ent") {
    return <EntDepartmentPage />;
  }

  if (slug === "urology") {
    return <UrologyDepartmentPage />;
  }

  notFound();
}
