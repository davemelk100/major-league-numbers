// Naismith Memorial Basketball Hall of Fame data

export interface NBAHOFInductee {
  name: string;
  inductionYear: number;
  category: "Player" | "Coach" | "Contributor" | "Referee" | "Team";
  position?: string;
  teams?: string;
}

export const nbaHOFInductees: NBAHOFInductee[] = [
  // 2024
  { name: "Vince Carter", inductionYear: 2024, category: "Player", position: "G/F", teams: "TOR, NJN, ORL, PHX, DAL, MEM, SAC, ATL" },
  { name: "Michael Cooper", inductionYear: 2024, category: "Player", position: "G/F", teams: "LAL" },
  { name: "Chauncey Billups", inductionYear: 2024, category: "Player", position: "G", teams: "BOS, TOR, DEN, MIN, DET, NYK, LAC" },
  { name: "Walter Davis", inductionYear: 2024, category: "Player", position: "G", teams: "PHX, DEN, POR" },

  // 2023
  { name: "Tony Parker", inductionYear: 2023, category: "Player", position: "G", teams: "SAS, CHA" },
  { name: "Dirk Nowitzki", inductionYear: 2023, category: "Player", position: "F", teams: "DAL" },
  { name: "Dwyane Wade", inductionYear: 2023, category: "Player", position: "G", teams: "MIA, CHI, CLE" },
  { name: "Pau Gasol", inductionYear: 2023, category: "Player", position: "F/C", teams: "MEM, LAL, CHI, SAS, MIL" },
  { name: "Gregg Popovich", inductionYear: 2023, category: "Coach" },

  // 2022
  { name: "Manu Ginobili", inductionYear: 2022, category: "Player", position: "G", teams: "SAS" },
  { name: "Tim Hardaway", inductionYear: 2022, category: "Player", position: "G", teams: "GSW, MIA, DAL, DEN, IND" },
  { name: "Bob Huggins", inductionYear: 2022, category: "Coach" },
  { name: "George Karl", inductionYear: 2022, category: "Coach" },

  // 2021
  { name: "Chris Bosh", inductionYear: 2021, category: "Player", position: "F/C", teams: "TOR, MIA" },
  { name: "Paul Pierce", inductionYear: 2021, category: "Player", position: "F", teams: "BOS, BKN, WAS, LAC" },
  { name: "Chris Webber", inductionYear: 2021, category: "Player", position: "F", teams: "GSW, WAS, SAC, PHI, DET" },
  { name: "Ben Wallace", inductionYear: 2021, category: "Player", position: "C", teams: "WAS, ORL, DET, CHI, CLE" },
  { name: "Rick Adelman", inductionYear: 2021, category: "Coach" },
  { name: "Bill Russell", inductionYear: 2021, category: "Coach" },

  // 2020
  { name: "Kobe Bryant", inductionYear: 2020, category: "Player", position: "G", teams: "LAL" },
  { name: "Tim Duncan", inductionYear: 2020, category: "Player", position: "F/C", teams: "SAS" },
  { name: "Kevin Garnett", inductionYear: 2020, category: "Player", position: "F", teams: "MIN, BOS, BKN" },
  { name: "Tamika Catchings", inductionYear: 2020, category: "Player", position: "F" },
  { name: "Eddie Sutton", inductionYear: 2020, category: "Coach" },
  { name: "Rudy Tomjanovich", inductionYear: 2020, category: "Coach" },

  // 2019
  { name: "Sidney Moncrief", inductionYear: 2019, category: "Player", position: "G", teams: "MIL, ATL" },
  { name: "Jack Sikma", inductionYear: 2019, category: "Player", position: "C", teams: "SEA, MIL" },
  { name: "Bobby Jones", inductionYear: 2019, category: "Player", position: "F", teams: "DEN, PHI" },
  { name: "Paul Westphal", inductionYear: 2019, category: "Player", position: "G", teams: "BOS, PHX, SEA, NYK" },
  { name: "Al Attles", inductionYear: 2019, category: "Player", position: "G", teams: "PHI, SF, GSW" },
  { name: "Vlade Divac", inductionYear: 2019, category: "Player", position: "C", teams: "LAL, CHA, SAC" },
  { name: "Bill Fitch", inductionYear: 2019, category: "Coach" },

  // 2018
  { name: "Ray Allen", inductionYear: 2018, category: "Player", position: "G", teams: "MIL, SEA, BOS, MIA" },
  { name: "Jason Kidd", inductionYear: 2018, category: "Player", position: "G", teams: "DAL, PHX, NJN, NYK" },
  { name: "Steve Nash", inductionYear: 2018, category: "Player", position: "G", teams: "PHX, DAL, LAL" },
  { name: "Grant Hill", inductionYear: 2018, category: "Player", position: "F", teams: "DET, ORL, PHX, LAC" },
  { name: "Maurice Cheeks", inductionYear: 2018, category: "Player", position: "G", teams: "PHI, SAS, NYK, ATL, NJN" },

  // 2017
  { name: "Tracy McGrady", inductionYear: 2017, category: "Player", position: "G/F", teams: "TOR, ORL, HOU, NYK, DET, ATL, SAS" },
  { name: "Rebecca Lobo", inductionYear: 2017, category: "Player", position: "C" },
  { name: "Muffet McGraw", inductionYear: 2017, category: "Coach" },
  { name: "George McGinnis", inductionYear: 2017, category: "Player", position: "F", teams: "IND, PHI, DEN" },

  // 2016
  { name: "Shaquille O'Neal", inductionYear: 2016, category: "Player", position: "C", teams: "ORL, LAL, MIA, PHX, CLE, BOS" },
  { name: "Allen Iverson", inductionYear: 2016, category: "Player", position: "G", teams: "PHI, DEN, DET, MEM" },
  { name: "Yao Ming", inductionYear: 2016, category: "Player", position: "C", teams: "HOU" },
  { name: "Tom Izzo", inductionYear: 2016, category: "Coach" },

  // 2015
  { name: "Dikembe Mutombo", inductionYear: 2015, category: "Player", position: "C", teams: "DEN, ATL, PHI, NJN, NYK, HOU" },
  { name: "Spencer Haywood", inductionYear: 2015, category: "Player", position: "F", teams: "SEA, NYK, NO, LAL, WAS" },
  { name: "Jo Jo White", inductionYear: 2015, category: "Player", position: "G", teams: "BOS, GSW" },
  { name: "Louis Dampier", inductionYear: 2015, category: "Player", position: "G", teams: "KEN, SAS" },

  // 2014
  { name: "Alonzo Mourning", inductionYear: 2014, category: "Player", position: "C", teams: "CHA, MIA, NJN" },
  { name: "Mitch Richmond", inductionYear: 2014, category: "Player", position: "G", teams: "GSW, SAC, WAS, LAL" },
  { name: "Gary Williams", inductionYear: 2014, category: "Coach" },
  { name: "Nolan Richardson", inductionYear: 2014, category: "Coach" },

  // 2013
  { name: "Gary Payton", inductionYear: 2013, category: "Player", position: "G", teams: "SEA, MIL, LAL, BOS, MIA" },
  { name: "Bernard King", inductionYear: 2013, category: "Player", position: "F", teams: "NJN, UTA, GSW, NYK, WAS" },
  { name: "Rick Pitino", inductionYear: 2013, category: "Coach" },
  { name: "Jerry Tarkanian", inductionYear: 2013, category: "Coach" },

  // 2012
  { name: "Reggie Miller", inductionYear: 2012, category: "Player", position: "G", teams: "IND" },
  { name: "Chet Walker", inductionYear: 2012, category: "Player", position: "F", teams: "SYR, PHI, CHI" },
  { name: "Jamaal Wilkes", inductionYear: 2012, category: "Player", position: "F", teams: "GSW, LAL, LAC" },
  { name: "Don Nelson", inductionYear: 2012, category: "Coach" },

  // 2011
  { name: "Dennis Rodman", inductionYear: 2011, category: "Player", position: "F", teams: "DET, SAS, CHI, LAL, DAL" },
  { name: "Chris Mullin", inductionYear: 2011, category: "Player", position: "F", teams: "GSW, IND" },
  { name: "Artis Gilmore", inductionYear: 2011, category: "Player", position: "C", teams: "KEN, CHI, SAS, BOS" },
  { name: "Tex Winter", inductionYear: 2011, category: "Coach" },
  { name: "Arvydas Sabonis", inductionYear: 2011, category: "Player", position: "C", teams: "POR" },

  // 2010
  { name: "Scottie Pippen", inductionYear: 2010, category: "Player", position: "F", teams: "CHI, HOU, POR" },
  { name: "Karl Malone", inductionYear: 2010, category: "Player", position: "F", teams: "UTA, LAL" },
  { name: "Gus Johnson", inductionYear: 2010, category: "Player", position: "F", teams: "BAL, PHX, IND" },
  { name: "Bob McAdoo", inductionYear: 2010, category: "Player", position: "F/C", teams: "BUF, NYK, BOS, DET, NJN, LAL, PHI" },

  // 2009
  { name: "Michael Jordan", inductionYear: 2009, category: "Player", position: "G", teams: "CHI, WAS" },
  { name: "David Robinson", inductionYear: 2009, category: "Player", position: "C", teams: "SAS" },
  { name: "John Stockton", inductionYear: 2009, category: "Player", position: "G", teams: "UTA" },
  { name: "Jerry Sloan", inductionYear: 2009, category: "Coach" },
  { name: "C. Vivian Stringer", inductionYear: 2009, category: "Coach" },
];

export function getNBAHOFByYear(): Record<number, NBAHOFInductee[]> {
  const byYear: Record<number, NBAHOFInductee[]> = {};
  for (const inductee of nbaHOFInductees) {
    if (!byYear[inductee.inductionYear]) {
      byYear[inductee.inductionYear] = [];
    }
    byYear[inductee.inductionYear].push(inductee);
  }
  return byYear;
}

export function getNBAHOFYears(): number[] {
  const years = [...new Set(nbaHOFInductees.map((i) => i.inductionYear))];
  return years.sort((a, b) => b - a); // Most recent first
}

export function getNBAHOFPlayers(): NBAHOFInductee[] {
  return nbaHOFInductees.filter((i) => i.category === "Player");
}
