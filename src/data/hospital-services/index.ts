import type { InternationalServiceData } from "@/data/international-services/types";
import { servicesList } from "@/data/hospital-services/services-list";

export const servicesPath = "/services";

export { servicesList };

export type ServiceCard = {
  slug: string;
  href: string;
  title: string;
  description: string;
  image: string;
};

export const serviceCards: ServiceCard[] = servicesList.map((s) => ({
  slug: s.slug,
  href: s.path,
  title: s.label,
  description: s.description,
  image: s.image,
}));

const serviceLoaders: Record<
  string,
  () => Promise<InternationalServiceData>
> = {
  "accident-emergency-services": async () =>
    (await import("@/data/international-services/accident-emergency"))
      .accidentEmergencyService,
  anaesthesiology: async () =>
    (await import("@/data/international-services/anaesthesiology"))
      .anaesthesiologyService,
  "central-laboratory": async () =>
    (await import("@/data/international-services/central-laboratory"))
      .centralLaboratoryService,
  "cardiovascular-thoracic-surgery": async () =>
    (
      await import(
        "@/data/international-services/cardiovascular-thoracic-surgery"
      )
    ).cardiovascularThoracicService,
  dermatology: async () =>
    (await import("@/data/international-services/dermatology")).dermatologyService,
  "general-surgery": async () =>
    (await import("@/data/international-services/general-surgery"))
      .generalSurgeryService,
  hemodialysis: async () =>
    (await import("@/data/international-services/hemodialysis")).hemodialysisService,
  "interventional-radiology": async () =>
    (await import("@/data/international-services/interventional-radiology"))
      .interventionalRadiologyService,
  "radiology-imaging-science": async () =>
    (await import("@/data/international-services/radiology-imaging"))
      .radiologyImagingService,
  "spinal-surgeries": async () =>
    (await import("@/data/international-services/spinal-surgeries"))
      .spinalSurgeriesService,
  "surgical-oncology": async () =>
    (await import("@/data/international-services/surgical-oncology"))
      .surgicalOncologyService,
};

/** Load full service content on the server only (detail pages). */
export async function getServiceBySlug(
  slug: string
): Promise<InternationalServiceData | undefined> {
  const load = serviceLoaders[slug];
  if (!load) return undefined;
  return load();
}

export function getAllServiceSlugs(): string[] {
  return servicesList.map((s) => s.slug);
}
