"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllE6Artists, getE6ArtistImageUrl } from "@/lib/e6-artists-data";
import Link from "next/link";
import Image from "next/image";

export function E6MembersContent() {
  const artists = getAllE6Artists();
  const [search, setSearch] = useState("");

  const filteredArtists = artists.filter((artist) =>
    search === "" || artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Artists</h1>

      <div className="mb-6">
        <Input
          placeholder="Search artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArtists.length} of {artists.length} artists
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredArtists.map((artist) => {
          const imageUrl = getE6ArtistImageUrl(artist.id);
          return (
            <Link key={artist.id} href={`/e6/members/${artist.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-3 text-center">
                  <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        src="/e6-logo.png"
                        alt={artist.name}
                        width={48}
                        height={48}
                        className="opacity-30"
                      />
                    )}
                  </div>
                  <p className="text-sm font-medium">{artist.name}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
