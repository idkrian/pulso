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
import { dayKey, formatDate, todayKey } from "@/utils/date";
import Skeleton from "@/components/ui/Skeleton";
import { useDateLocale, useT } from "@/i18n";

const WEEKS_SHOWN = 12;

const EMPTY_Y_DOMAIN: [number, number] = [0, 4];

function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  // dayKey (not toISOString) so the week bucket uses the same calendar day as the rest of the app.
  return dayKey(d);
}

function formatWeek(weekKey: string, locale: string) {
  return formatDate(
    weekKey + "T12:00:00",
    { month: "short", day: "numeric" },
    locale,
  );
}

function buildWeeklyData(workouts: WorkoutSessionDto[], locale: string) {
  const counts: Record<string, number> = {};
  for (const w of workouts) {
    const key = getWeekStart(w.createdAt);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-WEEKS_SHOWN)
    .map(([week, workouts]) => ({
      week: formatWeek(week, locale),
      workouts,
    }));
}

function buildEmptyWeeks(locale: string) {
  const currentWeek = new Date(
    getWeekStart(todayKey() + "T12:00:00") + "T12:00:00",
  );

  return Array.from({ length: WEEKS_SHOWN }, (_, index) => {
    const week = new Date(currentWeek);
    week.setDate(week.getDate() - (WEEKS_SHOWN - 1 - index) * 7);
    return {
      week: formatWeek(dayKey(week), locale),
      workouts: 0,
    };
  });
}

const FREQUENCY_SKELETON_BARS = [
  "h-[45%]",
  "h-[70%]",
  "h-[35%]",
  "h-[85%]",
  "h-[60%]",
  "h-[95%]",
];

const WorkoutFrequencyChart = () => {
  const t = useT();
  const dateLocale = useDateLocale();
  const [sessions, setSessions] = useState<WorkoutSessionDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkouts()
      .then(setSessions)
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  const data = useMemo(
    () => buildWeeklyData(sessions, dateLocale),
    [sessions, dateLocale],
  );

  const isEmpty = data.length === 0;

  const chartData = useMemo(
    () => (isEmpty ? buildEmptyWeeks(dateLocale) : data),
    [isEmpty, data, dateLocale],
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

  if (loading) {
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
          <div className="flex h-56 w-full items-end gap-2 lg:h-full">
            {FREQUENCY_SKELETON_BARS.map((height, index) => (
              <Skeleton key={index} className={`flex-1 ${height}`} />
            ))}
          </div>
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
      <CardContent className="flex min-w-0 flex-col gap-3 pb-2 lg:flex-1 lg:min-h-0">
        <ChartContainer
          config={chartConfig}
          className={`h-56 w-full lg:h-auto lg:min-h-0 lg:flex-1 ${
            isEmpty ? "opacity-50" : ""
          }`}
        >
          <AreaChart data={chartData}>
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
              domain={isEmpty ? EMPTY_Y_DOMAIN : undefined}
              tick={{ fill: "#e5e5f0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={24}
            />
            {!isEmpty && <ChartTooltip content={<ChartTooltipContent />} />}
            <Area
              type="monotone"
              dataKey="workouts"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#workoutsGrad)"
            />
          </AreaChart>
        </ChartContainer>

        {isEmpty && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-3xl opacity-60">🫥</p>
            <p className="text-lightGrey text-sm">
              {t("charts.workoutFrequencyEmpty")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutFrequencyChart;
