"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { ArtistOfDayCard } from "@/components/music-site/artist-of-day-card";
import { SiteRemoteImage } from "@/components/music-site/site-remote-image";
import { DISCHORD_SITE } from "@/lib/music-site";
import {
  DashboardDailyRow,
  DashboardDescription,
} from "@/components/music-site/dashboard-sections";
import { useDashboardData } from "@/components/music-site/use-dashboard-data";
import { dischordArtists } from "@/lib/dischord-artists-data";
import { DISCHORD_ARTIST_IMAGES } from "@/lib/dischord-artist-images";

const dischordArtistsWithImages = dischordArtists.map((a) => ({
  id: a.id,
  name: a.name,
  imageUrl: DISCHORD_ARTIST_IMAGES[a.id],
}));

export function DischordDashboardContent() {
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
      <DashboardDescription text={site.description} />

      <DashboardDailyRow columns={3}>
        <TriviaPanel />
        <RecordOfDayCard
          site={site}
          RemoteImage={SiteRemoteImage}
          imageFit="contain"
          placeholderVariant="img"
          placeholderClassName="w-full h-auto opacity-30 p-4"
        />
        <ArtistOfDayCard
          artists={dischordArtistsWithImages}
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
