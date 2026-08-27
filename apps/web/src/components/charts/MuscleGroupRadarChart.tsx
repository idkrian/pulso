import { useEffect, useMemo, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  getWorkoutMuscleGroupsStats,
  type MuscleGroupStat,
  type MuscleStatsPeriod,
} from "@/api/workout";
import { MuscleGroup } from "@/dtos/muscle.dto";
import { useMuscleGroupLabel, useT } from "@/i18n";

type MuscleGroupRadarChartProps = {
  period: MuscleStatsPeriod;
};

const MuscleGroupRadarChart = ({ period }: MuscleGroupRadarChartProps) => {
  const t = useT();
  const muscleGroupLabel = useMuscleGroupLabel();
  const [data, setData] = useState<MuscleGroupStat[]>([]);

  useEffect(() => {
    getWorkoutMuscleGroupsStats(period).then(setData);
  }, [period]);

  const chartConfig = useMemo(
    () =>
      ({
        sets: {
          label: t("charts.setsSeries"),
          color: "#7c3aed",
        },
      }) satisfies ChartConfig,
    [t],
  );

  const totals: Record<string, number> = {};
  for (const item of data) {
    totals[item.muscleGroup] = item.totalSets;
  }

  const chartData = Object.values(MuscleGroup).map((group) => ({
    muscle: muscleGroupLabel(group),
    sets: totals[group] ?? 0,
  }));

  return (
    <Card className="bg-mediumGrey border-none flex min-w-0 flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-white">
          {t("charts.muscleBalance")}
        </CardTitle>
        <CardDescription>
          {t("charts.muscleBalanceDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 flex-1 pb-2 -px-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px] w-full lg:h-full"
        >
          <RadarChart
            data={chartData}
            margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
            outerRadius="80%"
          >
            <PolarGrid stroke="#e5e5f0" strokeOpacity={0.15} />
            <PolarAngleAxis
              dataKey="muscle"
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              dataKey="sets"
              fill="#7c3aed"
              fillOpacity={0.35}
              stroke="#a78bfa"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MuscleGroupRadarChart;
