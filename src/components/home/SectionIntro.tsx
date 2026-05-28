import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  /** spaced = margin before next block; column = tighter margin in sidebar columns */
  spacing?: "spaced" | "column" | "none";
  className?: string;
  titleClassName?: string;
  descClassName?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
  spacing = "spaced",
  className,
  titleClassName,
  descClassName,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "section-intro",
        spacing === "spaced" && "section-intro--spaced",
        spacing === "column" && "section-intro--column",
        centered && "section-intro--center",
        className
      )}
    >
      <div className={cn("section-eyebrow", centered && "section-eyebrow--center")}>
        {!centered && <span className="section-eyebrow__line" aria-hidden />}
        {centered && <span className="section-eyebrow__line" aria-hidden />}
        <span className="section-eyebrow__label">{eyebrow}</span>
        {centered && <span className="section-eyebrow__line" aria-hidden />}
      </div>
      <h2 className={cn("section-title", titleClassName)}>{title}</h2>
      {description ? (
        <div className={cn("section-desc", descClassName)}>{description}</div>
      ) : null}
    </div>
  );
}
