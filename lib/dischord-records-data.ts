import { dischordReleases, type DischordRelease } from "./dischord-releases-data";

export interface DischordRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const DISCHORD_FACTS: Record<string, string> = {
  "out-of-step": "Minor Threat's Out of Step was recorded in just two days at Inner Ear Studios and has sold over 500,000 copies — all on Dischord.",
  "repeater": "Fugazi's Repeater was the first Dischord release to sell over 200,000 copies, all without major label distribution or traditional advertising.",
  "13-songs": "13 Songs compiles Fugazi's first two EPs and remains the best-selling Dischord release of all time.",
  "faith-void": "The Faith/Void split LP (Dischord 10) is one of the most sought-after hardcore records, with original pressings commanding high prices among collectors.",
  "end-on-end": "Rites of Spring's End on End was originally titled simply 'Rites of Spring' — the reissue added the name 'End on End' to distinguish it from the band name.",
  "can-i-say": "Dag Nasty's Can I Say went through two vocalists — Shawn Brown sang on the original sessions, but Dave Smalley re-recorded vocals for the released version.",
  "the-argument": "The Argument features guest cello by Jerry Busher and vocals from Bridget Cross of Unrest, making it Fugazi's most sonically diverse album.",
  "in-on-the-kill-taker": "In on the Kill Taker was partially recorded by Steve Albini, though the band ultimately finished the album with Ted Niceley.",
  "embrace-lp": "Embrace's self-titled album wasn't released until 1987, well after the band had broken up, making it a posthumous debut.",
  "red-medicine": "Red Medicine was recorded at Inner Ear Studios with Don Zientara, continuing Fugazi's long relationship with the legendary D.C. studio.",
};

function getDischordFact(title: string): string | undefined {
  return DISCHORD_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: DischordRelease): DischordRecordOfDay {
  const catalogLabel = release.catalogNo ? `Dischord ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getDischordFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
    coverUrl: undefined,
  };
}

export function getDailyDischordRecord(date = new Date()): DischordRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % dischordReleases.length;
  return toRecordOfDay(dischordReleases[index]);
}
