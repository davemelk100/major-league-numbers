"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getSiteTimeline } from "@/lib/site-data-registry";

export function SiteTimelineContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const events = getSiteTimeline(site.id);

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Timeline</h1>

      {events.length === 0 ? (
        <p className="text-muted-foreground">No timeline data available yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl font-bold">{item.year}</span>
                </div>
                <p className="text-muted-foreground">{item.event}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
