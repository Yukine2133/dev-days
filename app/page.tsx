"use client";
import RepositoryInput from "@/components/RepositoryInput";
import { GitHubCommitData } from "@/interfaces/commit.interface";
import { formatDate } from "@/utils/formatDate";
import { useState, useMemo } from "react";

const HomePage = () => {
  const [commits, setCommits] = useState<GitHubCommitData[]>([]);

  // Compute unique days when commits were made
  const uniqueCommitDays = useMemo(() => {
    const uniqueDates = new Set(
      commits.map((commit) => formatDate(commit.commit.committer.date))
    );
    return uniqueDates.size; // Count of unique days
  }, [commits]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <RepositoryInput setCommits={setCommits} />

      {commits.length > 0 && (
        <h2 className="text-xl  mt-4">
          You have been working on this project for:{" "}
          <span className="font-bold">{uniqueCommitDays} days</span>
        </h2>
      )}
    </main>
  );
};

export default HomePage;
