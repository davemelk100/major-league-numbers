export interface TeamSpotlight {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  conference: string;
  division: string;
  founded: number;
  championships: number;
  fact: string;
}

const logo = (abbrev: string) =>
  `https://a.espncdn.com/i/teamlogos/mlb/500/${abbrev.toLowerCase()}.png`;

export const mlbTeams: TeamSpotlight[] = [
  { id: "nyy", name: "New York Yankees", abbreviation: "NYY", logoUrl: logo("nyy"), conference: "AL", division: "AL East", founded: 1901, championships: 27, fact: "Hold the record for most World Series titles (27), nearly double the next closest franchise." },
  { id: "bos", name: "Boston Red Sox", abbreviation: "BOS", logoUrl: logo("bos"), conference: "AL", division: "AL East", founded: 1901, championships: 9, fact: "Broke an 86-year championship drought in 2004, famously reversing the 'Curse of the Bambino.'" },
  { id: "lad", name: "Los Angeles Dodgers", abbreviation: "LAD", logoUrl: logo("lad"), conference: "NL", division: "NL West", founded: 1883, championships: 7, fact: "Jackie Robinson broke baseball's color barrier with the Brooklyn Dodgers in 1947." },
  { id: "stl", name: "St. Louis Cardinals", abbreviation: "STL", logoUrl: logo("stl"), conference: "NL", division: "NL Central", founded: 1882, championships: 11, fact: "Have the second-most World Series titles in MLB history and are known for the 'Cardinal Way' of developing talent." },
  { id: "sf", name: "San Francisco Giants", abbreviation: "SF", logoUrl: logo("sf"), conference: "NL", division: "NL West", founded: 1883, championships: 8, fact: "Won three World Series in five years (2010, 2012, 2014) — all in even-numbered years." },
  { id: "chc", name: "Chicago Cubs", abbreviation: "CHC", logoUrl: logo("chc"), conference: "NL", division: "NL Central", founded: 1876, championships: 3, fact: "Ended a 108-year championship drought in 2016, the longest in North American professional sports." },
  { id: "det", name: "Detroit Tigers", abbreviation: "DET", logoUrl: logo("det"), conference: "AL", division: "AL Central", founded: 1894, championships: 4, fact: "The iconic Old English 'D' logo has been used since 1904, making it one of the oldest in baseball." },
  { id: "oak", name: "Oakland Athletics", abbreviation: "OAK", logoUrl: logo("oak"), conference: "AL", division: "AL West", founded: 1901, championships: 9, fact: "Pioneered the 'Moneyball' analytics revolution under Billy Beane in the early 2000s." },
  { id: "cin", name: "Cincinnati Reds", abbreviation: "CIN", logoUrl: logo("cin"), conference: "NL", division: "NL Central", founded: 1881, championships: 5, fact: "The first professional baseball team in history, founded as the Red Stockings in 1881." },
  { id: "pit", name: "Pittsburgh Pirates", abbreviation: "PIT", logoUrl: logo("pit"), conference: "NL", division: "NL Central", founded: 1881, championships: 5, fact: "Roberto Clemente recorded his 3,000th hit in his final at-bat before his tragic death in 1972." },
  { id: "atl", name: "Atlanta Braves", abbreviation: "ATL", logoUrl: logo("atl"), conference: "NL", division: "NL East", founded: 1871, championships: 4, fact: "Won an unprecedented 14 consecutive division titles from 1991 to 2005." },
  { id: "hou", name: "Houston Astros", abbreviation: "HOU", logoUrl: logo("hou"), conference: "AL", division: "AL West", founded: 1962, championships: 2, fact: "Originally the Colt .45s, they played in the first domed stadium — the Astrodome — starting in 1965." },
  { id: "phi", name: "Philadelphia Phillies", abbreviation: "PHI", logoUrl: logo("phi"), conference: "NL", division: "NL East", founded: 1883, championships: 2, fact: "The first franchise to reach 10,000 losses in professional sports history." },
  { id: "min", name: "Minnesota Twins", abbreviation: "MIN", logoUrl: logo("min"), conference: "AL", division: "AL Central", founded: 1901, championships: 3, fact: "Named for the 'Twin Cities' of Minneapolis and St. Paul, they were originally the Washington Senators." },
  { id: "cle", name: "Cleveland Guardians", abbreviation: "CLE", logoUrl: logo("cle"), conference: "AL", division: "AL Central", founded: 1901, championships: 2, fact: "Rebranded from the Indians to the Guardians in 2022, named after the 'Guardians of Traffic' statues on the Hope Memorial Bridge." },
  { id: "bal", name: "Baltimore Orioles", abbreviation: "BAL", logoUrl: logo("bal"), conference: "AL", division: "AL East", founded: 1901, championships: 3, fact: "The Oriole Bird mascot has been voted the best in baseball multiple times by fan polls." },
  { id: "tb", name: "Tampa Bay Rays", abbreviation: "TB", logoUrl: logo("tb"), conference: "AL", division: "AL East", founded: 1998, championships: 0, fact: "Known for innovative front-office strategies, they consistently compete despite one of the lowest payrolls in baseball." },
  { id: "sea", name: "Seattle Mariners", abbreviation: "SEA", logoUrl: logo("sea"), conference: "AL", division: "AL West", founded: 1977, championships: 0, fact: "Hold the record for most wins in a season (116 in 2001), tied with the 1906 Cubs." },
  { id: "tex", name: "Texas Rangers", abbreviation: "TEX", logoUrl: logo("tex"), conference: "AL", division: "AL West", founded: 1961, championships: 1, fact: "Won their first World Series in 2023 after more than 60 years as a franchise." },
  { id: "tor", name: "Toronto Blue Jays", abbreviation: "TOR", logoUrl: logo("tor"), conference: "AL", division: "AL East", founded: 1977, championships: 2, fact: "The only Canadian team in MLB, they won back-to-back World Series in 1992 and 1993." },
  { id: "nym", name: "New York Mets", abbreviation: "NYM", logoUrl: logo("nym"), conference: "NL", division: "NL East", founded: 1962, championships: 2, fact: "The 1969 'Miracle Mets' won the World Series just seven years after losing 120 games in their inaugural season." },
  { id: "chw", name: "Chicago White Sox", abbreviation: "CHW", logoUrl: logo("chw"), conference: "AL", division: "AL Central", founded: 1901, championships: 3, fact: "Their 2005 World Series sweep ended an 88-year championship drought dating back to the 'Black Sox' scandal." },
  { id: "sd", name: "San Diego Padres", abbreviation: "SD", logoUrl: logo("sd"), conference: "NL", division: "NL West", founded: 1969, championships: 0, fact: "Tony Gwynn spent his entire 20-year career with the Padres, batting .338 lifetime with eight batting titles." },
  { id: "ari", name: "Arizona Diamondbacks", abbreviation: "ARI", logoUrl: logo("ari"), conference: "NL", division: "NL West", founded: 1998, championships: 1, fact: "Won the 2001 World Series in just their fourth year of existence, the fastest expansion team to win it all." },
  { id: "mil", name: "Milwaukee Brewers", abbreviation: "MIL", logoUrl: logo("mil"), conference: "NL", division: "NL Central", founded: 1969, championships: 0, fact: "Their classic ball-in-glove logo from the 1980s — which cleverly forms an 'M' and 'B' — is considered one of the best in sports." },
  { id: "kc", name: "Kansas City Royals", abbreviation: "KC", logoUrl: logo("kc"), conference: "AL", division: "AL Central", founded: 1969, championships: 2, fact: "Named after the American Royal, a livestock show and rodeo held annually in Kansas City." },
  { id: "col", name: "Colorado Rockies", abbreviation: "COL", logoUrl: logo("col"), conference: "NL", division: "NL West", founded: 1993, championships: 0, fact: "Play at Coors Field, the highest elevation stadium in MLB at 5,280 feet, where baseballs fly farther." },
  { id: "mia", name: "Miami Marlins", abbreviation: "MIA", logoUrl: logo("mia"), conference: "NL", division: "NL East", founded: 1993, championships: 2, fact: "Have never won a division title but have won the World Series twice (1997, 2003) as a wild card team." },
  { id: "wsh", name: "Washington Nationals", abbreviation: "WSH", logoUrl: logo("wsh"), conference: "NL", division: "NL East", founded: 1969, championships: 1, fact: "Won the 2019 World Series after starting the season 19-31, the biggest turnaround in Series history." },
  { id: "laa", name: "Los Angeles Angels", abbreviation: "LAA", logoUrl: logo("laa"), conference: "AL", division: "AL West", founded: 1961, championships: 1, fact: "Mike Trout, widely considered the best player of his generation, has spent his entire career with the Angels." },
];

export function getDailyTeam(date?: Date): TeamSpotlight {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % mlbTeams.length;
  return mlbTeams[index];
}
