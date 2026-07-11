import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Hospitals Services | Adhiparasakthi Hospitals",
  description:
    "Emergency, surgical, diagnostic, and specialty hospitals services at Adhiparasakthi Hospitals, Melmaruvathur.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServicesGrid />
    </main>
  );
}
