"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* row 1 */}
      <rect x="3" y="3" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="3" width="4.5" height="4.5" rx="1" />
      <rect x="16.5" y="3" width="4.5" height="4.5" rx="1" />
      {/* row 2 */}
      <rect x="3" y="9.75" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1" />
      <rect x="16.5" y="9.75" width="4.5" height="4.5" rx="1" />
      {/* row 3 */}
      <rect x="3" y="16.5" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="16.5" width="4.5" height="4.5" rx="1" />
      <rect x="16.5" y="16.5" width="4.5" height="4.5" rx="1" />
    </svg>
  );
}

const sportsSites = [
  { name: "MLB", href: "/mlb", logo: "https://www.mlbstatic.com/team-logos/league-on-dark/1.svg" },
  { name: "NFL", href: "/nfl", logo: "/nfl-logo.svg" },
  { name: "NBA", href: "/nba", logo: "/nba-logo.svg" },
  { name: "NHL", href: "/nhl", logo: "/nhl-logo.svg" },
  { name: "USPBL", href: "/uspbl", logo: "/uspbl-logo.png" },
  { name: "PGA", href: "/pga", logo: "https://upload.wikimedia.org/wikipedia/en/7/77/PGA_Tour_logo.svg" },
];

const musicSites = [
  { name: "Guided by Voices", href: "/gbv", logo: "/gbv-mlb.svg" },
  { name: "Amphetamine Reptile", href: "/amrep", logo: "/amrep-logo-foreground.svg" },
  { name: "Revelation Records", href: "/rev", logo: "/rev-logo.png" },
  { name: "Elephant 6", href: "/e6", logo: "/e6-logo.png" },
  { name: "Skin Graft", href: "/sg", logo: "/sg-logo.png" },
  { name: "Touch & Go", href: "/touch-go-records", logo: "/images/touch-go-records/logo.svg" },
  { name: "Slap-A-Ham Records", href: "/slap-a-ham-records", logo: "/images/slap-a-ham-records/logo.jpg" },
  { name: "Jawbox", href: "/jawbox", logo: "/images/jawbox/logo.png" },
];

export function SiteSwitcher({ variant = "default" }: { variant?: "default" | "music" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isMusic = variant === "music";
  const isLightMusic = isMusic && !pathname.startsWith("/gbv");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "group flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md transition-all duration-200 w-full",
            isMusic
              ? isLightMusic
                ? "text-inherit hover:bg-black/10 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
                : "text-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
              : "text-muted-foreground hover:text-foreground hover:bg-muted hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
          )}
        >
          <CubeIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-xs font-medium text-center leading-tight">Sites</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="bg-popover text-popover-foreground w-56 p-3"
      >
        <div className="space-y-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
              pathname === "/"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted text-popover-foreground"
            )}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5 px-1">Sports</p>
            <div className="space-y-0.5">
              {sportsSites.map((site) => {
                const isActive = pathname.startsWith(site.href);
                return (
                  <Link
                    key={site.href}
                    href={site.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-popover-foreground"
                    )}
                  >
                    <img
                      src={site.logo}
                      alt={site.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    {site.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5 px-1">Music</p>
            <div className="space-y-0.5">
              {musicSites.map((site) => {
                const isActive = pathname.startsWith(site.href);
                return (
                  <Link
                    key={site.href}
                    href={site.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-popover-foreground"
                    )}
                  >
                    <img
                      src={site.logo}
                      alt={site.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    {site.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
