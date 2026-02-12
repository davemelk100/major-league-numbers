import { getAllRevReleases, getRevReleaseImageUrl, type RevRelease } from "./rev-discography-data";

export interface RevRecordOfDay {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const REV_FACTS: Record<string, string> = {
  "lower east side crew": "Warzone's debut on Rev and the label's first official release (REV 1).",
  "together": "An early Revelation compilation that helped define the New York hardcore scene.",
  "sick of it all": "The self-titled debut EP from one of NYHC's most enduring bands.",
  "gorilla biscuits": "The self-titled debut EP that introduced one of hardcore's most beloved bands.",
  "you're only young once": "Side By Side's only release, a Youth Crew classic.",
  "break down the walls": "Youth of Today's landmark album that helped define the straight edge Youth Crew movement.",
  "speak out": "Bold's debut LP, a defining straight edge hardcore release from the Revelation roster.",
  "the one thing that still holds true": "Chain of Strength's iconic 7\", one of the most sought-after hardcore records.",
  "start today": "One of the most influential hardcore albums ever, propelling Gorilla Biscuits to legendary status.",
  "bringin' it down": "Judge's full-length debut, a furious straight edge hardcore classic featuring Mike Judge.",
  "new york crew": "Judge's debut 7\", a raw declaration of NYHC pride.",
  "perfection of desire": "Shelter's debut, blending hardcore intensity with Krishna consciousness.",
  "quicksand": "Quicksand's debut EP, bridging hardcore and the nascent post-hardcore movement.",
  "no spiritual surrender": "Inside Out's only release, featuring future Rage Against the Machine vocalist Zack de la Rocha.",
  "the earth is flat": "Supertouch's debut, a more progressive take on New York hardcore.",
  "burn": "Burn's self-titled debut, a powerful post-Youth Crew hardcore release.",
  "rochambeau": "Farside's debut, bringing melodic California hardcore to the Revelation roster.",
  "set your goals": "CIV's debut, featuring Gorilla Biscuits' Civ Egan; became a mid-'90s punk crossover hit.",
  "manic compression": "Quicksand's second album, pushing further into post-hardcore territory.",
  "texas is the reason": "The sole EP from the influential emo/post-hardcore band, a cult classic.",
  "do you know who you are?": "Texas Is the Reason's only full-length, a touchstone of '90s emo.",
  "chung king can suck it": "Judge's earliest recordings, predating the band's official Rev catalog number.",
  "the storm": "Judge's final release, capturing the raw energy of late-'80s NYHC.",
  "youth of today": "A self-titled collection featuring Youth of Today's earliest and most passionate recordings.",
};

function getRevFact(title: string): string | undefined {
  return REV_FACTS[title.toLowerCase()];
}

// Convert a release to a record of the day
function toRecordOfDay(release: RevRelease): RevRecordOfDay {
  return {
    catalogNumber: release.catalogNumber,
    artist: release.artist,
    title: release.title,
    year: release.year,
    highlight: getRevFact(release.title) || `REV ${release.catalogNumber}, released in ${release.year}.`,
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
