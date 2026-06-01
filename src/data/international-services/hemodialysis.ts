import type { InternationalServiceData } from "@/data/international-services/types";

export const hemodialysisPath = "/services/hemodialysis";

export const hemodialysisService: InternationalServiceData = {
  slug: "hemodialysis",
  path: hemodialysisPath,
  sectionLabel: "Renal Care",
  title: "Hemodialysis &",
  titleHighlight: "Dialysis Centre",
  seoTitle: "Hemodialysis hospitals in chennai",
  breadcrumbLabel: "Hemodialysis",
  heroBadge: "24/7 Dialysis",
  heroSubtitle:
    "One of the largest dialysis centres in Kanchipuram District — advanced machines, ICU dialysis, and dedicated care at MAPIMS, Melmaruvathur.",
  intro:
    "The Dialysis Centre at Adhiparasakthi Hospitals is one of the largest dialysis centres in Kanchipuram District, equipped with modern technology and round-the-clock specialist support for patients with kidney failure and related conditions.",
  sections: [
    {
      title: "Our Dialysis Centre",
      items: [
        "26 new-model dialyzers for efficient and reliable hemodialysis treatment.",
        "Advanced dia-filtration machines providing enhanced dialysis care.",
        "24x7 eminent dialysis services — continuous availability for scheduled and urgent needs.",
        "Dialysis facilities available in ICU for critically ill patients requiring renal support.",
        "Separate dialysis unit for positive patients, ensuring safe and dedicated care.",
      ],
    },
    {
      title: "Additional Services",
      items: [
        "Ear and nose stud piercing",
        "Tattooing",
        "Intra lesional therapy",
      ],
    },
  ],
  closing:
    "Trust Adhiparasakthi Hospitals for comprehensive hemodialysis and renal support in Chennai and Kanchipuram — combining capacity, technology, and compassionate nursing care for every dialysis patient.",
  image: "/images/international/Hemodialogy.png",
};
