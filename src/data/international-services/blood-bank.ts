import type { InternationalServiceData } from "@/data/international-services/types";

export const bloodBankPath = "/services/blood-bank";

export const bloodBankService: InternationalServiceData = {
  slug: "blood-bank",
  path: bloodBankPath,
  sectionLabel: "Blood Bank Services",
  title: "24/7 Licensed",
  titleHighlight: "Blood Bank & Component Center",
  seoTitle: "24/7 Blood Bank & Blood Component Separation | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Blood Bank",
  heroBadge: "24/7 Blood Bank",
  heroSubtitle:
    "Round-the-clock state-of-the-art licensed blood transfusion services, advanced component separation, and stringent safety testing at Melmaruvathur.",
  intro:
    "The Blood Bank at Adhiparasakthi Hospitals is a fully licensed, state-of-the-art transfusion medicine center providing round-the-clock blood banking services. Equipped with advanced automated component separation technology, temperature-monitored cold storage, and rigorous screening methodologies, our blood bank ensures a steady, safe supply of whole blood and blood components for surgeries, trauma resuscitation, obstetrics, oncology, and critical care emergencies.",
  sections: [
    {
      title: "Blood Components Available 24/7",
      items: [
        "Packed Red Blood Cells (PRBC) for anemia, trauma resuscitation, and major surgical procedures.",
        "Platelet Concentrates (Random Donor Platelets & Single Donor Platelets) for dengue, thrombocytopenia, and hematology.",
        "Fresh Frozen Plasma (FFP) for coagulopathy and massive hemorrhage support.",
        "Cryoprecipitate for hemophilia, factor deficiencies, and fibrinogen replacement.",
        "Whole Human Blood for emergency exsanguinating hemorrhage and exchange transfusions.",
      ],
    },
    {
      title: "Stringent Quality & Safety Protocols",
      items: [
        "Mandatory chemiluminescence & ELISA testing for transfusion-transmissible infections (HIV 1 & 2, Hepatitis B, Hepatitis C, Syphilis, and Malaria).",
        "Fully automated gel card cross-matching and advanced antibody screening techniques.",
        "Continuous digital temperature logging (-80°C deep freezers, 2°C–6°C blood bank refrigerators, and 22°C platelet agitators).",
        "Voluntary blood donation promotion and organized community mobile blood donation camps.",
      ],
    },
    {
      title: "Emergency Transfusion & Critical Support",
      items: [
        "Instant emergency uncrossed O-negative PRBC release for life-threatening acute trauma and obstetrics crises.",
        "Seamless coordination with Accident & Emergency, ICUs, Dialysis, and Surgical suites.",
        "24/7 transfusion medicine specialist on-call to assist with complex cross-matching and transfusion reaction management.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our Blood Bank?",
  whyChoose: [
    "Fully licensed by Central & State Drug Standard Control Authorities",
    "Complete blood component separation facility on-site",
    "24/7 availability with immediate issue for emergency cases",
    "Highest standards of donor screening and blood recipient safety",
  ],
  closing:
    "Need urgent blood or wish to participate in voluntary blood donation? Contact our 24/7 Blood Bank at Adhiparasakthi Hospitals directly at +91 94990 59966.",
  image: "/images/services/blood-bank-lab-hero.jpg",
  heroImage: "/images/services/blood-bank-lab-hero.jpg",
};
