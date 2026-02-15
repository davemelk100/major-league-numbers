import { NextRequest, NextResponse } from "next/server";
import { getAmrepArtistById } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { getAmrepAlbumImage } from "@/lib/amrep-album-images";
import { AMREP_ARTIST_IMAGES } from "@/lib/amrep-member-images";

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid artist ID" },
        { status: 400, headers: HEADERS }
      );
    }

    const artist = getAmrepArtistById(id);

    if (!artist) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404, headers: HEADERS }
      );
    }

    const releases = amrepReleases
      .filter((r) => r.artist.toLowerCase() === artist.name.toLowerCase())
      .map((r) => ({
        id: r.id,
        catalogNo: r.catalogNo ?? null,
        title: r.title,
        year: r.year ?? null,
        format: r.format ?? null,
        section: r.section ?? null,
        imageUrl: getAmrepAlbumImage(r.id),
      }));

    return NextResponse.json(
      {
        id: artist.id,
        name: artist.name,
        description: artist.description ?? null,
        imageUrl: AMREP_ARTIST_IMAGES[artist.id] ?? null,
        releases,
      },
      { headers: HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch artist" },
      { status: 500, headers: HEADERS }
    );
  }
}
