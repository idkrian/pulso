import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ExerciseHistoryEntryDto } from "@/dtos/exercise.dto";
import { useAuth } from "@/contexts/AuthContext";
import { toDisplayWeight, unitLabel } from "@/utils/units";
import { useFormatDate, useT } from "@/i18n";

type Props = {
  history: ExerciseHistoryEntryDto[];
};

const ExerciseProgressChart = ({ history }: Props) => {
  const { unit } = useAuth();
  const t = useT();
  const formatDate = useFormatDate();

  const chartConfig = useMemo(
    () =>
      ({
        estimatedOneRepMax: {
          label: t("charts.estimatedOneRepMax"),
          color: "#a78bfa",
        },
        maxWeight: {
          label: t("charts.topSet"),
          color: "#34d399",
        },
      }) satisfies ChartConfig,
    [t],
  );

  // History arrives oldest-first from the API, which is the order charts want.
  const data = history.map((entry) => ({
    date: formatDate(entry.date, { month: "short", day: "numeric" }),
    estimatedOneRepMax: toDisplayWeight(entry.estimatedOneRepMax, unit),
    maxWeight: toDisplayWeight(entry.maxWeight, unit),
  }));

  if (data.length < 2) {
    return (
      <p className="text-sm text-lightGrey/60 italic">
        {t("charts.progressionEmpty")}
      </p>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-40 w-full">
      <LineChart data={data}>
        <CartesianGrid vertical={false} stroke="#e5e5f0" strokeOpacity={0.08} />
        <XAxis
          dataKey="date"
          tick={{ fill: "#e5e5f0", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={["dataMin - 5", "dataMax + 5"]}
          tick={{ fill: "#e5e5f0", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={30}
          unit={unitLabel(unit)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="estimatedOneRepMax"
          stroke="#a78bfa"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="maxWeight"
          stroke="#34d399"
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ExerciseProgressChart;
