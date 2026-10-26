import type { Metadata } from "next";
import InsuranceServicePage from "@/components/services/insurance/InsuranceServicePage";

export const metadata: Metadata = {
  title: "Health Insurance & Cashless Hospitalization (TPA) | Adhiparasakthi Hospitals",
  description:
    "Cashless hospitalization, TPA coordination, government health schemes (CMCHIS), and health insurance support at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export default function Page() {
  return <InsuranceServicePage />;
}
