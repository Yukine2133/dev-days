import { GitHubCommitData } from "@/interfaces/commit.interface";
import { useMaxCommitsADay } from "./commitsStats/useMaxCommitsADay";
import { useLongestCommitStreak } from "./commitsStats/useLongestCommitStreak ";
import { useCommitHours } from "./commitsStats/useCommitHours";
import { formatCommitDate } from "@/utils/formatTime";
import { useUniqueCommitDays } from "./commitsStats/useUniqueCommitDays";
import { useCommitActivityAnalysis } from "./useCommitActivityAnalysis";
import { useMostCommonCommitWord } from "./commitsStats/useMostCommonCommitWord";

export const useCommitStats = (commits: GitHubCommitData[]) => {
  const { maxCommitDate, maxCommits, commitCountByDay } =
    useMaxCommitsADay(commits);
  const longestStreak = useLongestCommitStreak(commits);
  const commitCountByHour = useCommitHours(commits);
  const formattedMaxCommitDate = formatCommitDate(maxCommitDate);
  const uniqueCommitDays = useUniqueCommitDays(commits);
  const { mostCommonWord, maxCount } = useMostCommonCommitWord(commits);

  const {
    leastActiveTimePeriod,
    mostActiveHour,
    mostActiveTimePeriod,
    timeLabels,
  } = useCommitActivityAnalysis(commitCountByHour);

  // Convert commit data into heatmap format
  const heatmapData = Object.entries(commitCountByDay).map(([date, count]) => ({
    date: date.replace(/-/g, "/"), // Convert YYYY-MM-DD to YYYY/MM/DD
    count,
  }));

  return {
    formattedMaxCommitDate,
    maxCommits,
    longestStreak,
    commits,
    uniqueCommitDays,
    heatmapData,
    leastActiveTimePeriod,
    mostActiveHour,
    mostActiveTimePeriod,
    timeLabels,
    mostCommonWord,
    maxCount,
  };
};
