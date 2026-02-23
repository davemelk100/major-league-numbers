import { touchgorecordsArtists } from "@/lib/touch-go-records-artists-data";
import { touchgorecordsReleases } from "@/lib/touch-go-records-releases-data";
import { touchgorecordsTriviaQuestions } from "@/lib/touch-go-records-trivia-data";
import { touchgorecordsTimeline } from "@/lib/touch-go-records-timeline-data";

export interface TouchGoRecordsSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: TouchGoRecordsSourceDoc[] = [
  {
    id: "overview",
    title: "Touch & Go Records Overview",
    text: "Touch & Go Records is renowned for its influence on punk and indie rock...",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Touch_and_Go_Records",
  },
  {
    id: "history",
    title: "History of Touch & Go",
    text: "The label was founded in 1981 and faced various challenges over the years...",
    sourceLabel: "Channel Nonfiction",
    sourceUrl: "https://www.channelnonfiction.com/history-touch-go-records/",
  },
  {
    id: "artistRoster",
    title: "Touch & Go Artists",
    text: "Touch & Go hosts an impressive lineup of artists spanning genres...",
    sourceLabel: "Official Site",
    sourceUrl: "https://www.touchandgorecords.com/bands/",
  },
  {
    id: "catalog",
    title: "Touch & Go Discography",
    text: "An extensive catalogue of releases from various artists...",
    sourceLabel: "Discogs",
    sourceUrl: "https://www.discogs.com/label/819-Touch-And-Go",
  },
  {
    id: "pressFeatures",
    title: "Press Features on Touch & Go",
    text: "Various publications have highlighted the legacy of Touch & Go...",
    sourceLabel: "Pitchfork",
    sourceUrl: "https://pitchfork.com/features/article/6421-touch-and-go-25/",
  },
];

const artistDocs: TouchGoRecordsSourceDoc[] = touchgorecordsArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "TouchGoRecords roster",
}));

const releaseDocs: TouchGoRecordsSourceDoc[] = touchgorecordsReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "TouchGoRecords discography",
}));

const triviaDocs: TouchGoRecordsSourceDoc[] = touchgorecordsTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "TouchGoRecords trivia",
}));

const timelineDocs: TouchGoRecordsSourceDoc[] = touchgorecordsTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "TouchGoRecords timeline",
}));

const sourceDocs: TouchGoRecordsSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getTouchGoRecordsSourceDocs(): TouchGoRecordsSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchTouchGoRecordsSources(query: string, limit = 6): TouchGoRecordsSourceDoc[] {
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
