import { GitHubCommitData } from "@/interfaces/commit.interface";
import { stopwords } from "@/utils/constants";

export const useMostCommonCommitWords = (commits: GitHubCommitData[]) => {
  const wordCount: Record<string, number> = {};

  commits.forEach((commit) => {
    const message = commit.commit.message;

    const words = message
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => !stopwords.has(word));

    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  const topWords = Object.entries(wordCount)
    .filter(([word]) => word.length > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return topWords.map(([word, count]) => ({ word, count }));
};
