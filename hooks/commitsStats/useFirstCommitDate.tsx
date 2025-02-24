import { GitHubCommitData } from "@/interfaces/commit.interface";

export const useFirstCommitDate = (commits: GitHubCommitData[]) => {
  // Sort commits by the commit date and return the first commit's date
  const firstCommit = commits.sort(
    (a, b) =>
      new Date(a.commit.committer.date).getTime() -
      new Date(b.commit.committer.date).getTime()
  )[0];

  return firstCommit ? new Date(firstCommit.commit.committer.date) : null;
};
