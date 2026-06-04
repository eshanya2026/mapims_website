import type { ComponentType } from "react";
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/layout/SocialIcons";

export type SocialLink = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/AdhiparasakthiHospitals",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/adhiparasakthihospitals",
    icon: InstagramIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UC0jqcv87z9sl9XVtkg8GaOQ",
    icon: YoutubeIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/melmaruvathur-adhiparasakthi-hospital",
    icon: LinkedinIcon,
  },
  {
    name: "X",
    href: "https://x.com/AdhiHospitals",
    icon: XIcon,
  },
];
