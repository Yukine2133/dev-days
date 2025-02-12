import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";
import { Heatmap } from "./HeatMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, GitCommit, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { formatHour } from "@/utils/formatHour";

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
    mostCommonWord,
    maxCount,
  } = useCommitStats(commits);

  return (
    <div className="w-full max-w-7xl space-y-6">
      <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-4  ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-zinc-800/50 border-zinc-700 h-[126px]  ">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-zinc-100 text-sm font-medium">
                Project Duration
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl mt-2  font-bold text-white">
                {uniqueCommitDays} days
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-zinc-100 text-sm font-medium">
                Peak Activity
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatHour(mostActiveHour.hour)}
              </div>
              <p className="text-xs text-zinc-400">
                {mostActiveHour.count} commits
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-zinc-100 text-sm font-medium">
                Most Active Day
              </CardTitle>
              <GitCommit className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formattedMaxCommitDate}
              </div>
              <p className="text-xs text-zinc-400">{maxCommits} commits</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-zinc-800/50 border-zinc-700 h-[126px] ">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-zinc-100 text-sm font-medium">
                Commit Streak
              </CardTitle>
              <Moon className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl mt-2 font-bold text-white">
                {longestStreak} days
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">Commit Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-zinc-100">
              Most Common Commit Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-purple-400" />
                <span className="text-lg font-medium text-white">
                  {mostCommonWord}
                </span>
              </div>
              <span className="rounded-full bg-purple-600/10 px-2.5 py-0.5 text-sm font-medium text-purple-400">
                {maxCount} occurrences
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Heatmap commits={commits} heatmapData={heatmapData} />
    </div>
  );
};

export default CommitStats;
