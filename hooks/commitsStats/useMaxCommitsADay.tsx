import { GitHubCommitData } from "@/interfaces/commit.interface";

export const useMaxCommitsADay = (commits: GitHubCommitData[]) => {
  const commitCountByDay: Record<string, number> = {};

  commits.forEach((commit) => {
    const date = new Date(commit.commit.committer.date)
      .toISOString()
      .split("T")[0]; // Extract YYYY-MM-DD

    commitCountByDay[date] = (commitCountByDay[date] || 0) + 1;
  });

  let maxCommits = 0;
  let maxCommitDate = "";

  Object.entries(commitCountByDay).forEach(([date, count]) => {
    if (count > maxCommits) {
      maxCommits = count;
      maxCommitDate = date;
    }
  });

  return {
    maxCommits,
    maxCommitDate,
    commitCountByDay,
  };
};
