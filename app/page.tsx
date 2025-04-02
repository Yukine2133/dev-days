"use client";

import CommitStats from "@/components/CommitStats";
import RepositoryInput from "@/components/RepositoryInput";
import type { GitHubCommitData } from "@/interfaces/commit.interface";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const HomePage = () => {
  const [commits, setCommits] = useState<GitHubCommitData[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <PageHeader />

      <RepositoryInput setCommits={setCommits} setLoading={setLoading} />

      {loading && <LoadingSpinner />}

      {commits.length > 0 && !loading && <CommitStats commits={commits} />}
    </main>
  );
};

export default HomePage;
