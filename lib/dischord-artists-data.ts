export interface DischordArtist {
  id: number;
  name: string;
  description?: string;
}

export const dischordArtists: DischordArtist[] = [
  { id: 1, name: "Minor Threat", description: "Seminal D.C. hardcore band fronted by Ian MacKaye. Active 1980–1983, they defined the straight edge movement and released some of the most influential hardcore punk recordings ever made." },
  { id: 2, name: "Fugazi", description: "Post-hardcore pioneers formed in 1987 by Ian MacKaye and Guy Picciotto. Known for their fiercely independent ethos, low door prices, and genre-defying music across seven studio albums." },
  { id: 3, name: "Bad Brains", description: "Legendary D.C. band blending hardcore punk with reggae. Formed in 1977, they are widely regarded as one of the most important hardcore punk bands of all time." },
  { id: 4, name: "Rites of Spring", description: "Often credited as the first emo band. Fronted by Guy Picciotto, their self-titled 1985 album brought emotional intensity to the D.C. hardcore scene." },
  { id: 5, name: "Government Issue", description: "D.C. hardcore band led by John Stabb, active 1980–1989. Evolved from raw hardcore to a more melodic, adventurous sound across multiple Dischord releases." },
  { id: 6, name: "Dag Nasty", description: "Melodic hardcore band featuring Brian Baker of Minor Threat. Their 1986 debut Can I Say helped define the melodic hardcore genre." },
  { id: 7, name: "Jawbox", description: "Post-hardcore band active 1989–1997. Known for angular guitar work and dynamic songwriting, they released two albums on Dischord before signing to Atlantic." },
  { id: 8, name: "Shudder to Think", description: "Art-punk band known for complex arrangements and Craig Wedren's distinctive vocals. Released early material on Dischord before moving to Epic Records." },
  { id: 9, name: "Lungfish", description: "Post-hardcore band known for their hypnotic, repetitive style and Daniel Higgs' poetic lyrics. Released numerous albums on Dischord from 1990 through the 2000s." },
  { id: 10, name: "The Evens", description: "Duo of Ian MacKaye and Amy Farina, playing a stripped-down style of punk-influenced indie rock. Released three albums on Dischord." },
  { id: 11, name: "Embrace", description: "Short-lived but influential band fronted by Ian MacKaye between Minor Threat and Fugazi. Their 1987 self-titled album is a key document of the Revolution Summer era." },
  { id: 12, name: "Void", description: "Chaotic hardcore band from Columbia, Maryland. Their split LP with The Faith (Dischord No. 10) is one of the most intense hardcore recordings ever released." },
  { id: 13, name: "Scream", description: "D.C. hardcore band whose lineup included a young Dave Grohl on drums. Active 1981–1990, they brought a hard rock edge to the Dischord sound." },
  { id: 14, name: "Q and Not U", description: "Post-punk band active 2000–2005. Known for their angular, danceable take on post-hardcore, they released three albums on Dischord." },
  { id: 15, name: "Channels", description: "Post-punk band formed from members of Medications and Faraquet. Released their debut on Dischord in 2008, blending art-rock with D.C. punk energy." },
];

export function getDischordArtistById(id: number): DischordArtist | undefined {
  return dischordArtists.find((artist) => artist.id === id);
}
