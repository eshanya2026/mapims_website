import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import AboutSection from "@/components/home/AboutSection";
import BookAppointmentSection from "@/components/home/BookAppointmentSection";
import CentersOfExcellence from "@/components/home/CentersOfExcellence";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DoctorShowcase from "@/components/home/DoctorShowcase";
import DigitalPatientExperience from "@/components/home/DigitalPatientExperience";
import HealthPackages from "@/components/home/HealthPackages";
import Testimonials from "@/components/home/Testimonials";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import HealthInsightsSection from "@/components/home/HealthInsightsSection";
import { getHomeDoctors } from "@/lib/doctors-content";

export default async function Home() {
  const doctors = await getHomeDoctors();

  return (
    <main className="min-h-screen">
      <Hero />
      <QuickActions />
      <AboutSection />
      <BookAppointmentSection />
      <CentersOfExcellence />
      <WhyChooseUs />
      <DoctorShowcase doctors={doctors} />
      <DigitalPatientExperience />
      <HealthPackages />
      <Testimonials />
      <NewsEventsSection />
      <HealthInsightsSection />
    </main>
  );
}
