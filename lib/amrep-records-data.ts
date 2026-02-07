import { amrepReleases, type AmrepRelease } from "./amrep-releases-data";

export interface AmrepRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

// Convert a release to a record of the day
function toRecordOfDay(release: AmrepRelease): AmrepRecordOfDay {
  const catalogLabel = release.catalogNo ? `AmRep ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: `${catalogLabel} — ${release.year ?? "Unknown"}`,
    coverUrl: undefined, // Will be fetched via Discogs API
  };
}

export function getDailyAmrepRecord(date = new Date()): AmrepRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % amrepReleases.length;
  return toRecordOfDay(amrepReleases[index]);
}
