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
    commitCountByHour,
  } = useCommitStats({
    commits,
  });

  const mostActiveHour = Object.entries(commitCountByHour).reduce(
    (acc, [hour, count]) => {
      const numericHour = Number(hour);
      return count > acc.count ? { hour: numericHour, count } : acc;
    },
    { hour: 0, count: 0 }
  );

  const timeCategories = {
    morning: 0, // 6 AM - 12 PM
    afternoon: 0, // 12 PM - 6 PM
    evening: 0, // 6 PM - 12 AM
    night: 0, // 12 AM - 6 AM
  };

  Object.entries(commitCountByHour).forEach(([hour, count]) => {
    const numericHour = Number(hour);
    switch (true) {
      case numericHour >= 6 && numericHour < 12:
        timeCategories.morning += count;
        break;
      case numericHour >= 12 && numericHour < 18:
        timeCategories.afternoon += count;
        break;
      case numericHour >= 18 && numericHour < 24:
        timeCategories.evening += count;
        break;
      default:
        timeCategories.night += count;
        break;
    }
  });

  const mostActiveTimePeriod = Object.entries(timeCategories).reduce(
    (acc, [period, count]) => {
      return count > acc.count ? { period, count } : acc;
    },
    { period: "", count: 0 }
  );

  const leastActiveTimePeriod = Object.entries(timeCategories).reduce(
    (acc, [period, count]) => {
      return count < acc.count ? { period, count } : acc;
    },
    { period: "", count: Infinity }
  );

  const timeLabels: Record<string, string> = {
    morning: "Morning (6 AM - 12 PM)",
    afternoon: "Afternoon (12 PM - 6 PM)",
    evening: "Evening (6 PM - 12 AM)",
    night: "Night (12 AM - 6 AM)",
  };

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

      <h2 className="text-xl mt-4">
        Your most productive hour is{" "}
        <span className="font-bold">
          {mostActiveHour.hour === 0
            ? "12 AM"
            : mostActiveHour.hour < 12
            ? `${mostActiveHour.hour} AM`
            : mostActiveHour.hour === 12
            ? "12 PM"
            : `${mostActiveHour.hour - 12} PM`}
        </span>{" "}
        with <span className="font-bold">{mostActiveHour.count} commits</span>.
      </h2>

      <h2 className="text-xl mt-4">
        You commit the most in the{" "}
        <span className="font-bold">
          {timeLabels[mostActiveTimePeriod.period]}
        </span>
        .
      </h2>

      <h2 className="text-xl mt-4">
        Your least active time is the{" "}
        <span className="font-bold">
          {timeLabels[leastActiveTimePeriod.period]}
        </span>
        .
      </h2>

      <Heatmap commits={commits} heatmapData={heatmapData} />
    </div>
  );
};

export default CommitStats;
