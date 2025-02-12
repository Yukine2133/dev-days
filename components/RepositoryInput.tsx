"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { fetchRepoCommits } from "@/actions/github.actions";
import { GitHubCommitData } from "@/interfaces/commit.interface";

const RepositoryInput = ({
  setCommits,
}: {
  setCommits: (arg0: GitHubCommitData[]) => void;
}) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract owner and repo from URL
    const match = repoUrl.match(
      /^https:\/\/github\.com\/([^/]+)\/([^/]+)(\/.*)?$/
    );

    if (!match) {
      setError("Invalid GitHub repository URL.");
      return;
    }

    const [, owner, repo] = match;

    setError("");
    const commits = await fetchRepoCommits(owner, repo);
    console.log(commits);
    setCommits(commits);
  };

  return (
    <form
      className="flex mb-6 w-full max-w-7xl  flex-col  justify-center relative"
      onSubmit={handleSubmit}
    >
      <Input
        className="w-full rounded-lg h-12 bg-zinc-800/50 px-4 py-3 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        type="text"
        placeholder="Enter a repository link"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        className="absolute right-2 top-1/2 h-8 -translate-y-1/2 rounded-md bg-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default RepositoryInput;
