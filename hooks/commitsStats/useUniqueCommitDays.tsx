import { GitHubCommitData } from "@/interfaces/commit.interface";
import { formatDate } from "@/utils/formatTime";
import { useMemo } from "react";

export const useUniqueCommitDays = (commits: GitHubCommitData[]) => {
  // Compute unique days when commits were made
  const uniqueCommitDays = useMemo(() => {
    const uniqueDates = new Set(
      commits.map((commit) => formatDate(commit.commit.committer.date))
    );
    return uniqueDates.size; // Count of unique days
  }, [commits]);
  return uniqueCommitDays;
};
