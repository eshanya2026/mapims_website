import DepartmentPageAside from "@/components/departments/DepartmentPageAside";

type DepartmentContentLayoutProps = {
  children: React.ReactNode;
};

export default function DepartmentContentLayout({
  children,
}: DepartmentContentLayoutProps) {
  return (
    <div className="bg-slate-50/90">
      <div className="container mx-auto px-4 pb-14 pt-2 md:pb-20 md:pt-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <DepartmentPageAside />
          <div className="order-1 min-w-0 flex-1 space-y-8 lg:order-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
