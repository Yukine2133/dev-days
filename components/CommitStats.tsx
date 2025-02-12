import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";
import { Heatmap } from "./HeatMap";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const {
    formattedMaxCommitDate,
    maxCommits,
    longestStreak,
    heatmapData,
    uniqueCommitDays,
    leastActiveTimePeriod,
    getMostActiveHours,
    mostActiveTimePeriod,
    timeLabels,
    mostCommonWord,
    maxCount,
  } = useCommitStats(commits);

  return (
    <div className="mt-8 ">
      <div className="flex gap-4 items-center">
        <div className="border  border-stone-700">
          <h2 className="text-xl mt-4 border-b border-stone-700 px-4 pb-2">
            You have been working on this project for:{" "}
            <span className="font-bold">{uniqueCommitDays} days</span>
          </h2>
          {formattedMaxCommitDate && (
            <h2 className="text-xl mt-4 border-b border-stone-700 px-4 pb-2">
              On <span className="font-bold">{formattedMaxCommitDate}</span>,
              you had the most commits:{" "}
              <span className="font-bold">{maxCommits}</span>.
            </h2>
          )}
          <h2 className="text-xl mt-4 border-b border-stone-700 px-4 pb-2">
            Your longest commit streak is:{" "}
            <span className="font-bold">{longestStreak} days</span>.
          </h2>
        </div>
        <div className="border border-stone-700">
          {getMostActiveHours()}
          <h2 className="text-xl mt-4 border-b border-stone-700 px-4 pb-2">
            You commit the most in the{" "}
            <span className="font-bold">
              {timeLabels[mostActiveTimePeriod.period]}
            </span>
            .
          </h2>
          <h2 className="text-xl mt-4 border-b border-stone-700 px-4 pb-2">
            Your least active time is the{" "}
            <span className="font-bold">
              {timeLabels[leastActiveTimePeriod.period]}
            </span>
            .
          </h2>
        </div>
      </div>

      <h2 className="text-xl text-center mx-auto w-fit mt-4 border border-stone-700 px-4 pb-2">
        Most common commit message:{" "}
        <span className="font-bold">{mostCommonWord}</span> with{" "}
        <span className="font-bold">{maxCount}</span> occurrences
      </h2>

      <Heatmap commits={commits} heatmapData={heatmapData} />
    </div>
  );
};

export default CommitStats;
