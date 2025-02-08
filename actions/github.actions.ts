"use server";

import { GitHubCommitData } from "@/interfaces/commit.interface";

export const fetchRepoCommits = async (owner: string, repo: string) => {
  const perPage = 100;
  let page = 1;
  const allCommits: GitHubCommitData[] = [];
  let fetchedCommits: GitHubCommitData[] = [];

  do {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) break;

    fetchedCommits = await res.json();
    allCommits.push(...fetchedCommits);
    page++;
  } while (fetchedCommits.length === perPage);

  return allCommits;
};
