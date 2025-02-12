import { GitHubCommitData } from "@/interfaces/commit.interface";

const stopwords = new Set([
  "the",
  "a",
  "an",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "by",
  "with",
  "in",
  "of",
  "as",
  "is",
  "it",
  "this",
  "that",
  "there",
  "be",
  "are",
  "was",
  "were",
  "will",
  "would",
  "can",
  "could",
  "should",
  "has",
  "have",
  "had",
  "from",
  "up",
  "down",
  "about",
  "after",
  "before",
  "during",
  "if",
  "else",
]);

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
