import type { Metadata } from "next";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export const metadata: Metadata = {
  openGraph: {
    title: "Major League Numbers",
    description:
      "Sports stats and music encyclopedias — MLB, NHL, GBV, AmRep, and Revelation Records.",
    url: "/",
    siteName: "Major League Numbers",
    images: [
      {
        url: "/og-mln.png",
        width: 1200,
        height: 630,
        alt: "Major League Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Major League Numbers",
    description:
      "Sports stats and music encyclopedias — MLB, NHL, GBV, AmRep, and Revelation Records.",
    images: ["/og-mln.png"],
  },
};

const sportsSites = [
  {
    name: "Major League Numbers",
    href: "/mlb",
    logo: "https://www.mlbstatic.com/team-logos/league-on-dark/1.svg",
    description: "MLB player stats, rosters & standings",
  },
  {
    name: "NFL Numbers",
    href: "/nfl",
    logo: "/nfl-logo.svg",
    description: "NFL player stats, rosters & standings",
  },
  {
    name: "NBA Numbers",
    href: "/nba",
    logo: "/nba-logo.svg",
    description: "NBA player stats, rosters & standings",
  },
  {
    name: "NHL Numbers",
    href: "/nhl",
    logo: "/nhl-logo.svg",
    description: "NHL player stats, rosters & standings",
  },
  {
    name: "USPBL Numbers",
    href: "/uspbl",
    logo: "/uspbl-logo.png",
    description: "USPBL teams, rosters & standings",
  },
  {
    name: "PGA Numbers",
    href: "/pga",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/77/PGA_Tour_logo.svg",
    description: "PGA player stats, tournaments & rankings",
  },
];

const musicSites = [
  {
    name: "Guided by Voices",
    href: "/gbv",
    logo: "/gbv-wide.svg",
    description: "Discography & encyclopedia",
  },
  {
    name: "Amphetamine Reptile",
    href: "/amrep",
    logo: "/amrep-logo-foreground.svg",
    description: "",
  },
  {
    name: "Revelation Records",
    href: "/rev",
    logo: "/rev-logo.png",
    description: "",
  },
  {
    name: "Elephant 6",
    href: "/e6",
    logo: "/e6-logo.png",
    description: "Collective history & catalog",
  },
  {
    name: "Skin Graft Records",
    href: "/sg",
    logo: "/sg-logo.png",
    description: "",
  },
  {
    name: "Touch & Go Records",
    href: "/touch-go-records",
    logo: "/images/touch-go-records/logo.svg",
    description: "",
  },
  {
    name: "Slap-A-Ham Records",
    href: "/slap-a-ham-records",
    logo: "/images/slap-a-ham-records/logo.jpg",
    description: "",
  },
  {
    name: "Jawbox",
    href: "/jawbox",
    logo: "/images/jawbox/logo.png",
    description: "",
  },
];

function SiteCard({
  site,
  priority,
}: {
  site: { name: string; href: string; logo: string; description: string };
  priority?: boolean;
}) {
  return (
    <Link
      href={site.href}
      className="flex flex-col items-center p-4 rounded-lg border bg-card hover:bg-muted/80 transition-colors w-full"
    >
      <img
        src={site.logo}
        alt={site.name}
        width={100}
        height={100}
        className="h-20 w-auto object-contain"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      <span className="text-xs font-medium text-muted-foreground text-center mt-2">{site.name}</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen px-8 py-12 w-full">
      <h1
        className="text-5xl font-bold mb-10 uppercase tracking-widest"
        style={{ fontFamily: "var(--font-league-gothic), sans-serif" }}
      >
        Major League Numbers
      </h1>
      <div className="w-full flex flex-col lg:flex-row gap-8">
        <section className="lg:w-1/2 rounded-xl bg-card p-5 shadow-lg">
          <h2 className="text-left mb-1">Sports</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Stats, rosters, standings, and leaders across major professional leagues.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {sportsSites.map((site, i) => (
              <SiteCard key={site.href} site={site} priority={i < 4} />
            ))}
          </div>
        </section>
        <section className="lg:w-1/2 rounded-xl bg-card p-5 shadow-lg">
          <h2 className="text-left mb-1">Music</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Discographies, profiles, and catalogs for record labels and bands.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {musicSites.map((site) => (
              <SiteCard key={site.href} site={site} priority={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
