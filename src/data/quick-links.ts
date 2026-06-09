import { patientFeedbackUrl } from "@/data/site-links";

export type FooterQuickLink = {
  label: string;
  href: string;
  external?: boolean;
  appointment?: boolean;
};

export const footerQuickLinks: FooterQuickLink[] = [
  { label: "Mission & Vision", href: "/about#mission-vision" },
  { label: "International Patients", href: "/international" },
  {
    label: "Master Health Check Up Package",
    href: "/#health-package-master-health-checkup",
  },
  {
    label: "Cardio Health Check Up Package",
    href: "/#health-package-cardio-health-checkup",
  },
  {
    label: "Well Women Checkup Executive Package",
    href: "/#health-package-well-women-executive",
  },
  { label: "Blog", href: "/blog/health-insights" },
  { label: "Appointment", href: "/#book-appointment", appointment: true },
  {
    label: "Patient Feedback",
    href: patientFeedbackUrl,
    external: true,
  },
  {
    label: "Value Added Services",
    href: "/about#value-added-services",
  },
  { label: "Contact", href: "/contact" },
];
