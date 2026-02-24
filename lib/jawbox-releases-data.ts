export interface JawboxRelease {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  highlight?: string;
}

export const jawboxReleases: JawboxRelease[] = [
  { id: 1, title: "Jawbox", artist: "Jawbox", year: 1989, format: "Cass, Promo" },
  { id: 2, title: "Untitled", artist: "Jawbox", year: 1990, format: "Cass, EP" },
  { id: 3, title: "Tools & Chrome", artist: "Jawbox", year: 1990 },
  { id: 4, title: "Air Waves Dream / With Or Without U-2", artist: "Jawbox / Jawbreaker", year: 1991 },
  { id: 5, title: "Grippe", artist: "Jawbox", year: 1991 },
  { id: 6, title: "Novelty", artist: "Jawbox", year: 1992 },
  { id: 7, title: "Tongues / Ones & Zeros", artist: "Jawbox", year: 1992 },
  { id: 8, title: "Static", artist: "Jawbox / Tar", year: 1993, format: "7\"" },
  { id: 9, title: "Your Selection", artist: "Jawbox / Edsel", year: 1993, format: "7\"" },
  { id: 10, title: "September", artist: "Jawbox / Crackerbash", year: 1993, format: "7\", Single" },
  { id: 11, title: "Motorist / Jackpot Plus!", artist: "Jawbox", year: 1993 },
  { id: 12, title: "Cooling Card", artist: "Jawbox", year: 1994, format: "CD, Promo" },
  { id: 13, title: "Jawbox", artist: "Jawbox", year: 1994, format: "CD, Promo" },
  { id: 14, title: "Savory +3", artist: "Jawbox", year: 1994 },
  { id: 15, title: "Your Choice Live Series", artist: "Leatherface / Jawbox", year: 1994 },
  { id: 16, title: "For Your Own Special Sweetheart", artist: "Jawbox", year: 1994 },
  { id: 17, title: "Absenter", artist: "Jawbox", year: 1995 },
  { id: 18, title: "Mirrorful", artist: "Jawbox", year: 1996, format: "CD, Promo" },
  { id: 19, title: "His Only Trade", artist: "Jawbox", year: 1996, format: "CD, Promo" },
  { id: 20, title: "Cornflake Girl", artist: "Jawbox", year: 1996 },
  { id: 21, title: "Jawbox", artist: "Jawbox", year: 1996 },
  { id: 22, title: "My Scrapbook Of Fatal Accidents", artist: "Jawbox", year: 1998 },
  { id: 23, title: "Live At Metro Chicago 2019", artist: "Jawbox", year: 2021 },
  { id: 24, title: "The Revisionist EP", artist: "Jawbox", year: 2022 },
];

export function getJawboxReleaseById(id: number): JawboxRelease | undefined {
  return jawboxReleases.find((release) => release.id === id);
}
