"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PlayerSearch } from "@/components/player-search";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link
          href="/"
          className="hidden md:flex flex-shrink-0 border-0 items-center gap-3"
        >
          <Image
            src="/chat-mlb-2.svg"
            alt=""
            width={100}
            height={100}
            className="h-20 w-auto"
          />
        </Link>
        <h1
          className="uppercase tracking-wide"
          style={{ color: "#f4232b" }}
        >
          Major League Numbers
        </h1>
        {/* Search - large desktop only, far right */}
        <div className="hidden lg:block flex-1">
          <div className="ml-auto w-72">
            <PlayerSearch />
          </div>
        </div>
      </div>

      {/* Search - tablet and mobile */}
      <div className="container mt-3 lg:hidden">
        <PlayerSearch />
      </div>

      {/* ChatMLB button - full width */}
      {pathname !== "/ask" && (
        <div className="container mt-3">
          <Link
            href="/ask"
            className="flex items-center justify-center gap-2 px-4 h-14 text-sm font-medium rounded-md w-full border border-primary/20 hover:border-primary/40 transition-all shadow-sm"
          >
            <Image
              src="/chat-mlb-2.svg"
              alt=""
              width={100}
              height={100}
              style={{ height: "40px", width: "auto" }}
            />
            <span className="text-md">ChatMLB</span>
          </Link>
        </div>
      )}
    </header>
  );
}
