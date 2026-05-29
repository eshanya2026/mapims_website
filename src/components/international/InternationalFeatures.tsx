import { internationalFeatures } from "@/data/international-patients";

export default function InternationalFeatures() {
  return (
    <section className="relative z-20 -mt-1 border-b border-slate-100 bg-white py-8 sm:py-10">
      <div className="page-container">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {internationalFeatures.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border-2 border-red-100 bg-white p-4 text-center shadow-sm sm:p-6"
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
