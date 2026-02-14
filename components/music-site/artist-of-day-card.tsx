"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicSiteConfig } from "@/lib/music-site";

type RemoteImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  preferProxy?: boolean;
};

type ArtistOfDayItem = {
  id: string | number;
  name: string;
  imageUrl?: string;
  genre?: string;
};

type ArtistOfDayCardProps = {
  artists: ArtistOfDayItem[];
  site: MusicSiteConfig;
  RemoteImage: ComponentType<RemoteImageProps>;
};

export function ArtistOfDayCard({
  artists,
  site,
  RemoteImage,
}: ArtistOfDayCardProps) {
  if (artists.length === 0) return null;

  const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const index = daysSinceEpoch % artists.length;
  const artist = artists[index];
  const href = `${site.basePath}/members/${artist.id}`;

  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex flex-col gap-3">
        <h2>Artist of the Day</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Link
              href={href}
              className="text-base font-semibold hover:underline"
            >
              {artist.name}
            </Link>
            {artist.genre && (
              <div className="text-xs text-muted-foreground">
                {artist.genre}
              </div>
            )}
          </div>
          <div className="relative h-[220px] sm:h-[260px] lg:h-[300px]">
            {artist.imageUrl ? (
              <Link href={href} className="absolute inset-0">
                <RemoteImage
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="rounded-md object-cover w-full h-full"
                  loading="eager"
                  preferProxy
                />
              </Link>
            ) : (
              <Link
                href={href}
                className="w-full h-full rounded-md flex items-center justify-center"
                style={{ opacity: 0.2 }}
              >
                <img
                  src={site.placeholderIconSrc}
                  alt={`${site.shortName} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
