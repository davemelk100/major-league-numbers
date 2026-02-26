"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { NHLPlayerSearch } from "@/components/nhl/nhl-player-search";

export function NHLHeader() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mb-4">
      <div className="container flex items-center gap-3">
        <Link href="/nhl" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/nhl-logo.svg"
            alt="NHL"
            width={80}
            height={80}
            className="h-12 w-auto sm:h-16 lg:h-20"
            priority
          />
          <h1 className="uppercase flex-shrink-0 hidden sm:block">
            NHL Numbers
          </h1>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {isMounted ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-12 w-12 p-0 xl:hidden"
                  aria-label="Search NHL"
                >
                  <Search className="h-9 w-9" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[min(20rem,calc(100vw-2rem))] p-2"
                align="end"
                sideOffset={8}
                collisionPadding={16}
              >
                <NHLPlayerSearch />
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              variant="ghost"
              className="h-12 w-12 p-0 xl:hidden"
              aria-label="Search NHL"
            >
              <Search className="h-9 w-9" />
            </Button>
          )}
          <div className="hidden xl:flex items-center gap-4">
            {pathname !== "/nhl/ask" && (
              <Link
                href="/nhl/ask"
                className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] skeu-link"
              >
                <span className="text-md">ChatNHL</span>
              </Link>
            )}
            <div className="w-72">
              <NHLPlayerSearch />
            </div>
          </div>
        </div>
      </div>

      {pathname !== "/nhl/ask" && (
        <div className="container mt-6 xl:hidden">
          <Link
            href="/nhl/ask"
            className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] skeu-link"
          >
            <span className="text-sm">ChatNHL</span>
          </Link>
        </div>
      )}
    </header>
  );
}
