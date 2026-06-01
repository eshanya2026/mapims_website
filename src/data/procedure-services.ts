import { servicesList } from "@/data/hospital-services/services-list";

/** Sidebar links for hospital service / procedure detail pages. */
export const procedureServicesSidebar = servicesList.map((service) => ({
  label: service.label,
  href: service.path,
}));
