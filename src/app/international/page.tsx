import type { Metadata } from "next";
import InternationalHero from "@/components/international/InternationalHero";
import InternationalFeatures from "@/components/international/InternationalFeatures";
import InternationalWelcome from "@/components/international/InternationalWelcome";
import InternationalSpecialities from "@/components/international/InternationalSpecialities";
import InternationalWhyIndiaUs from "@/components/international/InternationalWhyIndiaUs";
import InternationalExpertDoctors from "@/components/international/InternationalExpertDoctors";
import CertificationSection from "@/components/about/CertificationSection";
import InternationalGallery from "@/components/international/InternationalGallery";
import InternationalFAQ from "@/components/international/InternationalFAQ";
import InternationalCTA from "@/components/international/InternationalCTA";

export const metadata: Metadata = {
  title: "International Patients | Adhiparasakthi Hospital",
  description:
    "International Patient Care at MAPIMS — airport-to-airport support, world-class treatment, travel assistance, and dedicated coordinators at Melmaruvathur.",
};

export default function InternationalPatientsPage() {
  return (
    <main className="min-h-screen">
      <InternationalHero />
      <InternationalFeatures />
      <InternationalWelcome />
      <InternationalSpecialities />
      <InternationalWhyIndiaUs />
      <InternationalExpertDoctors />
      <CertificationSection />
      <InternationalGallery />
      <InternationalFAQ />
      <InternationalCTA />
    </main>
  );
}
