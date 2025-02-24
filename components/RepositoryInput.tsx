"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { fetchRepoCommits } from "@/actions/github.actions";
import { GitHubCommitData } from "@/interfaces/commit.interface";
import { CommitterSelect } from "./CommiterSelect";

const RepositoryInput = ({
  setCommits,
}: {
  setCommits: (arg0: GitHubCommitData[]) => void;
}) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [allCommits, setAllCommits] = useState<GitHubCommitData[]>([]);
  const [committers, setCommitters] = useState<string[]>([]);
  const [selectedCommitter, setSelectedCommitter] = useState<
    string | undefined
  >("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    setAllCommits(commits);

    // Extract unique committers
    const uniqueCommitters = [
      ...new Set(
        commits.filter((c) => c.committer?.login).map((c) => c.committer!.login)
      ),
    ];
    setCommitters(uniqueCommitters);
    setSelectedCommitter("");
    setCommits(commits);
  };

  useEffect(() => {
    if (selectedCommitter) {
      const filtered = allCommits.filter(
        (commit) => commit.committer?.login === selectedCommitter
      );
      setCommits(filtered);
    } else {
      setCommits(allCommits); // Show all if none selected
    }
  }, [selectedCommitter, allCommits, setCommits]);

  return (
    <form
      className="flex mb-6 w-full max-w-7xl flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <Input
          className="w-full rounded-lg h-12 bg-zinc-800/50 px-4 py-3 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Enter a repository link"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button
          className="absolute right-2 top-1/2 h-8 -translate-y-1/2 rounded-md bg-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
          type="submit"
        >
          Search
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {committers.length > 0 && (
        <CommitterSelect
          committers={committers}
          selectedCommitter={selectedCommitter}
          setSelectedCommitter={setSelectedCommitter}
        />
      )}
    </form>
  );
};

export default RepositoryInput;
