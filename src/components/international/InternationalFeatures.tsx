import { internationalFeatures } from "@/data/international-patients";

export default function InternationalFeatures() {
  return (
    <section className="py-10 bg-white border-b border-slate-100 -mt-1 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {internationalFeatures.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-red-100 bg-white shadow-sm"
            >
              <div className="w-14 h-14 rounded-full border-2 border-red-600 flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-red-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
