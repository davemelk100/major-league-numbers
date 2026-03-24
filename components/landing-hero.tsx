"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sportsSites = [
  {
    name: "MLB",
    href: "/mlb",
    logo: "https://www.mlbstatic.com/team-logos/league-on-dark/1.svg",
  },
  { name: "NFL", href: "/nfl", logo: "/nfl-logo.svg" },
  { name: "NBA", href: "/nba", logo: "/nba-logo.svg" },
  { name: "NHL", href: "/nhl", logo: "/nhl-logo.svg" },
  { name: "USPBL", href: "/uspbl", logo: "/uspbl-logo.png" },
  {
    name: "PGA",
    href: "/pga",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/77/PGA_Tour_logo.svg",
  },
];

const musicSites = [
  { name: "Guided by Voices", href: "/gbv", logo: "/gbv-wide.svg" },
  {
    name: "Amphetamine Reptile",
    href: "/amrep",
    logo: "/amrep-logo-foreground.svg",
  },
  { name: "Revelation Records", href: "/rev", logo: "/rev-logo.png" },
  { name: "Elephant 6", href: "/e6", logo: "/e6-logo.png" },
  { name: "Skin Graft", href: "/sg", logo: "/sg-logo.png" },
  {
    name: "Touch & Go",
    href: "/touch-go-records",
    logo: "/images/touch-go-records/logo.svg",
  },
  {
    name: "Slap-A-Ham Records",
    href: "/slap-a-ham-records",
    logo: "/images/slap-a-ham-records/logo.jpg",
  },
  { name: "Jawbox", href: "/jawbox", logo: "/images/jawbox/logo.png" },
];

function SiteDropdown({
  label,
  sites,
}: {
  label: string;
  sites: { name: string; href: string; logo: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-semibold hover:text-foreground transition-colors">
          {label}
          <ChevronDown className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="bg-popover text-popover-foreground w-auto p-3"
      >
        <div className="space-y-0.5">
          {sites.map((site) => (
            <Link
              key={site.href}
              href={site.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-muted text-popover-foreground whitespace-nowrap"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.logo}
                alt={site.name}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              {site.name}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function LandingHero() {
  return (
    <div className="mb-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-wide">
          Major League Numbers
        </h1>
        <div className="flex items-center gap-6">
          <SiteDropdown label="Sports" sites={sportsSites} />
          <SiteDropdown label="Music" sites={musicSites} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mln-logo.svg"
            alt="Major League Numbers"
            className="max-w-md w-full object-contain rounded-xl my-1"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Major League Numbers is an interactive exploration platform that
            turns numbers into a gateway for discovery across sports and music.
          </p>
          <p>
            Instead of searching by player or artist, users start with a number
            and instantly uncover the people, stats, moments, and connections
            tied to it. This number-first approach makes exploration faster,
            more intuitive, and more engaging than traditional reference sites.
          </p>
          <p>
            The experience is designed to be lightweight and
            curiosity-driven—letting users move seamlessly between data, uncover
            patterns, and even explore fun hypotheticals. With features like a
            daily quiz and clearly attributed data sources, the platform
            balances depth with accessibility.
          </p>
          <p>
            At its core, Major League Numbers transforms numbers into a shared
            language across domains—connecting sports, music, and culture in a
            way that&#39;s simple to navigate and enjoyable to explore.
          </p>
        </div>
      </div>
    </div>
  );
}
