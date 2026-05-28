const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Tamil+Nadu+603319&hl=en&z=15&output=embed";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Melmaruvathur+Adhiparasakthi+Institute+of+Medical+Sciences+and+Research,+Melmaruvathur,+Tamil+Nadu+603319";

type FooterMapProps = {
  className?: string;
};

export default function FooterMap({ className }: FooterMapProps) {
  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 aspect-[16/7] sm:aspect-[16/6] min-h-[13rem] sm:min-h-[15rem] md:min-h-[18rem]">
        <iframe
          title="Adhiparasakthi Hospital location on Google Maps"
          src={MAP_EMBED_URL}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={MAP_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-sm text-red-500 hover:text-red-400 transition-colors"
      >
        Get directions on Google Maps →
      </a>
    </div>
  );
}
