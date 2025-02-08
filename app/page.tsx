// import { fetchRepoCommits } from "@/actions/github.actions";

import RepositoryInput from "@/components/RepositoryInput";

const HomePage = async () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <RepositoryInput />
    </main>
  );
};

export default HomePage;
