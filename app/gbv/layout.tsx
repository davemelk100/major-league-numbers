import type React from "react";
import { Suspense } from "react";
import { GbvHeader } from "@/components/gbv/gbv-header";
import { GbvFooter } from "@/components/gbv/gbv-footer";
import { GbvLeftNav, GbvFooterNav } from "@/components/gbv/gbv-nav";
import { PageLoader } from "@/components/page-loader";
import { JsonLd } from "@/components/json-ld";
import {
  createSiteMetadata,
  getMusicSiteById,
  getSiteJsonLd,
} from "@/lib/music-site";

const site = getMusicSiteById("gbv");

export const metadata = createSiteMetadata(site);

export default function GbvLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${site.shellClass} min-h-screen`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to content
      </a>
      <JsonLd data={getSiteJsonLd(site)} />
      <GbvLeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <GbvHeader />
        <Suspense fallback={<PageLoader />}>
          <main id="main-content" className="pb-16 sm:pb-0 flex-1" tabIndex={-1}>
            {children}
          </main>
        </Suspense>
        <GbvFooter />
      </div>
      <GbvFooterNav />
    </div>
  );
}
