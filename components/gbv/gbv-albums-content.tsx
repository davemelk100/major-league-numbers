"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Disc3, Loader2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Album {
  id: number;
  title: string;
  year: number;
  thumb: string;
  mainRelease?: number;
  coverUrl?: string | null;
}

export function GbvAlbumsContent() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"year-asc" | "year-desc" | "title">("year-asc");
  const [loadedCovers, setLoadedCovers] = useState<Set<string>>(new Set());

  // Fetch cover art in batches
  const fetchCoverArt = useCallback(async (albumsToFetch: Album[]) => {
    // Filter out albums we've already tried to load
    const newAlbums = albumsToFetch.filter((a) => !loadedCovers.has(a.title));
    if (newAlbums.length === 0) return;

    try {
      const response = await fetch("/api/gbv/cover-art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albums: newAlbums.map((a) => ({ title: a.title })),
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      const coverMap = new Map<string, string | null>();

      for (const result of data.results || []) {
        coverMap.set(result.title, result.coverUrl);
      }

      // Mark these as loaded
      setLoadedCovers((prev) => {
        const newSet = new Set(prev);
        newAlbums.forEach((a) => newSet.add(a.title));
        return newSet;
      });

      setAlbums((prev) =>
        prev.map((album) => ({
          ...album,
          coverUrl: coverMap.has(album.title) ? coverMap.get(album.title) : album.coverUrl,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch cover art:", err);
    }
  }, [loadedCovers]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch("/api/gbv/discogs?type=albums");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const albumsList = data.albums || [];
        setAlbums(albumsList);
        setFilteredAlbums(albumsList);

        // Fetch cover art for first 20 albums
        if (albumsList.length > 0) {
          fetchCoverArt(albumsList.slice(0, 20));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  // Load more covers as user scrolls/views more albums
  useEffect(() => {
    if (albums.length > 0 && loadedCovers.size < albums.length) {
      // Load covers for albums that don't have them yet (in batches of 20)
      const startIndex = loadedCovers.size;
      const endIndex = Math.min(startIndex + 20, albums.length);
      if (startIndex < albums.length) {
        const timer = setTimeout(() => {
          fetchCoverArt(albums.slice(startIndex, endIndex));
        }, 500); // Delay to avoid rate limiting
        return () => clearTimeout(timer);
      }
    }
  }, [albums, loadedCovers.size, fetchCoverArt]);

  useEffect(() => {
    let result = [...albums];

    // Filter by search
    if (search) {
      result = result.filter((album) =>
        album.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "year-asc") {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredAlbums(result);
  }, [albums, search, sortBy]);

  const getAlbumImage = (album: Album): string | null => {
    return album.coverUrl || album.thumb || null;
  };

  if (isLoading) {
    return (
      <main className="container py-6">
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Loading albums...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="font-league text-4xl font-semibold">
          Discography ({filteredAlbums.length})
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search albums..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year-asc">Year (oldest)</SelectItem>
              <SelectItem value="year-desc">Year (newest)</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredAlbums.map((album) => (
          <Link key={album.id} href={`/gbv/albums/${album.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-3">
                {getAlbumImage(album) ? (
                  <Image
                    src={getAlbumImage(album)!}
                    alt={album.title}
                    width={200}
                    height={200}
                    className="w-full aspect-square rounded-lg object-cover mb-2"
                    unoptimized
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-2 flex items-center justify-center">
                    <Disc3 className="h-12 w-12 text-white" />
                  </div>
                )}
                <h3 className="font-semibold text-sm truncate">{album.title}</h3>
                <p className="text-xs text-muted-foreground">{album.year}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredAlbums.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          No albums found matching &quot;{search}&quot;
        </div>
      )}
    </main>
  );
}
