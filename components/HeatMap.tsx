"use client";

import { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeatMapProps {
  heatmapData: { date: string; count: number }[];
}

export const Heatmap = ({ heatmapData }: HeatMapProps) => {
  const [selected, setSelected] = useState("");

  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-zinc-100">Commit Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center  w-full overflow-x-auto">
          <HeatMap
            value={heatmapData}
            style={{
              color: "#94a3b8",
              width: "900px",
            }}
            weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            startDate={
              new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            }
            rectSize={14}
            space={4}
            panelColors={[
              "#18181b", // Dark background for no commits
              "#c084fc20",
              "#c084fc40",
              "#c084fc60",
              "#c084fc80",
              "#c084fcaa",
            ]}
            legendCellSize={0}
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
                    e.currentTarget.style.opacity = isSelected ? "1" : "0.85";
                  }}
                  style={{
                    cursor: "pointer",
                    opacity: isSelected ? 1 : 0.85,
                    transition: "opacity 0.2s ease",
                  }}
                  onClick={() => setSelected(isSelected ? "" : data.date)}
                >
                  <rect
                    {...props}
                    rx={3}
                    ry={3}
                    stroke={isSelected ? "#c084fc" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isSelected ? 1.5 : 1}
                  />
                  {data.count > 0 && (
                    <text
                      x={x + width / 2}
                      y={y + height / 2}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize="10"
                      fill={data.count > 3 ? "#fff" : "#94a3b8"}
                      fontWeight="medium"
                      pointerEvents="none"
                    >
                      {data.count}
                    </text>
                  )}
                </g>
              );
            }}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <span className="text-xs text-zinc-400">Less</span>
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="h-3 w-3 rounded"
              style={{
                backgroundColor:
                  level === 0
                    ? "#18181b"
                    : `rgba(192, 132, 252, ${level * 0.2})`,
              }}
            />
          ))}
          <span className="text-xs text-zinc-400">More</span>
        </div>
      </CardContent>
    </Card>
  );
};
