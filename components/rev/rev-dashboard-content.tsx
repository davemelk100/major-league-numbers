"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { TriviaPanel } from "@/components/music-site/trivia-panel";
import { RecordOfDayCard } from "@/components/music-site/record-of-day-card";
import { RevRemoteImage } from "@/components/rev/rev-remote-image";
import { DashboardDailyRow } from "@/components/music-site/dashboard-sections";
import { getRevArtistImageUrl, type RevArtist } from "@/lib/rev-artists-data";
import { getRevReleaseImageUrl, type RevRelease } from "@/lib/rev-discography-data";

const FEATURED_BANDS: RevArtist[] = [
  { id: "youth-of-today", name: "Youth of Today" },
  { id: "gorilla-biscuits", name: "Gorilla Biscuits" },
  { id: "shelter", name: "Shelter" },
  { id: "quicksand", name: "Quicksand" },
  { id: "sick-of-it-all", name: "Sick of It All" },
  { id: "bold", name: "Bold" },
];

const FEATURED_RELEASES: RevRelease[] = [
  { catalogNumber: 1, artist: "Warzone", title: "Lower East Side Crew", year: 1987 },
  { catalogNumber: 8, artist: "Youth of Today", title: "Break Down the Walls", year: 1986 },
  { catalogNumber: 12, artist: "Gorilla Biscuits", title: "Start Today", year: 1989 },
  { catalogNumber: 15, artist: "Judge", title: "Bringin' It Down", year: 1989 },
  { catalogNumber: 16, artist: "Shelter", title: "Perfection of Desire", year: 1990 },
  { catalogNumber: 18, artist: "Quicksand", title: "Quicksand", year: 1990 },
];

export function RevDashboardContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);

  return (
    <div className="container py-2">
      {/* Daily Trivia + Record of the Day */}
      <DashboardDailyRow>
        <TriviaPanel />
        <RecordOfDayCard
          RemoteImage={RevRemoteImage}
          imageFit="contain"
          placeholderVariant="next-image"
          placeholderClassName="w-1/2 h-1/2 object-contain"
          placeholderSize={32}
        />
      </DashboardDailyRow>

      {/* Bands */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2>Bands</h2>
          <Link href={`${site.basePath}/members`} className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {FEATURED_BANDS.map((band) => {
            const imageUrl = getRevArtistImageUrl(band.id);
            return (
              <Link key={band.id} href={`${site.basePath}/members/${band.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-3 text-center">
                    <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={band.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src="/rev-icon.svg"
                          alt={band.name}
                          width={48}
                          height={48}
                          className="opacity-30"
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium">{band.name}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Releases */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2>Releases</h2>
          <Link href={`${site.basePath}/albums`} className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {FEATURED_RELEASES.map((release) => {
            const imageUrl = getRevReleaseImageUrl(release.catalogNumber);
            return (
              <Link key={release.catalogNumber} href={`${site.basePath}/albums/${release.catalogNumber}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-3">
                    <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={`${release.artist} - ${release.title}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground/50">
                          REV {release.catalogNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium truncate">{release.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{release.artist}</p>
                    <p className="text-xs text-muted-foreground">{release.year}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
