// World Golf Hall of Fame inductees
// Source: https://www.worldgolfhalloffame.org

export interface WGHOFInductee {
  name: string;
  inductionYear: number;
  position: string; // "Player", "Contributor", etc.
  country: string;
  playerId?: number;
}

export const wghofInductees: WGHOFInductee[] = [
  // Recent inductees
  { name: "Tiger Woods", inductionYear: 2022, position: "Player", country: "USA", playerId: 401 },
  { name: "Susie Maxwell Berning", inductionYear: 2022, position: "Player", country: "USA" },
  { name: "Tim Finchem", inductionYear: 2022, position: "Contributor", country: "USA" },
  { name: "Marion Hollins", inductionYear: 2022, position: "Contributor", country: "USA" },

  { name: "Phil Mickelson", inductionYear: 2012, position: "Player", country: "USA", playerId: 1225 },
  { name: "Padraig Harrington", inductionYear: 2024, position: "Player", country: "Ireland" },
  { name: "Tom Lehman", inductionYear: 2024, position: "Player", country: "USA" },
  { name: "Johnny Farrell", inductionYear: 2024, position: "Player", country: "USA" },

  // Legends
  { name: "Jack Nicklaus", inductionYear: 1974, position: "Player", country: "USA", playerId: 3448 },
  { name: "Arnold Palmer", inductionYear: 1974, position: "Player", country: "USA", playerId: 3449 },
  { name: "Gary Player", inductionYear: 1974, position: "Player", country: "South Africa", playerId: 3450 },
  { name: "Ben Hogan", inductionYear: 1974, position: "Player", country: "USA", playerId: 3451 },
  { name: "Sam Snead", inductionYear: 1974, position: "Player", country: "USA" },
  { name: "Bobby Jones", inductionYear: 1974, position: "Player", country: "USA" },
  { name: "Walter Hagen", inductionYear: 1974, position: "Player", country: "USA" },
  { name: "Gene Sarazen", inductionYear: 1974, position: "Player", country: "USA" },
  { name: "Byron Nelson", inductionYear: 1974, position: "Player", country: "USA", playerId: 3454 },

  { name: "Tom Watson", inductionYear: 1988, position: "Player", country: "USA", playerId: 3453 },
  { name: "Seve Ballesteros", inductionYear: 1999, position: "Player", country: "Spain", playerId: 3524 },
  { name: "Nick Faldo", inductionYear: 2013, position: "Player", country: "England" },
  { name: "Ernie Els", inductionYear: 2011, position: "Player", country: "South Africa" },
  { name: "Vijay Singh", inductionYear: 2006, position: "Player", country: "Fiji" },

  { name: "Lee Trevino", inductionYear: 1981, position: "Player", country: "USA" },
  { name: "Raymond Floyd", inductionYear: 1989, position: "Player", country: "USA" },
  { name: "Hale Irwin", inductionYear: 1992, position: "Player", country: "USA" },
  { name: "Greg Norman", inductionYear: 2001, position: "Player", country: "Australia" },
  { name: "Nick Price", inductionYear: 2003, position: "Player", country: "Zimbabwe" },
  { name: "Tom Kite", inductionYear: 2004, position: "Player", country: "USA" },
  { name: "Bernhard Langer", inductionYear: 2002, position: "Player", country: "Germany" },
  { name: "Curtis Strange", inductionYear: 2007, position: "Player", country: "USA" },
  { name: "Fred Couples", inductionYear: 2013, position: "Player", country: "USA" },
  { name: "Colin Montgomerie", inductionYear: 2013, position: "Player", country: "Scotland" },
  { name: "Davis Love III", inductionYear: 2017, position: "Player", country: "USA" },
  { name: "Ian Woosnam", inductionYear: 2017, position: "Player", country: "Wales" },
  { name: "Retief Goosen", inductionYear: 2019, position: "Player", country: "South Africa" },
  { name: "Jan Stephenson", inductionYear: 2019, position: "Player", country: "Australia" },
  { name: "Billy Payne", inductionYear: 2019, position: "Contributor", country: "USA" },
];

export function getWGHOFByYear(): Record<number, WGHOFInductee[]> {
  const byYear: Record<number, WGHOFInductee[]> = {};
  for (const inductee of wghofInductees) {
    if (!byYear[inductee.inductionYear]) {
      byYear[inductee.inductionYear] = [];
    }
    byYear[inductee.inductionYear].push(inductee);
  }
  return byYear;
}

export function getWGHOFYears(): number[] {
  const years = [...new Set(wghofInductees.map((i) => i.inductionYear))];
  return years.sort((a, b) => b - a);
}
