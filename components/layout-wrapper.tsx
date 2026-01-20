"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FooterNav, LeftNav } from "@/components/footer-nav";
import { UpdatesBanner } from "@/components/updates-banner";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGbvRoute = pathname?.startsWith("/gbv");

  // For GBV routes, render children directly (GBV has its own layout)
  if (isGbvRoute) {
    return <>{children}</>;
  }

  // For MLB routes, wrap with MLB chrome
  return (
    <>
      <LeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <Header />
        <UpdatesBanner />
        <Suspense fallback={<PageLoader />}>
          <div className="pb-16 sm:pb-0 flex-1">{children}</div>
        </Suspense>
        <Footer />
      </div>
      <FooterNav />
    </>
  );
}
