import { GetUniqueCommitDays } from "@/hooks/getUniqueCommitDays";
import { CommitStatsProps } from "@/interfaces/commit.interface";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const uniqueCommitDays = GetUniqueCommitDays({ commits });
  return (
    <div>
      <h2 className="text-xl  mt-4">
        You have been working on this project for:{" "}
        <span className="font-bold">{uniqueCommitDays} days</span>
      </h2>
    </div>
  );
};

export default CommitStats;
