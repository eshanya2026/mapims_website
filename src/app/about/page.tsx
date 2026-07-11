import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutContent from "@/components/about/AboutContent";
import AboutHighlights from "@/components/about/AboutHighlights";
import AboutValueAddedServices from "@/components/about/AboutValueAddedServices";
import CertificationSection from "@/components/about/CertificationSection";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutSpecialistDoctors from "@/components/about/AboutSpecialistDoctors";
import { getAboutDoctors } from "@/lib/doctors-content";

export const metadata: Metadata = {
  title: "About Us | Adhiparasakthi Hospitals",
  description:
    "Learn about Adhiparasakthi Hospitals — established in 1986, NABH certified, 1000-bed tertiary care multispecialty hospitals at Melmaruvathur.",
};

export default async function AboutPage() {
  const doctors = await getAboutDoctors();

  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutContent />
      <AboutValueAddedServices />
      <AboutHighlights />
      <CertificationSection />
      <AboutFAQ />
      <AboutSpecialistDoctors doctors={doctors} />
    </main>
  );
}
