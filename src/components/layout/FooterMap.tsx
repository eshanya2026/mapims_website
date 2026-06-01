import { cn } from "@/lib/utils";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Tamil+Nadu+603319&hl=en&z=15&output=embed";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Tamil+Nadu+603319";

type FooterMapProps = {
  className?: string;
  variant?: "light" | "dark";
  /** compact = footer/home; medium = contact page; full = large embed */
  size?: "compact" | "medium" | "full";
  showDirectionsLink?: boolean;
};

export default function FooterMap({
  className,
  variant = "light",
  size = "full",
  showDirectionsLink = true,
}: FooterMapProps) {
  const isDark = variant === "dark";

  const sizeClasses = {
    compact:
      "aspect-[21/9] min-h-[11rem] max-h-[14rem] sm:min-h-[12rem] sm:max-h-[16rem]",
    medium:
      "aspect-[16/9] min-h-[12rem] max-h-[16rem] sm:min-h-[14rem] sm:max-h-[18rem] md:min-h-[16rem] md:max-h-[20rem]",
    full: "aspect-[16/9] min-h-[16rem] sm:min-h-[20rem] md:min-h-[26rem] lg:min-h-[30rem]",
  }[size];

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl",
          isDark
            ? "border border-slate-800 bg-slate-900"
            : "border border-slate-200 bg-slate-100",
          sizeClasses
        )}
      >
        <iframe
          title="Adhiparasakthi Hospital location on Google Maps"
          src={MAP_EMBED_URL}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {showDirectionsLink ? (
        <a
          href={MAP_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-3 inline-flex items-center gap-1 text-sm font-medium transition-colors",
            isDark
              ? "text-red-400 hover:text-red-300"
              : "text-red-600 hover:text-red-700"
          )}
        >
          Get directions on Google Maps →
        </a>
      ) : null}
    </div>
  );
}

export { MAP_DIRECTIONS_URL };
