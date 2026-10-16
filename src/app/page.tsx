import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import AboutSection from "@/components/home/AboutSection";
import CentersOfExcellence from "@/components/home/CentersOfExcellence";
import DoctorShowcase from "@/components/home/DoctorShowcase";
import LeadershipSection from "@/components/home/LeadershipSection";
import HealthPackages from "@/components/home/HealthPackages";
import BookAppointmentSection from "@/components/home/BookAppointmentSection";
import DigitalPatientExperience from "@/components/home/DigitalPatientExperience";
import HealthInsightsSection from "@/components/home/HealthInsightsSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import Testimonials from "@/components/home/Testimonials";
import { getHomeDoctors } from "@/lib/doctors-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const doctors = await getHomeDoctors();

  return (
    <main className="min-h-screen">
      <Hero />
      <QuickActions />
      <AboutSection />
      <CentersOfExcellence />
      <DoctorShowcase doctors={doctors} />
      <LeadershipSection />
      <HealthPackages />
      <BookAppointmentSection />
      <DigitalPatientExperience />
      <HealthInsightsSection />
      <NewsEventsSection />
      <Testimonials />
    </main>
  );
}
