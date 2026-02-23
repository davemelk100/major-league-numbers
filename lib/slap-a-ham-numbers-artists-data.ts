export interface SlapAHamNumbersArtist {
  id: number;
  name: string;
  description?: string;
}

export const slapahamnumbersArtists: SlapAHamNumbersArtist[] = [
  { id: 1, name: "Capitalist Casualties", description: "A prominent hardcore punk band known for their politically charged lyrics and high-energy performances." },
  { id: 2, name: "Crossed Out", description: "A key band in the powerviolence genre, integrating noise elements into hardcore punk." },
  { id: 3, name: "Fu Manchu", description: "Stoner rock band with a heavy sound and a signature style that gained a cult following." },
  { id: 4, name: "Hellnation", description: "An influential hardcore punk band known for their fast tempos and socio-political themes." },
  { id: 5, name: "Melvins", description: "Legendary band known for their unique blend of heavy metal and punk, often influencing the sludge genre." },
  { id: 6, name: "Spazz", description: "A chaotic powerviolence band noted for their extreme vocal styles and rapid-fire songs." },
  { id: 7, name: "Various Artists", description: "Contributors to notable compilation albums showcasing the wider underground scene." },
];

export function getSlapAHamNumbersArtistById(id: number): SlapAHamNumbersArtist | undefined {
  return slapahamnumbersArtists.find((artist) => artist.id === id);
}
