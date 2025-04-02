import { useState, useEffect } from "react";
import { fetchRepoCommits } from "@/actions/github.actions";
import { IRepositoryInputProps } from "@/components/RepositoryInput";
import { GitHubCommitData } from "@/interfaces/commit.interface";
export const useRepositoryInput = ({
  setCommits,
  setLoading,
}: IRepositoryInputProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [allCommits, setAllCommits] = useState<GitHubCommitData[]>([]);
  const [committers, setCommitters] = useState<string[]>([]);
  const [selectedCommitter, setSelectedCommitter] = useState<
    string | undefined
  >("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

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
          commits
            .filter((c) => c.committer?.login)
            .map((c) => c.committer!.login)
        ),
      ];
      setCommitters(uniqueCommitters);
      setSelectedCommitter("");
      setCommits(commits);
    } catch (error) {
      setError("Something went wrong. Please try again");
    } finally {
      setError("");
      setLoading(false);
    }
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
  return {
    repoUrl,
    setRepoUrl,
    error,
    handleSubmit,
    committers,
    selectedCommitter,
    setSelectedCommitter,
  };
};
