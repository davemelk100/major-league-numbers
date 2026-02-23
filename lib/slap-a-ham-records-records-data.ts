import { slapahamrecordsReleases, type SlapAHamRecordsRelease } from "./slap-a-ham-records-releases-data";

export interface SlapAHamRecordsRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const SLAPAHAMRECORDS_FACTS: Record<string, string> = {
  "your blessened / pronoun piece me": "A classic release from Melvins demonstrating their unique sound blending punk rock and sludge metal.",
  "sweatin’ to the oldies": "A landmark album by Spazz, noted for its eclectic mix of styles and humor in its songwriting.",
  "chaotic noise": "An influential release by Conga Fury showcasing chaotic and experimental soundscapes.",
};

function getSlapAHamRecordsFact(title: string): string | undefined {
  return SLAPAHAMRECORDS_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: SlapAHamRecordsRelease): SlapAHamRecordsRecordOfDay {
  const catalogLabel = release.catalogNo ? `SlapAHamRecords ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getSlapAHamRecordsFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
    coverUrl: undefined,
  };
}

export function getDailySlapAHamRecordsRecord(date = new Date()): SlapAHamRecordsRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % slapahamrecordsReleases.length;
  return toRecordOfDay(slapahamrecordsReleases[index]);
}
