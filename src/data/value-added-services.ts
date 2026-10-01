import {
  Bus,
  CircleHelp,
  Pill,
  Users,
  Shield,
  Cctv,
  BadgeCheck,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

export type ValueAddedService = {
  id: string;
  title: string;
  content: string;
  icon: LucideIcon;
};

export const valueAddedServices: ValueAddedService[] = [
  {
    id: "shuttle",
    title: "Free shuttle bus services",
    icon: Bus,
    content:
      "At Adhiparasakthi Hospitals, we are committed to ensuring the health and well-being of our community by making healthcare accessible to all. As part of our mission to serve the people with compassion, we are pleased to offer a free shuttle bus service for patients and their families.",
  },
  {
    id: "avail",
    title: "How to Avail the Service",
    icon: CircleHelp,
    content:
      "Simply visit our Help Desk or call our Transport Assistance Hotline at 9499059966, and our team will provide you with the shuttle schedule and route details. No prior booking is required, just show up at one of the designated pickup points, and our shuttle will take care of the rest.",
  },
  {
    id: "pharmacy",
    title: "Free Pharmacy Service",
    icon: Pill,
    content:
      "At Adhiparasakthi Hospitals, we are deeply committed to serving the healthcare needs of our community with compassion and care. As part of our mission to ensure that essential medical care is accessible to all, we are proud to offer free pharmacy services to our patients for a limited range of medications.\n\nOur initiative is designed to support patients who may face financial difficulties in accessing necessary medications. Through this service, we aim to ensure that no one is deprived of the medicines they need for their well-being.",
  },
  {
    id: "benefit",
    title: "Who can benefit?",
    icon: Users,
    content:
      "This service is available to all patients receiving treatment at our hospital. Medications that are crucial for your treatment, as prescribed by our doctors, may be provided free of charge for a specified duration or quantity.",
  },
  {
    id: "security",
    title: "24/7 Security Services",
    icon: Shield,
    content:
      "At Adhiparasakthi Hospitals, Melmaruvathur, the safety and security of our patients, visitors, and staff are our top priority. We are committed to providing a secure and protected environment around the clock.",
  },
  {
    id: "cctv",
    title: "CCTV Surveillance",
    icon: Cctv,
    content:
      "Our hospital is equipped with state-of-the-art CCTV cameras that provide continuous surveillance, monitoring all key areas both inside and outside the hospital. This system helps in preventing unauthorized access and ensures real-time monitoring for enhanced safety.",
  },
  {
    id: "quality",
    title: "Commitment to Quality",
    icon: BadgeCheck,
    content:
      "All medications provided under our free pharmacy initiative are sourced from trusted manufacturers, ensuring that our patients receive high-quality and safe treatments.",
  },
  {
    id: "access",
    title: "Access Control Measures",
    icon: KeyRound,
    content:
      "To protect sensitive areas and restrict access to authorized personnel only, we have implemented strict access control systems across the facility.",
  },
];
