"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

const criticalAcclaim = [
  {
    publication: "Pitchfork",
    accolade: "Bee Thousand ranked #10 in Top 100 Albums of the 1990s",
    year: 2003,
    sourceLabel: "Pitchfork list",
    sourceUrl:
      "https://pitchfork.com/features/lists-and-guides/5923-top-100-albums-of-the-1990s/",
  },
  {
    publication: "Rolling Stone",
    accolade: "Alien Lanes - 4 stars",
    year: 1995,
  },
  {
    publication: "Pitchfork",
    accolade: "Alien Lanes ranked #27 in Top 100 Albums of the 1990s",
    year: 2003,
    sourceLabel: "Pitchfork list",
    sourceUrl:
      "https://pitchfork.com/features/lists-and-guides/5923-top-100-albums-of-the-1990s/",
  },
  {
    publication: "Pitchfork",
    accolade:
      "Director's Cut review says original Bee Thousand 'warrants a 10'",
    year: 2003,
    sourceLabel: "Pitchfork review",
    sourceUrl:
      "https://pitchfork.com/reviews/albums/3600-bee-thousand-the-directors-cut/",
  },
];

const listAppearances = [
  "Rolling Stone's 500 Greatest Albums (Bee Thousand)",
  "Pitchfork's Top 100 Albums of the 1990s",
  "NME's Greatest Indie Albums Ever",
  "Spin's 100 Greatest Albums 1985-2005",
  "AllMusic's Essential Lo-Fi Albums",
];

const amrepMilestones = [
  {
    label: "Founded",
    detail: "Amphetamine Reptile Records founded in 1986.",
  },
  {
    label: "Breakthrough release",
    detail: "Helmet’s Strap It On helped sustain the label in the 1990s.",
  },
  {
    label: "Documentary",
    detail: "The Color of Noise (2015) spotlights AmRep’s history.",
  },
];

const amrepNotablePerformances = [
  "CMJ / Amphetamine Reptile Tour (1992) featuring multiple AmRep artists.",
];

const revMilestones = [
  {
    label: "Founded",
    detail: "Revelation Records founded in 1987 by Jordan Cooper and Ray Cappo in New Haven, Connecticut.",
  },
  {
    label: "First Release",
    detail: "Warzone - Lower East Side Crew (REV 1) released in 1987.",
  },
  {
    label: "Landmark Release",
    detail: "Gorilla Biscuits - Start Today (REV 12) became one of the most influential hardcore albums of all time.",
  },
  {
    label: "Youth Crew Movement",
    detail: "Revelation became the home of the straight edge youth crew movement with bands like Youth of Today, Judge, and Bold.",
  },
  {
    label: "Crossover Success",
    detail: "Quicksand and Texas Is the Reason helped bridge hardcore to alternative rock audiences in the 1990s.",
  },
];

const revNotableAchievements = [
  "Over 135 catalog releases spanning hardcore, punk, and post-hardcore.",
  "Home to iconic bands: Youth of Today, Gorilla Biscuits, Judge, Bold, Chain of Strength.",
  "Start Today by Gorilla Biscuits consistently ranked among greatest hardcore albums.",
  "Judge's Bringin' It Down considered a hardcore classic.",
  "Texas Is the Reason's Do You Know Who You Are? - landmark emo/post-hardcore release.",
  "Quicksand's albums helped define post-hardcore sound of the 1990s.",
  "Continued influence on modern hardcore with bands like Title Fight, Drain, and Turnstile alumni.",
];

export function SiteAwardsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const isRev = site.id === "rev";

  const isLabelSite = isAmrep || isRev;
  const milestones = isRev ? revMilestones : amrepMilestones;
  const achievements = isRev ? revNotableAchievements : amrepNotablePerformances;

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">
        {isLabelSite ? "Milestones & Recognition" : "Awards & Recognition"}
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="py-6">
          <CardHeader className="pb-6">
            <h2>{isLabelSite ? "Label Milestones" : "Critical Acclaim"}</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(isLabelSite ? milestones : criticalAcclaim).map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {isLabelSite ? item.label : item.publication}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isLabelSite ? item.detail : item.accolade}
                      </p>
                      {!isLabelSite && item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                        >
                          {item.sourceLabel || "Source"}
                        </a>
                      )}
                    </div>
                    {!isLabelSite && <Badge variant="outline">{item.year}</Badge>}
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="py-6">
          <CardHeader className="pb-6">
            <h2>
              {isLabelSite ? "Notable Achievements" : "Best-Of List Appearances"}
            </h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(isLabelSite ? achievements : listAppearances).map(
                (item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ),
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
