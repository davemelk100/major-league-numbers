export interface TestGithubCommitArtist {
  id: number;
  name: string;
  description?: string;
}

export const testgithubcommitArtists: TestGithubCommitArtist[] = [
  { id: 1, name: "Test Artist", description: "A test artist" },
];

export function getTestGithubCommitArtistById(id: number): TestGithubCommitArtist | undefined {
  return testgithubcommitArtists.find((artist) => artist.id === id);
}
