import type { InternationalServiceData } from "@/data/international-services/types";

export const interventionalRadiologyPath =
  "/international/care/interventional-radiology";

export const interventionalRadiologyService: InternationalServiceData = {
  slug: "interventional-radiology",
  path: interventionalRadiologyPath,
  sectionLabel: "Imaging & Procedures",
  title: "Interventional Radiology at",
  titleHighlight: "Adhiparasakthi Hospitals",
  seoTitle: "International Radiology hospitals in India",
  breadcrumbLabel: "Interventional Radiology",
  heroBadge: "Minimally Invasive Care",
  heroSubtitle:
    "Advanced imaging-guided procedures for precise diagnosis and treatment — expert interventional radiologists at Melmaruvathur.",
  intro:
    "Welcome to the cutting-edge Interventional Radiology department at Adhiparasakthi Hospitals, Melmaruvathur! Our expert team combines advanced imaging techniques with minimally invasive procedures to offer precise, effective treatments for a wide range of conditions. Discover how our state-of-the-art technology and specialized care can make a difference in your health journey.",
  sections: [
    {
      title: "Our Interventional Radiology Services",
      items: [
        "Angioplasty & Stenting: Open narrowed or blocked blood vessels to restore proper blood flow.",
        "Biopsy Guidance: Use imaging to accurately guide biopsies for diagnostic purposes.",
        "Uterine Fibroid Embolization: A non-surgical treatment to shrink fibroids and alleviate symptoms.",
        "Varicose Vein Treatment: Minimally invasive techniques to treat and reduce varicose veins.",
        "Dialysis Access: Creation and maintenance of vascular access for dialysis patients.",
        "Tumor Ablation: Destroy tumors using radiofrequency or microwave energy.",
        "Central Line Placement: Insertion of long-term intravenous catheters for medication delivery.",
        "Biliary Interventions: Procedures to address bile duct obstructions and related issues.",
        "Spinal Interventions: Treatments for spinal conditions, including vertebroplasty and kyphoplasty.",
      ],
    },
    {
      title: "Why Choose Us?",
      items: [
        "Expert Team: Our radiologists are highly trained in the latest interventional techniques and technologies.",
        "Advanced Technology: Equipped with the latest imaging and procedural technology for enhanced precision and outcomes.",
        "Patient-Centered Care: Personalized treatment plans and compassionate care tailored to your needs.",
        "Minimally Invasive: Many procedures are performed with minimal incisions, reducing recovery time and discomfort.",
        "Comprehensive Services: From diagnosis to post-procedure care, all under one roof for your convenience.",
      ],
    },
  ],
  closing:
    "Experience the future of medical care with our Interventional Radiology team. Contact us today to learn more about how we can help you achieve optimal health through innovative, minimally invasive techniques.",
  image: "/images/international/radiologyu.png",
};
