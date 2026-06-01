import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
export const metadata: Metadata = {
  title: "Hospital Services | Adhiparasakthi Hospital",
  description:
    "Emergency, surgical, diagnostic, and specialty hospital services at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServicesGrid />
    </main>
  );
}
