"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { getRevArtistById } from "@/lib/rev-artists-data";
import { getRevReleasesByArtist } from "@/lib/rev-discography-data";
import Image from "next/image";

export function RevMemberDetailContent({ memberId }: { memberId: string }) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const artist = getRevArtistById(memberId);
  const releases = artist ? getRevReleasesByArtist(artist.name) : [];

  if (!artist) {
    return (
      <div className="container py-6">
        <Link
          href={`${site.basePath}/members`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {site.navLabels.members}
        </Link>
        <p className="text-muted-foreground">Band not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link
        href={`${site.basePath}/members`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {site.navLabels.members}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Left: band image + info */}
        <div>
          <div className="w-full aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
            <Image
              src="/rev-icon.svg"
              alt={artist.name}
              width={80}
              height={80}
              className="opacity-30"
            />
          </div>
          <h1 className="font-league mb-2">{artist.name}</h1>
          {artist.yearsActive && (
            <p className="text-sm text-muted-foreground mb-2">
              Active: {artist.yearsActive}
            </p>
          )}
          {artist.genre && (
            <p className="text-sm text-muted-foreground">
              Genre: {artist.genre}
            </p>
          )}
        </div>

        {/* Right: discography */}
        <div>
          <h2 className="mb-4">Releases on Revelation ({releases.length})</h2>
          {releases.length > 0 ? (
            <div className="space-y-2">
              {releases.map((release) => (
                <Link
                  key={release.catalogNumber}
                  href={`${site.basePath}/albums/${release.catalogNumber}`}
                  className="flex items-center justify-between border-b border-border pb-2 last:border-0 hover:bg-muted/50 -mx-2 px-2 py-1 rounded transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm">{release.title}</p>
                    <p className="text-xs text-muted-foreground">
                      REV {release.catalogNumber}
                    </p>
                  </div>
                  <Badge variant="outline">{release.year}</Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No releases found in catalog.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
