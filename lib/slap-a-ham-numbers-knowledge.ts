import { slapahamnumbersArtists } from "@/lib/slap-a-ham-numbers-artists-data";
import { slapahamnumbersReleases } from "@/lib/slap-a-ham-numbers-releases-data";
import { slapahamnumbersTriviaQuestions } from "@/lib/slap-a-ham-numbers-trivia-data";
import { slapahamnumbersTimeline } from "@/lib/slap-a-ham-numbers-timeline-data";

export interface SlapAHamNumbersSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: SlapAHamNumbersSourceDoc[] = [
  {
    id: "overview",
    title: "Slap-A-Ham Records Overview",
    text: "Slap-A-Ham Records was an influential American independent record label known for its focus on hardcore punk, powerviolence, and grindcore. Founded in 1989, the label became a significant name in the underground music scene.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Slap-a-Ham_Records",
  },
  {
    id: "discography",
    title: "Discography of Slap-A-Ham Records",
    text: "The label's discography includes notable releases from artists like Melvins and Spazz, and significant compilations like Bllleeeeaaauuurrrrgghhh!",
    sourceLabel: "Discogs",
    sourceUrl: "https://www.discogs.com/label/34315-Slap-A-Ham-Records",
  },
  {
    id: "history",
    title: "The Closure of Slap-A-Ham Records",
    text: "Officially shutting down in 2002, Chris Dodge attributed the downturn to post-9/11 financial issues.",
    sourceLabel: "Noisey",
    sourceUrl: "https://www.vice.com/en/article/spazz-chris-dodge-tankcrimes/",
  },
  {
    id: "artists",
    title: "Notable Artists on Slap-A-Ham",
    text: "Artists like Melvins, Spazz, and Capitalist Casualties showcased the diverse styles of hardcore and grindcore under the Slap-A-Ham label.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Slap-a-Ham_Records",
  },
  {
    id: "impact",
    title: "Impact of Slap-A-Ham Records",
    text: "Slap-A-Ham Records played a vital role in shaping the underground music scene from the late '80s to early 2000s, influencing countless bands and genres.",
    sourceLabel: "Lamortdunemoderniste",
    sourceUrl: "https://lamortdunemoderniste.wordpress.com/2017/05/04/record-label-profiles-slap-a-ham-records/",
  },
];

const artistDocs: SlapAHamNumbersSourceDoc[] = slapahamnumbersArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "SlapAHamNumbers roster",
}));

const releaseDocs: SlapAHamNumbersSourceDoc[] = slapahamnumbersReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "SlapAHamNumbers discography",
}));

const triviaDocs: SlapAHamNumbersSourceDoc[] = slapahamnumbersTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "SlapAHamNumbers trivia",
}));

const timelineDocs: SlapAHamNumbersSourceDoc[] = slapahamnumbersTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "SlapAHamNumbers timeline",
}));

const sourceDocs: SlapAHamNumbersSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getSlapAHamNumbersSourceDocs(): SlapAHamNumbersSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchSlapAHamNumbersSources(query: string, limit = 6): SlapAHamNumbersSourceDoc[] {
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
