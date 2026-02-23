import { touchgorecordsReleases, type TouchGoRecordsRelease } from "./touch-go-records-releases-data";
import { getLocalAlbumImage } from "./touch-go-records-release-images";

export interface TouchGoRecordsRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const TOUCHGORECORDS_FACTS: Record<string, string> = {
  "atomizer": "Big Black's 1986 masterpiece. 'Kerosene' became an underground anthem and the album defined the Touch and Go noise rock sound.",
  "songs about fucking": "Big Black's defiant final album. Steve Albini disbanded the group at their peak, refusing to repeat themselves.",
  "spiderland": "Slint's 1991 masterwork is one of the most influential albums ever made. It defined post-rock before the genre had a name.",
  "goat": "The Jesus Lizard's 1991 classic, produced by Steve Albini. David Yow's unhinged vocals over punishing noise rock at its absolute peak.",
  "locust abortion technician": "Butthole Surfers' 1987 psychedelic noise masterpiece. Opens with 'Sweat Loaf,' a warped Black Sabbath deconstruction.",
  "at action park": "Shellac's 1994 debut. Steve Albini, Bob Weston, and Todd Trainer deliver precise, angular minimalism.",
  "1000 hurts": "Shellac's 2000 album featuring 'Prayer to God,' one of the most intense songs in their catalog.",
  "tweez": "Slint's raw 1989 debut. Song titles are the names of each band member's parents.",
  "head": "The Jesus Lizard's 1990 debut. Raw, primal noise rock produced by Steve Albini.",
  "tied down": "Negative Approach's landmark 1983 Detroit hardcore album. Pure fury in under 20 minutes.",
  "rusty": "Rodan's only album (1994). A Louisville noise rock classic that spawned Shipping News, Rachel's, and other projects.",
  "what burns never returns": "Don Caballero's 1998 math rock opus. Complex polyrhythmic instrumentals that defined a genre.",
  "psychic... powerless... another man's sac": "Butthole Surfers' 1984 debut full-length. Psychedelic chaos from Texas.",
  "two nuns and a pack mule": "Rapeman's 1988 album. Steve Albini, David Wm. Sims, and Rey Washam at their most abrasive.",
  "firewater": "Silkworm's most beloved album (1996). Anthemic and devastating indie rock in equal measure.",
  "for respect": "Don Caballero's 1993 debut. Damon Che's drumming is otherworldly.",
  "fever to tell": "Yeah Yeah Yeahs' 2003 debut. 'Maps' became a defining indie anthem of the decade.",
  "the black light": "Calexico's 1998 album. Mariachi horns meet desert noir in Tucson's finest export.",
  "venus luxure no. 1 baby": "Girls Against Boys' 1993 breakthrough. Groove-laden post-hardcore with dual-bass attack.",
  "twelve point buck": "Killdozer's 1988 best. Crushing Wisconsin sludge-rock with dark humor.",
  "die kreuzen": "Die Kreuzen's 1984 self-titled debut. Among the fastest, most ferocious hardcore records ever made.",
  "upgrade & afterlife": "Gastr del Sol's 1996 avant-garde masterpiece. Where post-rock met modern composition.",
  "ben hur": "Bitch Magnet's 1990 magnum opus. Dense, propulsive noise rock that influenced math rock and post-rock.",
  "racer-x": "Big Black's 1985 EP. The sound of a drum machine and guitar being pushed to their limits.",
};

function getTouchGoRecordsFact(title: string): string | undefined {
  return TOUCHGORECORDS_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: TouchGoRecordsRelease): TouchGoRecordsRecordOfDay {
  const catalogLabel = release.catalogNo ? `TouchGoRecords ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getTouchGoRecordsFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
    coverUrl: getLocalAlbumImage(release.id) ?? undefined,
  };
}

export function getDailyTouchGoRecordsRecord(date = new Date()): TouchGoRecordsRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % touchgorecordsReleases.length;
  return toRecordOfDay(touchgorecordsReleases[index]);
}
