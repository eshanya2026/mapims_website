import type { InternationalServiceData } from "@/data/international-services/types";

export const insurancePath = "/services/insurance";

export const officialInsuranceDocPath = "/doc/insurance companey Detail (22.04.2025).docx";

export const governmentInsuranceSchemes = [
  "Chief Minister's Comprehensive Health Insurance Scheme - Tamil Nadu (CM Scheme)",
  "Tamil Nadu Government Employees Insurance scheme (TNNHIS Employees / Pensioners)",
  "Muthulakshmi Reddy Maternity Benefit Scheme",
];

export const governmentOrganizations = [
  "Employee's State Insurance Corporation (ESI)",
  "Integral Coach Factory Hospital (ICF-Railways)",
  "Kamarajar Port Limited",
  "Southern Railway Headquarters Hospital, Perambur (Opthal Treatment)",
  "Reserve Bank of India (RBI)",
  "Hindustan Petroleum Corporation Limited (HPCL)",
  "Southern Railway (Chennai Division)",
];

export const privateInsuranceCompaniesAndTPAs = [
  "Star Health and Allied Insurance Co Ltd",
  "United Health care Parekh Insurance TPA Pvt. Ltd., (Medvantage)",
  "Universal Sompo General Insurance Company",
  "HealthIndia Insurance TPA Services Pvt. Ltd.",
  "HDFC ERGO General Insurance Company",
  "Apollo Munich Health Insurance",
  "Bajaj Allianz General Insurance Co. Ltd.",
  "Vidal Health Insurance TPA",
  "Niva Bupa Health Insurance Company Limited (Max Bupa)",
  "Aditya Birla Insurance",
  "Reliance General Insurance Company Limited",
  "Health Insurance TPA of India Ltd",
  "Paramount Health Services & Insurance TPA Pvt. Ltd.",
  "Paramount Healthcare Management Pvt. Ltd. (International Patient Service)",
  "Ericson Insurance TPA Pvt Ltd",
  "Vipul MedCorp Insurance TPA Pvt Ltd",
  "SBI General Insurance",
  "Medi Assist Healthcare Services Ltd",
  "Future Generali India Insurance Co. Ltd.",
  "Go Digit General Insurance",
  "MDIndia Health Insurance TPA Pvt. Ltd.",
  "Chola MS General Insurance Company Limited",
  "Raksha Health Insurance TPA Pvt. Ltd.",
  "Family Health Plan Insurance TPA limited",
  "Safeway Insurance TPA Pvt Ltd",
  "Tata AIG General Insurance Company Limited",
  "Navi General Insurance",
  "Acko General Insurance",
  "HERITAGE HEALTH INSURANCE TPA PVT. LTD.",
  "East West Assist Insurance TPA Pvt. Ltd (Volo Health Insurance TPA Pvt. Ltd)",
  "ManipalCigna Health Insurance",
];

export const insuranceService: InternationalServiceData = {
  slug: "insurance",
  path: insurancePath,
  sectionLabel: "Patient Financial Services",
  title: "Insurance & Corporate",
  titleHighlight: "Cashless Services",
  seoTitle: "Insurance and Corporate Cashless Services | Adhiparasakthi Hospitals",
  breadcrumbLabel: "Insurance & Corporate Cashless Services",
  heroBadge: "Cashless Hospitalization",
  heroSubtitle:
    "Dedicated 24/7 TPA & Insurance Helpdesk supporting cashless approvals, government health schemes (CMCHIS), public sector tie-ups, and 30+ leading private health insurance providers at Melmaruvathur.",
  intro:
    "The Insurance & TPA Helpdesk at Adhiparasakthi Hospitals ensures that quality healthcare remains accessible and stress-free for patients and their families. Our dedicated team of insurance coordinators liaises directly with Third Party Administrators (TPAs), government welfare bodies, and private insurance corporations to process pre-authorization requests, expedite cashless hospitalization, and coordinate hassle-free claim settlements.",
  sections: [
    {
      title: "Core Service Highlights & Definitions",
      items: [
        "Cashless Hospitalization: A healthcare facility where eligible patients receive covered medical care without paying hospital bills upfront out of pocket; admissible costs are settled directly between the hospital and the insurance company or TPA.",
        "TPA Coordination (Hospital to Insurer): The hospital's dedicated liaison acting as a direct bridge to Third Party Administrators (TPAs) and insurers—submitting medical records, treatment estimates, and bills to secure fast pre-authorizations, resolve queries, and process claims.",
        "Documentation Support (Required Hospital Documents): Assistance preparing mandatory papers—Active Health Insurance E-Card/Policy, Patient Government Photo ID (Aadhaar/Voter ID), Treating Doctor's Admission Advice note, and diagnostic test reports.",
      ],
    },
    {
      title: "Government Insurance Schemes",
      items: governmentInsuranceSchemes,
    },
    {
      title: "Government Organizations & Public Sector Undertakings (PSUs)",
      items: governmentOrganizations,
    },
    {
      title: "Empaneled Private Insurance Companies & Leading TPAs",
      items: privateInsuranceCompaniesAndTPAs,
    },
    {
      title: "How to Avail Cashless Hospitalization",
      items: [
        "For Planned Admissions: Submit your active insurance e-card, government photo ID (Aadhaar / Voter ID), and treating doctor's admission advice at our Insurance Desk at least 48 to 72 hours before hospitalization.",
        "For Emergency Admissions: Inform the Insurance Desk within 24 hours of casualty admission with your policy details for immediate emergency pre-authorization.",
        "Our team coordinates with the insurer to obtain the Initial Pre-Authorization Approval (Initial Guarantee of Payment).",
        "At Discharge: Once medical procedures are completed, the final bill and discharge summary are transmitted to the TPA for final cashless authorization and settlement.",
        "Settlements: Direct financial settlement is completed between the hospital and the insurer/TPA with itemized transparent statements.",
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
    "Have questions regarding your health insurance coverage, TPA pre-authorization, or CMCHIS benefits? Visit our Insurance Desk on the hospital ground floor, email Insurance@mapims.org, or call our direct insurance desk at 9499059970 (Hospital Desk: +91 94990 59966) for dedicated guidance.",
  image: "/images/services/insurance-tpa-hero.png",
  heroImage: "/images/services/insurance-tpa-hero.png",
};
