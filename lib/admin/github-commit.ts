const GITHUB_API = "https://api.github.com";

interface CommitFileEntry {
  path: string;
  content: string;
}

interface CommitOptions {
  owner: string;
  repo: string;
  branch: string;
  message: string;
  files: CommitFileEntry[];
  token: string;
}

interface CommitResult {
  success: boolean;
  commitSha?: string;
  commitUrl?: string;
  error?: string;
}

async function githubFetch(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${GITHUB_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
  });
  return res;
}

export async function getFileFromGitHub(
  owner: string,
  repo: string,
  path: string,
  branch: string,
  token: string,
): Promise<string | null> {
  const res = await githubFetch(
    `/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    token,
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export async function commitFilesToGitHub(
  options: CommitOptions,
): Promise<CommitResult> {
  const { owner, repo, branch, message, files, token } = options;

  try {
    // 1. Get current branch ref SHA
    const refRes = await githubFetch(
      `/repos/${owner}/${repo}/git/ref/heads/${branch}`,
      token,
    );
    if (!refRes.ok) {
      const err = await refRes.json();
      return { success: false, error: `Failed to get branch ref: ${err.message}` };
    }
    const refData = await refRes.json();
    const baseSha = refData.object.sha;

    // 2. Get base tree SHA from the commit
    const commitRes = await githubFetch(
      `/repos/${owner}/${repo}/git/commits/${baseSha}`,
      token,
    );
    if (!commitRes.ok) {
      return { success: false, error: "Failed to get base commit" };
    }
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Create blobs for each file
    const treeEntries = await Promise.all(
      files.map(async (file) => {
        const blobRes = await githubFetch(
          `/repos/${owner}/${repo}/git/blobs`,
          token,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: file.content,
              encoding: "utf-8",
            }),
          },
        );
        if (!blobRes.ok) {
          throw new Error(`Failed to create blob for ${file.path}`);
        }
        const blobData = await blobRes.json();
        return {
          path: file.path,
          mode: "100644" as const,
          type: "blob" as const,
          sha: blobData.sha,
        };
      }),
    );

    // 4. Create new tree
    const treeRes = await githubFetch(
      `/repos/${owner}/${repo}/git/trees`,
      token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeEntries,
        }),
      },
    );
    if (!treeRes.ok) {
      return { success: false, error: "Failed to create tree" };
    }
    const treeData = await treeRes.json();

    // 5. Create commit
    const newCommitRes = await githubFetch(
      `/repos/${owner}/${repo}/git/commits`,
      token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          tree: treeData.sha,
          parents: [baseSha],
        }),
      },
    );
    if (!newCommitRes.ok) {
      return { success: false, error: "Failed to create commit" };
    }
    const newCommitData = await newCommitRes.json();

    // 6. Update branch ref
    const updateRefRes = await githubFetch(
      `/repos/${owner}/${repo}/git/refs/heads/${branch}`,
      token,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sha: newCommitData.sha }),
      },
    );
    if (!updateRefRes.ok) {
      return { success: false, error: "Failed to update branch ref" };
    }

    return {
      success: true,
      commitSha: newCommitData.sha,
      commitUrl: `https://github.com/${owner}/${repo}/commit/${newCommitData.sha}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
