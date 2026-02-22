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
  `https://a.espncdn.com/i/teamlogos/nhl/500/${abbrev.toLowerCase()}.png`;

export const nhlTeams: TeamSpotlight[] = [
  { id: "mtl", name: "Montreal Canadiens", abbreviation: "MTL", logoUrl: logo("mtl"), conference: "Eastern", division: "Atlantic", founded: 1909, championships: 24, fact: "Hold the record for most Stanley Cup victories (24), earning them the nickname 'Les Habitants.'" },
  { id: "tor", name: "Toronto Maple Leafs", abbreviation: "TOR", logoUrl: logo("tor"), conference: "Eastern", division: "Atlantic", founded: 1917, championships: 13, fact: "Haven't won the Stanley Cup since 1967 — the longest active drought in the NHL." },
  { id: "det", name: "Detroit Red Wings", abbreviation: "DET", logoUrl: logo("det"), conference: "Eastern", division: "Atlantic", founded: 1926, championships: 11, fact: "The octopus-throwing tradition at Joe Louis Arena began in 1952 — eight tentacles for eight playoff wins needed then." },
  { id: "bos", name: "Boston Bruins", abbreviation: "BOS", logoUrl: logo("bos"), conference: "Eastern", division: "Atlantic", founded: 1924, championships: 6, fact: "The first American team in the NHL and the first to use an indoor ice-making machine (Zamboni)." },
  { id: "chi", name: "Chicago Blackhawks", abbreviation: "CHI", logoUrl: logo("chi"), conference: "Western", division: "Central", founded: 1926, championships: 6, fact: "Won three Stanley Cups in six years (2010, 2013, 2015), establishing a modern dynasty." },
  { id: "edm", name: "Edmonton Oilers", abbreviation: "EDM", logoUrl: logo("edm"), conference: "Western", division: "Pacific", founded: 1972, championships: 5, fact: "Wayne Gretzky led the Oilers to four Cups in five years — his trade to LA in 1988 is called 'The Trade.'" },
  { id: "pit", name: "Pittsburgh Penguins", abbreviation: "PIT", logoUrl: logo("pit"), conference: "Eastern", division: "Metropolitan", founded: 1967, championships: 5, fact: "Have had three generational talents: Mario Lemieux, Jaromir Jagr, and Sidney Crosby." },
  { id: "nyi", name: "New York Islanders", abbreviation: "NYI", logoUrl: logo("nyi"), conference: "Eastern", division: "Metropolitan", founded: 1972, championships: 4, fact: "Won four consecutive Stanley Cups from 1980 to 1983 — the last American team to four-peat." },
  { id: "nyr", name: "New York Rangers", abbreviation: "NYR", logoUrl: logo("nyr"), conference: "Eastern", division: "Metropolitan", founded: 1926, championships: 4, fact: "Play at Madison Square Garden, known as 'The World's Most Famous Arena,' in the heart of Manhattan." },
  { id: "njd", name: "New Jersey Devils", abbreviation: "NJ", logoUrl: logo("nj"), conference: "Eastern", division: "Metropolitan", founded: 1974, championships: 3, fact: "Martin Brodeur set virtually every goaltending record with the Devils, including most career wins (691)." },
  { id: "col", name: "Colorado Avalanche", abbreviation: "COL", logoUrl: logo("col"), conference: "Western", division: "Central", founded: 1972, championships: 3, fact: "Won the Cup in their very first season in Colorado (1996) after relocating from Quebec." },
  { id: "tb", name: "Tampa Bay Lightning", abbreviation: "TB", logoUrl: logo("tb"), conference: "Eastern", division: "Atlantic", founded: 1992, championships: 3, fact: "Won back-to-back Cups in 2020 and 2021, with the 2020 championship played in a bubble due to COVID-19." },
  { id: "car", name: "Carolina Hurricanes", abbreviation: "CAR", logoUrl: logo("car"), conference: "Eastern", division: "Metropolitan", founded: 1972, championships: 1, fact: "Famous for their post-win 'Storm Surge' celebrations that became a viral sensation in 2018-19." },
  { id: "dal", name: "Dallas Stars", abbreviation: "DAL", logoUrl: logo("dal"), conference: "Western", division: "Central", founded: 1967, championships: 1, fact: "Won the 1999 Cup on Brett Hull's controversial 'No Goal' — his skate was in the crease on the series-winning goal." },
  { id: "ana", name: "Anaheim Ducks", abbreviation: "ANA", logoUrl: logo("ana"), conference: "Western", division: "Pacific", founded: 1993, championships: 1, fact: "Originally the Mighty Ducks of Anaheim, founded by Disney and inspired by the movie franchise." },
  { id: "stl", name: "St. Louis Blues", abbreviation: "STL", logoUrl: logo("stl"), conference: "Western", division: "Central", founded: 1967, championships: 1, fact: "Won their first Cup in 2019 after being last in the NHL standings in January of that season." },
  { id: "wsh", name: "Washington Capitals", abbreviation: "WSH", logoUrl: logo("wsh"), conference: "Eastern", division: "Metropolitan", founded: 1974, championships: 1, fact: "Alex Ovechkin's pursuit of Wayne Gretzky's all-time goals record has captivated hockey fans worldwide." },
  { id: "cgy", name: "Calgary Flames", abbreviation: "CGY", logoUrl: logo("cgy"), conference: "Western", division: "Pacific", founded: 1972, championships: 1, fact: "Named for the Great Fire of Atlanta — the team relocated from Atlanta to Calgary in 1980." },
  { id: "vgk", name: "Vegas Golden Knights", abbreviation: "VGK", logoUrl: logo("vgk"), conference: "Western", division: "Pacific", founded: 2017, championships: 1, fact: "Reached the Stanley Cup Finals in their inaugural season (2018), a feat unprecedented in modern pro sports." },
  { id: "fla", name: "Florida Panthers", abbreviation: "FLA", logoUrl: logo("fla"), conference: "Eastern", division: "Atlantic", founded: 1993, championships: 1, fact: "Named after the endangered Florida panther — there are fewer than 200 of these big cats left in the wild." },
  { id: "van", name: "Vancouver Canucks", abbreviation: "VAN", logoUrl: logo("van"), conference: "Western", division: "Pacific", founded: 1970, championships: 0, fact: "Have been to three Stanley Cup Finals (1982, 1994, 2011) but have never won the Cup." },
  { id: "buf", name: "Buffalo Sabres", abbreviation: "BUF", logoUrl: logo("buf"), conference: "Eastern", division: "Atlantic", founded: 1970, championships: 0, fact: "Their 1999 Cup Finals loss featured the controversial 'No Goal' call — one of hockey's most debated moments." },
  { id: "phi", name: "Philadelphia Flyers", abbreviation: "PHI", logoUrl: logo("phi"), conference: "Eastern", division: "Metropolitan", founded: 1967, championships: 2, fact: "The 'Broad Street Bullies' of the 1970s were known as the toughest team in hockey history." },
  { id: "ott", name: "Ottawa Senators", abbreviation: "OTT", logoUrl: logo("ott"), conference: "Eastern", division: "Atlantic", founded: 1992, championships: 0, fact: "A revival of the original Senators franchise that won 11 Stanley Cups in the early 1900s." },
  { id: "wpg", name: "Winnipeg Jets", abbreviation: "WPG", logoUrl: logo("wpg"), conference: "Western", division: "Central", founded: 2011, championships: 0, fact: "The second iteration of the Jets — the original franchise moved to Arizona in 1996, and this team relocated from Atlanta in 2011." },
  { id: "min", name: "Minnesota Wild", abbreviation: "MIN", logoUrl: logo("min"), conference: "Western", division: "Central", founded: 2000, championships: 0, fact: "Their logo contains a hidden scene — a forest landscape, river, moon, and star form the shape of a wild animal's head." },
  { id: "nsh", name: "Nashville Predators", abbreviation: "NSH", logoUrl: logo("nsh"), conference: "Western", division: "Central", founded: 1998, championships: 0, fact: "Fans throw catfish on the ice as a tradition — inspired by Detroit's octopus-throwing tradition." },
  { id: "cbj", name: "Columbus Blue Jackets", abbreviation: "CBJ", logoUrl: logo("cbj"), conference: "Eastern", division: "Metropolitan", founded: 2000, championships: 0, fact: "Named after Ohio's Civil War heritage — Columbus was a major hub for Union Army soldiers." },
  { id: "sjs", name: "San Jose Sharks", abbreviation: "SJ", logoUrl: logo("sj"), conference: "Western", division: "Pacific", founded: 1991, championships: 0, fact: "Their 'Shark Tank' arena features a giant shark head that players skate through before games." },
  { id: "sea", name: "Seattle Kraken", abbreviation: "SEA", logoUrl: logo("sea"), conference: "Western", division: "Pacific", founded: 2021, championships: 0, fact: "The newest NHL franchise, named through a fan vote — the Kraken is a legendary sea creature from Scandinavian folklore." },
];

export function getDailyTeam(date?: Date): TeamSpotlight {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % nhlTeams.length;
  return nhlTeams[index];
}
