import type { InternationalServiceData } from "@/data/international-services/types";

export const surgicalOncologyPath = "/international/care/surgical-oncology";

export const surgicalOncologyService: InternationalServiceData = {
  slug: "surgical-oncology",
  path: surgicalOncologyPath,
  sectionLabel: "Cancer Care",
  title: "Surgical Oncology at",
  titleHighlight: "Adhiparasakthi Hospitals",
  seoTitle: "Surgical Oncology hospitals in India",
  breadcrumbLabel: "Surgical Oncology",
  heroBadge: "Expert Cancer Surgery",
  heroSubtitle:
    "Comprehensive surgical oncology with advanced technology and compassionate, patient-centred care at Melmaruvathur.",
  intro:
    "Welcome to Adhiparasakthi Hospitals' Surgical Oncology department, where cutting-edge technology meets compassionate care. Our team of expert oncologists is dedicated to providing comprehensive surgical solutions tailored to your needs.",
  sections: [
    {
      title: "Our Scope of Services",
      items: [
        "Advanced Tumor Removal: Precision surgeries for a variety of cancers, including breast, colon, lung, and prostate.",
        "Robotic-Assisted Surgery: Minimally invasive techniques using state-of-the-art robotic systems for quicker recovery and reduced pain.",
        "Laparoscopic Procedures: Less invasive surgeries for quicker healing and minimal scarring.",
        "Sentinel Node Biopsy: Early detection and treatment planning through targeted biopsies.",
        "Palliative Surgery: Enhancing quality of life through surgical interventions aimed at symptom management and comfort.",
      ],
    },
    {
      title: "Must-Know Information",
      items: [
        "Expert Team: Our board-certified surgical oncologists are highly skilled in managing complex cancer cases with a patient-centric approach.",
        "State-of-the-Art Facilities: Equipped with the latest technology to ensure the highest precision and effectiveness in surgical treatments.",
        "Personalized Care: From diagnosis through recovery, our multidisciplinary team provides tailored care plans to meet your individual needs.",
        "Comprehensive Support: Access to a full range of support services, including chemotherapy, radiotherapy, and rehabilitation, all under one roof.",
        "Patient-Centered Approach: We prioritize your comfort and well-being, ensuring a supportive environment throughout your treatment journey.",
      ],
    },
  ],
  closing:
    "At Adhiparasakthi Hospitals, we're committed to offering the highest standards of care with a focus on innovative solutions and compassionate support. Discover the difference of expert surgical oncology care with us today. For more information or to schedule a consultation, contact us or visit our website.",
  image: "/images/international/surgical-oncology-surgery.png",
  heroImage: "/images/international/surgical-oncology-surgery.png",
  bannerLabel: "Surgical Oncology",
  footerImage: "/images/international/surgical-oncology-surgery.png",
};
