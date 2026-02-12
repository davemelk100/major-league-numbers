import { getAllE6Releases, getE6ReleaseImageUrl, type E6Release } from "./e6-discography-data";

export interface E6RecordOfDay {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

// Convert a release to a record of the day
function toRecordOfDay(release: E6Release): E6RecordOfDay {
  return {
    catalogNumber: release.catalogNumber,
    artist: release.artist,
    title: release.title,
    year: release.year,
    highlight: `E6 ${release.catalogNumber} — ${release.year}`,
    coverUrl: getE6ReleaseImageUrl(release.catalogNumber),
  };
}

export function getDailyE6Record(date?: Date): E6RecordOfDay {
  const releases = getAllE6Releases();
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % releases.length;
  return toRecordOfDay(releases[index]);
}
