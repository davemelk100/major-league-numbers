"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GbvSearch } from "@/components/gbv/gbv-search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

export function GbvHeader() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-transparent py-1">
      {/* Mobile/Tablet: Title row with search */}
      <div className="container lg:hidden flex items-center justify-between gap-3">
        <Link href="/gbv" className="flex-1">
          <h1
            className="uppercase tracking-wide text-white"
            style={{ fontSize: "55px" }}
          >
            Guided By Data
          </h1>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-12 p-0 bg-white text-black hover:bg-white"
              aria-label="Search GBV"
            >
              <Search className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[min(20rem,calc(100vw-2rem))] p-2"
            align="end"
            sideOffset={8}
            collisionPadding={16}
          >
            <GbvSearch />
          </PopoverContent>
        </Popover>
      </div>

      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link href="/gbv" className="flex-shrink-0 border-0 items-center gap-3">
          <Image
            src="/gbv-mlb.svg"
            alt="GBV"
            width={173}
            height={173}
            className="h-[100px] w-[100px] sm:h-[173px] sm:w-[173px]"
            priority
            fetchPriority="high"
          />
        </Link>
        {/* Desktop: Title inline */}
        <Link href="/gbv" className="hidden lg:block">
          <h1
            className={cn("uppercase tracking-wide flex-shrink-0 text-white")}
            style={{ fontSize: "55px" }}
          >
            Guided By Data
          </h1>
        </Link>

        {/* Mobile actions */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          {pathname !== "/gbv/ask" && (
            <Link
              href="/gbv/ask"
              className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] text-black"
              style={{
                background: "#ffffff",
                borderTop: "1px solid #f6f6f6",
                borderLeft: "1px solid #eeeeee",
                borderRight: "1px solid #c6c6c6",
                borderBottom: "2px solid #b5b5b5",
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <Image
                src="/gbv-rune.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 gbv-nav-icon"
              />
              <span className="text-sm text-black">ChatGBV</span>
            </Link>
          )}
        </div>

        {/* Desktop actions - chat to the left of search */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {pathname !== "/gbv/ask" && (
            <Link
              href="/gbv/ask"
              className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] text-black"
              style={{
                background: "#ffffff",
                borderTop: "1px solid #f6f6f6",
                borderLeft: "1px solid #eeeeee",
                borderRight: "1px solid #c6c6c6",
                borderBottom: "2px solid #b5b5b5",
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <Image
                src="/gbv-rune.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 gbv-nav-icon"
              />
              <span className="text-md text-black">ChatGBV</span>
            </Link>
          )}
          <div className="w-72">
            <GbvSearch />
          </div>
        </div>
      </div>

    </header>
  );
}
