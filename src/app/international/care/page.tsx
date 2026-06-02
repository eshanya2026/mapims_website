import type { Metadata } from "next";
import InternationalCareHero from "@/components/international/care/InternationalCareHero";
import InternationalPatientCareContent from "@/components/international/care/InternationalPatientCareContent";
import InternationalFAQ from "@/components/international/InternationalFAQ";

export const metadata: Metadata = {
  title: "International Patients Care | Adhiparasakthi Hospital",
  description:
    "Comprehensive international patient care — dedicated coordinators, travel assistance, financial guidance, and world-class treatment at Melmaruvathur.",
};

export default function InternationalPatientCarePage() {
  return (
    <main className="min-h-screen">
      <InternationalCareHero />
      <InternationalPatientCareContent />
      <InternationalFAQ />
    </main>
  );
}
