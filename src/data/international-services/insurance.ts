import type { InternationalServiceData } from "@/data/international-services/types";

export const insurancePath = "/services/insurance";

export const insuranceService: InternationalServiceData = {
  slug: "insurance",
  path: insurancePath,
  sectionLabel: "Patient Financial Services",
  title: "TPA & Cashless",
  titleHighlight: "Insurance Services",
  seoTitle: "Cashless Health Insurance & TPA Desk | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Insurance",
  heroBadge: "Cashless Hospitalization",
  heroSubtitle:
    "Dedicated 24/7 TPA & Insurance Helpdesk supporting cashless approvals, government health schemes (CMCHIS), and leading private health insurance providers at Melmaruvathur.",
  intro:
    "The Insurance & TPA Helpdesk at Adhiparasakthi Hospitals ensures that quality healthcare remains accessible and stress-free for patients and their families. Our dedicated team of insurance coordinators liaises directly with Third Party Administrators (TPAs), government welfare bodies, and private insurance corporations to process pre-authorization requests, expedite cashless hospitalization, and coordinate hassle-free claim settlements.",
  sections: [
    {
      title: "Government & Welfare Health Schemes",
      items: [
        "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS / Kalaignar Kaappeettu Thittam) approved hospital for major surgeries, cardiac procedures, oncology, and critical care.",
        "Employees' State Insurance (ESI) tie-up and empanelment programs for organized sector workers.",
        "Central Government Health Scheme (CGHS) and Ex-Servicemen Contributory Health Scheme (ECHS) referral support.",
        "Free healthcare initiatives and concessions for economically disadvantaged rural beneficiaries.",
      ],
    },
    {
      title: "Empaneled Private Insurers & Leading TPAs",
      items: [
        "Star Health and Allied Insurance",
        "Medi Assist Insurance TPA",
        "Paramount Health Services & Insurance TPA",
        "MDIndia Health Insurance TPA",
        "Heritage Health TPA & Vidal Health TPA",
        "HDFC ERGO, ICICI Lombard, Bajaj Allianz, Care Health, and Niva Bupa Health Insurance",
        "United India Insurance, National Insurance, New India Assurance, and Oriental Insurance Company",
      ],
    },
    {
      title: "How to Avail Cashless Hospitalization",
      items: [
        "For Planned Admissions: Submit your active insurance e-card, government photo ID (Aadhaar / Voter ID), and treating doctor's admission advice at our Insurance Desk at least 48 to 72 hours before hospitalization.",
        "For Emergency Admissions: Inform the Insurance Desk within 24 hours of casualty admission with your policy details for immediate emergency pre-authorization.",
        "Our team coordinates with the insurer to obtain the Initial Pre-Authorization Approval (Initial Guarantee of Payment).",
        "At Discharge: Once medical procedures are completed, the final bill and discharge summary are transmitted to the TPA for final cashless authorization and settlement.",
      ],
    },
  ],
  whyChooseTitle: "Why Choose Our Insurance Helpdesk?",
  whyChoose: [
    "Dedicated full-time insurance counselors assisting with paperwork",
    "Empaneled with all major public and private TPAs in India",
    "Transparent billing with zero surprise charges",
    "Fast-track query resolution to minimize discharge waiting time",
  ],
  closing:
    "Have questions regarding your health insurance coverage, TPA pre-authorization, or CMCHIS benefits? Visit our Insurance Desk on the hospital ground floor or call +91 94990 59966 for dedicated guidance.",
  image: "/images/services/insurance-tpa-hero.png",
  heroImage: "/images/services/insurance-tpa-hero.png",
};
