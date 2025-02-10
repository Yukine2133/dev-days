import { GetUniqueCommitDays } from "@/hooks/getUniqueCommitDays";
import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const uniqueCommitDays = GetUniqueCommitDays({ commits });
  const { formattedMaxCommitDate, maxCommits, longestStreak } = useCommitStats({
    commits,
  });

  return (
    <div>
      <h2 className="text-xl mt-4">
        You have been working on this project for:{" "}
        <span className="font-bold">{uniqueCommitDays} days</span>
      </h2>

      {formattedMaxCommitDate && (
        <h2 className="text-xl mt-4">
          On <span className="font-bold">{formattedMaxCommitDate}</span>, you
          had the most commits: <span className="font-bold">{maxCommits}</span>.
        </h2>
      )}

      <h2 className="text-xl mt-4">
        Your longest commit streak is:{" "}
        <span className="font-bold">{longestStreak} days</span>.
      </h2>
    </div>
  );
};

export default CommitStats;
