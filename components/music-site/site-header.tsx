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
import { SiteChatOverlay } from "@/components/music-site/site-chat-overlay";

export function SiteHeader() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const askPath = `${site.basePath}/ask`;
  const [isMounted, setIsMounted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChatOpen(false);
  }, [pathname]);

  return (
    <header className="z-50 w-full bg-transparent py-1 lg:pt-1 mb-4 lg:mb-1">
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
          {!site.hideHeaderTitle && (
            <h1
              className={cn(
                "font-league uppercase tracking-wide",
                site.headerTextClass,
              )}
            >
              {site.headerTitle.split(" ")[0]}
              <span className="hidden sm:inline"> {site.headerTitle.split(" ").slice(1).join(" ")}</span>
            </h1>
          )}
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-4">
            {pathname !== askPath && (
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center justify-center gap-3 px-3 py-2 text-sm font-medium transition-all hover:opacity-80 rounded-lg"
              >
                <span className={cn("text-md", site.id === "gbv" ? "text-white" : "text-black")}>{site.chatLabel}</span>
                <img
                  src={site.chatIconSrc}
                  alt={`${site.shortName} chat`}
                  width={96}
                  height={96}
                  className={cn("h-16 w-16 object-contain", site.id === "gbv" ? "gbv-rune-white" : "gbv-nav-icon")}
                />
              </button>
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
          <button
            onClick={() => setChatOpen(true)}
            className="flex w-full items-center justify-center gap-3 px-3 py-2 text-sm font-medium transition-all hover:opacity-80 rounded-lg"
          >
            <span className={cn("text-sm", site.id === "gbv" ? "text-white" : "text-black")}>{site.chatLabel}</span>
            <img
              src={site.chatIconSrc}
              alt={`${site.shortName} chat`}
              width={96}
              height={96}
              className={cn("h-16 w-16 object-contain", site.id === "gbv" ? "gbv-rune-white" : "gbv-nav-icon")}
            />
          </button>
        </div>
      )}

      {chatOpen && <SiteChatOverlay onClose={() => setChatOpen(false)} />}
    </header>
  );
}
