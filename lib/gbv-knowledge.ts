import { gbvTriviaQuestions } from "@/lib/gbv-trivia-data";
import { pollardSideProjects } from "@/lib/gbv-side-projects";

export interface GbvSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const sideProjectDocs: GbvSourceDoc[] = pollardSideProjects.map((project) => {
  const releases =
    project.releases.length > 0
      ? project.releases
          .map((release) => `${release.title} (${release.year})`)
          .join(", ")
      : "No releases listed.";

  return {
    id: `side-project-${project.name}`,
    title: project.name,
    text: `Side project: ${project.name}. Years: ${project.years}. ${project.description} Releases: ${releases}`,
    sourceLabel: "GBVDB side projects",
    sourceUrl: project.discographyUrl,
  };
});

const triviaDocs: GbvSourceDoc[] = gbvTriviaQuestions.map((question) => {
  const answer = question.options[question.correctAnswer] ?? "";
  return {
    id: `trivia-${question.id}`,
    title: question.question,
    text: `Q: ${question.question} A: ${answer}. ${question.explanation}`,
    sourceLabel: "GBV trivia bank",
  };
});

const sourceDocs: GbvSourceDoc[] = [...sideProjectDocs, ...triviaDocs];

export function getGbvSourceDocs(): GbvSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchGbvSources(query: string, limit = 6): GbvSourceDoc[] {
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
