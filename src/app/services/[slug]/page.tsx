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
import GeneralSurgeryDepartmentPage from "@/components/departments/general-surgery/GeneralSurgeryDepartmentPage";
import OutpatientServicePage from "@/components/services/outpatient/OutpatientServicePage";
import InpatientServicePage from "@/components/services/inpatient/InpatientServicePage";
import BloodBankServicePage from "@/components/services/blood-bank/BloodBankServicePage";
import MasterHealthCheckupPage from "@/components/services/master-health-checkup/MasterHealthCheckupPage";
import PharmacyServicePage from "@/components/services/pharmacy/PharmacyServicePage";
import AmbulanceServicePage from "@/components/services/ambulance/AmbulanceServicePage";
import PhysiotherapyServicePage from "@/components/services/physiotherapy/PhysiotherapyServicePage";
import LaboratoryServicePage from "@/components/services/laboratory/LaboratoryServicePage";
import DialysisServicePage from "@/components/services/dialysis/DialysisServicePage";
import InsuranceServicePage from "@/components/services/insurance/InsuranceServicePage";
import BlissSkillLabPage from "@/components/services/bliss-skill-lab/BlissSkillLabPage";
import CommunityOutreachServicePage from "@/components/services/community-outreach/CommunityOutreachServicePage";
import SustainabilityServicePage from "@/components/services/sustainability/SustainabilityServicePage";

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
  if (slug === "general-surgery") {
    return {
      title: "General & Laparoscopic Surgery | Adhiparasakthi Hospitals",
      description:
        "Comprehensive general surgery, 4K laparoscopic procedures, complex hernia repair, and 24/7 acute trauma surgical care in Melmaruvathur.",
    };
  }
  if (slug === "outpatient-service") {
    return {
      title: "Comprehensive Outpatient Services (OPD) | Adhiparasakthi Hospitals",
      description:
        "Outpatient Consultation Services at Adhiparasakthi Hospitals, Melmaruvathur: clinical evaluations, specialist care, free OP pharmacy for certain drugs, and patient assistance.",
    };
  }
  if (slug === "inpatient-service") {
    return {
      title: "Comprehensive Inpatient Services (IPD) | Adhiparasakthi Hospitals",
      description:
        "Inpatient Admission & Hospital Care at Adhiparasakthi Hospitals, Melmaruvathur: comprehensive medical care, continuous observation, free IP pharmacy for certain drugs, and supportive recovery.",
    };
  }
  if (slug === "blood-bank") {
    return {
      title: "Blood Bank & Transfusion Services | Adhiparasakthi Hospitals",
      description:
        "Blood Bank Services at Adhiparasakthi Hospitals, Melmaruvathur: safe blood access, blood components, compatibility testing, and emergency transfusion support.",
    };
  }
  if (slug === "master-health-checkup") {
    return {
      title: "Master Health Checkup | Adhiparasakthi Hospitals",
      description:
        "Comprehensive health checkup packages, clinical screening, doctor consultations, and lifestyle guidance at Adhiparasakthi Hospitals, Melmaruvathur.",
    };
  }
  if (slug === "24hrs-pharmacy") {
    return {
      title: "24-Hour Pharmacy Services | Adhiparasakthi Hospitals",
      description:
        "24-Hour hospital pharmacy, prescription dispensing, safe medication storage, and patient counseling at Adhiparasakthi Hospitals, Melmaruvathur.",
    };
  }
  if (slug === "ambulance-services") {
    return {
      title:
        "24/7 Emergency Ambulance Services | Adhiparasakthi Hospitals",
      description:
        "24/7 rapid response ambulance services, mobile intensive care units (MICU), ACLS/BLS life support, and NH-45 highway trauma emergency transport.",
    };
  }
  if (slug === "physiotherapy") {
    return {
      title:
        "Physiotherapy & Physical Rehabilitation Services | Adhiparasakthi Hospitals",
      description:
        "Advanced physiotherapy, post-surgical rehabilitation, neuro recovery, spine care, and modern electrotherapy at Adhiparasakthi Hospitals, Melmaruvathur.",
    };
  }
  if (slug === "laboratory" || slug === "central-laboratory") {
    return {
      title: "Central Laboratory hospitals in India | Adhiparasakthi Hospitals",
      description:
        "Welcome to the Central Laboratory at Adhiparasakthi Hospitals, your hub for accurate and timely diagnostic testing. Our state-of-the-art laboratory is equipped with the latest technology to provide comprehensive diagnostic services essential for effective treatment and patient care.",
    };
  }
  if (slug === "dialysis-services" || slug === "hemodialysis") {
    return {
      title:
        "Dialysis Services (Hemodialysis) | Adhiparasakthi Hospitals",
      description:
        "24/7 safe, compassionate hemodialysis and renal support care, ICU dialysis capabilities, and infection-control standards at Adhiparasakthi Hospitals, Melmaruvathur.",
    };
  }
  if (
    slug === "insurance" ||
    slug === "insurance-and-corporate-cashless-services" ||
    slug === "corporate-cashless-services"
  ) {
    return {
      title:
        "Insurance and Corporate Cashless Services | Adhiparasakthi Hospitals",
      description:
        "Health insurance assistance, cashless hospitalization formalities, TPA and corporate coordination, pre-authorization, and government health schemes at Adhiparasakthi Hospitals, Melmaruvathur.",
    };
  }
  if (
    slug === "bliss-skill-simulation-lab" ||
    slug === "bliss-skill-lab" ||
    slug === "biss-skill-lab"
  ) {
    return {
      title: "Bliss Skill Simulation Lab | Adhiparasakthi Hospitals",
      description:
        "The Bliss Skill Simulation Lab at Adhiparasakthi Hospitals provides a structured learning environment for healthcare professionals and postgraduate students to develop essential clinical, emergency, and patient-care skills through simulation-based training.",
    };
  }
  if (
    slug === "community-outreach-services" ||
    slug === "community-outreach"
  ) {
    return {
      title:
        "Community Outreach | Adhiparasakthi Hospitals",
      description:
        "Extending healthcare beyond hospital walls through free medical screening camps, health awareness drives, eye camps, and government scheme support in Melmaruvathur.",
    };
  }
  if (
    slug === "sustainability-green-healthcare" ||
    slug === "sustainability"
  ) {
    return {
      title:
        "Sustainability & Green Healthcare | Adhiparasakthi Hospitals",
      description:
        "Responsible resource management, rooftop solar energy, water recycling (STP/ETP), plastic reduction, and green campus eco-initiatives at Adhiparasakthi Hospitals, Melmaruvathur.",
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

  if (
    slug === "sustainability-green-healthcare" ||
    slug === "sustainability"
  ) {
    return <SustainabilityServicePage />;
  }
  if (
    slug === "community-outreach-services" ||
    slug === "community-outreach"
  ) {
    return <CommunityOutreachServicePage />;
  }
  if (
    slug === "bliss-skill-simulation-lab" ||
    slug === "bliss-skill-lab" ||
    slug === "biss-skill-lab"
  ) {
    return <BlissSkillLabPage />;
  }
  if (slug === "outpatient-service") {
    return <OutpatientServicePage />;
  }
  if (slug === "inpatient-service") {
    return <InpatientServicePage />;
  }
  if (slug === "blood-bank") {
    return <BloodBankServicePage />;
  }
  if (slug === "master-health-checkup") {
    return <MasterHealthCheckupPage />;
  }
  if (slug === "24hrs-pharmacy") {
    return <PharmacyServicePage />;
  }
  if (slug === "ambulance-services") {
    return <AmbulanceServicePage />;
  }
  if (slug === "physiotherapy") {
    return <PhysiotherapyServicePage />;
  }
  if (slug === "laboratory" || slug === "central-laboratory") {
    return <LaboratoryServicePage />;
  }
  if (slug === "dialysis-services" || slug === "hemodialysis") {
    return <DialysisServicePage />;
  }
  if (
    slug === "insurance" ||
    slug === "insurance-and-corporate-cashless-services" ||
    slug === "corporate-cashless-services"
  ) {
    return <InsuranceServicePage />;
  }
  if (slug === "accident-emergency-services") {
    return <EmergencyDepartmentPage />;
  }
  if (slug === "spinal-surgeries") {
    return <SpineSurgeryDepartmentPage />;
  }
  if (slug === "surgical-oncology") {
    return <SurgicalOncologyDepartmentPage />;
  }
  if (slug === "general-surgery") {
    return <GeneralSurgeryDepartmentPage />;
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
