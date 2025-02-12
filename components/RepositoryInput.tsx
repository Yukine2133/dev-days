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
      className="flex mb-6  relative  flex-col  justify-center"
      onSubmit={handleSubmit}
    >
      <Input
        className="w-[40rem] bg-[#313131] outline-none"
        type="text"
        placeholder="Enter a repository link"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex mt-4 justify-end">
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};

export default RepositoryInput;
