import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";
import { Heatmap } from "./HeatMap";
import { Clock, Calendar, GitCommit, Moon, Sun } from "lucide-react";
import { CommitStatsCard } from "./CommitStatsCard";
import { formatDate, formatHour, getTimeAgo } from "@/utils/formatTime";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const {
    formattedMaxCommitDate,
    maxCommits,
    longestStreak,
    heatmapData,
    uniqueCommitDays,
    leastActiveTimePeriod,
    mostActiveHour,
    mostActiveTimePeriod,
    timeLabels,
    mostCommonWords,
    firstCommitDate,
  } = useCommitStats(commits);

  return (
    <div className="w-full max-w-7xl space-y-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Commits */}
        <CommitStatsCard
          Icon={GitCommit}
          label="Total Commits"
          delay={0.1}
          className="h-[126px]"
        >
          <h2 className="text-2xl font-bold text-white">{commits.length}</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Avg. {(commits.length / uniqueCommitDays).toFixed(1)} per day
          </p>
        </CommitStatsCard>

        {/* Project Duration */}
        <CommitStatsCard
          className="h-[126px]"
          Icon={Calendar}
          label="Project Duration"
          delay={0.2}
        >
          <h2 className="text-2xl mt-2  font-bold text-white">
            {uniqueCommitDays} days
          </h2>
        </CommitStatsCard>

        {/* Peak Activity */}
        <CommitStatsCard
          className="h-[126px]"
          Icon={Clock}
          label="Peak Activity"
          delay={0.3}
        >
          <h2 className="text-2xl font-bold text-white">
            {formatHour(mostActiveHour.hour)}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {mostActiveHour.count} commits
          </p>
        </CommitStatsCard>

        {/* Most Active Day */}

        <CommitStatsCard
          className="h-[126px]"
          Icon={GitCommit}
          label="Most Active Day"
          delay={0.4}
        >
          <h2 className="text-2xl font-bold text-white">
            {formattedMaxCommitDate}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{maxCommits} commits</p>
        </CommitStatsCard>

        {/* Longest Streak */}

        <CommitStatsCard
          Icon={Moon}
          label="Longest Streak"
          delay={0.5}
          className="h-[126px]"
        >
          <h2 className="text-2xl mt-2 font-bold text-white">
            {longestStreak} days
          </h2>
        </CommitStatsCard>

        {/* First Commit */}

        <CommitStatsCard
          className="h-[126px]"
          Icon={GitCommit}
          label="First Commit"
          delay={0.6}
        >
          <h2 className="text-2xl font-bold text-white">
            {firstCommitDate && formatDate(firstCommitDate.toString())}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {firstCommitDate && getTimeAgo(firstCommitDate.toString())}
          </p>
        </CommitStatsCard>
      </div>

      {/* Commit Patterns */}
      <CommitStatsCard Icon={Moon} label="Commit Patterns" delay={0.7}>
        <div className="space-y-2  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-zinc-100">
                {timeLabels[mostActiveTimePeriod.period]}
              </span>
            </div>
            <span className="text-sm font-medium text-purple-400">
              Most Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-zinc-400" />
              <span className="text-sm text-zinc-100">
                {timeLabels[leastActiveTimePeriod.period]}
              </span>
            </div>
            <span className="text-sm font-medium text-zinc-400">
              Least Active
            </span>
          </div>
        </div>
      </CommitStatsCard>

      {/* Most Common Commit Message */}
      <CommitStatsCard
        Icon={GitCommit}
        label="Most Common Commit Words"
        delay={0.8}
      >
        <div className="space-y-2">
          {mostCommonWords.map(({ word, count }, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-purple-400" />
                <span className="text-lg font-medium text-white">{word}</span>
              </div>
              <span className="rounded-full bg-purple-600/10 px-2.5 py-0.5 text-sm font-medium text-purple-400">
                {count} occurrences
              </span>
            </div>
          ))}
        </div>
      </CommitStatsCard>

      <Heatmap heatmapData={heatmapData} />
    </div>
  );
};

export default CommitStats;
