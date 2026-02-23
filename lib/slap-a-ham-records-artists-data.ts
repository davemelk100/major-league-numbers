export interface SlapAHamRecordsArtist {
  id: number;
  name: string;
  description?: string;
}

export const slapahamrecordsArtists: SlapAHamRecordsArtist[] = [
  { id: 1, name: "Various" },
  { id: 2, name: "Crossed Out / Man Is The Bastard" },
  { id: 3, name: "Slave State (2) / Lack Of Interest" },
  { id: 4, name: "Lack Of Interest" },
  { id: 5, name: "Crossed Out" },
  { id: 6, name: "Pink Turds In Space / Charred Remains A.K.A Man Is The Bastard" },
  { id: 7, name: "Fuck On The Beach" },
  { id: 8, name: "No Use For A Name" },
  { id: 9, name: "Melvins" },
  { id: 10, name: "Pissed Happy Children / Infest" },
  { id: 11, name: "Neanderthal" },
  { id: 12, name: "Stikky" },
  { id: 13, name: "Fu Manchu" },
  { id: 14, name: "Capitalist Casualties" },
  { id: 15, name: "No Comment" },
  { id: 16, name: "Monastery (2) / Anarchus" },
  { id: 17, name: "Spazz" },
  { id: 18, name: "Lack Of Interest / Slave State" },
  { id: 19, name: "Rupture" },
  { id: 20, name: "Iabhorher" },
  { id: 21, name: "Millions Of Dead Cops* And Capitalist Casualties" },
  { id: 22, name: "Spazz / C.F.D.L." },
  { id: 23, name: "Plutocracy" },
  { id: 24, name: "Man Is The Bastard" },
  { id: 25, name: "13 (4) / EyeHateGod" },
  { id: 26, name: "Despise You / Suppression" },
  { id: 27, name: "Discordance Axis / Plutocracy" },
  { id: 28, name: "Noothgrush" },
  { id: 29, name: "Enemy Soil" },
  { id: 30, name: "Spazz / Jimmie Walker" },
  { id: 31, name: "Phobia" },
  { id: 32, name: "Benümb / The Dukes Of Hazzard" },
  { id: 33, name: "Gob (2) / Wink Martindale" },
  { id: 34, name: "Hellnation" },
  { id: 35, name: "Melt-Banana" },
  { id: 36, name: "No Le$$*" },
  { id: 37, name: "Godstomper" },
  { id: 38, name: "Slight Slappers" },
  { id: 39, name: "Gasp" },
  { id: 40, name: "Burned Up Bled Dry" },
  { id: 41, name: "Burning Witch" },
  { id: 42, name: "Ancient Chinese Secret" },
  { id: 43, name: "PHC* / Infest" },
  { id: 44, name: "East↔West Blast Test*" },
  { id: 45, name: "Yacøpsæ" },
  { id: 46, name: "Conga Fury" },
  { id: 47, name: "Otophobia" },
];

export function getSlapAHamRecordsArtistById(id: number): SlapAHamRecordsArtist | undefined {
  return slapahamrecordsArtists.find((artist) => artist.id === id);
}
