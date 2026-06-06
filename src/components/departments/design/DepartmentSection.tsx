import { cn } from "@/lib/utils";

type DepartmentSectionProps = React.ComponentPropsWithoutRef<"section"> & {
  variant?: "default" | "muted" | "inset";
};

export default function DepartmentSection({
  id,
  variant = "default",
  className,
  children,
  ...props
}: DepartmentSectionProps) {
  return (
    <section
      id={id}
      {...props}
      className={cn(
        "scroll-mt-28",
        variant === "default" &&
          "rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-10",
        variant === "muted" &&
          "rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 shadow-sm md:p-10",
        variant === "inset" && "px-1 py-2",
        className
      )}
    >
      {children}
    </section>
  );
}
