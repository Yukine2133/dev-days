import { GitHubCommitData } from "@/interfaces/commit.interface";
import { useMaxCommitsADay } from "./commitsStats/useMaxCommitsADay";
import { useLongestCommitStreak } from "./commitsStats/useLongestCommitStreak ";
import { useCommitHours } from "./commitsStats/useCommitHours";

export const useCommitStats = ({
  commits,
}: {
  commits: GitHubCommitData[];
}) => {
  const { maxCommitDate, maxCommits, commitCountByDay } =
    useMaxCommitsADay(commits);
  const longestStreak = useLongestCommitStreak(commits);
  const commitCountByHour = useCommitHours(commits);

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
    longestStreak,
    commits,
    commitCountByDay,
    commitCountByHour,
  };
};
