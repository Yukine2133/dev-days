import { GitHubCommitData } from "@/interfaces/commit.interface";

export const useCommitHours = (commits: GitHubCommitData[]) => {
  const commitCountByHour: Record<number, number> = {};

  commits.forEach((commit) => {
    const hour = new Date(commit.commit.committer.date).getHours();
    commitCountByHour[hour] = (commitCountByHour[hour] || 0) + 1;
  });

  return commitCountByHour;
};
