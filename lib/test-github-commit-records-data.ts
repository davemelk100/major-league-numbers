import { testgithubcommitReleases, type TestGithubCommitRelease } from "./test-github-commit-releases-data";

export interface TestGithubCommitRecordOfDay {
  id: number;
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const TESTGITHUBCOMMIT_FACTS: Record<string, string> = {
  "1": "A great debut album.",
};

function getTestGithubCommitFact(title: string): string | undefined {
  return TESTGITHUBCOMMIT_FACTS[title.toLowerCase()];
}

function toRecordOfDay(release: TestGithubCommitRelease): TestGithubCommitRecordOfDay {
  const catalogLabel = release.catalogNo ? `TestGithubCommit ${release.catalogNo}` : `#${release.id}`;
  return {
    id: release.id,
    title: release.title,
    artist: release.artist,
    year: release.year ?? 0,
    highlight: getTestGithubCommitFact(release.title) || `${catalogLabel}, released in ${release.year ?? "unknown year"}.`,
    coverUrl: undefined,
  };
}

export function getDailyTestGithubCommitRecord(date = new Date()): TestGithubCommitRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % testgithubcommitReleases.length;
  return toRecordOfDay(testgithubcommitReleases[index]);
}
