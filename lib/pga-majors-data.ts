export interface MajorWinner {
  year: number;
  tournament: string;
  winner: string;
  country: string;
  score: string;
  course: string;
}

export const majorWinners: MajorWinner[] = [
  // 2024
  { year: 2024, tournament: "Masters", winner: "Scottie Scheffler", country: "USA", score: "-11 (277)", course: "Augusta National" },
  { year: 2024, tournament: "PGA Championship", winner: "Xander Schauffele", country: "USA", score: "-21 (263)", course: "Valhalla Golf Club" },
  { year: 2024, tournament: "U.S. Open", winner: "Bryson DeChambeau", country: "USA", score: "-6 (274)", course: "Pinehurst No. 2" },
  { year: 2024, tournament: "The Open Championship", winner: "Xander Schauffele", country: "USA", score: "-9 (275)", course: "Royal Troon" },

  // 2023
  { year: 2023, tournament: "Masters", winner: "Jon Rahm", country: "Spain", score: "-12 (276)", course: "Augusta National" },
  { year: 2023, tournament: "PGA Championship", winner: "Brooks Koepka", country: "USA", score: "-9 (275)", course: "Oak Hill Country Club" },
  { year: 2023, tournament: "U.S. Open", winner: "Wyndham Clark", country: "USA", score: "-10 (270)", course: "Los Angeles Country Club" },
  { year: 2023, tournament: "The Open Championship", winner: "Brian Harman", country: "USA", score: "-13 (271)", course: "Royal Liverpool" },

  // 2022
  { year: 2022, tournament: "Masters", winner: "Scottie Scheffler", country: "USA", score: "-10 (278)", course: "Augusta National" },
  { year: 2022, tournament: "PGA Championship", winner: "Justin Thomas", country: "USA", score: "-5 (275)", course: "Southern Hills" },
  { year: 2022, tournament: "U.S. Open", winner: "Matt Fitzpatrick", country: "England", score: "-6 (274)", course: "The Country Club" },
  { year: 2022, tournament: "The Open Championship", winner: "Cameron Smith", country: "Australia", score: "-20 (268)", course: "St Andrews" },

  // 2021
  { year: 2021, tournament: "Masters", winner: "Hideki Matsuyama", country: "Japan", score: "-10 (278)", course: "Augusta National" },
  { year: 2021, tournament: "PGA Championship", winner: "Phil Mickelson", country: "USA", score: "-6 (282)", course: "Kiawah Island" },
  { year: 2021, tournament: "U.S. Open", winner: "Jon Rahm", country: "Spain", score: "-6 (278)", course: "Torrey Pines" },
  { year: 2021, tournament: "The Open Championship", winner: "Collin Morikawa", country: "USA", score: "-15 (265)", course: "Royal St George's" },

  // 2020
  { year: 2020, tournament: "Masters", winner: "Dustin Johnson", country: "USA", score: "-20 (268)", course: "Augusta National" },
  { year: 2020, tournament: "PGA Championship", winner: "Collin Morikawa", country: "USA", score: "-13 (267)", course: "TPC Harding Park" },
  { year: 2020, tournament: "U.S. Open", winner: "Bryson DeChambeau", country: "USA", score: "-6 (274)", course: "Winged Foot" },
  { year: 2020, tournament: "The Open Championship", winner: "No tournament", country: "—", score: "—", course: "Cancelled (COVID-19)" },

  // 2019
  { year: 2019, tournament: "Masters", winner: "Tiger Woods", country: "USA", score: "-13 (275)", course: "Augusta National" },
  { year: 2019, tournament: "PGA Championship", winner: "Brooks Koepka", country: "USA", score: "-8 (272)", course: "Bethpage Black" },
  { year: 2019, tournament: "U.S. Open", winner: "Gary Woodland", country: "USA", score: "-13 (271)", course: "Pebble Beach" },
  { year: 2019, tournament: "The Open Championship", winner: "Shane Lowry", country: "Ireland", score: "-15 (269)", course: "Royal Portrush" },

  // 2018
  { year: 2018, tournament: "Masters", winner: "Patrick Reed", country: "USA", score: "-15 (273)", course: "Augusta National" },
  { year: 2018, tournament: "PGA Championship", winner: "Brooks Koepka", country: "USA", score: "-16 (264)", course: "Bellerive" },
  { year: 2018, tournament: "U.S. Open", winner: "Brooks Koepka", country: "USA", score: "+1 (281)", course: "Shinnecock Hills" },
  { year: 2018, tournament: "The Open Championship", winner: "Francesco Molinari", country: "Italy", score: "-8 (276)", course: "Carnoustie" },

  // 2017
  { year: 2017, tournament: "Masters", winner: "Sergio Garcia", country: "Spain", score: "-9 (279)", course: "Augusta National" },
  { year: 2017, tournament: "PGA Championship", winner: "Justin Thomas", country: "USA", score: "-8 (276)", course: "Quail Hollow" },
  { year: 2017, tournament: "U.S. Open", winner: "Brooks Koepka", country: "USA", score: "-16 (272)", course: "Erin Hills" },
  { year: 2017, tournament: "The Open Championship", winner: "Jordan Spieth", country: "USA", score: "-12 (268)", course: "Royal Birkdale" },

  // 2016
  { year: 2016, tournament: "Masters", winner: "Danny Willett", country: "England", score: "-5 (283)", course: "Augusta National" },
  { year: 2016, tournament: "PGA Championship", winner: "Jimmy Walker", country: "USA", score: "-14 (266)", course: "Baltusrol" },
  { year: 2016, tournament: "U.S. Open", winner: "Dustin Johnson", country: "USA", score: "-4 (276)", course: "Oakmont" },
  { year: 2016, tournament: "The Open Championship", winner: "Henrik Stenson", country: "Sweden", score: "-20 (264)", course: "Royal Troon" },

  // 2015
  { year: 2015, tournament: "Masters", winner: "Jordan Spieth", country: "USA", score: "-18 (270)", course: "Augusta National" },
  { year: 2015, tournament: "PGA Championship", winner: "Jason Day", country: "Australia", score: "-20 (268)", course: "Whistling Straits" },
  { year: 2015, tournament: "U.S. Open", winner: "Jordan Spieth", country: "USA", score: "-5 (275)", course: "Chambers Bay" },
  { year: 2015, tournament: "The Open Championship", winner: "Zach Johnson", country: "USA", score: "-15 (273)", course: "St Andrews" },
];

export function getMajorsByYear(): Record<number, MajorWinner[]> {
  const byYear: Record<number, MajorWinner[]> = {};
  for (const winner of majorWinners) {
    if (!byYear[winner.year]) {
      byYear[winner.year] = [];
    }
    byYear[winner.year].push(winner);
  }
  return byYear;
}

export function getMajorYears(): number[] {
  const years = [...new Set(majorWinners.map((w) => w.year))];
  return years.sort((a, b) => b - a);
}

export function getMajorsByTournament(): Record<string, MajorWinner[]> {
  const byTournament: Record<string, MajorWinner[]> = {};
  for (const winner of majorWinners) {
    if (!byTournament[winner.tournament]) {
      byTournament[winner.tournament] = [];
    }
    byTournament[winner.tournament].push(winner);
  }
  return byTournament;
}
