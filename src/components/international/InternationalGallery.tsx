import { internationalGallery } from "@/data/international-patients";

export default function InternationalGallery() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {internationalGallery.map((src, i) => (
            <div
              key={src}
              className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-sm"
            >
              <img
                src={src}
                alt={`International patient care ${i + 1}`}
                className={`w-full h-full object-cover hover:scale-105 transition-transform duration-500 ${
                  src.includes("casualty") ? "object-[center_bottom]" : "object-center"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
