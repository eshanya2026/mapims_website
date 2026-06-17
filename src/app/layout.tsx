import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HashScroll from "@/components/layout/HashScroll";
import ConditionalSiteChrome from "@/components/layout/ConditionalSiteChrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adhiparasakthi Hospital | Advanced Healthcare With Compassion",
  description: "A premium multispeciality hospital providing world-class healthcare, advanced treatments, and compassionate patient care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} overflow-x-hidden antialiased bg-white text-slate-900`}>
        <HashScroll />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
