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

export type LabeledItem = { label: string; text: string };

export const internationalCarePath = "/international/care";

export const internationalCareHero = {
  badge: "International Patient Department",
  title: "International Patients Care",
  subtitle:
    "World-class healthcare for patients from abroad — dedicated coordinators, travel assistance, and comprehensive support at Melmaruvathur.",
  image: "/images/international/international-care-hero.png",
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
  paragraphs: [
    "At Adhiparasakthi Hospitals, we are dedicated to providing world-class healthcare services to international patients. Our commitment to excellence in medical care, combined with state-of-the-art infrastructure and experienced healthcare professionals, ensures that you receive the highest quality treatment during your visit.",
    "Located in the serene town of Melmaruvathur, Adhiparasakthi Hospitals boasts modern facilities designed to cater to the needs of our patients. We utilize the latest technology in diagnostics and treatment, ensuring precise and effective medical care. Our equipment includes state-of-the-art imaging systems, minimally invasive surgical tools, and cutting-edge therapeutic devices.",
    "Our patient rooms are designed for comfort and recovery, equipped with modern amenities to make your stay as pleasant as possible. Suite, Deluxe, and Special Rooms are available for your comfortable stay.",
    "We offer a wide range of medical services, from emergency care to specialized treatments, all under one roof.",
  ],
};

export const internationalCareServices = [
  {
    title: "Dedicated International Patient Coordinator",
    description:
      "Our Dedicated International Patient Coordinator is here to ensure a seamless experience for our international patients. From initial inquiries to post-treatment follow-ups, they provide personalized assistance, helping with appointment scheduling, travel arrangements, and any specific needs. This dedicated support aims to make your healthcare journey as smooth and stress-free as possible.",
  },
  {
    title: "Multilingual Support for International Patients",
    description:
      "At Adhiparasakthi Hospitals, we understand the importance of clear communication for our international patients. Our dedicated team offers multilingual support to ensure that language barriers do not hinder your care experience. Whether you speak English, Tamil, or other languages, our staff is here to assist you with all your medical needs, appointments, and inquiries. Your comfort and understanding are our top priorities!",
  },
  {
    title: "Telemedicine for International Patients",
    description:
      "Telemedicine at Adhiparasakthi Hospitals allows international patients to access healthcare services remotely. Through virtual consultations, patients can connect with our specialists for diagnosis, treatment plans, and follow-up care without needing to travel. This convenient service ensures that you receive timely medical advice and support from the comfort of your home, making your healthcare experience seamless and efficient.",
  },
];

export const internationalCareLifeSavingTreatments = [
  "Interventional Cardiology",
  "Cardiothoracic Surgery",
  "Neuro Surgery",
  "Multi Organ Transplant",
  "Nephrology with Dialysis",
];

export const internationalCareTravel = {
  title: "Travel and Accommodation Assistance for International Patients",
  intro:
    "At Adhiparasakthi Hospitals, we understand that traveling to a new country for medical care can be daunting. To ensure a smooth and stress-free experience, our dedicated team offers comprehensive Travel and Accommodation Assistance tailored specifically for our international patients.",
  travel: {
    title: "Travel Assistance",
    items: [
      {
        label: "Visa Guidance",
        text: "We provide assistance with the visa application process, ensuring you have all the necessary documents for a hassle-free travel experience.",
      },
      {
        label: "Airport Transfers",
        text: "Our team can arrange reliable transportation to and from the airport, ensuring your journey to our hospital is comfortable and convenient.",
      },
      {
        label: "Local Transportation",
        text: "We can help organize local transport options, including taxis and rental services, to navigate around the city easily.",
      },
    ] satisfies LabeledItem[],
  },
  accommodation: {
    title: "Accommodation Services",
    items: [
      {
        label: "Hotel Recommendations",
        text: "We have partnerships with nearby hotels and guesthouses that offer competitive rates and comfortable stays. Our staff will help you choose the accommodation that best suits your needs and budget.",
      },
      {
        label: "In-Hospital Accommodation",
        text: "For patients requiring extended care, we offer in-hospital accommodations for patients and their caregivers, ensuring you have everything you need during your treatment.",
      },
      {
        label: "Assistance with Arrangements",
        text: "Our team can assist you in making reservations, managing payments, and coordinating your stay to ensure a smooth transition.",
      },
    ] satisfies LabeledItem[],
  },
  personalizedSupport:
    "Our dedicated international patient coordinators are here to assist you at every step of your journey, from travel arrangements to post-treatment care. We aim to make your experience as seamless as possible, allowing you to focus on your health and recovery.",
  contact:
    "Contact us for more information about our Travel and Accommodation Assistance services or to make arrangements. Please contact our International Patient Services team at 044 - 2752 8528.",
};

export const internationalCareFinancial = {
  intro:
    "At Adhiparasakthi Hospitals, we strive to provide transparent and comprehensive financial information to our international patients. Understanding the costs associated with your medical treatment is crucial for planning your visit. Below are key details regarding our financial services:",
  sections: [
    {
      title: "Cost Estimates",
      items: [
        {
          label: "Treatment Costs",
          text: "Upon consultation, our team will provide a detailed estimate of the treatment costs based on your specific medical needs. This estimate will include consultations, tests, surgeries, medications, and any additional services required during your stay.",
        },
        {
          label: "Package Offers",
          text: "We offer various healthcare packages that may include treatment, accommodation, and additional services, providing you with an all-inclusive financial option.",
        },
      ] satisfies LabeledItem[],
    },
    {
      title: "Payment Options",
      items: [
        {
          label: "Flexible Payment Methods",
          text: "We accept various payment methods, including credit/debit cards, bank transfers, and cash payments in local currency (INR) or other widely accepted currencies.",
        },
        {
          label: "Insurance",
          text: "If you have health insurance, please inform our billing department to verify coverage. We can assist you with the necessary paperwork for direct billing to your insurance provider.",
        },
      ] satisfies LabeledItem[],
    },
    {
      title: "Financial Assistance",
      items: [
        {
          label: "Financial Counseling",
          text: "Our financial counselors are available to assist you in understanding your financial responsibilities. They can help navigate insurance claims and payment plans tailored to your needs.",
        },
        {
          label: "Discounts and Offers",
          text: "We provide discounts for cash payments and have special offers for specific treatments. Please inquire with our billing team for current promotions.",
        },
      ] satisfies LabeledItem[],
    },
  ],
  transparency:
    "We believe in transparent billing practices. You will receive detailed invoices that outline all charges for your treatment. Our dedicated team is available to address any questions or concerns regarding financial matters. Feel free to contact us at any time for assistance.",
  currencyExchange:
    "Adhiparasakthi Hospitals can provide information on currency exchange services available nearby. We recommend checking the current exchange rates before your visit.",
};

export const internationalCareCultural = {
  intro:
    "At Adhiparasakthi Hospitals, we deeply value the diverse backgrounds of our international patients. Our commitment to cultural and religious sensitivity ensures that every patient feels respected and comfortable throughout their healthcare journey.",
  understanding: {
    title: "Understanding Your Needs",
    description:
      "We recognize that cultural beliefs and practices can significantly influence health and wellness. Our dedicated team is trained to understand and honor the various cultural and religious practices of our patients. Whether it pertains to dietary restrictions, prayer times, or specific healthcare rituals, we strive to accommodate your individual needs.",
  },
  customized: {
    title: "Customized Care",
    items: [
      {
        label: "Dietary Preferences",
        text: "Our nutritionists work closely with patients to provide meals that align with dietary restrictions and preferences, ensuring that your cultural or religious dietary needs are met.",
      },
      {
        label: "Privacy and Modesty",
        text: "We respect the privacy and modesty of all our patients. Our staff is trained to maintain discretion during examinations and treatments, adhering to the standards expected in different cultures and religions.",
      },
      {
        label: "Prayer and Meditation Facilities",
        text: "Recognizing the importance of spiritual practices, we offer dedicated spaces for prayer and meditation, allowing you to practice your faith in a serene environment.",
      },
      {
        label: "Cultural Awareness Training",
        text: "Our healthcare professionals undergo regular training on cultural competency to better understand and respect the customs and values of our diverse patient population.",
      },
    ] satisfies LabeledItem[],
  },
  comfortMatters:
    "If you have specific cultural or religious needs, please inform our staff upon your arrival. We are here to listen and provide personalized support, ensuring your experience at Adhiparasakthi Hospitals is respectful and accommodating.",
  commitment:
    "By fostering an environment of inclusivity and respect, we aim to create a healing atmosphere that reflects our values of compassion and understanding. Your health and comfort are our top priorities, and we are committed to making your visit as pleasant as possible.",
  closing:
    "For any specific inquiries or assistance, please feel free to contact our International Patient Services team. We look forward to serving you with the highest level of care and respect.",
};

export const internationalCareFooterImage =
  "/images/international/patient-compassionate-care.png";

export const internationalNavGroups = [
  {
    title: "Overview",
    items: [
      { name: "International Patients Home", href: "/international" },
      { name: "Why India · Why Us", href: "/international#why-india-us" },
      { name: "Specialities", href: "/international#specialities" },
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
