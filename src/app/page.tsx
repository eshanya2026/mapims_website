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
import NewsEvents from "@/components/home/NewsEvents";
import EmergencyCTA from "@/components/home/EmergencyCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QuickActions />
      <AboutSection />
      <BookAppointmentSection />
      <CentersOfExcellence />
      <WhyChooseUs />
      <DoctorShowcase />
      <DigitalPatientExperience />
      <HealthPackages />
      <Testimonials />
      <NewsEvents />
      <EmergencyCTA />
    </main>
  );
}
