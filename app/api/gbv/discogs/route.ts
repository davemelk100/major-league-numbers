import { NextResponse } from "next/server";

const GBV_ARTIST_ID = 83529;
const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "GuidedByNumbers/1.0";

interface DiscogsRelease {
  id: number;
  title: string;
  year: number;
  type: string;
  main_release?: number;
  artist: string;
  role: string;
  resource_url: string;
  thumb: string;
  format?: string;
}

interface DiscogsArtist {
  id: number;
  name: string;
  profile: string;
  members?: Array<{ id: number; name: string; active: boolean }>;
  namevariations?: string[];
  urls?: string[];
}

async function fetchFromDiscogs(endpoint: string) {
  const response = await fetch(`${DISCOGS_BASE_URL}${endpoint}`, {
    headers: {
      "User-Agent": USER_AGENT,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "artist";
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "50";

  try {
    if (type === "artist") {
      const data: DiscogsArtist = await fetchFromDiscogs(`/artists/${GBV_ARTIST_ID}`);
      return NextResponse.json({
        id: data.id,
        name: data.name,
        profile: data.profile,
        members: data.members,
        namevariations: data.namevariations,
        urls: data.urls,
      });
    }

    if (type === "releases") {
      const data = await fetchFromDiscogs(
        `/artists/${GBV_ARTIST_ID}/releases?page=${page}&per_page=${perPage}&sort=year&sort_order=desc`
      );

      const releases = data.releases.map((release: DiscogsRelease) => ({
        id: release.id,
        title: release.title,
        year: release.year,
        type: release.type,
        thumb: release.thumb,
        mainRelease: release.main_release,
        role: release.role,
      }));

      return NextResponse.json({
        releases,
        pagination: data.pagination,
      });
    }

    if (type === "albums") {
      // Fetch all pages to get complete album list
      let allReleases: DiscogsRelease[] = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const data = await fetchFromDiscogs(
          `/artists/${GBV_ARTIST_ID}/releases?page=${currentPage}&per_page=100&sort=year&sort_order=asc`
        );
        allReleases = [...allReleases, ...data.releases];
        totalPages = data.pagination.pages;
        currentPage++;
      } while (currentPage <= totalPages && currentPage <= 5); // Limit to 5 pages max

      const albums = allReleases
        .filter((release: DiscogsRelease) =>
          release.type === "master" &&
          release.role === "Main"
        )
        .map((release: DiscogsRelease) => ({
          id: release.id,
          title: release.title,
          year: release.year,
          thumb: release.thumb,
          mainRelease: release.main_release,
        }));

      return NextResponse.json({ albums });
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (error) {
    console.error("Discogs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Discogs" },
      { status: 500 }
    );
  }
}
