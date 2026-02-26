"use client";

import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, E6_SITE } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import {
  DashboardDailyRow,
} from "@/components/music-site/dashboard-sections";
import { e6Artists } from "@/lib/e6-artists-data";
import { localMemberImages } from "@/lib/e6-artist-images";

const e6ArtistItems = e6Artists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: localMemberImages[a.id],
  genre: a.genre,
}));

export function E6DashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
      {/* Daily Trivia + Record of the Day + Artist of the Day */}
      <DashboardDailyRow columns={3} description={site.description}>
        <TriviaPanel />
        <RecordOfDayCard
          site={site}
          RemoteImage={SiteRemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-full h-auto opacity-30 p-4"
          placeholderSize={200}
        />
        <ArtistOfDayCard
          artists={e6ArtistItems}
          site={site}
          RemoteImage={SiteRemoteImage}
        />
      </DashboardDailyRow>
    </div>
  );
}
