export interface NFLSpotlightPlayer {
  id: number;
  name: string;
  position: string;
  team: string;
  years: string;
  fact: string;
  imageUrl: string;
}

const espn = (id: number) => `https://a.espncdn.com/i/headshots/nfl/players/full/${id}.png`;

export const nflSpotlightPlayers: NFLSpotlightPlayer[] = [
  {
    id: 2330,
    name: "Tom Brady",
    position: "QB",
    team: "New England Patriots / Tampa Bay Buccaneers",
    years: "2000-2022",
    fact: "Won seven Super Bowls and five Super Bowl MVPs, widely considered the greatest quarterback of all time.",
    imageUrl: espn(2330),
  },
  {
    id: 3139477,
    name: "Patrick Mahomes",
    position: "QB",
    team: "Kansas City Chiefs",
    years: "2017-present",
    fact: "Won three Super Bowls and two Super Bowl MVPs before turning 30, the youngest QB to win multiple titles.",
    imageUrl: espn(3139477),
  },
  {
    id: 12,
    name: "Jerry Rice",
    position: "WR",
    team: "San Francisco 49ers",
    years: "1985-2004",
    fact: "Holds virtually every major receiving record including 1,549 receptions, 22,895 yards, and 197 receiving touchdowns.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Super_Bowl_44_Miami_Florida_NFL_Network_South_Beach_Set_Deon_Sanders_interviews_Jerry_Rice_%284331549867%29_%28cropped%29_-_Jerry_Rice.jpg/500px-Super_Bowl_44_Miami_Florida_NFL_Network_South_Beach_Set_Deon_Sanders_interviews_Jerry_Rice_%284331549867%29_%28cropped%29_-_Jerry_Rice.jpg",
  },
  {
    id: 2547,
    name: "Walter Payton",
    position: "RB",
    team: "Chicago Bears",
    years: "1975-1987",
    fact: "Known as 'Sweetness,' he held the rushing record for nearly two decades. The Man of the Year award bears his name.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/1986_Jeno%27s_Pizza_-_12_-_Walter_Payton_%28Walter_Payton_crop%29_%28cropped%29.jpg",
  },
  {
    id: 6445,
    name: "Joe Montana",
    position: "QB",
    team: "San Francisco 49ers",
    years: "1979-1994",
    fact: "Won four Super Bowls with a perfect 4-0 record and never threw an interception in Super Bowl play. Named 'Joe Cool.'",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Joe_Montana_Super_Bowl_50_%28cropped%29.jpg/500px-Joe_Montana_Super_Bowl_50_%28cropped%29.jpg",
  },
  {
    id: 2086859,
    name: "Jim Brown",
    position: "RB",
    team: "Cleveland Browns",
    years: "1957-1965",
    fact: "Led the NFL in rushing eight of his nine seasons and retired at his peak, averaging 5.2 yards per carry for his career.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Jim_Brown_%281961%29_%28cropped%29.jpg/500px-Jim_Brown_%281961%29_%28cropped%29.jpg",
  },
  {
    id: 1428,
    name: "Peyton Manning",
    position: "QB",
    team: "Indianapolis Colts / Denver Broncos",
    years: "1998-2015",
    fact: "Five-time MVP and two-time Super Bowl champion who revolutionized the quarterback position with his pre-snap reads.",
    imageUrl: espn(1428),
  },
  {
    id: 6705,
    name: "Lawrence Taylor",
    position: "LB",
    team: "New York Giants",
    years: "1981-1993",
    fact: "Changed the way defense is played in the NFL. Won three Defensive Player of the Year awards and was the 1986 MVP.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/81/Lawrence_Taylor_in_2025_%28cropped%29.jpg",
  },
  {
    id: 3916387,
    name: "Lamar Jackson",
    position: "QB",
    team: "Baltimore Ravens",
    years: "2018-present",
    fact: "Unanimous 2019 MVP at age 22, the youngest QB to win the award. Known for his electrifying dual-threat ability.",
    imageUrl: espn(3916387),
  },
  {
    id: 3918298,
    name: "Josh Allen",
    position: "QB",
    team: "Buffalo Bills",
    years: "2018-present",
    fact: "One of the most physically gifted QBs ever at 6'5\" 237 lbs. Has thrown for 30+ TDs in multiple seasons.",
    imageUrl: espn(3918298),
  },
  {
    id: 3116406,
    name: "Tyreek Hill",
    position: "WR",
    team: "Kansas City Chiefs / Miami Dolphins",
    years: "2016-present",
    fact: "Known as 'Cheetah' for his blazing speed, he recorded the fastest speed ever tracked by NFL Next Gen Stats at 23.24 mph.",
    imageUrl: espn(3116406),
  },
  {
    id: 3043078,
    name: "Derrick Henry",
    position: "RB",
    team: "Tennessee Titans / Baltimore Ravens",
    years: "2016-present",
    fact: "Rushed for 2,027 yards in 2020 and is known for his punishing running style at 6'3\" 247 lbs.",
    imageUrl: espn(3043078),
  },
  {
    id: 16716,
    name: "Aaron Donald",
    position: "DT",
    team: "Los Angeles Rams",
    years: "2014-2023",
    fact: "Three-time Defensive Player of the Year and eight-time first-team All-Pro, considered the greatest defensive tackle ever.",
    imageUrl: espn(16716),
  },
  {
    id: 15847,
    name: "Travis Kelce",
    position: "TE",
    team: "Kansas City Chiefs",
    years: "2013-present",
    fact: "Holds the record for most 1,000-yard receiving seasons by a tight end and has been named to nine Pro Bowls.",
    imageUrl: espn(15847),
  },
  {
    id: 6571,
    name: "Barry Sanders",
    position: "RB",
    team: "Detroit Lions",
    years: "1989-1998",
    fact: "One of the most elusive runners ever, he rushed for 15,269 yards and retired at 30, still in his prime.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Barry_Sanders_2019.jpg/500px-Barry_Sanders_2019.jpg",
  },
  {
    id: 964,
    name: "Ray Lewis",
    position: "LB",
    team: "Baltimore Ravens",
    years: "1996-2012",
    fact: "Two-time Defensive Player of the Year and Super Bowl XXXV MVP, considered one of the greatest linebackers ever.",
    imageUrl: espn(964),
  },
  {
    id: 4262921,
    name: "Justin Jefferson",
    position: "WR",
    team: "Minnesota Vikings",
    years: "2020-present",
    fact: "Set the NFL record for most receiving yards in a player's first two seasons with 3,016 yards.",
    imageUrl: espn(4262921),
  },
  {
    id: 4361423,
    name: "Micah Parsons",
    position: "LB",
    team: "Dallas Cowboys",
    years: "2021-present",
    fact: "Won Defensive Rookie of the Year in 2021 and has recorded 40+ sacks in his first three NFL seasons.",
    imageUrl: espn(4361423),
  },
];

export function getDailyNFLPlayer(date?: Date): NFLSpotlightPlayer {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % nflSpotlightPlayers.length;
  return nflSpotlightPlayers[index];
}
