"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, REVELATION_SITE } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import {
  DashboardDailyRow,
} from "@/components/music-site/dashboard-sections";
import { revArtists, revArtistImages } from "@/lib/rev-artists-data";

const revArtistsWithImages = revArtists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: revArtistImages[a.id],
}));

export function RevDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
      <DashboardDailyRow columns={3} description={site.description}>
        <TriviaPanel />
        <RecordOfDayCard
          site={site}
          RemoteImage={SiteRemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 object-contain"
          placeholderSize={32}
        />
        <ArtistOfDayCard
          artists={revArtistsWithImages}
          site={site}
          RemoteImage={SiteRemoteImage}
        />
      </DashboardDailyRow>
    </div>
  );
}
