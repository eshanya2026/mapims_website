import type { InternationalServiceData } from "@/data/international-services/types";

export const pharmacy24hrsPath = "/services/24hrs-pharmacy";

export const pharmacy24hrsService: InternationalServiceData = {
  slug: "24hrs-pharmacy",
  path: pharmacy24hrsPath,
  sectionLabel: "Pharmaceutical Services",
  title: "Round-the-Clock",
  titleHighlight: "24hrs Pharmacy Services",
  seoTitle: "24hrs Hospital Pharmacy & Prescription Dispensary | Adhiparasakthi Hospitals",
  breadcrumbLabel: "24hrs Pharmacy",
  heroBadge: "24/7 Pharmacy",
  heroSubtitle:
    "Round-the-clock authentic medications, critical emergency drugs, surgical consumables, and free pharmacy assistance at Melmaruvathur.",
  intro:
    "The 24hrs Pharmacy at Adhiparasakthi Hospitals operates non-stop, 365 days a year, providing an uninterrupted supply of genuine prescription medications, emergency life-saving pharmaceuticals, surgical disposables, and healthcare consumables. Supervised by registered, experienced pharmacists, our pharmacy units ensure strict adherence to drug storage standards, medication safety protocols, and personalized patient counseling.",
  sections: [
    {
      title: "Comprehensive Pharmaceutical Inventory",
      items: [
        "100% authentic medications procured directly from accredited pharmaceutical manufacturers and authorized distributors.",
        "Emergency, cardiac, neurological, oncological, pediatric, and critical care pharmaceuticals constantly in stock.",
        "Complete range of surgical consumables, implants, orthopedic braces, wound dressings, and medical disposables.",
        "Cold-chain storage units maintaining 2°C–8°C for insulin, biological products, vaccines, and monoclonal antibodies.",
        "Community free-pharmacy counter supporting economically vulnerable patients with essential prescribed medications.",
      ],
    },
    {
      title: "Hospital-Wide Dispensary Counters",
      items: [
        "Central Outpatient Pharmacy located on the ground floor with multi-counter computerized billing for rapid dispensing.",
        "Dedicated Emergency / Casualty Pharmacy situated adjacent to the trauma resuscitation bays for instantaneous medication release.",
        "Inpatient Satellite Pharmacies ensuring seamless, error-free bedside medication delivery across all ward floors and ICUs.",
        "Strict computerized inventory tracking to eliminate out-of-stock scenarios for critical medications.",
      ],
    },
    {
      title: "Patient Counseling & Safe Drug Use",
      items: [
        "Qualified pharmacists verify all doctor prescriptions for dosage accuracy, potential drug interactions, and contraindications.",
        "Clear verbal and written instructions provided on administration timing, food requirements, and possible adverse effects.",
        "Specialized pediatric dosage calculation checks and insulin pen administration guidance.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our 24hrs Pharmacy?",
  whyChoose: [
    "Open 24 hours a day, 7 days a week, 365 days a year",
    "Verified authentic medications stored under certified temperature conditions",
    "Multi-counter digital billing ensuring minimal waiting time",
    "Free essential medication initiatives for underprivileged community members",
  ],
  closing:
    "For emergency medications or prescription refills at any hour of the day or night, visit our 24hrs Pharmacy at Adhiparasakthi Hospitals or call our pharmacy desk directly at +91 94990 59966.",
  image: "/images/services/pharmacy-dispensing-hero.png",
  heroImage: "/images/services/pharmacy-dispensing-hero.png",
};
