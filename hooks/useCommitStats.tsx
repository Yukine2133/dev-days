import { GitHubCommitData } from "@/interfaces/commit.interface";
import { useMaxCommitsADay } from "./commitsStats/useMaxCommitsADay";
import { useLongestCommitStreak } from "./commitsStats/useLongestCommitStreak ";
import { useCommitHours } from "./commitsStats/useCommitHours";
import { formatCommitDate } from "@/utils/formatTime";
import { useUniqueCommitDays } from "./commitsStats/useUniqueCommitDays";

export const useCommitStats = (commits: GitHubCommitData[]) => {
  const { maxCommitDate, maxCommits, commitCountByDay } =
    useMaxCommitsADay(commits);
  const longestStreak = useLongestCommitStreak(commits);
  const commitCountByHour = useCommitHours(commits);
  const formattedMaxCommitDate = formatCommitDate(maxCommitDate);
  const uniqueCommitDays = useUniqueCommitDays(commits);

  return {
    formattedMaxCommitDate,
    maxCommits,
    longestStreak,
    commits,
    commitCountByDay,
    commitCountByHour,
    uniqueCommitDays,
  };
};
