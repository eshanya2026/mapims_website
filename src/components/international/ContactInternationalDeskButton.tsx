import Link from "next/link";
import { Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

type ContactInternationalDeskButtonProps = {
  variant?: "primary" | "outline" | "light";
  className?: string;
  showIcon?: boolean;
};

export default function ContactInternationalDeskButton({
  variant = "primary",
  className,
  showIcon = true,
}: ContactInternationalDeskButtonProps) {
  return (
    <Link
      href="/international#contact-international-desk"
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-8 text-base font-medium transition-all",
        variant === "primary" &&
          "bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700",
        variant === "outline" &&
          "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        variant === "light" &&
          "border border-red-200 bg-white text-red-600 shadow-sm hover:bg-red-50",
        className
      )}
    >
      {showIcon ? <Headphones className="mr-2 h-5 w-5 shrink-0" /> : null}
      Contact International Desk
    </Link>
  );
}
