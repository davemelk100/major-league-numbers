export interface AmrepArtist {
  id: number;
  name: string;
  active: boolean;
  description?: string;
}

export const amrepArtists: AmrepArtist[] = [
  { id: 1, name: "Bailter Space", active: false },
  { id: 2, name: "Boredoms", active: false },
  { id: 3, name: "Boss Hog", active: false },
  { id: 4, name: "Brainiac", active: false },
  { id: 5, name: "Calvin Krime", active: false },
  { id: 6, name: "Chokebore", active: false },
  { id: 7, name: "Cosmic Psychos", active: false },
  { id: 8, name: "Cows", active: false },
  { id: 9, name: "Dwarves", active: false },
  { id: 10, name: "feedtime", active: false },
  { id: 11, name: "Gas Huffer", active: false },
  { id: 12, name: "Gaunt", active: false },
  { id: 13, name: "God Bullies", active: false },
  { id: 14, name: "godheadSilo", active: false },
  { id: 15, name: "Halo of Flies / H•O•F", active: false },
  { id: 16, name: "Hammerhead", active: false },
  { id: 17, name: "Helios Creed", active: false },
  { id: 18, name: "Helmet", active: false, description: "Alternative metal band with the AmRep debut 'Strap It On'." },
  { id: 19, name: "The Heroine Sheiks", active: false },
  { id: 20, name: "Janitor Joe", active: false },
  { id: 21, name: "Killdozer", active: false },
  { id: 22, name: "King Snake Roost", active: false },
  { id: 23, name: "lowercase", active: false },
  { id: 24, name: "Lubricated Goat", active: false },
  { id: 25, name: "Melvins", active: false, description: "Noise rock band long associated with AmRep's roster." },
  { id: 26, name: "Nashville Pussy", active: false },
  { id: 27, name: "Servotron", active: false },
  { id: 28, name: "Steel Pole Bath Tub", active: false },
  { id: 29, name: "Strapping Fieldhands", active: false },
  { id: 30, name: "Surgery", active: false },
  { id: 31, name: "Supernova", active: false },
  { id: 32, name: "Tad", active: false },
  { id: 33, name: "Tar", active: false },
  { id: 34, name: "Thee Headcoats", active: false },
  { id: 35, name: "Thee Mighty Caesars", active: false },
  { id: 36, name: "The Thrown Ups", active: false },
  { id: 37, name: "The U-Men", active: false },
  { id: 38, name: "The Urinals", active: false },
  { id: 39, name: "Today Is the Day", active: false },
  { id: 40, name: "Unsane", active: false },
  { id: 41, name: "Vertigo", active: false },
];

export function getAmrepArtistById(id: number): AmrepArtist | undefined {
  return amrepArtists.find((artist) => artist.id === id);
}
