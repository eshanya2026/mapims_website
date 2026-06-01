import ProcedureServicesSidebar from "@/components/procedures/ProcedureServicesSidebar";

export default function ProcedureServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          <ProcedureServicesSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
