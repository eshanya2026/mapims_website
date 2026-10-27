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
    label: "General Surgery Package",
    href: "/blog/special-concession-packages-for-general-surgery-procedures",
  },
  {
    label: "ENT Surgery Package",
    href: "/blog/ent-surgery-special-concession-packages",
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
