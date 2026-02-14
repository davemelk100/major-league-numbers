"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { E6RemoteImage } from "@/components/e6/e6-remote-image";
import {
  DashboardDailyRow,
  DashboardDescription,
} from "@/components/music-site/dashboard-sections";
import { e6Artists, e6ArtistImages } from "@/lib/e6-artists-data";

const e6ArtistItems = e6Artists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: e6ArtistImages[a.id],
  genre: a.genre,
}));

export function E6DashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
      <DashboardDescription text={site.description} />

      {/* Daily Trivia + Record of the Day + Artist of the Day */}
      <DashboardDailyRow columns={3}>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={E6RemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-full h-auto opacity-30 p-4"
          placeholderSize={200}
        />
        <ArtistOfDayCard
          artists={e6ArtistItems}
          site={site}
          RemoteImage={E6RemoteImage}
        />
      </DashboardDailyRow>
    </div>
  );
}
