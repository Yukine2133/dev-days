import { GetUniqueCommitDays } from "@/hooks/getUniqueCommitDays";
import { useCommitStats } from "@/hooks/useCommitStats";
import { CommitStatsProps } from "@/interfaces/commit.interface";
import HeatMap from "@uiw/react-heat-map";
import { useState } from "react";

const CommitStats = ({ commits }: CommitStatsProps) => {
  const [selected, setSelected] = useState("");

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
      <HeatMap
        value={heatmapData}
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          padding: "10px",
        }}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date(commits[commits.length - 1]?.commit.committer.date)}
        panelColors={[
          "#f4decd",
          "#e4b293",
          "#d48462",
          "#c2533a",
          "#ad001d",
          "#6c0012",
        ]}
        rectRender={(props, data) => {
          const isSelected = selected === data.date;

          const x = Number(props.x) || 0;
          const y = Number(props.y) || 0;
          const width = Number(props.width) || 0;
          const height = Number(props.height) || 0;

          return (
            <g>
              {/* Commit cell */}
              <rect
                {...props}
                opacity={isSelected ? 1 : 0.6}
                cursor="pointer"
                stroke={isSelected ? "#000" : "none"}
                strokeWidth={isSelected ? 1.5 : 0}
                onClick={() => setSelected(isSelected ? "" : data.date)}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = isSelected ? "1" : "0.6")
                }
              />

              {/* Commit count text */}
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="10"
                fill={data.count > 10 ? "#fff" : "#000"} // Adjust text color for contrast
                fontWeight="bold"
              >
                {data.count}
              </text>
            </g>
          );
        }}
      />
    </div>
  );
};

export default CommitStats;
