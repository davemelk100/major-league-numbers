import { NextRequest, NextResponse } from "next/server";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { getAmrepAlbumImage } from "@/lib/amrep-release-images";

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const artist = searchParams.get("artist");
    const year = searchParams.get("year");
    const section = searchParams.get("section");

    let filtered = amrepReleases;

    if (artist) {
      const lc = artist.toLowerCase();
      filtered = filtered.filter((r) => r.artist.toLowerCase().includes(lc));
    }
    if (year) {
      const y = parseInt(year, 10);
      if (!isNaN(y)) {
        filtered = filtered.filter((r) => r.year === y);
      }
    }
    if (section) {
      const lc = section.toLowerCase();
      filtered = filtered.filter(
        (r) => r.section?.toLowerCase() === lc
      );
    }

    const releases = filtered.map((r) => ({
      id: r.id,
      catalogNo: r.catalogNo ?? null,
      artist: r.artist,
      title: r.title,
      year: r.year ?? null,
      format: r.format ?? null,
      section: r.section ?? null,
      imageUrl: getAmrepAlbumImage(r.id),
    }));

    return NextResponse.json(
      { releases, total: releases.length },
      { headers: HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch catalog" },
      { status: 500, headers: HEADERS }
    );
  }
}
