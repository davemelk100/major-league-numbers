import { baseballFacts } from "@/lib/facts-data";
import {
  alMvpWinners,
  nlMvpWinners,
  alCyYoungWinners,
  nlCyYoungWinners,
} from "@/lib/awards-data";
import {
  spotlightPlayers,
  spotlightManagers,
  spotlightTeams,
  randomFacts,
} from "@/lib/player-spotlight-data";

export interface MlbSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const factDocs: MlbSourceDoc[] = baseballFacts.map((f, i) => ({
  id: `fact-${i}`,
  title: `Baseball fact: ${f.category}`,
  text: f.fact,
  sourceLabel: "MLB facts",
}));

const mvpDocs: MlbSourceDoc[] = [
  ...alMvpWinners.map((w) => ({
    id: `al-mvp-${w.season}`,
    title: `${w.season} AL MVP`,
    text: `${w.playerName} won the ${w.season} American League MVP award playing for the ${w.team.name}.`,
    sourceLabel: "MLB awards",
  })),
  ...nlMvpWinners.map((w) => ({
    id: `nl-mvp-${w.season}`,
    title: `${w.season} NL MVP`,
    text: `${w.playerName} won the ${w.season} National League MVP award playing for the ${w.team.name}.`,
    sourceLabel: "MLB awards",
  })),
];

const cyYoungDocs: MlbSourceDoc[] = [
  ...alCyYoungWinners.map((w) => ({
    id: `al-cy-${w.season}`,
    title: `${w.season} AL Cy Young`,
    text: `${w.playerName} won the ${w.season} American League Cy Young award playing for the ${w.team.name}.`,
    sourceLabel: "MLB awards",
  })),
  ...nlCyYoungWinners.map((w) => ({
    id: `nl-cy-${w.season}`,
    title: `${w.season} NL Cy Young`,
    text: `${w.playerName} won the ${w.season} National League Cy Young award playing for the ${w.team.name}.`,
    sourceLabel: "MLB awards",
  })),
];

const playerDocs: MlbSourceDoc[] = spotlightPlayers.map((p) => {
  const stats = p.careerStats;
  let statsText = "";
  if (stats) {
    if (stats.isPitcher) {
      statsText = ` Career: ${stats.wins ?? "?"}W-${stats.losses ?? "?"}L, ${stats.era ?? "?"} ERA, ${stats.strikeouts ?? "?"} K.`;
    } else {
      statsText = ` Career: ${stats.avg ?? "?"} AVG, ${stats.hr ?? "?"} HR, ${stats.rbi ?? "?"} RBI.`;
    }
  }
  return {
    id: `player-${p.id}`,
    title: p.name,
    text: `${p.name}, ${p.position}, ${p.team} (${p.years}). ${p.fact}${statsText}`,
    sourceLabel: "MLB player spotlight",
  };
});

const managerDocs: MlbSourceDoc[] = spotlightManagers.map((m) => ({
  id: `manager-${m.id}`,
  title: m.name,
  text: `Manager: ${m.name}, ${m.team} (${m.years}). ${m.fact}`,
  sourceLabel: "MLB managers",
}));

const teamDocs: MlbSourceDoc[] = spotlightTeams.map((t) => ({
  id: `team-${t.id}`,
  title: t.name,
  text: `${t.name} (${t.city}), ${t.league}. Founded ${t.founded}. ${t.fact}`,
  sourceLabel: "MLB teams",
}));

const randomFactDocs: MlbSourceDoc[] = randomFacts.map((f, i) => ({
  id: `random-fact-${i}`,
  title: `MLB: ${f.category}`,
  text: f.fact,
  sourceLabel: "MLB random facts",
}));

let scrapedDocs: MlbSourceDoc[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const scraped = require("@/data/mlb-knowledge-scraped.json") as MlbSourceDoc[];
  scrapedDocs = scraped;
} catch {
  // scraped data not yet generated — skip
}

const sourceDocs: MlbSourceDoc[] = [
  ...factDocs,
  ...mvpDocs,
  ...cyYoungDocs,
  ...playerDocs,
  ...managerDocs,
  ...teamDocs,
  ...randomFactDocs,
  ...scrapedDocs,
];

export function getMlbSourceDocs(): MlbSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchMlbSources(query: string, limit = 6): MlbSourceDoc[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = sourceDocs
    .map((doc) => {
      const haystack = `${doc.title} ${doc.text}`.toLowerCase();
      const score = tokens.reduce(
        (total, token) => total + (haystack.includes(token) ? 1 : 0),
        0
      );
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);

  return scored;
}
