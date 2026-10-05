import DepartmentPageAside from "@/components/departments/DepartmentPageAside";
import { cn } from "@/lib/utils";

type DepartmentContentLayoutProps = {
  children: React.ReactNode;
  containerClassName?: string;
};

export default function DepartmentContentLayout({
  children,
  containerClassName,
}: DepartmentContentLayoutProps) {
  return (
    <div className="bg-slate-50/90">
      <div
        className={cn(
          "container mx-auto px-4 pb-14 pt-2 md:pb-20 md:pt-4",
          containerClassName
        )}
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 lg:overflow-visible">
          <DepartmentPageAside />
          <div className="min-w-0 flex-1 space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
