import type { Metadata } from "next";
import InternationalHero from "@/components/international/InternationalHero";
import InternationalFeatures from "@/components/international/InternationalFeatures";
import InternationalWelcome from "@/components/international/InternationalWelcome";
import InternationalSpecialities from "@/components/international/InternationalSpecialities";
import InternationalWhyIndiaUs from "@/components/international/InternationalWhyIndiaUs";
import InternationalTestimonials from "@/components/international/InternationalTestimonials";
import InternationalDeskSection from "@/components/international/InternationalDeskSection";

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
      <InternationalTestimonials />
      <InternationalDeskSection />
    </main>
  );
}
