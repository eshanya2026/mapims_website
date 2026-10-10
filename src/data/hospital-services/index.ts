import type { InternationalServiceData } from "@/data/international-services/types";
import { servicesList } from "./services-list";

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
  "outpatient-service": async () =>
    (await import("@/data/international-services/outpatient-service"))
      .outpatientService,
  "inpatient-service": async () =>
    (await import("@/data/international-services/inpatient-service"))
      .inpatientService,
  "blood-bank": async () =>
    (await import("@/data/international-services/blood-bank")).bloodBankService,
  "master-health-checkup": async () =>
    (await import("@/data/international-services/master-health-checkup"))
      .masterHealthCheckupService,
  "24hrs-pharmacy": async () =>
    (await import("@/data/international-services/24hrs-pharmacy"))
      .pharmacy24hrsService,
  "ambulance-services": async () =>
    (await import("@/data/international-services/ambulance-services"))
      .ambulanceServices,
  physiotherapy: async () =>
    (await import("@/data/international-services/physiotherapy"))
      .physiotherapyService,
  laboratory: async () => {
    const s = (await import("@/data/international-services/central-laboratory"))
      .centralLaboratoryService;
    return {
      ...s,
      slug: "laboratory",
      path: "/services/laboratory",
      title: "Diagnostic",
      titleHighlight: "Laboratory Services",
      breadcrumbLabel: "Laboratory",
    };
  },
  "dialysis-services": async () => {
    const s = (await import("@/data/international-services/hemodialysis"))
      .hemodialysisService;
    return {
      ...s,
      slug: "dialysis-services",
      path: "/services/dialysis-services",
      title: "Dialysis Services",
      titleHighlight: "(Hemodialysis)",
      breadcrumbLabel: "Dialysis Services",
      image: "/images/dialysis-services.png",
      heroImage: "/images/dialysis-services.png",
    };
  },
  insurance: async () =>
    (await import("@/data/international-services/insurance")).insuranceService,

  // Backward compatibility aliases
  "central-laboratory": async () =>
    (await import("@/data/international-services/central-laboratory"))
      .centralLaboratoryService,
  hemodialysis: async () =>
    (await import("@/data/international-services/hemodialysis"))
      .hemodialysisService,
  "accident-emergency-services": async () =>
    (await import("@/data/international-services/accident-emergency"))
      .accidentEmergencyService,
  anaesthesiology: async () =>
    (await import("@/data/international-services/anaesthesiology"))
      .anaesthesiologyService,
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
