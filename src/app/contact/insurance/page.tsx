import type { Metadata } from "next";
import InsuranceContactPage from "@/components/services/insurance/InsuranceContactPage";

export const metadata: Metadata = {
  title: "Contact Insurance Desk | Adhiparasakthi Hospitals",
  description:
    "Direct contact for health insurance, TPA assistance, and cashless hospitalization at Adhiparasakthi Hospitals. Call 9499059970 or email Insurance@mapims.org.",
};

export default function Page() {
  return <InsuranceContactPage />;
}
