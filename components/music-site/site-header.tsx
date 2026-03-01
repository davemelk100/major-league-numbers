"use client";

import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { SiteSearch } from "@/components/music-site/site-search";

export function SiteHeader() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const askPath = `${site.basePath}/ask`;

  return (
    <header className="z-50 w-full bg-transparent pt-4 lg:pt-6 mb-4 lg:mb-1">
      <div className="container flex items-center gap-3 overflow-hidden">
        <Link
          href={site.basePath}
          className="flex items-center gap-3 min-w-0 shrink-0"
        >
          <img
            src={site.logoSrc}
            alt={site.shortName}
            width={140}
            height={140}
            className={cn(
              site.logoClassName ||
                "h-12 w-auto sm:h-16 lg:h-[173px] lg:w-[173px]",
              pathname === askPath && "hidden sm:block",
            )}
            fetchPriority="high"
          />
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-4">
            {pathname !== askPath && (
              <Link
                href={askPath}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80 rounded-lg",
                  site.id === "gbv" ? "bg-white/20 text-white" : "bg-black/10 text-black"
                )}
              >
                <span>🤖</span>
                <span className="text-md">{site.chatLabel}</span>
              </Link>
            )}
          </div>
          <div className="w-48 sm:w-64">
            <SiteSearch
              placeholder={site.searchPlaceholder}
              inputClassName={cn(
                "h-10",
                site.id === "gbv"
                  ? "text-white placeholder:text-white/70 bg-white/10 border-white/20"
                  : "text-black placeholder:text-gray-400 bg-white/80 border-black/10"
              )}
            />
          </div>
        </div>
      </div>

      {pathname !== askPath && (
        <div className="container mt-6 xl:hidden">
          <Link
            href={askPath}
            className={cn(
              "flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80 rounded-lg",
              site.id === "gbv" ? "bg-white/20 text-white" : "bg-black/10 text-black"
            )}
          >
            <span>🤖</span>
            <span className="text-sm">{site.chatLabel}</span>
          </Link>
        </div>
      )}

    </header>
  );
}
