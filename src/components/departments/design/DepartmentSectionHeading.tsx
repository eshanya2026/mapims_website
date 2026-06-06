import { cn } from "@/lib/utils";

type DepartmentSectionHeadingProps = {
  title: React.ReactNode;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function DepartmentSectionHeading({
  title,
  highlight,
  description,
  align = "left",
  className,
}: DepartmentSectionHeadingProps) {
  return (
    <header
      className={cn(
        "mb-8",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="text-red-600">{highlight}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
