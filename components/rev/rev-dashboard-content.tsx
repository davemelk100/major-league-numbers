"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { RevRemoteImage } from "@/components/rev/rev-remote-image";
import {
  DashboardDailyRow,
  DashboardDescription,
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
      <DashboardDescription text={site.description} />

      <DashboardDailyRow columns={3}>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={RevRemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 object-contain"
          placeholderSize={32}
        />
        <ArtistOfDayCard
          artists={revArtistsWithImages}
          site={site}
          RemoteImage={RevRemoteImage}
        />
      </DashboardDailyRow>
    </div>
  );
}
