import { accidentEmergencyPath } from "@/data/international-services/accident-emergency";
import { anaesthesiologyPath } from "@/data/international-services/anaesthesiology";
import { centralLaboratoryPath } from "@/data/international-services/central-laboratory";
import { cardiovascularThoracicPath } from "@/data/international-services/cardiovascular-thoracic-surgery";
import { dermatologyPath } from "@/data/international-services/dermatology";
import { generalSurgeryPath } from "@/data/international-services/general-surgery";
import { hemodialysisPath } from "@/data/international-services/hemodialysis";
import { interventionalRadiologyPath } from "@/data/international-services/interventional-radiology";
import { radiologyImagingPath } from "@/data/international-services/radiology-imaging";
import { spinalSurgeriesPath } from "@/data/international-services/spinal-surgeries";
import { surgicalOncologyPath } from "@/data/international-services/surgical-oncology";

export const internationalCarePath = "/international/care";

export const internationalCareHero = {
  badge: "International Patient Department",
  title: "International Patients Care",
  subtitle:
    "World-class healthcare for patients from abroad — dedicated coordinators, travel assistance, and comprehensive support at Melmaruvathur.",
  image:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2070&auto=format&fit=crop",
};

export const internationalCareSidebar = [
  { label: "Accident & Emergency Services", href: accidentEmergencyPath },
  { label: "Anaesthesiology", href: anaesthesiologyPath },
  { label: "Central Laboratory", href: centralLaboratoryPath },
  {
    label: "Cardiovascular & Thoracic Surgery",
    href: cardiovascularThoracicPath,
  },
  { label: "Dermatology", href: dermatologyPath },
  { label: "General Surgery", href: generalSurgeryPath },
  { label: "Hemodialysis", href: hemodialysisPath },
  { label: "Interventional Radiology", href: interventionalRadiologyPath },
  { label: "Radiology & Imaging Science", href: radiologyImagingPath },
  { label: "Spinal Surgeries", href: spinalSurgeriesPath },
  { label: "Surgical Oncology", href: surgicalOncologyPath },
];

export const internationalCareWelcome = {
  title: "Welcome to Adhiparasakthi Hospitals International Patients Care",
  paragraphs: [
    "At Adhiparasakthi Hospitals, we are dedicated to providing world-class healthcare services to international patients. Our commitment to excellence in medical care, combined with state-of-the-art infrastructure and experienced healthcare professionals, ensures that you receive the highest quality treatment during your visit.",
    "Located in the serene town of Melmaruvathur, Adhiparasakthi Hospitals boasts modern facilities designed to cater to the needs of our patients.",
    "We utilize the latest technology in diagnostics and treatment, ensuring precise and effective medical care. Our equipment includes state-of-the-art imaging systems, minimally invasive surgical tools, and cutting-edge therapeutic devices.",
    "Our patient rooms are designed for comfort and recovery, equipped with modern amenities to make your stay as pleasant as possible. Suite, Deluxe, and Special Rooms are available for your comfortable stay.",
    "We offer a wide range of medical services, from emergency care to specialized treatments, all under one roof.",
  ],
};

export const internationalCareServices = [
  {
    title: "Dedicated International Patient Coordinator",
    description:
      "A dedicated coordinator is assigned to each international patient to provide personalized assistance throughout your medical journey — from the first enquiry and treatment planning to discharge and follow-up.",
  },
  {
    title: "Multilingual Support",
    description:
      "Our International Patient Department offers language assistance to help you communicate comfortably with doctors, nurses, and administrative staff during your stay.",
  },
  {
    title: "Telemedicine for International Patients",
    description:
      "Remote consultations and follow-up care are available so you can connect with our specialists before travel and after returning home, ensuring continuity of treatment.",
  },
];

export const internationalCareLifeSavingTreatments = [
  "Intensive Care Unit (ICU)",
  "Cardiac Care Unit (CCU)",
  "Neonatal ICU",
  "Dialysis & Nephrology",
  "Multi-organ Transplant",
  "Emergency & Trauma",
];

export const internationalCareTravel = {
  title: "Travel and Accommodation Assistance for International Patients",
  travel: {
    title: "Transportation Services",
    items: [
      "Airport pick-up and drop-off through hospital transport",
      "Dedicated local transportation during your treatment stay",
      "Coordinated travel between residency and hospital facilities",
    ],
  },
  accommodation: {
    title: "Residency Facilities",
    items: [
      "On-campus residency for international patients",
      "Comfortable stay arrangements for patients and attendants",
      "Long-term residency options for extended treatment",
    ],
  },
};

export const internationalCarePersonalizedSupport =
  "Our dedicated international patient support staff assist you with appointments, billing queries, dietary preferences, and any special requirements so you can focus on recovery with peace of mind.";

export const internationalCareFinancial = {
  title: "Financial Information for International Patients",
  sections: [
    {
      title: "Cost Estimation",
      items: [
        "Detailed treatment cost estimates before admission",
        "Transparent package pricing for planned procedures",
      ],
    },
    {
      title: "Payment Options",
      items: [
        "Cashless insurance through partner networks",
        "Credit and debit cards, bank transfers, and wire payments",
      ],
    },
    {
      title: "Financial Assistance",
      items: [
        "Insurance claim coordination support",
        "Financial counselling for treatment planning",
      ],
    },
  ],
  notes: [
    "Transparent billing with itemized invoices for all services rendered during your stay.",
    "Currency exchange guidance is available to help international patients plan payments conveniently.",
  ],
};

export const internationalCareCultural = {
  title: "Cultural and Religious Sensitivity",
  understanding: {
    title: "Understanding Your Needs",
    description:
      "We respect the diverse cultural, religious, and dietary backgrounds of our international patients. Our teams are trained to provide care that honours your beliefs and preferences.",
  },
  customized: {
    title: "Customized Care",
    items: [
      "Dietary requirements and meal preferences",
      "Prayer rooms and quiet spaces for spiritual needs",
      "Cultural sensitivity training for clinical and support staff",
    ],
  },
};

export const internationalCareFooterImage =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop";

export const internationalNavGroups = [
  {
    title: "Overview",
    items: [
      { name: "International Patients Home", href: "/international" },
      { name: "Why India · Why Us", href: "/international#why-india-us" },
      { name: "Specialities", href: "/international#specialities" },
      { name: "FAQ", href: "/international#faq" },
    ],
  },
  {
    title: "Patient Care",
    items: [
      { name: "Patient Care & Services", href: "/international/care" },
      ...internationalCareSidebar.map((item) => ({
        name: item.label,
        href: item.href,
      })),
    ],
  },
];
