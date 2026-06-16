import type { Metadata } from "next";
import { getPublishedJobs } from "@/lib/content";
import CareersHero from "@/components/careers/CareersHero";
import CareersIntro from "@/components/careers/CareersIntro";
import CareersJobList from "@/components/careers/CareersJobList";
import CareersApplicationForm from "@/components/careers/CareersApplicationForm";

export const metadata: Metadata = {
  title: "Careers | Adhiparasakthi Hospital",
  description:
    "Join the team at Adhiparasakthi Hospitals. Explore current career openings in Melmaruvathur and build your future in healthcare.",
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  return (
    <main className="min-h-screen bg-slate-50">
      <CareersHero jobCount={jobs.length} />
      <CareersIntro />
      <CareersJobList jobs={jobs} />
      <CareersApplicationForm />
    </main>
  );
}
