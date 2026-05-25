import { Phone } from "lucide-react";

export default function InternationalCTA() {
  return (
    <section className="py-12 bg-red-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left text-white">
          <h2 className="text-xl md:text-2xl font-bold">
            Do You Need Any Medical Help?
          </h2>
          <span className="text-white/80 hidden md:inline">|</span>
          <p className="text-lg md:text-xl font-medium">Please Call Now:</p>
          <a
            href="tel:18005990999"
            className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold hover:text-white/90 transition-colors"
          >
            <Phone className="w-7 h-7" />
            1800 599 0999
          </a>
        </div>
      </div>
    </section>
  );
}
