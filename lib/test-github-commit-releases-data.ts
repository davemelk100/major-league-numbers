export interface TestGithubCommitRelease {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  highlight?: string;
}

export const testgithubcommitReleases: TestGithubCommitRelease[] = [
  { id: 1, title: "Test Album", artist: "Test Artist", year: 2024, format: "LP" },
];

export function getTestGithubCommitReleaseById(id: number): TestGithubCommitRelease | undefined {
  return testgithubcommitReleases.find((release) => release.id === id);
}
