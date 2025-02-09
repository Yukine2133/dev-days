"use client";
import CommitStats from "@/components/CommitStats";
import RepositoryInput from "@/components/RepositoryInput";
import { GitHubCommitData } from "@/interfaces/commit.interface";
import { useState } from "react";

const HomePage = () => {
  const [commits, setCommits] = useState<GitHubCommitData[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <RepositoryInput setCommits={setCommits} />

      {commits.length > 0 && <CommitStats commits={commits} />}
    </main>
  );
};

export default HomePage;
