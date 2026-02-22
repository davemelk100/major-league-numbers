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
  `https://a.espncdn.com/i/teamlogos/nba/500/${abbrev.toLowerCase()}.png`;

export const nbaTeams: TeamSpotlight[] = [
  { id: "bos", name: "Boston Celtics", abbreviation: "BOS", logoUrl: logo("bos"), conference: "Eastern", division: "Atlantic", founded: 1946, championships: 18, fact: "Hold the record for most NBA championships (18), including eight straight from 1959 to 1966." },
  { id: "lal", name: "Los Angeles Lakers", abbreviation: "LAL", logoUrl: logo("lal"), conference: "Western", division: "Pacific", founded: 1947, championships: 17, fact: "Originally the Minneapolis Lakers, named after Minnesota's many lakes. Have retired 16 jersey numbers." },
  { id: "gsw", name: "Golden State Warriors", abbreviation: "GS", logoUrl: logo("gs"), conference: "Western", division: "Pacific", founded: 1946, championships: 7, fact: "Won 73 games in the 2015-16 regular season, the most in NBA history." },
  { id: "chi", name: "Chicago Bulls", abbreviation: "CHI", logoUrl: logo("chi"), conference: "Eastern", division: "Central", founded: 1966, championships: 6, fact: "Won six championships in eight years (1991-98) with Michael Jordan, never losing a Finals series." },
  { id: "sas", name: "San Antonio Spurs", abbreviation: "SA", logoUrl: logo("sa"), conference: "Western", division: "Southwest", founded: 1967, championships: 5, fact: "Had the longest playoff streak in NBA history at 22 consecutive appearances (1998-2019)." },
  { id: "mia", name: "Miami Heat", abbreviation: "MIA", logoUrl: logo("mia"), conference: "Eastern", division: "Southeast", founded: 1988, championships: 3, fact: "Known for their intense 'Heat Culture' — players must meet strict fitness standards before training camp." },
  { id: "phi", name: "Philadelphia 76ers", abbreviation: "PHI", logoUrl: logo("phi"), conference: "Eastern", division: "Atlantic", founded: 1946, championships: 3, fact: "Named in honor of the signing of the Declaration of Independence in Philadelphia in 1776." },
  { id: "det", name: "Detroit Pistons", abbreviation: "DET", logoUrl: logo("det"), conference: "Eastern", division: "Central", founded: 1941, championships: 3, fact: "The 2004 Pistons are the last team to win a championship without a top-10 scorer in the league." },
  { id: "mil", name: "Milwaukee Bucks", abbreviation: "MIL", logoUrl: logo("mil"), conference: "Eastern", division: "Central", founded: 1968, championships: 2, fact: "Won their first championship in just their third season (1971), the fastest expansion team to do so at the time." },
  { id: "hou", name: "Houston Rockets", abbreviation: "HOU", logoUrl: logo("hou"), conference: "Western", division: "Southwest", founded: 1967, championships: 2, fact: "Won back-to-back titles in 1994-95 while Michael Jordan was retired from basketball." },
  { id: "nyk", name: "New York Knicks", abbreviation: "NY", logoUrl: logo("ny"), conference: "Eastern", division: "Atlantic", founded: 1946, championships: 2, fact: "Play at Madison Square Garden, known as 'The Mecca of Basketball' and the world's most famous arena." },
  { id: "den", name: "Denver Nuggets", abbreviation: "DEN", logoUrl: logo("den"), conference: "Western", division: "Northwest", founded: 1967, championships: 1, fact: "Won their first championship in 2023 led by Nikola Jokic, who was drafted 41st overall." },
  { id: "dal", name: "Dallas Mavericks", abbreviation: "DAL", logoUrl: logo("dal"), conference: "Western", division: "Southwest", founded: 1980, championships: 1, fact: "Dirk Nowitzki played all 21 of his NBA seasons with the Mavericks, the longest tenure with one team for a non-American player." },
  { id: "cle", name: "Cleveland Cavaliers", abbreviation: "CLE", logoUrl: logo("cle"), conference: "Eastern", division: "Central", founded: 1970, championships: 1, fact: "Won the 2016 title after overcoming a 3-1 Finals deficit, the first team to do so in NBA history." },
  { id: "tor", name: "Toronto Raptors", abbreviation: "TOR", logoUrl: logo("tor"), conference: "Eastern", division: "Atlantic", founded: 1995, championships: 1, fact: "The only NBA team based outside the United States, they won their first title in 2019." },
  { id: "was", name: "Washington Wizards", abbreviation: "WSH", logoUrl: logo("wsh"), conference: "Eastern", division: "Southeast", founded: 1961, championships: 1, fact: "Have played under four different names: Packers, Zephyrs, Bullets, and Wizards." },
  { id: "atl", name: "Atlanta Hawks", abbreviation: "ATL", logoUrl: logo("atl"), conference: "Eastern", division: "Southeast", founded: 1946, championships: 1, fact: "Have played in four different cities: Buffalo, Tri-Cities, Milwaukee, St. Louis, and Atlanta." },
  { id: "por", name: "Portland Trail Blazers", abbreviation: "POR", logoUrl: logo("por"), conference: "Western", division: "Northwest", founded: 1970, championships: 1, fact: "Their pinwheel logo, designed in 1970, has barely changed and is considered one of the best in sports." },
  { id: "sac", name: "Sacramento Kings", abbreviation: "SAC", logoUrl: logo("sac"), conference: "Western", division: "Pacific", founded: 1923, championships: 1, fact: "The oldest franchise in the NBA, founded in 1923 as the Rochester Seagrams." },
  { id: "okc", name: "Oklahoma City Thunder", abbreviation: "OKC", logoUrl: logo("okc"), conference: "Western", division: "Northwest", founded: 1967, championships: 1, fact: "Relocated from Seattle in 2008. Drafted three future MVPs: Durant, Westbrook, and Harden." },
  { id: "phx", name: "Phoenix Suns", abbreviation: "PHX", logoUrl: logo("phx"), conference: "Western", division: "Pacific", founded: 1968, championships: 0, fact: "Lost their very first coin flip in 1969, missing out on Kareem Abdul-Jabbar (then Lew Alcindor)." },
  { id: "ind", name: "Indiana Pacers", abbreviation: "IND", logoUrl: logo("ind"), conference: "Eastern", division: "Central", founded: 1967, championships: 0, fact: "Named after the state's rich history with the Indianapolis 500 — the pace car and harness racing pacers." },
  { id: "uta", name: "Utah Jazz", abbreviation: "UTAH", logoUrl: logo("utah"), conference: "Western", division: "Northwest", founded: 1974, championships: 0, fact: "Kept the 'Jazz' name after relocating from New Orleans, despite Utah not being known for jazz music." },
  { id: "mem", name: "Memphis Grizzlies", abbreviation: "MEM", logoUrl: logo("mem"), conference: "Western", division: "Southwest", founded: 1995, championships: 0, fact: "Known for their 'Grit and Grind' era, a physical, defensive style that defined the team in the 2010s." },
  { id: "min", name: "Minnesota Timberwolves", abbreviation: "MIN", logoUrl: logo("min"), conference: "Western", division: "Northwest", founded: 1989, championships: 0, fact: "Named through a fan contest — the timber wolf is native to Minnesota and represents the state's wilderness." },
  { id: "no", name: "New Orleans Pelicans", abbreviation: "NO", logoUrl: logo("no"), conference: "Western", division: "Southwest", founded: 2002, championships: 0, fact: "Named after the brown pelican, Louisiana's state bird, when they rebranded from the Hornets in 2013." },
  { id: "orl", name: "Orlando Magic", abbreviation: "ORL", logoUrl: logo("orl"), conference: "Eastern", division: "Southeast", founded: 1989, championships: 0, fact: "Named through a fan contest — the 'Magic' was inspired by Orlando's association with Walt Disney World." },
  { id: "cha", name: "Charlotte Hornets", abbreviation: "CHA", logoUrl: logo("cha"), conference: "Eastern", division: "Southeast", founded: 2004, championships: 0, fact: "Michael Jordan was the majority owner from 2010 to 2023, making him the first former player to own an NBA team." },
  { id: "lac", name: "Los Angeles Clippers", abbreviation: "LAC", logoUrl: logo("lac"), conference: "Western", division: "Pacific", founded: 1970, championships: 0, fact: "Originally the Buffalo Braves, they moved to San Diego and then Los Angeles, sharing an arena with the Lakers for decades." },
  { id: "bkn", name: "Brooklyn Nets", abbreviation: "BKN", logoUrl: logo("bkn"), conference: "Eastern", division: "Atlantic", founded: 1967, championships: 0, fact: "Won two ABA championships before joining the NBA in 1976. Julius Erving was their biggest star." },
];

export function getDailyTeam(date?: Date): TeamSpotlight {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % nbaTeams.length;
  return nbaTeams[index];
}
