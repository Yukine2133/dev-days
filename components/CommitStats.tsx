import { GetUniqueCommitDays } from "@/hooks/getUniqueCommitDays";
import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const uniqueCommitDays = GetUniqueCommitDays({ commits });
  const { formattedMaxCommitDate, maxCommits } = useCommitStats({ commits });
  return (
    <div>
      <h2 className="text-xl  mt-4">
        You have been working on this project for:{" "}
        <span className="font-bold">{uniqueCommitDays} days</span>
      </h2>

      <h2>
        {formattedMaxCommitDate} had the most commits: {maxCommits}
      </h2>
    </div>
  );
};

export default CommitStats;
