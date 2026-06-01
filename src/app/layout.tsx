import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/layout/TopHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HashScroll from "@/components/layout/HashScroll";

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden antialiased bg-white text-slate-900`}>
        <HashScroll />
        <TopHeader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
