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
import DermatologyDepartmentPage from "@/components/departments/dermatology/DermatologyDepartmentPage";
import RadiologyDepartmentPage from "@/components/departments/radiology/RadiologyDepartmentPage";
import AnaesthesiologyDepartmentPage from "@/components/departments/anaesthesiology/AnaesthesiologyDepartmentPage";
import EmergencyDepartmentPage from "@/components/departments/emergency/EmergencyDepartmentPage";
import SpineSurgeryDepartmentPage from "@/components/departments/spine-surgery/SpineSurgeryDepartmentPage";
import SurgicalOncologyDepartmentPage from "@/components/departments/surgical-oncology/SurgicalOncologyDepartmentPage";
import CardiovascularThoracicDepartmentPage from "@/components/departments/cardiovascular-thoracic/CardiovascularThoracicDepartmentPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const params = departments.map((dept) => ({ slug: dept.slug }));
  params.push(
    { slug: "radiology-imaging-science" },
    { slug: "accident-emergency" },
    { slug: "emergency-medicine" },
    { slug: "emergency" },
    { slug: "spine-surgery" },
    { slug: "spine-surgeries" },
    { slug: "cardiovascular-thoracic" },
    { slug: "cvts" }
  );
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const department =
    departments.find((d) => d.slug === slug) ??
    (slug === "radiology-imaging-science"
      ? departments.find((d) => d.slug === "radiology")
      : slug === "accident-emergency" || slug === "emergency-medicine" || slug === "emergency"
      ? departments.find((d) => d.slug === "accident-emergency-services")
      : slug === "spine-surgery" || slug === "spine-surgeries"
      ? departments.find((d) => d.slug === "spinal-surgeries")
      : slug === "cardiovascular-thoracic" || slug === "cvts"
      ? departments.find((d) => d.slug === "cardiovascular-thoracic-surgery")
      : undefined);

  if (!department) {
    return { title: "Department | Adhiparasakthi Hospitals" };
  }

  return {
    title: `${department.name} | Adhiparasakthi Hospitals`,
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

  if (slug === "dermatology") {
    return <DermatologyDepartmentPage />;
  }

  if (slug === "radiology" || slug === "radiology-imaging-science") {
    return <RadiologyDepartmentPage />;
  }

  if (slug === "anaesthesiology") {
    return <AnaesthesiologyDepartmentPage />;
  }

  if (
    slug === "accident-emergency-services" ||
    slug === "accident-emergency" ||
    slug === "emergency-medicine" ||
    slug === "emergency"
  ) {
    return <EmergencyDepartmentPage />;
  }

  if (
    slug === "spinal-surgeries" ||
    slug === "spine-surgery" ||
    slug === "spine-surgeries"
  ) {
    return <SpineSurgeryDepartmentPage />;
  }

  if (slug === "surgical-oncology") {
    return <SurgicalOncologyDepartmentPage />;
  }

  if (
    slug === "cardiovascular-thoracic-surgery" ||
    slug === "cardiovascular-thoracic" ||
    slug === "cvts"
  ) {
    return <CardiovascularThoracicDepartmentPage />;
  }

  notFound();
}
