import { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { GitHubCommitData } from "@/interfaces/commit.interface";

interface HeatMapProps {
  commits: GitHubCommitData[];
  heatmapData: { date: string; count: number }[];
}
export const Heatmap = ({ commits, heatmapData }: HeatMapProps) => {
  const [selected, setSelected] = useState("");

  return (
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
          <g
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = isSelected ? "1" : "0.6";
            }}
            style={{ cursor: "pointer", opacity: isSelected ? 1 : 0.6 }}
            onClick={() => setSelected(isSelected ? "" : data.date)}
          >
            {/* Commit cell */}
            <rect
              {...props}
              stroke={isSelected ? "#000" : "none"}
              strokeWidth={isSelected ? 1.5 : 0}
            />

            {/* Commit count text */}
            <text
              x={x + width / 2}
              y={y + height / 2}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="10"
              fill={data.count > 10 ? "#fff" : "#000"}
              fontWeight="bold"
              pointerEvents="none"
            >
              {data.count}
            </text>
          </g>
        );
      }}
    />
  );
};
