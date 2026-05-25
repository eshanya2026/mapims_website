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
      "At Adhiparasakthi Hospitals, we are committed to ensuring the health and well-being of our community by making healthcare accessible to all. As part of our mission to serve the people with compassion, we are pleased to offer a free shuttle bus service for patients and their attendants. The service helps families travel comfortably to and from the hospital, reducing the burden of transport during times of medical need.",
  },
  {
    id: "avail",
    title: "How to Avail the Service",
    icon: CircleHelp,
    content:
      "Patients and attendants can enquire about the free shuttle service at the hospital reception or International Patient help desk. Our staff will guide you on pickup points, timings, and routes. Please carry your appointment or admission details when requesting the service so we can assist you promptly.",
  },
  {
    id: "pharmacy",
    title: "Free Pharmacy Service",
    icon: Pill,
    content:
      "We extend support through our pharmacy services to eligible patients as part of our community care initiatives. Our pharmacy team ensures genuine medicines and clear guidance on prescriptions. Enquire at the pharmacy counter or patient relations desk for details on eligibility and available assistance.",
  },
  {
    id: "benefit",
    title: "Who can benefit?",
    icon: Users,
    content:
      "Our value added services are designed for patients, attendants, and visitors coming to Adhiparasakthi Hospitals at Melmaruvathur — including those from nearby towns, rural areas, and international patients. Elderly patients, families without private transport, and those requiring frequent follow-up visits especially benefit from our shuttle and support services.",
  },
  {
    id: "security",
    title: "24/7 Security Services",
    icon: Shield,
    content:
      "The hospital campus is protected by trained security personnel available around the clock. Our team monitors entry points, assists visitors, and ensures a safe environment for patients, staff, and families at all hours.",
  },
  {
    id: "cctv",
    title: "CCTV Surveillance",
    icon: Cctv,
    content:
      "Comprehensive CCTV coverage across key areas of the hospital enhances safety and helps our security team respond quickly to any concern. Surveillance is maintained in accordance with hospital policies and patient privacy guidelines.",
  },
  {
    id: "quality",
    title: "Commitment to Quality",
    icon: BadgeCheck,
    content:
      "Every value added service reflects our commitment to NABH standards of care, transparency, and patient satisfaction. We continuously review and improve these services to better serve our community.",
  },
  {
    id: "access",
    title: "Access Control Measures",
    icon: KeyRound,
    content:
      "Controlled access to clinical areas, ICUs, and sensitive zones ensures patient safety and confidentiality. Visitors are guided through designated entry points, and our staff is available to assist with directions and authorised access.",
  },
];
