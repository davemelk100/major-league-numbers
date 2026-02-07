// Revelation Records Artists/Bands

export interface RevArtist {
  id: string;
  name: string;
  genre?: string;
  yearsActive?: string;
  notableReleases?: string[];
}

export const revArtists: RevArtist[] = [
  { id: "youth-of-today", name: "Youth of Today" },
  { id: "warzone", name: "Warzone" },
  { id: "sick-of-it-all", name: "Sick of It All" },
  { id: "down-to-nothing", name: "Down To Nothing" },
  { id: "praise", name: "Praise" },
  { id: "civ", name: "CIV" },
  { id: "garrison", name: "Garrison" },
  { id: "self-defense-family", name: "Self Defense Family" },
  { id: "calling-hours", name: "Calling Hours" },
  { id: "dag-nasty", name: "Dag Nasty" },
  { id: "himsa", name: "Himsa" },
  { id: "quicksand", name: "Quicksand" },
  { id: "new-found-glory", name: "New Found Glory" },
  { id: "inside-out", name: "Inside Out" },
  { id: "side-by-side", name: "Side By Side" },
  { id: "speedway", name: "Speedway" },
  { id: "gameface", name: "Gameface" },
  { id: "chain-of-strength", name: "Chain of Strength" },
  { id: "sinking-ships", name: "Sinking Ships" },
  { id: "fall-silent", name: "Fall Silent" },
  { id: "in-my-eyes", name: "In My Eyes" },
  { id: "farside", name: "Farside" },
  { id: "texas-is-the-reason", name: "Texas Is The Reason" },
  { id: "shook-ones", name: "Shook Ones" },
  { id: "shelter", name: "Shelter" },
  { id: "kill-holiday", name: "Kill Holiday" },
  { id: "sincebyman", name: "Sincebyman" },
  { id: "on-the-might-of-princes", name: "On the Might of Princes" },
  { id: "the-plot-to-blow-up-the-eiffel-tower", name: "The Plot to Blow Up the Eiffel Tower" },
  { id: "kiss-it-goodbye", name: "Kiss It Goodbye" },
  { id: "judge", name: "Judge" },
  { id: "shai-hulud", name: "Shai Hulud" },
  { id: "paint-it-black", name: "Paint It Black" },
  { id: "dare", name: "Dare" },
  { id: "the-movielife", name: "The Movielife" },
  { id: "drain", name: "Drain" },
  { id: "curl-up-and-die", name: "Curl Up and Die" },
  { id: "elliott", name: "Elliott" },
  { id: "no-for-an-answer", name: "No For An Answer" },
  { id: "morning-again", name: "Morning Again" },
  { id: "spaced", name: "Spaced" },
  { id: "capital", name: "Capital" },
  { id: "living-hell", name: "Living Hell" },
  { id: "bold", name: "Bold" },
  { id: "title-fight", name: "Title Fight" },
  { id: "violent-reaction", name: "Violent Reaction" },
  { id: "fell-to-low", name: "Fell To Low" },
  { id: "by-a-thread", name: "By A Thread" },
  { id: "the-rival-mob", name: "The Rival Mob" },
  { id: "the-nerve-agents", name: "The Nerve Agents" },
  { id: "ignite", name: "Ignite" },
  { id: "big-laugh", name: "Big Laugh" },
  { id: "sense-field", name: "Sense Field" },
  { id: "mouthpiece", name: "Mouthpiece" },
  { id: "shades-apart", name: "Shades Apart" },
  { id: "planet-on-a-chain", name: "Planet On A Chain" },
  { id: "be-well", name: "Be Well" },
  { id: "primal-rite", name: "Primal Rite" },
  { id: "battery", name: "Battery" },
  { id: "gorilla-biscuits", name: "Gorilla Biscuits" },
  { id: "into-another", name: "Into Another" },
  { id: "world-be-free", name: "World Be Free" },
  { id: "turning-point", name: "Turning Point" },
  { id: "end-of-a-year", name: "End of a Year" },
  { id: "forced-order", name: "Forced Order" },
  { id: "drowningman", name: "Drowningman" },
  { id: "supertouch", name: "Supertouch" },
  { id: "where-fear-and-weapons-meet", name: "Where Fear and Weapons Meet" },
];

export function getAllRevArtists(): RevArtist[] {
  return revArtists.sort((a, b) => a.name.localeCompare(b.name));
}

export function getRevArtistById(id: string): RevArtist | undefined {
  return revArtists.find((a) => a.id === id);
}

export function searchRevArtists(query: string): RevArtist[] {
  const lowerQuery = query.toLowerCase();
  return revArtists.filter((a) => a.name.toLowerCase().includes(lowerQuery));
}
