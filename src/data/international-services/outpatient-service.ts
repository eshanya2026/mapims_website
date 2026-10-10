import type { InternationalServiceData } from "@/data/international-services/types";

export const outpatientServicePath = "/services/outpatient-service";

export const outpatientService: InternationalServiceData = {
  slug: "outpatient-service",
  path: outpatientServicePath,
  sectionLabel: "Clinical Consultation",
  title: "Comprehensive",
  titleHighlight: "Outpatient Services (OPD)",
  seoTitle: "Outpatient Consultation Services | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Outpatient Service",
  heroBadge: "Outpatient Consultation Services",
  heroSubtitle:
    "Medical consultations, clinical evaluations, and follow-up care across medical and surgical specialties at Melmaruvathur.",
  intro:
    "The Outpatient Department (OPD) at Adhiparasakthi Hospitals, Melmaruvathur, provides patients with access to medical consultations, clinical evaluations, and follow-up care across a range of medical and surgical specialties. Our team is committed to delivering compassionate, patient-centred care in a comfortable and supportive environment.",
  sections: [
    {
      title: "Our Outpatient Services",
      items: [
        "Medical consultations across various specialties and departments.",
        "Specialist consultations for the evaluation and management of health conditions.",
        "Preventive healthcare guidance and general health advice.",
        "Assistance with patient registration and directions to the appropriate departments.",
        "Guidance for diagnostic investigations and further treatment as advised by the consulting doctor.",
        "Follow-up consultations to support continuity of care.",
        "Patient assistance for elderly individuals and those requiring mobility support.",
        "Guidance and support throughout the outpatient visit.",
      ],
    },
    {
      title: "Patient Care and Assistance",
      items: [
        "Our outpatient team helps patients navigate the consultation process, from registration to meeting the appropriate specialist.",
        "We strive to make every visit convenient and comfortable by providing clear directions, courteous assistance, and support according to individual patient needs.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our Outpatient Services?",
  whyChoose: [
    "Access to consultations across multiple medical and surgical specialties.",
    "Patient-focused care from experienced healthcare professionals.",
    "Guidance throughout the outpatient consultation process.",
    "A welcoming and supportive environment for patients and their attendants.",
    "Assistance with follow-up consultations and further medical care.",
  ],
  closing:
    "At Adhiparasakthi Hospitals, we are committed to providing accessible, compassionate, and coordinated outpatient care to support the health and well-being of every patient.",
  image: "/images/services/opd-care-hero.jpg",
  heroImage: "/images/services/opd-care-hero.jpg",
};
