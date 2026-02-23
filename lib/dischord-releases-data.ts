export interface DischordRelease {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  highlight?: string;
}

export const dischordReleases: DischordRelease[] = [
  { id: 1, title: "Out of Step", artist: "Minor Threat", catalogNo: "Dischord 12", year: 1983, format: "LP", highlight: "Minor Threat's only full-length album — definitive D.C. hardcore" },
  { id: 2, title: "Repeater", artist: "Fugazi", catalogNo: "Dischord 44", year: 1990, format: "LP", highlight: "Fugazi's landmark debut LP, blending punk urgency with musical sophistication" },
  { id: 3, title: "13 Songs", artist: "Fugazi", catalogNo: "Dischord 36", year: 1989, format: "CD", highlight: "Compilation of Fugazi's first two EPs — their most iconic release" },
  { id: 4, title: "Steady Diet of Nothing", artist: "Fugazi", catalogNo: "Dischord 60", year: 1991, format: "LP", highlight: "Darker, more experimental follow-up to Repeater" },
  { id: 5, title: "In on the Kill Taker", artist: "Fugazi", catalogNo: "Dischord 70", year: 1993, format: "LP", highlight: "Raw, intense album recorded with Steve Albini and Ted Niceley" },
  { id: 6, title: "End Hits", artist: "Fugazi", catalogNo: "Dischord 110", year: 1998, format: "LP", highlight: "Experimental late-period Fugazi with expanded sonic palette" },
  { id: 7, title: "The Argument", artist: "Fugazi", catalogNo: "Dischord 125", year: 2001, format: "LP", highlight: "Fugazi's final studio album — their most musically ambitious work" },
  { id: 8, title: "End on End", artist: "Rites of Spring", catalogNo: "Dischord 15", year: 1985, format: "LP", highlight: "Debut album widely considered the birth of emo" },
  { id: 9, title: "Joyride", artist: "Government Issue", catalogNo: "Dischord 29", year: 1987, format: "LP", highlight: "Government Issue's melodic evolution from raw hardcore" },
  { id: 10, title: "Can I Say", artist: "Dag Nasty", catalogNo: "Dischord 22", year: 1986, format: "LP", highlight: "Pioneering melodic hardcore album featuring Shawn Brown on vocals" },
  { id: 11, title: "For Your Own Special Sweetheart", artist: "Jawbox", catalogNo: "Dischord 86", year: 1994, format: "LP", highlight: "Jawbox's Dischord swan song — a post-hardcore masterpiece" },
  { id: 12, title: "Pony Express Record", artist: "Shudder to Think", catalogNo: "Dischord 83", year: 1994, format: "LP", highlight: "Ambitious art-punk that pushed Dischord's boundaries" },
  { id: 13, title: "Faith / Void", artist: "Void", catalogNo: "Dischord 10", year: 1982, format: "LP", highlight: "Legendary split LP — Void's side is sonic chaos incarnate" },
  { id: 14, title: "Red Medicine", artist: "Fugazi", catalogNo: "Dischord 95", year: 1995, format: "LP", highlight: "Adventurous mid-career album with unexpected textures and rhythms" },
  { id: 15, title: "Embrace", artist: "Embrace", catalogNo: "Dischord 30", year: 1987, format: "LP", highlight: "Ian MacKaye's post-Minor Threat band — key Revolution Summer document" },
];

export function getDischordReleaseById(id: number): DischordRelease | undefined {
  return dischordReleases.find((release) => release.id === id);
}
