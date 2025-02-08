interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubCommitter {
  name: string;
  email: string;
  date: string;
}

interface GitHubCommit {
  author: GitHubCommitter;
  committer: GitHubCommitter;
  message: string;
  tree: { sha: string; url: string };
  url: string;
  comment_count: number;
  verification?: {
    verified: boolean;
    reason: string;
    signature: string | null;
    payload: string | null;
  };
}

export interface GitHubCommitData {
  sha: string;
  node_id: string;
  commit: GitHubCommit;
  url: string;
  html_url: string;
  comments_url: string;
  author: GitHubUser | null;
  committer: GitHubUser | null;
  parents: { sha: string; url: string; html_url: string }[];
}
