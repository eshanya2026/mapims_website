import type { SVGProps, ComponentType } from "react";
import {
  Activity,
  Ambulance,
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  HeartPulse,
  Ribbon,
  ScanLine,
  Stethoscope,
  Syringe,
} from "lucide-react";

export function KidneyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M13 2.5c-4.5 0-8 3.5-8 8.5 0 4.8 3.2 9.5 8 10.5 4.5-.8 7.5-4.2 7.5-8.5 0-2.2-.8-3.7-2.2-4.5 1-1.2 1.2-3-.3-4.3C16.6 3 14.8 2.5 13 2.5z" />
      <path d="M13.5 8.5c-1.2 1-1.8 2.2-1.8 3.5s.6 2.5 1.8 3.5" />
      <path d="M15 12h2.5" />
    </svg>
  );
}

export function UrologyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 3v5c0 4.2 2.7 7.5 6 9 3.3-1.5 6-4.8 6-9V3" />
      <path d="M12 17v4" />
      <path d="M9.5 21h5" />
      <path d="M9 8.5c1.8 1.5 4.2 1.5 6 0" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LungsIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2v6" />
      <path d="M10 4h4" />
      <path d="M10 6h4" />
      <path d="M12 8l-3 3" />
      <path d="M12 8l3 3" />
      <path d="M9 11c-2.8 0-5.5 2.2-5.5 5.8 0 3.2 2.2 4.7 4.8 4.7 2 0 3.2-1.2 3.7-3.5V11z" />
      <path d="M15 11c2.8 0 5.5 2.2 5.5 5.8 0 3.2-2.2 4.7-4.8 4.7-2 0-3.2-1.2-3.7-3.5V11z" />
    </svg>
  );
}

export function StomachIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11 2v4c0 1.5-.8 2.8-2 3.5-2.5 1.5-4 3.8-4 6.5 0 4 3 6 7 6 4.8 0 8-3 8-7.5 0-3.5-2-5.5-4.5-6.5V5" />
      <path d="M9 14.5c1.5 1 3.5 1 5 0" />
      <path d="M13.5 5h2.5" />
    </svg>
  );
}

export function TransplantIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 12a8 8 0 0 1 14.93-4" />
      <polyline points="19 4 19 8 15 8" />
      <path d="M20 12a8 8 0 0 1-14.93 4" />
      <polyline points="5 20 5 16 9 16" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  );
}

export function DiabetologyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2.5l5.5 6a7.8 7.8 0 1 1-11 0z" />
      <path d="M12 9.5v5" />
      <path d="M9.5 12h5" />
    </svg>
  );
}

export function ScalpelIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m19 2 3 3-11.5 11.5c-.8.8-2 .9-2.9.2L6 15.3c-.7-.9-.6-2.1.2-2.9L19 2z" />
      <path d="m5 18.5 2 2" />
      <path d="m2 21.5 2.5-2.5" />
      <path d="m15 6 3 3" />
    </svg>
  );
}

export function MaternityIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="4.5" r="2.5" />
      <path d="M8.5 21.5v-7c0-2.5 1.8-4.5 4.2-4.5h.6c2.4 0 4.2 2 4.2 4.5v7" />
      <path d="M15 13.5c1.8 1.2 2.5 3 2.5 5" />
      <path d="M6.5 13c1 2.2 2.5 3.5 5.5 3.5" />
    </svg>
  );
}

export function DentalIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6.5 3.5C4 4.5 3 7 3 10c0 3 1.5 5.5 2.5 8.5C6.5 21 8 22 9 20c1-2 1.5-5 3-5s2 3 3 5c1 2 2.5 1 3.5-2 1-3 2.5-5.5 2.5-8.5 0-3-1-5.5-3.5-6.5-2-.8-4 .5-5.5.5s-3.5-1.3-5.5-.5z" />
      <path d="M8 8.5c1.2.8 2.5.8 4 0 1.5.8 2.8.8 4 0" />
    </svg>
  );
}

export function SpineIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <rect x="9" y="3" width="6" height="3" rx="1.5" />
      <rect x="8" y="7.5" width="8" height="3" rx="1.5" />
      <rect x="7.5" y="12" width="9" height="3" rx="1.5" />
      <rect x="8" y="16.5" width="8" height="3" rx="1.5" />
    </svg>
  );
}

export function JointIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="10" y="2" width="4" height="6" rx="1" />
      <path d="M12 8v3" />
      <circle cx="12" cy="13" r="3" />
      <path d="M12 16v5" />
      <rect x="9.5" y="19" width="5" height="3" rx="1" />
      <path d="M7 13h2" />
      <path d="M15 13h2" />
    </svg>
  );
}

export function TransfusionIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="7" y="3.5" width="10" height="13" rx="3" />
      <line x1="10" y1="2" x2="14" y2="2" />
      <line x1="12" y1="2" x2="12" y2="3.5" />
      <path d="M12 16.5v4.5" />
      <path d="M12 7.5v4" />
      <path d="M10 9.5h4" />
      <circle cx="12" cy="21.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function CardioThoracicIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 13.5c1.5-1.4 2.5-3 2.5-5a5 5 0 0 0-8.5-3.5L12 6l-1-1A5 5 0 0 0 2.5 8.5c0 2 1 3.6 2.5 5l7 7z" />
      <path d="M12 2.5v3.5" />
      <path d="M9 3.5l1.5 2.5" />
      <path d="M15 3.5L13.5 6" />
      <path d="M8 12.5h8" />
    </svg>
  );
}

export function SurgicalOncologyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M8 3.5c0 3 3 6 4 9 1-3 4-6 4-9a4 4 0 0 0-8 0z" />
      <path d="m9.5 12.5-5 8.5" />
      <path d="m14.5 12.5 5 8.5" />
      <path d="M15 9.5h4" />
      <path d="M17 7.5v4" />
    </svg>
  );
}

export function CriticalCareIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M6 10.5h2l1.5-4 2.5 7.5 2-5 1.5 2.5h2.5" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function PlasticSurgeryIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m18 2 4 4-10 10-4-4L18 2z" />
      <path d="m3 21 3-1 2-2" />
      <path d="M3 13.5c1.5 2 3.5 3 6 3" strokeDasharray="2 2" />
      <path d="M7.5 8c2-1 4-1 6 0" strokeDasharray="2 2" />
    </svg>
  );
}

export function DermatologyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2a9 9 0 0 0-9 9c0 5 9 11 9 11s9-6 9-11a9 9 0 0 0-9-9z" />
      <path d="M12 7v4" />
      <path d="M10 9h4" />
      <path d="m8 15 2 2 4-4" />
    </svg>
  );
}

export function PsychiatryIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
      <path d="M9 3.5a9 9 0 0 1 6 0" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

const DEPARTMENT_ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  cardiology: HeartPulse,
  nephrology: KidneyIcon,
  urology: UrologyIcon,
  "multi-organ-transplant": TransplantIcon,
  "general-medicine": Stethoscope,
  diabetology: DiabetologyIcon,
  pulmonology: LungsIcon,
  "general-surgery": ScalpelIcon,
  paediatric: Baby,
  orthopaedics: Bone,
  "obstetrics-gynaecology": MaternityIcon,
  ent: Ear,
  ophthalmology: Eye,
  dermatology: DermatologyIcon,
  psychiatry: PsychiatryIcon,
  radiology: ScanLine,
  "radiology-imaging-science": ScanLine,
  anaesthesiology: Syringe,
  "medical-gastroenterology": StomachIcon,
  "plastic-surgery": PlasticSurgeryIcon,
  oncology: Ribbon,
  neurology: Brain,
  "joint-replacement": JointIcon,
  "cardiovascular-thoracic-surgery": CardioThoracicIcon,
  "surgical-oncology": SurgicalOncologyIcon,
  "accident-emergency-services": Ambulance,
  "spinal-surgeries": SpineIcon,
  "critical-care-medicine": CriticalCareIcon,
  "transfusion-medicine": TransfusionIcon,
  "oral-maxillofacial-surgery": DentalIcon,
};

type DepartmentIconProps = SVGProps<SVGSVGElement> & {
  slug: string;
};

export function DepartmentIcon({ slug, className, ...props }: DepartmentIconProps) {
  const IconComponent = DEPARTMENT_ICON_MAP[slug] || Activity;
  return <IconComponent className={className} {...props} />;
}
