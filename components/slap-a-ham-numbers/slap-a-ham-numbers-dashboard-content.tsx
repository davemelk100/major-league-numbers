"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { SLAP_A_HAM_NUMBERS_SITE } from "@/lib/music-site";
import {
  DashboardDailyRow,
} from "@/components/music-site/dashboard-sections";
import { useDashboardData } from "@/components/music-site/use-dashboard-data";
import { slapahamnumbersArtists } from "@/lib/slap-a-ham-numbers-artists-data";
import { SLAP_A_HAM_NUMBERS_ARTIST_IMAGES } from "@/lib/slap-a-ham-numbers-artist-images";

const slapahamnumbersArtistsWithImages = slapahamnumbersArtists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: SLAP_A_HAM_NUMBERS_ARTIST_IMAGES[a.id],
}));

export function SlapAHamNumbersDashboardContent() {
  const {
    site,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="container py-2">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Loading {site.shortName} data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2">
      <DashboardDailyRow columns={3} description={site.description}>
        <TriviaPanel />
        <RecordOfDayCard
          site={site}
          RemoteImage={SiteRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-full h-auto opacity-30 p-4"
        />
        <ArtistOfDayCard
          artists={slapahamnumbersArtistsWithImages}
          site={site}
          RemoteImage={SiteRemoteImage}
        />
      </DashboardDailyRow>

      {error && (
        <Card className="mb-8 border-destructive">
          <CardContent className="p-4 text-destructive">{error}</CardContent>
        </Card>
      )}
    </div>
  );
}
