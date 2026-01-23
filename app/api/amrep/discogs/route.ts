import { NextResponse } from "next/server";
import { cacheRemoteImage } from "@/lib/gbv-image-cache";

export const runtime = "nodejs";

const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "AmphetamineReptile/1.0";
const LABEL_NAME = "Amphetamine Reptile Records";

let labelIdCache: { id: number; timestamp: number } | null = null;
const LABEL_ID_TTL = 24 * 60 * 60 * 1000;
const releasesCache = new Map<string, { releases: any[]; timestamp: number }>();
const RELEASES_TTL = 24 * 60 * 60 * 1000;

async function fetchFromDiscogs(endpoint: string) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  const response = await fetch(`${DISCOGS_BASE_URL}${endpoint}`, {
    headers: {
      "User-Agent": USER_AGENT,
      ...(token ? { Authorization: `Discogs token=${token}` } : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }

  return response.json();
}

async function getLabelId(): Promise<number> {
  if (labelIdCache && Date.now() - labelIdCache.timestamp < LABEL_ID_TTL) {
    return labelIdCache.id;
  }

  const data = await fetchFromDiscogs(
    `/database/search?q=${encodeURIComponent(LABEL_NAME)}&type=label&per_page=1`
  );
  const id = Number(data?.results?.[0]?.id);
  if (!id) {
    throw new Error("Label not found on Discogs");
  }
  labelIdCache = { id, timestamp: Date.now() };
  return id;
}

async function normalizeThumb(url?: string | null) {
  if (!url) return null;
  const httpsUrl = url.replace(/^http:/, "https:");
  const cached = await cacheRemoteImage(httpsUrl, "discogs-amrep");
  return cached || `/api/gbv/image-proxy?url=${encodeURIComponent(httpsUrl)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "releases";
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "100";

  try {
    const labelId = await getLabelId();

    if (type === "label") {
      const data = await fetchFromDiscogs(`/labels/${labelId}`);
      return NextResponse.json(data);
    }

    if (type === "releases") {
      const cacheKey = `${page}:${perPage}`;
      const cached = releasesCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < RELEASES_TTL) {
        return NextResponse.json({ releases: cached.releases, cached: true });
      }

      const data = await fetchFromDiscogs(
        `/labels/${labelId}/releases?page=${page}&per_page=${perPage}`
      );
      const releases = await Promise.all(
        (data?.releases || []).map(async (release: any) => ({
          id: release.id,
          title: release.title,
          year: release.year,
          artist: release.artist,
          format: release.format,
          thumb: await normalizeThumb(release.thumb),
        }))
      );

      releasesCache.set(cacheKey, { releases, timestamp: Date.now() });
      return NextResponse.json({ releases });
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
