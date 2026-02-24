export interface JawboxArtist {
  id: number;
  name: string;
  description?: string;
}

export const jawboxArtists: JawboxArtist[] = [
  { id: 1, name: "Adam Wade", description: "Drums (1989–1992)" },
  { id: 2, name: "J. Robbins", description: "Vocals, Guitar (1989–1997, 2009, 2019–present)" },
  { id: 3, name: "Kim Coletta", description: "Bass (1989–1997, 2009, 2019–present)" },
  { id: 4, name: "Bill Barbot", description: "Guitar, Vocals (1991–1997, 2009, 2019–2021)" },
  { id: 5, name: "Zachary Barocas" },
  { id: 6, name: "Brooks Harlan", description: "Guitar, Vocals (2021–present)" },
];

export function getJawboxArtistById(id: number): JawboxArtist | undefined {
  return jawboxArtists.find((artist) => artist.id === id);
}
