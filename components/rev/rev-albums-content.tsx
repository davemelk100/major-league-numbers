"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllRevReleases, getRevReleaseYears, getRevReleaseImageUrl } from "@/lib/rev-discography-data";
import Link from "next/link";
import Image from "next/image";

export function RevAlbumsContent() {
  const releases = getAllRevReleases();
  const years = getRevReleaseYears();
  const [search, setSearch] = useState("");
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
      <h1 className="font-league mb-6">Releases</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search releases or artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <select
          value={selectedYear ?? ""}
          onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm"
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
          const imageUrl = getRevReleaseImageUrl(release.catalogNumber);
          return (
            <Link key={release.catalogNumber} href={`/rev/albums/${release.catalogNumber}`}>
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
  );
}
