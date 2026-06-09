"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const careersContact = {
  address: "Melmaruvathur, Tamilnadu-603319",
  phones: [
    { display: "044-27528528", href: "tel:+914427528528" },
    { display: "9499059959", href: "tel:+919499059959" },
  ],
  email: "contact@mapims.online",
};

export default function CareersContact() {
  return (
    <section className="border-t border-slate-200 bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm sm:rounded-3xl sm:p-8 md:p-10"
        >
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Contact HR</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            For career-related enquiries, reach our team using the details below.
          </p>

          <dl className="mt-8 space-y-5 text-sm sm:text-base">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <dt className="font-semibold text-slate-900">Address</dt>
                <dd className="mt-1 text-slate-600">{careersContact.address}</dd>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <dt className="font-semibold text-slate-900">Phone</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-600">
                  {careersContact.phones.map((phone, index) => (
                    <span key={phone.href} className="inline-flex items-center gap-2">
                      {index > 0 ? <span className="text-slate-300">/</span> : null}
                      <a
                        href={phone.href}
                        className="font-medium text-red-600 transition-colors hover:text-red-700 hover:underline"
                      >
                        {phone.display}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${careersContact.email}`}
                    className="font-medium text-red-600 transition-colors hover:text-red-700 hover:underline"
                  >
                    {careersContact.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
