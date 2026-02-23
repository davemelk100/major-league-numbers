export interface SlapAHamNumbersRelease {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  highlight?: string;
}

export const slapahamnumbersReleases: SlapAHamNumbersRelease[] = [
  { id: 1, title: "Your Blessened / Pronoun Piece Me", artist: "Melvins", catalogNo: "#2", year: 1990, format: "7\" Vinyl" },
  { id: 2, title: "Fighting Music", artist: "Neanderthal", catalogNo: "#4", year: 1990, format: "7\" Vinyl" },
  { id: 3, title: "Kept Between Trees", artist: "Fu Manchu", catalogNo: "#6", year: 1990, format: "7\" Vinyl" },
  { id: 4, title: "Bllleeeeaaauuurrrrgghhh! The Record", artist: "Various Artists", catalogNo: "#7", year: 1991, format: "7\" Vinyl" },
  { id: 5, title: "Crossed Out", artist: "Crossed Out", catalogNo: "#9", year: 1991, format: "7\" Vinyl" },
  { id: 6, title: "Disassembly Line", artist: "Capitalist Casualties", catalogNo: "#10", year: 1992, format: "CD" },
  { id: 7, title: "Son of Bllleeeeaaauuurrrrgghhh!", artist: "Various Artists", catalogNo: "#12", year: 1992, format: "7\" Vinyl" },
  { id: 8, title: "Love Canal / Someday", artist: "Melvins", catalogNo: "#13", year: 1992, format: "7\" Vinyl" },
  { id: 9, title: "Sweatin’ to the Oldies", artist: "Spazz", catalogNo: "#36", year: 1997, format: "CD" },
  { id: 10, title: "Bllleeeeaaauuurrrrgghhh! A Music War", artist: "Various Artists", catalogNo: "#41", year: 1998, format: "7\" Vinyl" },
  { id: 11, title: "Crush Kill Destroy", artist: "Spazz", catalogNo: "#49", year: 1999, format: "Vinyl" },
  { id: 12, title: "Power Violence Forever", artist: "Fuck on the Beach", catalogNo: "#51", year: 1999, format: "CD" },
  { id: 13, title: "Short, Fast + Loud!, Volume I", artist: "Various Artists", catalogNo: "#59", year: 2001, format: "CD" },
  { id: 14, title: "Einstweilige Vernichtung", artist: "Yacøpsæ", catalogNo: "#62", year: 2001, format: "CD" },
  { id: 15, title: "Failing Early, Failing Often", artist: "Noothgrush", catalogNo: "#63", year: 2001, format: "CD" },
];

export function getSlapAHamNumbersReleaseById(id: number): SlapAHamNumbersRelease | undefined {
  return slapahamnumbersReleases.find((release) => release.id === id);
}
