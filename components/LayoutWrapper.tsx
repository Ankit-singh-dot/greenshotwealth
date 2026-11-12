"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Intro from "@/components/motion/Intro";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-full flex flex-col">{children}</div>;
  }

  return (
    <>
      <SmoothScroll />
      <Intro />
      <Navbar />
      <main key={pathname} className="gs-main flex-1 page-enter">
        {children}
      </main>
      <Footer />
      <div className="gs-grain" aria-hidden />
    </>
  );
}
