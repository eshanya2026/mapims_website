import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutContent from "@/components/about/AboutContent";
import AboutHighlights from "@/components/about/AboutHighlights";
import AboutValueAddedServices from "@/components/about/AboutValueAddedServices";
import CertificationSection from "@/components/about/CertificationSection";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutSpecialistDoctors from "@/components/about/AboutSpecialistDoctors";

export const metadata: Metadata = {
  title: "About Us | Adhiparasakthi Hospital",
  description:
    "Learn about Adhiparasakthi Hospital — established in 1986, NABH certified, 1000-bed tertiary care multispecialty hospital at Melmaruvathur.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutContent />
      <AboutValueAddedServices />
      <AboutHighlights />
      <CertificationSection />
      <AboutFAQ />
      <AboutSpecialistDoctors />
    </main>
  );
}
