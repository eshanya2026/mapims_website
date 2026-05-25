import type { Metadata } from "next";
import DepartmentsHero from "@/components/departments/DepartmentsHero";
import DepartmentsGrid from "@/components/departments/DepartmentsGrid";
import DepartmentsCTA from "@/components/departments/DepartmentsCTA";
import EmergencyCTA from "@/components/home/EmergencyCTA";

export const metadata: Metadata = {
  title: "All Departments | Adhiparasakthi Hospital",
  description:
    "Explore all super-specialty departments at MAPIMS — Cardiology, Neurology, Orthopaedics, Oncology, and more at Melmaruvathur.",
};

export default function DepartmentsPage() {
  return (
    <main>
      <DepartmentsHero />
      <DepartmentsGrid />
      <DepartmentsCTA />
      <EmergencyCTA />
    </main>
  );
}
