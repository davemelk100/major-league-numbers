import { jawboxArtists } from "@/lib/jawbox-artists-data";
import { jawboxReleases } from "@/lib/jawbox-releases-data";
import { jawboxTriviaQuestions } from "@/lib/jawbox-trivia-data";
import { jawboxTimeline } from "@/lib/jawbox-timeline-data";

export interface JawboxSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: JawboxSourceDoc[] = [
  {
    id: "overview",
    title: "Jawbox Overview",
    text: "Jawbox was an influential post-hardcore band known for their intricate guitar work and deep lyrics. They were active from 1989 to 1997 and reunited briefly in 2009 and 2019.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Jawbox",
  },
  {
    id: "band_members",
    title: "Jawbox Band Members",
    text: "The band's lineup consisted of J. Robbins (vocals, guitar), Kim Coletta (bass), Bill Barbot (guitar), and Zach Barocas (drums).",
    sourceLabel: "Official Band Website",
    sourceUrl: "https://www.jawbox.com/",
  },
  {
    id: "significant_releases",
    title: "Jawbox Significant Releases",
    text: "Notable albums include 'Grippe', 'Novelty', 'For Your Own Special Sweetheart', and their self-titled album 'Jawbox'.",
    sourceLabel: "Discogs",
    sourceUrl: "https://www.discogs.com/",
  },
  {
    id: "reunion_details",
    title: "Jawbox Reunion Details",
    text: "The band reunited for shows in 2009 and 2019, celebrating their legacy in the D.C. punk scene.",
    sourceLabel: "Pitchfork",
    sourceUrl: "https://pitchfork.com/",
  },
  {
    id: "influence",
    title: "Jawbox's Influence",
    text: "Jawbox is known for their influence on the post-hardcore genre and the D.C. punk scene, standing out with their angular sound and lyrical depth.",
    sourceLabel: "Rolling Stone",
    sourceUrl: "https://www.rollingstone.com/",
  },
];

const artistDocs: JawboxSourceDoc[] = jawboxArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "Jawbox roster",
}));

const releaseDocs: JawboxSourceDoc[] = jawboxReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "Jawbox discography",
}));

const triviaDocs: JawboxSourceDoc[] = jawboxTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "Jawbox trivia",
}));

const timelineDocs: JawboxSourceDoc[] = jawboxTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "Jawbox timeline",
}));

const sourceDocs: JawboxSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getJawboxSourceDocs(): JawboxSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchJawboxSources(query: string, limit = 6): JawboxSourceDoc[] {
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
