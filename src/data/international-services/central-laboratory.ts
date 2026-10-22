import type { InternationalServiceData } from "@/data/international-services/types";

export const centralLaboratoryPath = "/services/central-laboratory";

export const centralLaboratoryService: InternationalServiceData = {
  slug: "central-laboratory",
  path: centralLaboratoryPath,
  sectionLabel: "Diagnostics",
  title: "Central",
  titleHighlight: "Laboratory",
  seoTitle: "Central Laboratory hospitals in India",
  breadcrumbLabel: "Central Laboratory",
  heroBadge: "Diagnostic Excellence",
  heroSubtitle:
    "Accurate, timely diagnostic testing with advanced technology and expert laboratory professionals at Melmaruvathur.",
  intro:
    "Welcome to the Central Laboratory at Adhiparasakthi Hospitals, your hub for accurate and timely diagnostic testing. Our state-of-the-art laboratory is equipped with the latest technology to provide comprehensive diagnostic services essential for effective treatment and patient care.",
  sections: [
    {
      title: "Why Choose Our Central Laboratory?",
      items: [
        "Advanced Technology: We utilize cutting-edge diagnostic equipment to ensure precise and reliable results.",
        "Wide Range of Tests: From routine blood tests to specialized assays, we offer a complete suite of diagnostic services.",
        "Rapid Turnaround: Our efficient processes guarantee quick results, helping your healthcare team make timely decisions.",
        "Expert Team: Our skilled laboratory technicians and pathologists are dedicated to delivering high-quality diagnostic support.",
        "Quality Assurance & NABL Accreditation: NABL-accredited diagnostic laboratory adhering to stringent quality control protocols to maintain highest standards of accuracy and reliability.",
        "Patient-Centric Care: We prioritize patient comfort and confidentiality throughout the diagnostic process.",
      ],
    },
    {
      title: "Our Scope of Services",
      items: [
        "Hematology: Comprehensive blood tests including CBC, coagulation studies, and more.",
        "Clinical Chemistry: Biochemical analyses for metabolic, renal, and liver function.",
        "Microbiology: Culture and sensitivity tests for infection diagnosis.",
        "Immunology: Tests for autoimmune disorders and immunological assessments.",
        "Serology: Screening for viral, bacterial, and other infections.",
        "Endocrinology: Hormone assays for thyroid, adrenal, and other endocrine functions.",
        "Blood Bank & Component Center: 24/7 NABL-accredited blood bank providing blood grouping, cross-matching, and component separation.",
      ],
    },
    {
      title: "Must-Know Information",
      items: [
        "NABL Accredited Laboratory: Our central laboratory holds NABL accreditation, adhering to the highest national and international diagnostic standards.",
        "NABL Accredited Blood Bank: Round-the-clock NABL-accredited blood bank facility providing safe blood components and emergency transfusion support.",
        "Integrated Services: Seamlessly integrated with our hospital’s departments for comprehensive care.",
        "Emergency Testing: Fast-track testing services available for urgent medical situations.",
        "Patient Portal: Access your test results online through our secure patient portal.",
        "Insurance & Billing: We accept a wide range of insurance plans and offer transparent billing.",
      ],
    },
  ],
  closing:
    "Experience exceptional diagnostic services at Adhiparasakthi Hospitals' Central Laboratory—where precision meets compassion. For more information or to schedule a test, contact us today!",
  image: "/images/services/central-laboratory-hero.jpg",
  heroImage: "/images/services/central-laboratory-hero.jpg",
};
