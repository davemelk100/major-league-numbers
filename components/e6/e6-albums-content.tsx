"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllE6Releases, getE6ReleaseYears, getE6ReleaseImageUrl } from "@/lib/e6-discography-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname, type MusicSiteConfig } from "@/lib/music-site";
import { SitePlaceholderIcon } from "@/components/music-site/site-placeholder-icon";

// In-memory cache shared across all AlbumCover instances
const coverCache = new Map<string, string | null>();

function AlbumCover({ artist, title, catalogNumber, site }: { artist: string; title: string; catalogNumber: number; site: MusicSiteConfig }) {
  const staticUrl = getE6ReleaseImageUrl(catalogNumber);
  const [coverUrl, setCoverUrl] = useState<string | null>(staticUrl || null);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fetchedRef = useRef(false);

  const handleError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (staticUrl || fetchedRef.current) return;

    const cacheKey = `${artist}::${title}`;
    if (coverCache.has(cacheKey)) {
      setCoverUrl(coverCache.get(cacheKey) || null);
      fetchedRef.current = true;
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          fetchedRef.current = true;

          const params = new URLSearchParams({ type: "resolve", artist, title });
          fetch(`/api/e6/discogs?${params}`)
            .then((res) => res.json())
            .then((data) => {
              const url = data.release?.coverImage || null;
              coverCache.set(cacheKey, url);
              setCoverUrl(url);
            })
            .catch(() => {
              coverCache.set(cacheKey, null);
            });
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [artist, title, staticUrl]);

  const alt = `${artist} - ${title}`;

  if ((coverUrl && !failed)) {
    return (
      <div ref={ref} className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <SitePlaceholderIcon site={site} />
    </div>
  );
}

export function E6AlbumsContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const releases = getAllE6Releases();
  const years = getE6ReleaseYears();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

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
        {filteredReleases.map((release) => (
          <Link key={release.catalogNumber} href={`/e6/albums/${release.catalogNumber}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-3">
                <AlbumCover
                  artist={release.artist}
                  title={release.title}
                  catalogNumber={release.catalogNumber}
                  site={site}
                />
                <p className="text-sm font-medium truncate">{release.title}</p>
                <p className="text-xs text-muted-foreground truncate">{release.artist}</p>
                <p className="text-xs text-muted-foreground">{release.year}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
