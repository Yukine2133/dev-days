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

    return {
      maxCommits,
      maxCommitDate,
      commitDates: Object.keys(commitCountByDay),
      commitCountByDay,
    };
  };

  const { maxCommitDate, maxCommits, commitDates, commitCountByDay } =
    getMaxCommitsADay();

  const formattedMaxCommitDate = maxCommitDate
    ? new Date(maxCommitDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  // Get the longest commit streak
  const getLongestCommitStreak = () => {
    if (commitDates.length === 0) return 0;

    const sortedDates = commitDates
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = sortedDates[i - 1];
      const currDate = sortedDates[i];

      // Check if the current date is exactly one day after the previous date
      const diffInTime = currDate.getTime() - prevDate.getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

      if (diffInDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1; // Reset streak if there's a gap
      }
    }

    return longestStreak;
  };

  const longestStreak = getLongestCommitStreak();

  return {
    formattedMaxCommitDate,
    maxCommits,
    longestStreak,
    commits,
    commitCountByDay,
  };
};
