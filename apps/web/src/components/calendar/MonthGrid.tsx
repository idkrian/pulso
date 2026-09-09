import { LuCheck, LuMoon } from "react-icons/lu";
import type {
  TrainingSplitDayEntry,
  TrainingSplitDayMap,
} from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import type { MonthDay } from "@/utils";
import { DEFAULT_ACCENT, muscleGroupAccent, summarizeSplit } from "@/utils";
import { useFormatDate } from "@/i18n";
import type { DayInfo, DayStatus } from "./DayCard";

interface MonthGridProps {
  days: MonthDay[];
  splitsByDay: TrainingSplitDayMap;
  describeDay: (date: Date, entry?: TrainingSplitDayEntry) => DayInfo;
  onSelect: (
    date: Date,
    dayName: string,
    dayNumber: number,
    entry: TrainingSplitDayEntry | undefined,
    session: WorkoutSessionDto | undefined,
    status: DayStatus,
  ) => void;
}

const cellStyles: Record<DayStatus, string> = {
  today: "border-indigo bg-indigo/10 ring-1 ring-indigo/40",
  completed: "border-emerald-500/50 bg-emerald-500/10 hover:border-emerald-500",
  missed: "border-red-500/30 bg-red-500/5 hover:border-red-500/60",
  upcoming: "border-darkGrey bg-mediumGrey hover:border-white/20",
  rest: "border-darkGrey bg-mediumGrey/40",
  empty: "border-dashed border-white/10 bg-mediumGrey/20 hover:border-white/30",
};

const dotStyles: Partial<Record<DayStatus, string>> = {
  today: "bg-lightIndigo",
  missed: "bg-red-400",
  upcoming: "bg-white/25",
};

const MonthGrid = ({
  days,
  splitsByDay,
  describeDay,
  onSelect,
}: MonthGridProps) => {
  const formatDate = useFormatDate();

  return (
    <div className="flex min-w-0 flex-col gap-1.5 xl:h-full">
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.slice(0, 7).map((day) => (
          <span
            key={day.dayNumber}
            className="text-center text-[10px] font-semibold uppercase tracking-wider text-lightGrey/40 sm:text-xs"
          >
            <span className="sm:hidden">
              {formatDate(day.date, { weekday: "narrow" })}
            </span>
            <span className="hidden sm:inline">
              {formatDate(day.date, { weekday: "short" })}
            </span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 xl:min-h-0 xl:flex-1 xl:auto-rows-fr">
        {days.map((day) => {
          const entry = splitsByDay[day.dayNumber];
          const { session, status } = describeDay(day.date, entry);
          const split = entry?.trainingSplit ?? session?.trainingSplit;
          const summary = split?.exercises ? summarizeSplit(split) : null;
          const accent =
            summary?.primaryGroup != null
              ? muscleGroupAccent[summary.primaryGroup]
              : DEFAULT_ACCENT;
          const dot = dotStyles[status];

          return (
            <button
              key={day.date.toISOString()}
              type="button"
              onClick={() =>
                onSelect(
                  day.date,
                  formatDate(day.date, { weekday: "long" }),
                  day.dayNumber,
                  entry,
                  session,
                  status,
                )
              }
              className={`flex min-h-16 flex-col gap-1 rounded-lg border p-1.5 text-left transition cursor-pointer sm:min-h-24 sm:p-2 ${
                cellStyles[status]
              } ${day.inMonth ? "" : "opacity-40"}`}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span
                  className={`text-xs font-semibold tabular-nums sm:text-sm ${
                    status === "today" ? "text-lightIndigo" : "text-white"
                  }`}
                >
                  {day.day}
                </span>
                {status === "completed" && (
                  <LuCheck size={12} className="shrink-0 text-emerald-400" />
                )}
                {status === "rest" && (
                  <LuMoon size={11} className="shrink-0 text-white/40" />
                )}
                {dot && (
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                )}
              </div>

              {split && status !== "rest" && status !== "empty" && (
                <span
                  className={`hidden w-full truncate rounded px-1 py-0.5 text-[10px] font-semibold text-white bg-linear-to-br sm:block ${accent.gradient}`}
                >
                  {split.title}
                </span>
              )}

              <span className="sr-only">
                {formatDate(day.date, { dateStyle: "full" })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthGrid;
