export interface PGASpotlightPlayer {
  id: number;
  name: string;
  position: string;
  team: string;
  years: string;
  fact: string;
  imageUrl: string;
}

const espn = (id: number) => `https://a.espncdn.com/i/headshots/golf/players/full/${id}.png`;

export const pgaSpotlightPlayers: PGASpotlightPlayer[] = [
  {
    id: 401,
    name: "Tiger Woods",
    position: "Golf",
    team: "USA",
    years: "1996-present",
    fact: "Won 15 major championships and 82 PGA Tour events, tying Sam Snead's all-time record. Dominated golf for over two decades.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/President_Donald_Trump_hosts_a_reception_honoring_Black_History_Month_%2854341713089%29_%28cropped%29.jpg/500px-President_Donald_Trump_hosts_a_reception_honoring_Black_History_Month_%2854341713089%29_%28cropped%29.jpg",
  },
  {
    id: 3448,
    name: "Jack Nicklaus",
    position: "Golf",
    team: "USA",
    years: "1961-2005",
    fact: "The 'Golden Bear' holds the record for most major championship wins with 18, including six Masters titles.",
    imageUrl: espn(3448),
  },
  {
    id: 3449,
    name: "Arnold Palmer",
    position: "Golf",
    team: "USA",
    years: "1954-2006",
    fact: "Known as 'The King,' Palmer won 62 PGA Tour events and helped popularize golf through his charismatic personality and television.",
    imageUrl: espn(3449),
  },
  {
    id: 4686087,
    name: "Scottie Scheffler",
    position: "Golf",
    team: "USA",
    years: "2019-present",
    fact: "Rose to World No. 1 in 2022 and won The Masters in 2022 and 2024. One of the most dominant players in modern golf.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Scottie_Scheffler_Ryder_Cup_2025_%28cropped%29.jpg/500px-Scottie_Scheffler_Ryder_Cup_2025_%28cropped%29.jpg",
  },
  {
    id: 3470,
    name: "Rory McIlroy",
    position: "Golf",
    team: "Northern Ireland",
    years: "2007-present",
    fact: "Four-time major champion who has held the World No. 1 ranking for over 100 weeks. Known for his powerful driving.",
    imageUrl: espn(3470),
  },
  {
    id: 308,
    name: "Phil Mickelson",
    position: "Golf",
    team: "USA",
    years: "1992-present",
    fact: "Won six major championships including three Masters titles. Known as 'Lefty' despite being right-handed in everything but golf.",
    imageUrl: espn(308),
  },
  {
    id: 5765,
    name: "Jon Rahm",
    position: "Golf",
    team: "Spain",
    years: "2016-present",
    fact: "Won the 2021 U.S. Open and 2023 Masters. Former World No. 1 known for his fiery competitiveness and powerful ball-striking.",
    imageUrl: espn(5765),
  },
  {
    id: 9780,
    name: "Brooks Koepka",
    position: "Golf",
    team: "USA",
    years: "2012-present",
    fact: "Won five major championships including back-to-back U.S. Opens (2017-2018) and back-to-back PGA Championships (2018-2019).",
    imageUrl: espn(9780),
  },
  {
    id: 4364873,
    name: "Collin Morikawa",
    position: "Golf",
    team: "USA",
    years: "2019-present",
    fact: "Won two major championships by age 24: the 2020 PGA Championship and 2021 Open Championship.",
    imageUrl: espn(4364873),
  },
  {
    id: 10046,
    name: "Justin Thomas",
    position: "Golf",
    team: "USA",
    years: "2015-present",
    fact: "Won the 2017 and 2022 PGA Championships and the 2017 FedEx Cup. Known for his exceptional iron play.",
    imageUrl: espn(10046),
  },
  {
    id: 3702,
    name: "Jordan Spieth",
    position: "Golf",
    team: "USA",
    years: "2013-present",
    fact: "Won three major championships by age 23 including The Masters, U.S. Open, and The Open Championship.",
    imageUrl: espn(3702),
  },
  {
    id: 4848,
    name: "Dustin Johnson",
    position: "Golf",
    team: "USA",
    years: "2008-present",
    fact: "Won 24 PGA Tour events including the 2016 U.S. Open and 2020 Masters. Known for his incredible athleticism and length.",
    imageUrl: espn(4848),
  },
  {
    id: 3450,
    name: "Gary Player",
    position: "Golf",
    team: "South Africa",
    years: "1953-2009",
    fact: "Won nine major championships and was part of golf's 'Big Three' with Palmer and Nicklaus. Known as 'The Black Knight.'",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/All_Black_%28cropped%29.jpg/500px-All_Black_%28cropped%29.jpg",
  },
  {
    id: 3451,
    name: "Ben Hogan",
    position: "Golf",
    team: "USA",
    years: "1930-1971",
    fact: "Won nine major championships and is considered one of the greatest ball-strikers in golf history. His 1953 season is legendary.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ben_Hogan_NYWTS.jpg/500px-Ben_Hogan_NYWTS.jpg",
  },
  {
    id: 4569609,
    name: "Viktor Hovland",
    position: "Golf",
    team: "Norway",
    years: "2019-present",
    fact: "The first Norwegian to win on the PGA Tour. Known for his consistent play and infectious smile on the course.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Viktor_Hovland_Ryder_Cup_2025-205_%28cropped%29.jpg/500px-Viktor_Hovland_Ryder_Cup_2025-205_%28cropped%29.jpg",
  },
  {
    id: 9478,
    name: "Hideki Matsuyama",
    position: "Golf",
    team: "Japan",
    years: "2013-present",
    fact: "Won the 2021 Masters, becoming the first Japanese man to win a major championship.",
    imageUrl: espn(9478),
  },
  {
    id: 4374067,
    name: "Xander Schauffele",
    position: "Golf",
    team: "USA",
    years: "2017-present",
    fact: "Known as one of the most consistent players on Tour, with multiple wins and a gold medal at the 2020 Tokyo Olympics.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Xander_Schauffele_Ryder_Cup_2025_%28cropped%29.jpg/500px-Xander_Schauffele_Ryder_Cup_2025_%28cropped%29.jpg",
  },
  {
    id: 3453,
    name: "Tom Watson",
    position: "Golf",
    team: "USA",
    years: "1971-2011",
    fact: "Won eight major championships including five Open Championships. Nearly won a sixth at age 59 in 2009.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tom_Watson_after_winning_the_1982_US_Open.png/500px-Tom_Watson_after_winning_the_1982_US_Open.png",
  },
  {
    id: 3524,
    name: "Seve Ballesteros",
    position: "Golf",
    team: "Spain",
    years: "1974-2007",
    fact: "Won five major championships and was famous for his creative shot-making and Ryder Cup heroics for Europe.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Seve_Ballesteros_2006-07-19_%28cropped%29.jpg/500px-Seve_Ballesteros_2006-07-19_%28cropped%29.jpg",
  },
  {
    id: 3454,
    name: "Byron Nelson",
    position: "Golf",
    team: "USA",
    years: "1932-1965",
    fact: "Won an incredible 11 consecutive PGA Tour events in 1945, a record that may never be broken.",
    imageUrl: espn(3454),
  },
];

export function getDailyPGAPlayer(date?: Date): PGASpotlightPlayer {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % pgaSpotlightPlayers.length;
  return pgaSpotlightPlayers[index];
}
