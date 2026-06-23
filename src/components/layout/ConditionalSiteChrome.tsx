"use client";

import { usePathname } from "next/navigation";
import TopHeader from "@/components/layout/TopHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveChatWidget from "@/components/layout/LiveChatWidget";

export default function ConditionalSiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopHeader />
      <Navbar />
      {children}
      <Footer />
      <LiveChatWidget />
    </>
  );
}
