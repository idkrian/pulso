import type { MuscleGroupItemsDto, MuscleGroupType } from "../dtos/muscle.dto";
import type { TrainingSplitDto } from "../dtos/training-splits.dto";

import { formatDate } from "./date";
// Re-exported so existing `@/utils` imports keep working; defined in ./date.
export { APP_TZ, dayKey, formatDate, isSameDay, todayKey } from "./date";

export const getWeekDays = (weekOffset: number = 0, locale?: string) => {
  const days = [];
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + daysToMonday + weekOffset * 7);

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    days.push({
      date: date,
      dayName: formatDate(date, { weekday: "long" }, locale),
      day: formatDate(date, { month: "numeric", day: "numeric" }, locale),
      dayNumber: date.getDay(),
    });
  }

  return days;
};

export const startOfDay = (d: Date) => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

export interface WeekRangeParts {
  sameMonth: boolean;
  month: string;
  start: string;
  end: string;
}

export const weekRangeParts = (
  days: { date: Date }[],
  locale?: string,
): WeekRangeParts | null => {
  if (days.length === 0) return null;
  const first = days[0].date;
  const last = days[days.length - 1].date;
  const sameMonth = first.getMonth() === last.getMonth();
  const fmt = (d: Date) =>
    formatDate(
      d,
      { day: "2-digit", month: sameMonth ? undefined : "short" },
      locale,
    );

  return {
    sameMonth,
    month: formatDate(first, { month: "long" }, locale),
    start: fmt(first),
    end: fmt(last),
  };
};

export const getExercisesByMuscleGroup = (
  muscleGroupExercises: MuscleGroupItemsDto[],
  group: MuscleGroupType,
) => {
  return (
    muscleGroupExercises.find((mg) => mg.muscleGroup === group)?.items || []
  );
};

export const getMusclesByMuscleGroup = (
  muscleGroupExercises: MuscleGroupItemsDto[],
  group: MuscleGroupType,
) => {
  const exercises = getExercisesByMuscleGroup(muscleGroupExercises, group);
  const musclesSet = [...new Set(exercises.map((m) => m.muscle))];
  return musclesSet;
};

export const REST_PRESETS = [60, 90, 120, 180];
export const DEFAULT_REST = 90;

export const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const rpeColor = (rpe: number) => {
  if (rpe <= 5) return "bg-emerald-500";
  if (rpe <= 7) return "bg-amber-500";
  if (rpe <= 9) return "bg-orange-500";
  return "bg-red-500";
};

export interface SplitSummary {
  exerciseCount: number;
  totalSets: number;
  estimatedMinutes: number;
  muscleGroups: { group: MuscleGroupType; count: number }[];
  primaryGroup: MuscleGroupType | null;
}

export const summarizeSplit = (split: TrainingSplitDto): SplitSummary => {
  const exerciseCount = split.exercises.length;
  const totalSets = split.exercises.reduce(
    (sum, ex) => sum + (ex.sets ?? 0),
    0,
  );
  const estimatedMinutes = totalSets > 0 ? Math.round(totalSets * 2 + 5) : 0;

  const groupCounts = new Map<MuscleGroupType, number>();
  for (const ex of split.exercises) {
    const g = ex.exercise?.muscleGroup;
    if (!g) continue;
    groupCounts.set(g, (groupCounts.get(g) ?? 0) + 1);
  }
  const muscleGroups = [...groupCounts.entries()]
    .map(([group, count]) => ({ group, count }))
    .sort((a, b) => b.count - a.count);

  return {
    exerciseCount,
    totalSets,
    estimatedMinutes,
    muscleGroups,
    primaryGroup: muscleGroups[0]?.group ?? null,
  };
};

export interface MuscleGroupAccent {
  gradient: string;
  ring: string;
  chip: string;
  text: string;
}

export const muscleGroupAccent: Record<MuscleGroupType, MuscleGroupAccent> = {
  CHEST: {
    gradient: "from-rose-500 to-rose-700",
    ring: "hover:border-rose-500/60",
    chip: "bg-rose-500/15 text-rose-200 border-rose-500/30",
    text: "text-rose-300",
  },
  BACK: {
    gradient: "from-blue-500 to-blue-700",
    ring: "hover:border-blue-500/60",
    chip: "bg-blue-500/15 text-blue-200 border-blue-500/30",
    text: "text-blue-300",
  },
  SHOULDERS: {
    gradient: "from-amber-500 to-amber-700",
    ring: "hover:border-amber-500/60",
    chip: "bg-amber-500/15 text-amber-200 border-amber-500/30",
    text: "text-amber-300",
  },
  ARMS: {
    gradient: "from-violet-500 to-violet-700",
    ring: "hover:border-violet-500/60",
    chip: "bg-violet-500/15 text-violet-200 border-violet-500/30",
    text: "text-violet-300",
  },
  LEGS: {
    gradient: "from-emerald-500 to-emerald-700",
    ring: "hover:border-emerald-500/60",
    chip: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
    text: "text-emerald-300",
  },
  GLUTES: {
    gradient: "from-fuchsia-500 to-fuchsia-700",
    ring: "hover:border-fuchsia-500/60",
    chip: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/30",
    text: "text-fuchsia-300",
  },
  CORE: {
    gradient: "from-orange-500 to-orange-700",
    ring: "hover:border-orange-500/60",
    chip: "bg-orange-500/15 text-orange-200 border-orange-500/30",
    text: "text-orange-300",
  },
};

export const DEFAULT_ACCENT: MuscleGroupAccent = {
  gradient: "from-indigo to-darkIndigo",
  ring: "hover:border-indigo/60",
  chip: "bg-indigo/15 text-lightIndigo border-indigo/30",
  text: "text-lightIndigo",
};
