import { testgithubcommitArtists } from "@/lib/test-github-commit-artists-data";
import { testgithubcommitReleases } from "@/lib/test-github-commit-releases-data";
import { testgithubcommitTriviaQuestions } from "@/lib/test-github-commit-trivia-data";
import { testgithubcommitTimeline } from "@/lib/test-github-commit-timeline-data";

export interface TestGithubCommitSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: TestGithubCommitSourceDoc[] = [
  {
    id: "k1",
    title: "About",
    text: "This is a test.",
    sourceLabel: "Internal",
  },
];

const artistDocs: TestGithubCommitSourceDoc[] = testgithubcommitArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "TestGithubCommit roster",
}));

const releaseDocs: TestGithubCommitSourceDoc[] = testgithubcommitReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "TestGithubCommit discography",
}));

const triviaDocs: TestGithubCommitSourceDoc[] = testgithubcommitTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "TestGithubCommit trivia",
}));

const timelineDocs: TestGithubCommitSourceDoc[] = testgithubcommitTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "TestGithubCommit timeline",
}));

const sourceDocs: TestGithubCommitSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getTestGithubCommitSourceDocs(): TestGithubCommitSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchTestGithubCommitSources(query: string, limit = 6): TestGithubCommitSourceDoc[] {
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
