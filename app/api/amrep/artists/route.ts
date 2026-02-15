import { NextResponse } from "next/server";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { AMREP_ARTIST_IMAGES } from "@/lib/amrep-member-images";

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
};

export async function GET() {
  try {
    const artists = amrepArtists.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description ?? null,
      imageUrl: AMREP_ARTIST_IMAGES[a.id] ?? null,
    }));

    return NextResponse.json(
      { artists, total: artists.length },
      { headers: HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500, headers: HEADERS }
    );
  }
}
