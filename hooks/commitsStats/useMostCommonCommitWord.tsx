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

export const useMostCommonCommitWord = (commits: GitHubCommitData[]) => {
  const wordCount: Record<string, number> = {};

  // Extract words from each commit message and count their occurrences
  commits.forEach((commit) => {
    const message = commit.commit.message;

    // Split the message into words, remove punctuation, convert to lowercase, and remove stopwords
    const words = message
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .split(/\s+/) // Split by whitespace
      .filter((word) => !stopwords.has(word)); // Remove stopwords

    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  // Find the most common word
  let mostCommonWord = "";
  let maxCount = 0;

  Object.entries(wordCount).forEach(([word, count]) => {
    if (count > maxCount && word.length > 1) {
      // Ignore very short words like "I", etc.
      maxCount = count;
      mostCommonWord = word;
    }
  });

  return { mostCommonWord, maxCount };
};
