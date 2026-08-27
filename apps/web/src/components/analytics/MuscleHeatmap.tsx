import { useEffect, useState } from "react";
import Model from "react-body-highlighter";
import { getWorkoutMuscleStats, type MuscleStatsPeriod } from "@/api/workout";
import {
  buildHighlighterData,
  type NormalizedMuscleStat,
} from "@/utils/muscle-highlighter-map";
import { useT } from "@/i18n";

const HEATMAP_COLORS = ["#3b82f6", "#22d3ee", "#22c55e", "#f59e0b", "#ef4444"];

const MODEL_BOX = {
  flex: "1 1 0",
  minWidth: 0,
  height: "100%",
  maxHeight: 450,
} as const;

const MODEL_SVG = { width: "100%", height: "100%" } as const;

type MuscleHeatmapProps = {
  period: MuscleStatsPeriod;
};

const MuscleHeatmap = ({ period }: MuscleHeatmapProps) => {
  const t = useT();
  const [data, setData] = useState<NormalizedMuscleStat[]>([]);

  useEffect(() => {
    getWorkoutMuscleStats(period).then((stats) => {
      setData(buildHighlighterData(stats, period));
    });
  }, [period]);

  return (
    <div className="flex flex-col items-center gap-3 lg:h-full">
      <p className="text-white text-base font-semibold">
        {t("charts.muscleActivity")}
      </p>

      {data.length === 0 ? (
        <div className="flex min-h-40 flex-1 flex-col items-center justify-center gap-2 lg:min-h-0">
          <p className="text-3xl opacity-60">🫥</p>
          <p className="text-lightGrey text-sm">
            {t("charts.muscleActivityEmpty")}
          </p>
        </div>
      ) : (
        <>
          <div className="flex aspect-10/9 w-full min-w-0 items-center justify-center gap-3 lg:aspect-auto lg:w-auto lg:min-h-0 lg:flex-1">
            <Model
              data={data}
              highlightedColors={HEATMAP_COLORS}
              bodyColor="#374151"
              style={MODEL_BOX}
              svgStyle={MODEL_SVG}
            />
            <Model
              data={data}
              type="posterior"
              highlightedColors={HEATMAP_COLORS}
              bodyColor="#374151"
              style={MODEL_BOX}
              svgStyle={MODEL_SVG}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-lightGrey">
              {t("charts.undertrained")}
            </span>
            {HEATMAP_COLORS.map((color, index) => (
              <div key={color} className="flex flex-col items-center gap-1">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                {index === 2 && (
                  <span className="text-[10px] text-lightGrey">
                    {t("charts.optimal")}
                  </span>
                )}
              </div>
            ))}
            <span className="text-xs text-lightGrey">
              {t("charts.overtrained")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MuscleHeatmap;
