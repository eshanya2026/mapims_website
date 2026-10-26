import type { Metadata } from "next";
import InsuranceContactPage from "@/components/services/insurance/InsuranceContactPage";

export const metadata: Metadata = {
  title: "Contact Insurance Desk & Policy Verification | Adhiparasakthi Hospitals",
  description:
    "Contact the dedicated Insurance & TPA Helpdesk at Adhiparasakthi Hospitals, Melmaruvathur for cashless hospitalization, CMCHIS, and policy verification. Call 9499059970 or email Insurance@mapims.org.",
};

export default function Page() {
  return <InsuranceContactPage />;
}
