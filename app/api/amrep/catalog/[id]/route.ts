import { NextRequest, NextResponse } from "next/server";
import { getAmrepReleaseById } from "@/lib/amrep-releases-data";
import { getAmrepAlbumImage } from "@/lib/amrep-release-images";

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
        { error: "Invalid release ID" },
        { status: 400, headers: HEADERS }
      );
    }

    const release = getAmrepReleaseById(id);

    if (!release) {
      return NextResponse.json(
        { error: "Release not found" },
        { status: 404, headers: HEADERS }
      );
    }

    return NextResponse.json(
      {
        id: release.id,
        catalogNo: release.catalogNo ?? null,
        artist: release.artist,
        title: release.title,
        year: release.year ?? null,
        format: release.format ?? null,
        section: release.section ?? null,
        imageUrl: getAmrepAlbumImage(release.id),
      },
      { headers: HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch release" },
      { status: 500, headers: HEADERS }
    );
  }
}
