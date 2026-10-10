import type { InternationalServiceData } from "@/data/international-services/types";

export const inpatientServicePath = "/services/inpatient-service";

export const inpatientService: InternationalServiceData = {
  slug: "inpatient-service",
  path: inpatientServicePath,
  sectionLabel: "Inpatient Care",
  title: "Comfortable & Comprehensive",
  titleHighlight: "Inpatient Services (IPD)",
  seoTitle: "Inpatient Admission & Hospital Ward Services | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Inpatient Service",
  heroBadge: "24/7 Inpatient Care",
  heroSubtitle:
    "Multidisciplinary hospital admissions with intensive nursing, modern surgical suites, deluxe private rooms, and multi-bed general wards at MAPIMS, Melmaruvathur.",
  intro:
    "The Inpatient Department (IPD) at Adhiparasakthi Hospitals is designed to deliver compassionate, safe, and medically intensive hospitalization for surgical recovery, medical treatment, maternal delivery, and intensive care needs. Our dedicated inpatient floors offer 24/7 specialist doctor coverage, professional nursing care, and modern clinical infrastructure tailored to every patient's comfort and clinical requirements.",
  sections: [
    {
      title: "Accommodation & Ward Options",
      items: [
        "Deluxe & Single Private Air-Conditioned Rooms with television, attendant couch, and en-suite facilities.",
        "Semi-Private Twin-Sharing Rooms with dedicated patient amenities.",
        "Spacious, well-ventilated Multi-Bed General Wards with curtained privacy screens and central oxygen supply.",
        "Specialized Intensive Care Units: Medical ICU (MICU), Surgical ICU (SICU), Cardiac Care Unit (CCU), Pediatric ICU (PICU), and Neonatal ICU (NICU).",
        "Dedicated Labor & Delivery Postnatal Suites and Day-Care Surgical Recovery Units.",
      ],
    },
    {
      title: "Round-the-Clock Inpatient Support",
      items: [
        "Continuous 24/7 Resident Doctor, Duty Medical Officer, and Specialist Consultant coverage.",
        "High nurse-to-patient ratio ensuring timely medication administration, vitals monitoring, and empathetic patient assistance.",
        "In-house dietary department preparing customized, clinically balanced therapeutic meals based on doctor recommendations.",
        "Central medical gas pipeline system, bedside suction, multi-parameter monitors, and motorized hospital beds.",
        "Integrated infection prevention, daily environmental sanitization, and strict hygiene protocols.",
      ],
    },
    {
      title: "Admission & Discharge Process",
      items: [
        "Smooth, paperless admission desk operating round-the-clock at the emergency and main registration areas.",
        "Dedicated insurance desk for pre-authorization, TPA coordination, and cashless claims processing.",
        "Transparent billing with regular interim updates and clear itemized statements.",
        "Detailed discharge counseling including medication schedules, diet charts, physical activity guidelines, and follow-up consultation dates.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our Inpatient Care?",
  whyChoose: [
    "24/7 intensivist and specialist medical supervision",
    "Comprehensive critical care backup with state-of-the-art ICUs",
    "Empathetic, well-trained nursing and patient care attendants",
    "Clean, peaceful healing environment with green campus surroundings",
  ],
  closing:
    "For safe, supportive, and affordable inpatient hospital care in Melmaruvathur, trust Adhiparasakthi Hospitals. Contact our admission desk at +91 94990 59966 for planned hospital admissions or urgent hospitalization.",
  image: "/images/services/inpatient-room-hero.jpg",
  heroImage: "/images/services/inpatient-room-hero.jpg",
};
