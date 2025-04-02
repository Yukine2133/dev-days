"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { GitHubCommitData } from "@/interfaces/commit.interface";
import { CommitterSelect } from "./CommiterSelect";
import { useRepositoryInput } from "@/hooks/useRepositoryInput";

export interface IRepositoryInputProps {
  setCommits: (arg0: GitHubCommitData[]) => void;
  setLoading: (arg0: boolean) => void;
}

const RepositoryInput = ({ setCommits, setLoading }: IRepositoryInputProps) => {
  const {
    repoUrl,
    setRepoUrl,
    error,
    handleSubmit,
    committers,
    selectedCommitter,
    setSelectedCommitter,
  } = useRepositoryInput({
    setCommits,
    setLoading,
  });
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

      {committers.length > 1 && (
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
