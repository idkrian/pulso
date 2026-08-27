import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { getAllWorkouts } from "@/api/workout";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { dayKey, formatDate } from "@/utils/date";
import { useDateLocale, useT } from "@/i18n";

function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  // dayKey (not toISOString) so the week bucket uses the same calendar day as the rest of the app.
  return dayKey(d);
}

function buildWeeklyData(workouts: WorkoutSessionDto[], locale: string) {
  const counts: Record<string, number> = {};
  for (const w of workouts) {
    const key = getWeekStart(w.createdAt);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([week, workouts]) => ({
      week: formatDate(
        week + "T12:00:00",
        { month: "short", day: "numeric" },
        locale,
      ),
      workouts,
    }));
}

const WorkoutFrequencyChart = () => {
  const t = useT();
  const dateLocale = useDateLocale();
  const [sessions, setSessions] = useState<WorkoutSessionDto[]>([]);

  useEffect(() => {
    getAllWorkouts().then(setSessions);
  }, []);

  const data = useMemo(
    () => buildWeeklyData(sessions, dateLocale),
    [sessions, dateLocale],
  );

  const chartConfig = useMemo(
    () =>
      ({
        workouts: {
          label: t("charts.workoutsSeries"),
          color: "#7c3aed",
        },
      }) satisfies ChartConfig,
    [t],
  );

  if (data.length === 0) {
    return (
      <Card className="bg-mediumGrey border-none flex-1">
        <CardHeader>
          <CardTitle className="text-white">
            {t("charts.workoutFrequency")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lightGrey/60 text-sm">
            {t("charts.workoutFrequencyEmpty")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-mediumGrey border-none flex min-w-0 flex-col lg:flex-1 lg:min-h-0">
      <CardHeader className="pb-0">
        <CardTitle className="text-white">
          {t("charts.workoutFrequency")}
        </CardTitle>
        <CardDescription>
          {t("charts.workoutFrequencyDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 pb-2 lg:flex-1 lg:min-h-0">
        <ChartContainer config={chartConfig} className="h-56 w-full lg:h-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="workoutsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e5f0"
              strokeOpacity={0.08}
            />
            <XAxis
              dataKey="week"
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={24}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="workouts"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#workoutsGrad)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WorkoutFrequencyChart;
