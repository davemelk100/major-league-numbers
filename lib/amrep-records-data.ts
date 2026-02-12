import { amrepReleases, type AmrepRelease } from "./amrep-releases-data";

export interface AmrepRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const AMREP_FACTS: Record<string, string> = {
  "peacetika": "The Cows' debut on AmRep, blending noise rock with absurdist humor and visceral energy.",
  "cunning stunts": "One of the Cows' most acclaimed releases, showcasing their chaotic blend of noise and dark comedy.",
  "music for insect minds": "Halo of Flies' Tom Hazelmyer founded AmRep; this is one of the label's earliest catalog entries.",
  "ethereal killer": "Hammerhead's blistering debut LP, a cornerstone of the Minneapolis noise rock scene.",
  "dope-guns-'n-fucking in the streets volumes 4-7": "Part of AmRep's legendary compilation series showcasing the label's raw roster.",
  "strap it on": "The Melvins' AmRep debut; Buzz Osborne's sludgy riffs helped shape an entire genre.",
  "ozma": "The Melvins' second AmRep release, further cementing their reputation as sludge-metal pioneers.",
  "bullhead": "Considered one of the Melvins' finest albums, a crushing exercise in slow, heavy repetition.",
  "lysol": "A single 30-minute track of doom-laden sludge; one of the Melvins' most uncompromising statements.",
  "eggnog": "A five-song EP of dissonant heaviness that bridged Bullhead and the Lysol era.",
  "born annoying 7\" - 1989": "Helmet's first release; Page Hamilton's precise guitar attack previewed the sound that would break through on major labels.",
  "meantime": "Helmet's landmark album that brought noise rock to mainstream attention via Interscope Records.",
  "big metal birds": "Janitor Joe's AmRep debut, featuring future Babes in Toyland member Matt Tougas.",
  "sexy pee story": "The Cows at their most provocative, with Shannon Selberg's unhinged vocals in full effect.",
  "motionless": "Chokebore's debut, a quieter, more introspective entry in the AmRep catalog.",
  "girl +": "Boss Hog's raw garage-punk, featuring Jon Spencer and Cristina Martinez.",
  "into the unknown": "Cows' final album on AmRep, closing out one of the label's most important artist relationships.",
  "peel": "Surgery's debut on AmRep, bridging post-punk and noise rock.",
  "king buzzo": "Melvins frontman Buzz Osborne's solo acoustic debut on AmRep.",
};

function getAmrepFact(title: string): string | undefined {
  return AMREP_FACTS[title.toLowerCase()];
}

// Convert a release to a record of the day
function toRecordOfDay(release: AmrepRelease): AmrepRecordOfDay {
  const catalogLabel = release.catalogNo ? `AmRep ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getAmrepFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
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
