"use client";

import CommitStats from "@/components/CommitStats";
import RepositoryInput from "@/components/RepositoryInput";
import type { GitHubCommitData } from "@/interfaces/commit.interface";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const HomePage = () => {
  const [commits, setCommits] = useState<GitHubCommitData[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <PageHeader />

      <RepositoryInput setCommits={setCommits} />

      {commits.length > 0 && <CommitStats commits={commits} />}
    </main>
  );
};

export default HomePage;
