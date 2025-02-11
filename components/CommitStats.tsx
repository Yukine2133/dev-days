import { GetUniqueCommitDays } from "@/hooks/getUniqueCommitDays";
import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";
import { Heatmap } from "./HeatMap";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const uniqueCommitDays = GetUniqueCommitDays({ commits });
  const {
    formattedMaxCommitDate,
    maxCommits,
    longestStreak,
    commitCountByDay,
  } = useCommitStats({
    commits,
  });

  // Convert commit data into heatmap format
  const heatmapData = Object.entries(commitCountByDay).map(([date, count]) => ({
    date: date.replace(/-/g, "/"), // Convert YYYY-MM-DD to YYYY/MM/DD
    count,
  }));

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
      <Heatmap commits={commits} heatmapData={heatmapData} />
    </div>
  );
};

export default CommitStats;
