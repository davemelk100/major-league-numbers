// Static collection of team uniform data
// Images should be placed in /public/uniforms/[teamAbbrev]/[era]-[type].png

export interface UniformEra {
  era: string; // e.g., "1970-1980", "2000-present"
  years: string;
  uniforms: {
    type: "home" | "away" | "alternate" | "city-connect" | "throwback";
    label: string;
    image: string; // filename in /public/uniforms/[teamAbbrev]/
    description?: string;
  }[];
}

export interface TeamUniformData {
  teamId: number;
  abbreviation: string;
  name: string;
  eras: UniformEra[];
}

// Team abbreviation mapping for folder structure
export const TEAM_ABBREV: Record<number, string> = {
  108: "LAA", // Angels
  109: "ARI", // Diamondbacks
  110: "BAL", // Orioles
  111: "BOS", // Red Sox
  112: "CHC", // Cubs
  113: "CIN", // Reds
  114: "CLE", // Guardians
  115: "COL", // Rockies
  116: "DET", // Tigers
  117: "HOU", // Astros
  118: "KC",  // Royals
  119: "LAD", // Dodgers
  120: "WAS", // Nationals
  121: "NYM", // Mets
  133: "OAK", // Athletics
  134: "PIT", // Pirates
  135: "SD",  // Padres
  136: "SEA", // Mariners
  137: "SF",  // Giants
  138: "STL", // Cardinals
  139: "TB",  // Rays
  140: "TEX", // Rangers
  141: "TOR", // Blue Jays
  142: "MIN", // Twins
  143: "PHI", // Phillies
  144: "ATL", // Braves
  145: "CWS", // White Sox
  146: "MIA", // Marlins
  147: "NYY", // Yankees
  158: "MIL", // Brewers
};

// Sample uniform data - expand as images are added
export const TEAM_UNIFORMS: Record<number, TeamUniformData> = {
  147: { // New York Yankees
    teamId: 147,
    abbreviation: "NYY",
    name: "New York Yankees",
    eras: [
      {
        era: "classic",
        years: "1936-Present",
        uniforms: [
          { type: "home", label: "Home Pinstripes", image: "home-pinstripes.png", description: "The iconic pinstripe uniform worn at Yankee Stadium" },
          { type: "away", label: "Road Grays", image: "away-gray.png", description: "Classic gray road uniform with NEW YORK across the chest" },
        ],
      },
      {
        era: "1970s",
        years: "1973-1980",
        uniforms: [
          { type: "home", label: "Home", image: "1970s-home.png" },
          { type: "away", label: "Away", image: "1970s-away.png" },
        ],
      },
    ],
  },
  111: { // Boston Red Sox
    teamId: 111,
    abbreviation: "BOS",
    name: "Boston Red Sox",
    eras: [
      {
        era: "modern",
        years: "2009-Present",
        uniforms: [
          { type: "home", label: "Home White", image: "home-white.png", description: "Classic white home uniform with RED SOX across the chest" },
          { type: "away", label: "Road Gray", image: "away-gray.png", description: "Gray road uniform with BOSTON" },
          { type: "alternate", label: "Red Alternate", image: "alt-red.png", description: "Red Friday alternate" },
          { type: "city-connect", label: "City Connect", image: "city-connect.png", description: "Yellow and blue Marathon-inspired design" },
        ],
      },
    ],
  },
  119: { // Los Angeles Dodgers
    teamId: 119,
    abbreviation: "LAD",
    name: "Los Angeles Dodgers",
    eras: [
      {
        era: "modern",
        years: "1999-Present",
        uniforms: [
          { type: "home", label: "Home White", image: "home-white.png", description: "Classic Dodger white with script logo" },
          { type: "away", label: "Road Gray", image: "away-gray.png", description: "Gray with LOS ANGELES script" },
          { type: "alternate", label: "Road Blue", image: "alt-blue.png" },
          { type: "city-connect", label: "City Connect", image: "city-connect.png", description: "Los Dodgers tribute design" },
        ],
      },
      {
        era: "brooklyn",
        years: "1938-1957",
        uniforms: [
          { type: "home", label: "Brooklyn Home", image: "brooklyn-home.png", description: "Classic Brooklyn Dodgers home" },
          { type: "away", label: "Brooklyn Away", image: "brooklyn-away.png" },
        ],
      },
    ],
  },
  138: { // St. Louis Cardinals
    teamId: 138,
    abbreviation: "STL",
    name: "St. Louis Cardinals",
    eras: [
      {
        era: "modern",
        years: "1998-Present",
        uniforms: [
          { type: "home", label: "Home White", image: "home-white.png", description: "White with birds on bat logo" },
          { type: "away", label: "Road Gray", image: "away-gray.png" },
          { type: "alternate", label: "Saturday Cream", image: "alt-cream.png", description: "Cream throwback alternate" },
        ],
      },
    ],
  },
  112: { // Chicago Cubs
    teamId: 112,
    abbreviation: "CHC",
    name: "Chicago Cubs",
    eras: [
      {
        era: "modern",
        years: "1990-Present",
        uniforms: [
          { type: "home", label: "Home Pinstripes", image: "home-pinstripes.png", description: "Classic Cubs pinstripes" },
          { type: "away", label: "Road Gray", image: "away-gray.png" },
          { type: "alternate", label: "Blue Alternate", image: "alt-blue.png" },
          { type: "city-connect", label: "City Connect", image: "city-connect.png", description: "Wrigleyville design" },
        ],
      },
    ],
  },
  136: { // Seattle Mariners
    teamId: 136,
    abbreviation: "SEA",
    name: "Seattle Mariners",
    eras: [
      {
        era: "modern",
        years: "1993-Present",
        uniforms: [
          { type: "home", label: "Home White", image: "home-white.png" },
          { type: "away", label: "Road Gray", image: "away-gray.png" },
          { type: "alternate", label: "Northwest Green", image: "alt-green.png" },
          { type: "alternate", label: "Navy Alternate", image: "alt-navy.png" },
          { type: "city-connect", label: "City Connect", image: "city-connect.png" },
        ],
      },
      {
        era: "trident",
        years: "1977-1992",
        uniforms: [
          { type: "home", label: "Trident Home", image: "trident-home.png", description: "Original trident logo era" },
          { type: "away", label: "Trident Away", image: "trident-away.png" },
        ],
      },
    ],
  },
};

// Helper function to get uniform data for a team
export function getTeamUniforms(teamId: number): TeamUniformData | null {
  return TEAM_UNIFORMS[teamId] || null;
}

// Helper to get the image path for a uniform
export function getUniformImagePath(abbreviation: string, filename: string): string {
  return `/uniforms/${abbreviation.toLowerCase()}/${filename}`;
}

// Check if we have uniform data for a team
export function hasUniformData(teamId: number): boolean {
  return teamId in TEAM_UNIFORMS;
}
