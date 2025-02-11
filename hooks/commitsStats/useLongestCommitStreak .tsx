import { GitHubCommitData } from "@/interfaces/commit.interface";

export const useLongestCommitStreak = (commits: GitHubCommitData[]) => {
  const commitDates = commits.map(
    (commit) =>
      new Date(commit.commit.committer.date).toISOString().split("T")[0]
  );

  if (commitDates.length === 0) return 0;

  const sortedDates = commitDates
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime());

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i - 1];
    const currDate = sortedDates[i];

    const diffInTime = currDate.getTime() - prevDate.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
};
