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
  "peacetika": "An early Cows classic on AmRep, blending noise rock with absurdist humor and visceral energy.",
  "cunning stunts": "One of the Cows' most acclaimed releases, showcasing their chaotic blend of noise and dark comedy.",
  "music for insect minds": "Halo of Flies' Tom Hazelmyer founded AmRep; this is one of the label's earliest catalog entries.",
  "ethereal killer": "Hammerhead's blistering debut LP, a cornerstone of the Minneapolis noise rock scene.",
  "dope-guns-'n-fucking in the streets volumes 4-7": "Part of AmRep's legendary compilation series showcasing the label's raw roster.",
  "strap it on": "Helmet's AmRep debut; Page Hamilton's precise guitar attack previewed the sound that would break through on major labels.",
  "ozma": "A Melvins album originally released on Boner Records in 1989, before the band's later work with AmRep.",
  "bullhead": "Considered one of the Melvins' finest albums, originally released on Boner Records in 1991.",
  "lysol": "A single 30-minute track of doom-laden sludge, originally released on Boner Records in 1992.",
  "eggnog": "A five-song EP of dissonant heaviness, originally released on Boner Records in 1991.",
  "born annoying 7\" - 1989": "Helmet's first release; Page Hamilton's precise guitar attack previewed the sound that would break through on major labels.",
  "meantime": "Helmet's landmark post-AmRep album, released on Interscope Records, that brought noise rock to mainstream attention.",
  "big metal birds": "Janitor Joe's AmRep debut, featuring Kristen Pfaff who later joined Hole as their bassist.",
  "sexy pee story": "The Cows at their most provocative, with Shannon Selberg's unhinged vocals in full effect.",
  "motionless": "Chokebore's debut, a quieter, more introspective entry in the AmRep catalog.",
  "girl +": "Boss Hog's raw garage-punk, featuring Jon Spencer and Cristina Martinez.",
  "sorry in pig minor": "The Cows' final album on AmRep (1998), closing out one of the label's most important artist relationships.",
  "nationwide": "Surgery's debut on AmRep (1991), bridging post-punk and noise rock from Syracuse, New York.",
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
