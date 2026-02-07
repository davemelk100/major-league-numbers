"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllRevArtists } from "@/lib/rev-artists-data";
import Link from "next/link";
import Image from "next/image";

export function RevMembersContent() {
  const artists = getAllRevArtists();
  const [search, setSearch] = useState("");

  const filteredArtists = artists.filter((artist) =>
    search === "" || artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Bands</h1>

      <div className="mb-6">
        <Input
          placeholder="Search bands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArtists.length} of {artists.length} bands
      </p>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredArtists.map((artist) => (
          <Link key={artist.id} href={`/rev/members/${artist.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-3 text-center">
                <div className="w-full aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center">
                  <Image
                    src="/rev-icon.svg"
                    alt={artist.name}
                    width={48}
                    height={48}
                    className="opacity-30"
                  />
                </div>
                <p className="text-sm font-medium">{artist.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
