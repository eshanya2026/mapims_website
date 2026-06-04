export const oncologyIntro = {
  preview:
    "At Adhiparasakthi Hospitals, our Oncology Department is committed to providing world-class cancer care through cutting-edge treatments, compassionate support, and a patient-centered approach.",
  full: "With a team of highly skilled oncologists and state-of-the-art technology, we ensure comprehensive care for all types of cancer, from diagnosis to survivorship.",
};

export const whyChooseOncology = [
  {
    title: "Comprehensive Care",
    description:
      "From early detection and diagnosis to advanced treatments and follow-up care, we provide a complete range of oncology services under one roof.",
  },
  {
    title: "Personalized Treatment Plans",
    description:
      "Every patient is unique, and so is their treatment. Our multidisciplinary team tailors each plan to meet individual needs and goals.",
  },
  {
    title: "Advanced Technology",
    description:
      "We utilize the latest diagnostic and therapeutic technologies to deliver precise, effective, and minimally invasive cancer treatments.",
  },
];

export const oncologyPrograms = [
  {
    title: "Reconstruction Surgeries",
    description:
      "Post-cancer treatment reconstruction for functional and aesthetic restoration.",
  },
  {
    title: "Supportive & Palliative Care",
    description:
      "Symptom management to enhance comfort and quality of life, with emotional, nutritional, and psychological support for patients and families.",
  },
  {
    title: "Preventive & Screening Programs",
    description:
      "Early detection saves lives. Routine screenings for breast, cervical, colorectal, and lung cancers.",
  },
  {
    title: "Risk Assessment & Genetic Counseling",
    description:
      "Risk assessments and genetic counseling for individuals with a family history of cancer.",
  },
];

export const oncologyServices = [
  {
    title: "Medical Oncology",
    description:
      "Chemotherapy, targeted therapy, and immunotherapy to treat various cancers.",
    bullets: [
      "Comprehensive management for blood cancers like leukemia and lymphoma.",
      "Personalized therapy protocols for advanced and metastatic cancers.",
    ],
  },
  {
    title: "Radiation Oncology",
    description:
      "Advanced radiation techniques like IMRT, IGRT, and brachytherapy for precise targeting of cancer cells while sparing healthy tissue.",
    bullets: [
      "Palliative radiation therapy to relieve symptoms and improve quality of life.",
    ],
  },
  {
    title: "Surgical Oncology",
    description:
      "Minimally invasive and open surgical procedures for cancer removal.",
    bullets: [
      "Expertise in head and neck, breast, gastrointestinal, gynecological, and thoracic oncology surgeries.",
    ],
  },
];

export const oncologyInfrastructure = [
  "State-of-the-art diagnostic tools, including PET-CT, MRI, and advanced pathology labs.",
  "Cutting-edge linear accelerators for precise radiation therapy.",
  "Well-equipped surgical theaters designed for complex oncology procedures.",
];

export const oncologyJourney = {
  heading: "Hope, Healing, and Comprehensive Cancer Care.",
  body: "At Adhiparasakthi Hospitals, we understand that a cancer diagnosis can be overwhelming. That's why we're here to support you every step of the way with compassionate care, advanced treatments, and unwavering dedication to your well-being.",
  ctaHeading: "Take the First Step Towards Hope and Healing",
  ctaBody:
    "Schedule your consultation today to explore the best treatment options tailored to your needs. Let us partner with you on your journey to recovery and survivorship.",
};

export const oncologyJourneyPillars = [
  {
    title: "Compassionate Support",
    description:
      "Emotional and clinical guidance for patients and families at every stage.",
  },
  {
    title: "Advanced Treatments",
    description:
      "Personalized oncology plans backed by modern technology and expertise.",
  },
  {
    title: "Path to Survivorship",
    description:
      "Ongoing care focused on recovery, follow-up, and long-term well-being.",
  },
];

export const oncologyHeroImage = "/images/oncology.png";

import type { DepartmentSpecialist } from "@/data/department-specialist";

export type OncologySpecialist = DepartmentSpecialist;

const specialistImagePool = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-79bb9997af2b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127b54e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
];

/** Replace with verified MAPIMS oncology faculty when profiles are available. */
export const oncologySpecialists: OncologySpecialist[] = [
  {
    id: "medical-oncology-lead",
    name: "Dr. R. Karthik",
    degree: "MD, DM (Medical Oncology)",
    experience: "18+ Yrs",
    designation: "Senior Consultant — Medical Oncology",
    image: specialistImagePool[0],
    accent: "primary",
  },
  {
    id: "radiation-oncology-lead",
    name: "Dr. Priya Natarajan",
    degree: "MD, DNB (Radiation Oncology)",
    experience: "15+ Yrs",
    designation: "Senior Consultant — Radiation Oncology",
    image: specialistImagePool[1],
    accent: "primary",
  },
  {
    id: "surgical-oncology-lead",
    name: "Dr. S. Venkatesh",
    degree: "MS, MCh (Surgical Oncology)",
    experience: "20+ Yrs",
    designation: "Senior Consultant — Surgical Oncology",
    image: specialistImagePool[2],
    accent: "deep",
  },
  {
    id: "hemato-oncology",
    name: "Dr. Anitha Raman",
    degree: "MD, DM (Clinical Haematology)",
    experience: "12+ Yrs",
    designation: "Consultant — Haemato-Oncology",
    image: specialistImagePool[3],
    accent: "deep",
  },
];
