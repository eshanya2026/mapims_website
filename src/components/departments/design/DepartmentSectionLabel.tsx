import { cn } from "@/lib/utils";

type DepartmentSectionLabelProps = {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function DepartmentSectionLabel({
  children,
  align = "left",
  className,
}: DepartmentSectionLabelProps) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-red-700",
        align === "center" && "mx-auto",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-red-600" aria-hidden />
      {children}
    </span>
  );
}
