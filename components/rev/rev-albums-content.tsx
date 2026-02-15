"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllRevReleases, getRevReleaseYears, getRevReleaseImageUrl } from "@/lib/rev-discography-data";
import { RevRemoteImage } from "@/components/rev/rev-remote-image";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import Link from "next/link";

export function RevAlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const releases = getAllRevReleases();
  const years = getRevReleaseYears();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [coverImages, setCoverImages] = useState<Record<number, string>>({});

  // Load static images immediately, then fetch additional covers in bulk from Discogs label endpoint
  useEffect(() => {
    let active = true;

    // Start with static images
    const staticImages: Record<number, string> = {};
    for (const r of releases) {
      const url = getRevReleaseImageUrl(r.catalogNumber);
      if (url) staticImages[r.catalogNumber] = url;
    }
    if (active) setCoverImages(staticImages);

    // Fetch additional covers from Discogs label releases (bulk, not per-album)
    async function fetchBulkCovers() {
      try {
        const res = await fetch("/api/rev/discogs?type=label-releases&per_page=100");
        if (!res.ok || !active) return;
        const data = await res.json();
        const labelReleases = data.releases || [];

        const newImages: Record<number, string> = {};
        for (const lr of labelReleases) {
          if (!lr.thumb) continue;
          // Match by artist+title against our catalog
          const lrArtist = (lr.artist || "").toLowerCase();
          const lrTitle = (lr.title || "").toLowerCase();
          for (const r of releases) {
            if (staticImages[r.catalogNumber]) continue; // already have an image
            if (newImages[r.catalogNumber]) continue;
            if (
              r.artist.toLowerCase() === lrArtist &&
              r.title.toLowerCase() === lrTitle
            ) {
              newImages[r.catalogNumber] = lr.thumb;
            }
          }
        }

        if (active && Object.keys(newImages).length > 0) {
          setCoverImages((prev) => ({ ...prev, ...newImages }));
        }
      } catch {
        // bulk fetch failed, static images still work
      }
    }

    fetchBulkCovers();
    return () => { active = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredReleases = releases.filter((release) => {
    const matchesSearch =
      search === "" ||
      release.title.toLowerCase().includes(search.toLowerCase()) ||
      release.artist.toLowerCase().includes(search.toLowerCase());
    const matchesYear = selectedYear === null || release.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <h1 className="font-league shrink-0">Releases</h1>
        {searchOpen || search.length > 0 ? (
          <div ref={searchWrapperRef} className="relative flex-1 min-w-0 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search releases or artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                if (search.length === 0) setSearchOpen(false);
              }}
              className="pl-9"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSearchOpen(true);
              requestAnimationFrame(() => {
                searchWrapperRef.current?.querySelector("input")?.focus();
              });
            }}
            className="shrink-0 h-10 w-10 flex items-center justify-center rounded-md border border-input hover:bg-muted/50 transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <select
          value={selectedYear ?? ""}
          onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm shrink-0"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredReleases.length} of {releases.length} releases
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredReleases.map((release) => {
          const imageUrl = coverImages[release.catalogNumber];
          return (
            <Link key={release.catalogNumber} href={`/rev/albums/${release.catalogNumber}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-3">
                  {imageUrl ? (
                    <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                      <RevRemoteImage
                        src={imageUrl}
                        alt={`${release.artist} - ${release.title}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <SitePlaceholderIcon site={site} />
                  )}
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
  );
}
