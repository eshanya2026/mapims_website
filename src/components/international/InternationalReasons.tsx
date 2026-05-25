import { CheckCircle2 } from "lucide-react";
import { internationalReasons } from "@/data/international-patients";

export default function InternationalReasons() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
              The reasons to choose{" "}
              <span className="text-red-600">Adhiparasakthi Hospitals</span>
            </h2>
            <ul className="space-y-4">
              {internationalReasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm leading-relaxed">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
              alt="Healthcare technology"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-teal-900/30 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
