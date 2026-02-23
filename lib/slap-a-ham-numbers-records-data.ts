import { slapahamnumbersReleases, type SlapAHamNumbersRelease } from "./slap-a-ham-numbers-releases-data";

export interface SlapAHamNumbersRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const SLAPAHAMNUMBERS_FACTS: Record<string, string> = {
  "your blessened / pronoun piece me": "Melvins' second release, showcasing their early style that would later influence many genres.",
  "fighting music": "A notable release from Neanderthal that captures the essence of early 90s hardcore.",
  "bllleeeeaaauuurrrrgghhh! the record": "An iconic compilation that features numerous groundbreaking bands.",
  "sweatin’ to the oldies": "A fan favorite from Spazz, known for its chaotic energy and humorous lyrics.",
};

function getSlapAHamNumbersFact(title: string): string | undefined {
  return SLAPAHAMNUMBERS_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: SlapAHamNumbersRelease): SlapAHamNumbersRecordOfDay {
  const catalogLabel = release.catalogNo ? `SlapAHamNumbers ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getSlapAHamNumbersFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
    coverUrl: undefined,
  };
}

export function getDailySlapAHamNumbersRecord(date = new Date()): SlapAHamNumbersRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % slapahamnumbersReleases.length;
  return toRecordOfDay(slapahamnumbersReleases[index]);
}
