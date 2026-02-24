import { jawboxReleases, type JawboxRelease } from "./jawbox-releases-data";

export interface JawboxRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const JAWBOX_FACTS: Record<string, string> = {
  "grippe": "Jawbox's debut album showcasing their post-hardcore sound and introspective lyrics.",
  "novelty": "The second album continues their exploration of complex rhythms and angular melodies.",
  "for your own special sweetheart": "A milestone release that marked their transition to a larger label, Atlantic Records.",
  "jawbox": "Their self-titled album features some of their most iconic tracks and showcases their evolution over the years.",
};

function getJawboxFact(title: string): string | undefined {
  return JAWBOX_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: JawboxRelease): JawboxRecordOfDay {
  const catalogLabel = release.catalogNo ? `Jawbox ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getJawboxFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
    coverUrl: undefined,
  };
}

export function getDailyJawboxRecord(date = new Date()): JawboxRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % jawboxReleases.length;
  return toRecordOfDay(jawboxReleases[index]);
}
