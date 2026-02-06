// NBA All-Star Game data

export interface NBAAllStarPlayer {
  name: string;
  team: string;
  position: string;
}

export interface NBAAllStarTeam {
  name: string;
  captain?: string;
  players: NBAAllStarPlayer[];
}

export interface NBAAllStarGame {
  year: number;
  location: string;
  mvp?: string;
  score?: string;
  teams: NBAAllStarTeam[];
}

export const nbaAllStarGames: NBAAllStarGame[] = [
  {
    year: 2024,
    location: "Indianapolis, IN",
    mvp: "Damian Lillard",
    score: "East 211, West 186",
    teams: [
      {
        name: "Team East",
        captain: "Giannis Antetokounmpo",
        players: [
          { name: "Giannis Antetokounmpo", team: "MIL", position: "F" },
          { name: "Jayson Tatum", team: "BOS", position: "F" },
          { name: "Tyrese Haliburton", team: "IND", position: "G" },
          { name: "Damian Lillard", team: "MIL", position: "G" },
          { name: "Joel Embiid", team: "PHI", position: "C" },
          { name: "Paolo Banchero", team: "ORL", position: "F" },
          { name: "Scottie Barnes", team: "TOR", position: "F" },
          { name: "Donovan Mitchell", team: "CLE", position: "G" },
          { name: "Jalen Brunson", team: "NYK", position: "G" },
          { name: "Jaylen Brown", team: "BOS", position: "G" },
          { name: "Bam Adebayo", team: "MIA", position: "C" },
          { name: "Tyrese Maxey", team: "PHI", position: "G" },
        ],
      },
      {
        name: "Team West",
        captain: "LeBron James",
        players: [
          { name: "LeBron James", team: "LAL", position: "F" },
          { name: "Kevin Durant", team: "PHX", position: "F" },
          { name: "Stephen Curry", team: "GSW", position: "G" },
          { name: "Luka Doncic", team: "DAL", position: "G" },
          { name: "Nikola Jokic", team: "DEN", position: "C" },
          { name: "Anthony Davis", team: "LAL", position: "F" },
          { name: "Shai Gilgeous-Alexander", team: "OKC", position: "G" },
          { name: "Anthony Edwards", team: "MIN", position: "G" },
          { name: "Kawhi Leonard", team: "LAC", position: "F" },
          { name: "Paul George", team: "LAC", position: "F" },
          { name: "Devin Booker", team: "PHX", position: "G" },
          { name: "Karl-Anthony Towns", team: "MIN", position: "C" },
        ],
      },
    ],
  },
  {
    year: 2023,
    location: "Salt Lake City, UT",
    mvp: "Jayson Tatum",
    score: "Team Giannis 184, Team LeBron 175",
    teams: [
      {
        name: "Team Giannis",
        captain: "Giannis Antetokounmpo",
        players: [
          { name: "Giannis Antetokounmpo", team: "MIL", position: "F" },
          { name: "Jayson Tatum", team: "BOS", position: "F" },
          { name: "Kyrie Irving", team: "BKN", position: "G" },
          { name: "Donovan Mitchell", team: "CLE", position: "G" },
          { name: "Joel Embiid", team: "PHI", position: "C" },
          { name: "Lauri Markkanen", team: "UTA", position: "F" },
          { name: "Jaylen Brown", team: "BOS", position: "G" },
          { name: "Pascal Siakam", team: "TOR", position: "F" },
          { name: "Bam Adebayo", team: "MIA", position: "C" },
          { name: "De'Aaron Fox", team: "SAC", position: "G" },
          { name: "Julius Randle", team: "NYK", position: "F" },
          { name: "Jaren Jackson Jr.", team: "MEM", position: "F" },
        ],
      },
      {
        name: "Team LeBron",
        captain: "LeBron James",
        players: [
          { name: "LeBron James", team: "LAL", position: "F" },
          { name: "Luka Doncic", team: "DAL", position: "G" },
          { name: "Nikola Jokic", team: "DEN", position: "C" },
          { name: "Ja Morant", team: "MEM", position: "G" },
          { name: "Zion Williamson", team: "NOP", position: "F" },
          { name: "Shai Gilgeous-Alexander", team: "OKC", position: "G" },
          { name: "Damian Lillard", team: "POR", position: "G" },
          { name: "Anthony Edwards", team: "MIN", position: "G" },
          { name: "Paul George", team: "LAC", position: "F" },
          { name: "Domantas Sabonis", team: "SAC", position: "C" },
          { name: "Tyrese Haliburton", team: "IND", position: "G" },
          { name: "Jalen Brunson", team: "NYK", position: "G" },
        ],
      },
    ],
  },
  {
    year: 2022,
    location: "Cleveland, OH",
    mvp: "Stephen Curry",
    score: "Team LeBron 163, Team Durant 160",
    teams: [
      {
        name: "Team LeBron",
        captain: "LeBron James",
        players: [
          { name: "LeBron James", team: "LAL", position: "F" },
          { name: "Giannis Antetokounmpo", team: "MIL", position: "F" },
          { name: "Stephen Curry", team: "GSW", position: "G" },
          { name: "Nikola Jokic", team: "DEN", position: "C" },
          { name: "DeMar DeRozan", team: "CHI", position: "G" },
          { name: "Luka Doncic", team: "DAL", position: "G" },
          { name: "Darius Garland", team: "CLE", position: "G" },
          { name: "Chris Paul", team: "PHX", position: "G" },
          { name: "Jimmy Butler", team: "MIA", position: "F" },
          { name: "Fred VanVleet", team: "TOR", position: "G" },
        ],
      },
      {
        name: "Team Durant",
        captain: "Kevin Durant",
        players: [
          { name: "Joel Embiid", team: "PHI", position: "C" },
          { name: "Jayson Tatum", team: "BOS", position: "F" },
          { name: "Ja Morant", team: "MEM", position: "G" },
          { name: "Trae Young", team: "ATL", position: "G" },
          { name: "Andrew Wiggins", team: "GSW", position: "F" },
          { name: "Devin Booker", team: "PHX", position: "G" },
          { name: "Zach LaVine", team: "CHI", position: "G" },
          { name: "Karl-Anthony Towns", team: "MIN", position: "C" },
          { name: "Khris Middleton", team: "MIL", position: "F" },
          { name: "Rudy Gobert", team: "UTA", position: "C" },
        ],
      },
    ],
  },
  {
    year: 2021,
    location: "Atlanta, GA",
    mvp: "Giannis Antetokounmpo",
    score: "Team LeBron 170, Team Durant 150",
    teams: [
      {
        name: "Team LeBron",
        captain: "LeBron James",
        players: [
          { name: "LeBron James", team: "LAL", position: "F" },
          { name: "Giannis Antetokounmpo", team: "MIL", position: "F" },
          { name: "Stephen Curry", team: "GSW", position: "G" },
          { name: "Luka Doncic", team: "DAL", position: "G" },
          { name: "Nikola Jokic", team: "DEN", position: "C" },
          { name: "Damian Lillard", team: "POR", position: "G" },
          { name: "Ben Simmons", team: "PHI", position: "G" },
          { name: "Chris Paul", team: "PHX", position: "G" },
          { name: "Jaylen Brown", team: "BOS", position: "G" },
          { name: "Paul George", team: "LAC", position: "F" },
          { name: "Domantas Sabonis", team: "IND", position: "C" },
          { name: "Rudy Gobert", team: "UTA", position: "C" },
        ],
      },
      {
        name: "Team Durant",
        captain: "Kevin Durant",
        players: [
          { name: "Kyrie Irving", team: "BKN", position: "G" },
          { name: "Joel Embiid", team: "PHI", position: "C" },
          { name: "Kawhi Leonard", team: "LAC", position: "F" },
          { name: "Bradley Beal", team: "WAS", position: "G" },
          { name: "Jayson Tatum", team: "BOS", position: "F" },
          { name: "James Harden", team: "BKN", position: "G" },
          { name: "Devin Booker", team: "PHX", position: "G" },
          { name: "Zion Williamson", team: "NOP", position: "F" },
          { name: "Zach LaVine", team: "CHI", position: "G" },
          { name: "Julius Randle", team: "NYK", position: "F" },
          { name: "Nikola Vucevic", team: "ORL", position: "C" },
          { name: "Donovan Mitchell", team: "UTA", position: "G" },
        ],
      },
    ],
  },
  {
    year: 2020,
    location: "Chicago, IL",
    mvp: "Kawhi Leonard",
    score: "Team LeBron 157, Team Giannis 155",
    teams: [
      {
        name: "Team LeBron",
        captain: "LeBron James",
        players: [
          { name: "LeBron James", team: "LAL", position: "F" },
          { name: "Anthony Davis", team: "LAL", position: "F" },
          { name: "Kawhi Leonard", team: "LAC", position: "F" },
          { name: "Luka Doncic", team: "DAL", position: "G" },
          { name: "James Harden", team: "HOU", position: "G" },
          { name: "Damian Lillard", team: "POR", position: "G" },
          { name: "Ben Simmons", team: "PHI", position: "G" },
          { name: "Nikola Jokic", team: "DEN", position: "C" },
          { name: "Chris Paul", team: "OKC", position: "G" },
          { name: "Russell Westbrook", team: "HOU", position: "G" },
          { name: "Domantas Sabonis", team: "IND", position: "C" },
          { name: "Jayson Tatum", team: "BOS", position: "F" },
        ],
      },
      {
        name: "Team Giannis",
        captain: "Giannis Antetokounmpo",
        players: [
          { name: "Giannis Antetokounmpo", team: "MIL", position: "F" },
          { name: "Joel Embiid", team: "PHI", position: "C" },
          { name: "Pascal Siakam", team: "TOR", position: "F" },
          { name: "Kemba Walker", team: "BOS", position: "G" },
          { name: "Trae Young", team: "ATL", position: "G" },
          { name: "Khris Middleton", team: "MIL", position: "F" },
          { name: "Bam Adebayo", team: "MIA", position: "C" },
          { name: "Jimmy Butler", team: "MIA", position: "F" },
          { name: "Rudy Gobert", team: "UTA", position: "C" },
          { name: "Kyle Lowry", team: "TOR", position: "G" },
          { name: "Brandon Ingram", team: "NOP", position: "F" },
          { name: "Donovan Mitchell", team: "UTA", position: "G" },
        ],
      },
    ],
  },
];

export function getNBAAllStarYears(): number[] {
  return nbaAllStarGames.map((g) => g.year);
}

export function getNBAAllStarByYear(year: number): NBAAllStarGame | undefined {
  return nbaAllStarGames.find((g) => g.year === year);
}

export function getLatestNBAAllStar(): NBAAllStarGame | undefined {
  return nbaAllStarGames[0];
}
