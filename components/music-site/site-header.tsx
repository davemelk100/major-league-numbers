"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { SiteSearch } from "@/components/music-site/site-search";

export function SiteHeader() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const askPath = `${site.basePath}/ask`;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="z-50 w-full bg-transparent pt-4 lg:pt-6 mb-4 lg:mb-1">
      <div className="container flex items-center gap-3 overflow-hidden">
        <Link
          href={site.basePath}
          className="flex items-center gap-3 min-w-0"
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
          {isMounted ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-12 w-12 p-0 gbv-search-button"
                  aria-label={`Search ${site.shortName}`}
                >
                  <Search
                    className={cn(
                      "gbv-search-icon !h-6 !w-6",
                      site.id === "amrep" && "text-black",
                    )}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[min(20rem,calc(100vw-2rem))] p-2"
                align="end"
                sideOffset={8}
                collisionPadding={16}
              >
                <SiteSearch
                  placeholder={site.searchPlaceholder}
                  inputClassName="text-black placeholder:text-gray-400 bg-white"
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              variant="ghost"
              className="h-12 w-12 p-0 gbv-search-button"
              aria-label={`Search ${site.shortName}`}
            >
              <Search
                className={cn(
                  "gbv-search-icon !h-6 !w-6",
                  site.id === "amrep" && "text-black",
                )}
              />
            </Button>
          )}
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
