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
  `https://a.espncdn.com/i/teamlogos/nfl/500/${abbrev.toLowerCase()}.png`;

export const nflTeams: TeamSpotlight[] = [
  { id: "ne", name: "New England Patriots", abbreviation: "NE", logoUrl: logo("ne"), conference: "AFC", division: "AFC East", founded: 1960, championships: 6, fact: "Won six Super Bowls under the Brady-Belichick dynasty, including a 25-point comeback in Super Bowl LI." },
  { id: "pit", name: "Pittsburgh Steelers", abbreviation: "PIT", logoUrl: logo("pit"), conference: "AFC", division: "AFC North", founded: 1933, championships: 6, fact: "The only NFL team with their logo on just one side of the helmet — a tradition since 1962." },
  { id: "dal", name: "Dallas Cowboys", abbreviation: "DAL", logoUrl: logo("dal"), conference: "NFC", division: "NFC East", founded: 1960, championships: 5, fact: "Known as 'America's Team,' they are the most valuable sports franchise in the world." },
  { id: "sf", name: "San Francisco 49ers", abbreviation: "SF", logoUrl: logo("sf"), conference: "NFC", division: "NFC West", founded: 1946, championships: 5, fact: "Named after the prospectors who arrived during the 1849 California Gold Rush." },
  { id: "gb", name: "Green Bay Packers", abbreviation: "GB", logoUrl: logo("gb"), conference: "NFC", division: "NFC North", founded: 1919, championships: 13, fact: "The only community-owned franchise in American pro sports, with over 360,000 shareholders." },
  { id: "nyg", name: "New York Giants", abbreviation: "NYG", logoUrl: logo("nyg"), conference: "NFC", division: "NFC East", founded: 1925, championships: 4, fact: "Upset the undefeated Patriots in Super Bowl XLII, widely considered the greatest upset in Super Bowl history." },
  { id: "kc", name: "Kansas City Chiefs", abbreviation: "KC", logoUrl: logo("kc"), conference: "AFC", division: "AFC West", founded: 1960, championships: 4, fact: "Arrowhead Stadium holds the Guinness World Record for the loudest crowd roar at 142.2 decibels." },
  { id: "lv", name: "Las Vegas Raiders", abbreviation: "LV", logoUrl: logo("lv"), conference: "AFC", division: "AFC West", founded: 1960, championships: 3, fact: "Have called three cities home — Oakland, Los Angeles, and Las Vegas — and are known for their rebellious 'Commitment to Excellence' motto." },
  { id: "wsh", name: "Washington Commanders", abbreviation: "WSH", logoUrl: logo("wsh"), conference: "NFC", division: "NFC East", founded: 1932, championships: 3, fact: "Won three Super Bowls with three different starting quarterbacks — the only team to accomplish this." },
  { id: "den", name: "Denver Broncos", abbreviation: "DEN", logoUrl: logo("den"), conference: "AFC", division: "AFC West", founded: 1960, championships: 3, fact: "John Elway engineered 'The Drive' — a 98-yard touchdown march in the 1986 AFC Championship Game." },
  { id: "bal", name: "Baltimore Ravens", abbreviation: "BAL", logoUrl: logo("bal"), conference: "AFC", division: "AFC North", founded: 1996, championships: 2, fact: "Named after Edgar Allan Poe's poem 'The Raven' — Poe is buried in Baltimore." },
  { id: "ind", name: "Indianapolis Colts", abbreviation: "IND", logoUrl: logo("ind"), conference: "AFC", division: "AFC South", founded: 1953, championships: 2, fact: "Their horseshoe logo has remained virtually unchanged since 1953, one of the oldest in the NFL." },
  { id: "mia", name: "Miami Dolphins", abbreviation: "MIA", logoUrl: logo("mia"), conference: "AFC", division: "AFC East", founded: 1966, championships: 2, fact: "Completed the only perfect season in NFL history in 1972, going 17-0 including the Super Bowl." },
  { id: "tb", name: "Tampa Bay Buccaneers", abbreviation: "TB", logoUrl: logo("tb"), conference: "NFC", division: "NFC South", founded: 1976, championships: 2, fact: "Lost their first 26 games as a franchise — then Tom Brady arrived in 2020 and won the Super Bowl at their home stadium." },
  { id: "phi", name: "Philadelphia Eagles", abbreviation: "PHI", logoUrl: logo("phi"), conference: "NFC", division: "NFC East", founded: 1933, championships: 4, fact: "The Eagles' logo is the only NFL logo that faces left, originally designed for aerodynamic reasons." },
  { id: "sea", name: "Seattle Seahawks", abbreviation: "SEA", logoUrl: logo("sea"), conference: "NFC", division: "NFC West", founded: 1976, championships: 1, fact: "Their '12th Man' fans generated a small earthquake during the 2011 NFC Championship Game, detected by local seismographs." },
  { id: "no", name: "New Orleans Saints", abbreviation: "NO", logoUrl: logo("no"), conference: "NFC", division: "NFC South", founded: 1967, championships: 1, fact: "Won Super Bowl XLIV in 2010, three years after Hurricane Katrina, in a victory that symbolized the city's resilience." },
  { id: "chi", name: "Chicago Bears", abbreviation: "CHI", logoUrl: logo("chi"), conference: "NFC", division: "NFC North", founded: 1919, championships: 9, fact: "George Halas, the team's founder, played, coached, and owned the Bears for over 60 years — earning the nickname 'Papa Bear.'" },
  { id: "nyj", name: "New York Jets", abbreviation: "NYJ", logoUrl: logo("nyj"), conference: "AFC", division: "AFC East", founded: 1960, championships: 1, fact: "Joe Namath famously guaranteed victory in Super Bowl III, then delivered the biggest upset in football history." },
  { id: "lar", name: "Los Angeles Rams", abbreviation: "LAR", logoUrl: logo("lar"), conference: "NFC", division: "NFC West", founded: 1936, championships: 2, fact: "Were the first NFL team to put a logo on their helmets and the first to have all games televised locally." },
  { id: "car", name: "Carolina Panthers", abbreviation: "CAR", logoUrl: logo("car"), conference: "NFC", division: "NFC South", founded: 1995, championships: 0, fact: "Reached the Super Bowl in just their second season (1996) — the fastest expansion team to do so at the time." },
  { id: "min", name: "Minnesota Vikings", abbreviation: "MIN", logoUrl: logo("min"), conference: "NFC", division: "NFC North", founded: 1961, championships: 0, fact: "Have appeared in four Super Bowls but have never won, the most appearances without a victory." },
  { id: "buf", name: "Buffalo Bills", abbreviation: "BUF", logoUrl: logo("buf"), conference: "AFC", division: "AFC East", founded: 1960, championships: 0, fact: "Appeared in four consecutive Super Bowls (1991-94) — an unprecedented feat, though they lost all four." },
  { id: "cin", name: "Cincinnati Bengals", abbreviation: "CIN", logoUrl: logo("cin"), conference: "AFC", division: "AFC North", founded: 1968, championships: 0, fact: "Paul Brown, who also founded the Cleveland Browns, created the Bengals in 1968." },
  { id: "ten", name: "Tennessee Titans", abbreviation: "TEN", logoUrl: logo("ten"), conference: "AFC", division: "AFC South", founded: 1960, championships: 0, fact: "Lost Super Bowl XXXIV by one yard on the famous 'One Yard Short' play at the goal line." },
  { id: "cle", name: "Cleveland Browns", abbreviation: "CLE", logoUrl: logo("cle"), conference: "AFC", division: "AFC North", founded: 1946, championships: 0, fact: "The only NFL team without a logo on their helmet — the orange helmet itself is considered the logo." },
  { id: "atl", name: "Atlanta Falcons", abbreviation: "ATL", logoUrl: logo("atl"), conference: "NFC", division: "NFC South", founded: 1966, championships: 0, fact: "Blew a 28-3 lead in Super Bowl LI, the largest collapse in Super Bowl history." },
  { id: "ari", name: "Arizona Cardinals", abbreviation: "ARI", logoUrl: logo("ari"), conference: "NFC", division: "NFC West", founded: 1898, championships: 2, fact: "The oldest continuously operating professional football franchise in the US, founded in 1898." },
  { id: "det", name: "Detroit Lions", abbreviation: "DET", logoUrl: logo("det"), conference: "NFC", division: "NFC North", founded: 1930, championships: 4, fact: "Have hosted the Thanksgiving Day game every year since 1934, making it one of America's oldest sports traditions." },
  { id: "jax", name: "Jacksonville Jaguars", abbreviation: "JAX", logoUrl: logo("jax"), conference: "AFC", division: "AFC South", founded: 1995, championships: 0, fact: "Have the largest swimming pools in any NFL stadium — two 6,100-gallon pools inside EverBank Stadium." },
];

export function getDailyTeam(date?: Date): TeamSpotlight {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % nflTeams.length;
  return nflTeams[index];
}
