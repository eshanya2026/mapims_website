import InternationalServicesSidebar from "@/components/international/care/InternationalServicesSidebar";

export default function InternationalServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          <InternationalServicesSidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
