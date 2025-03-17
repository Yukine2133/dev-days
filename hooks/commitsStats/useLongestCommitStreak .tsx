import { GitHubCommitData } from "@/interfaces/commit.interface";

export const useLongestCommitStreak = (commits: GitHubCommitData[]) => {
  const commitDates = new Set(
    commits.map(
      (commit) =>
        new Date(commit.commit.committer.date).toISOString().split("T")[0]
    )
  );

  if (commitDates.size === 0) return 0;

  const sortedDates = Array.from(commitDates)
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime());

  let longestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currDate = sortedDates[i];

    const diffInDays =
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
    } else if (diffInDays > 1) {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  return longestStreak;
};
