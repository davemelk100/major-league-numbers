import { getAllRevReleases, getRevReleaseImageUrl, type RevRelease } from "./rev-discography-data";

export interface RevRecordOfDay {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

// Convert a release to a record of the day
function toRecordOfDay(release: RevRelease): RevRecordOfDay {
  return {
    catalogNumber: release.catalogNumber,
    artist: release.artist,
    title: release.title,
    year: release.year,
    highlight: `REV ${release.catalogNumber} — ${release.year}`,
    coverUrl: getRevReleaseImageUrl(release.catalogNumber),
  };
}

export function getDailyRevRecord(date?: Date): RevRecordOfDay {
  const releases = getAllRevReleases();
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % releases.length;
  return toRecordOfDay(releases[index]);
}
