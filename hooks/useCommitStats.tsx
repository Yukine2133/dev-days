import { GitHubCommitData } from "@/interfaces/commit.interface";

export const useCommitStats = ({
  commits,
}: {
  commits: GitHubCommitData[];
}) => {
  const getMaxCommitsADay = () => {
    const commitCountByDay: Record<string, number> = {};

    // Count commits per day
    commits.forEach((commit) => {
      const date = new Date(commit.commit.committer.date)
        .toISOString()
        .split("T")[0]; // Extract YYYY-MM-DD

      commitCountByDay[date] = (commitCountByDay[date] || 0) + 1;
    });

    // Find the date with the maximum commits
    let maxCommits = 0;
    let maxCommitDate = "";

    Object.entries(commitCountByDay).forEach(([date, count]) => {
      if (count > maxCommits) {
        maxCommits = count;
        maxCommitDate = date;
      }
    });

    return { maxCommits, maxCommitDate };
  };

  const { maxCommitDate, maxCommits } = getMaxCommitsADay();

  const formattedMaxCommitDate = maxCommitDate
    ? new Date(maxCommitDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return {
    formattedMaxCommitDate,
    maxCommits,
  };
};
