import {
  LuFlame,
  LuPlay,
  LuMoon,
  LuDumbbell,
  LuLayers,
  LuTrophy,
} from "react-icons/lu";
import type { TrainingSplitDayEntry } from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { DEFAULT_ACCENT, muscleGroupAccent, summarizeSplit } from "@/utils";
import { formatVolume, sessionVolume } from "@/utils/workout-history";
import { useFormatDate, useT } from "@/i18n";

interface CalendarLeftPanelProps {
  todayEntry?: TrainingSplitDayEntry;
  todaySession?: WorkoutSessionDto;
  weekVolume: number;
  sessionsCompleted: number;
  sessionsPlanned: number;
  streak: number;
  onStartWorkout: () => void;
}

const CalendarLeftPanel = ({
  todayEntry,
  todaySession,
  weekVolume,
  sessionsCompleted,
  sessionsPlanned,
  streak,
  onStartWorkout,
}: CalendarLeftPanelProps) => {
  const t = useT();
  const formatDate = useFormatDate();
  const today = new Date();
  const split = todayEntry?.trainingSplit;
  const isRest = todayEntry?.restDay ?? !split;
  const summary = split ? summarizeSplit(split) : null;
  const accent =
    summary?.primaryGroup != null
      ? muscleGroupAccent[summary.primaryGroup]
      : DEFAULT_ACCENT;

  return (
    <div
      className={`flex w-full flex-col items-center justify-between bg-linear-to-b ${accent.gradient} gap-4 p-4 xl:w-[25%] xl:gap-6 xl:p-6`}
    >
      <div className="flex w-full items-center justify-center gap-3 xl:w-auto xl:flex-col xl:gap-0">
        <p className="text-white font-bold text-5xl leading-none xl:text-8xl">
          {formatDate(today, { day: "numeric" })}
        </p>
        <div className="flex flex-col xl:items-center">
          <p className="text-white/90 font-semibold text-xl capitalize xl:mt-1 xl:text-3xl">
            {formatDate(today, { weekday: "long" })}
          </p>
          <p className="text-white/60 text-xs capitalize xl:text-sm">
            {formatDate(today, { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        {!isRest && !todaySession && (
          <p className="text-white/70 font-semibold text-sm uppercase tracking-wider">
            {t("calendar.todaysWorkout")}
          </p>
        )}
        {todaySession ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <LuTrophy size={36} className="text-yellow-300" />
            <p className="text-white font-bold text-2xl">
              {t("calendar.workoutDone")}
            </p>
            <p className="text-white/70 text-sm">
              {t("calendar.sessionCompleted", {
                title: split ? split.title : t("calendar.fallbackSessionTitle"),
              })}
            </p>
            <div className="grid grid-cols-2 gap-2 w-full mt-1">
              <div className="flex flex-col items-center rounded-md bg-black/20 py-1.5 text-white">
                <span className="text-sm font-semibold">
                  {todaySession.workoutExerciseLogs?.length ?? 0}{" "}
                  {t("calendar.exercisesShort")}
                </span>
              </div>
              <div className="flex flex-col items-center rounded-md bg-black/20 py-1.5 text-white">
                <span className="text-sm font-semibold">
                  {formatVolume(sessionVolume(todaySession))}
                </span>
              </div>
            </div>
          </div>
        ) : isRest ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <LuMoon size={36} className="text-white/80" />
            <p className="text-white font-bold text-2xl">
              {t("common.restDay")}
            </p>
            <p className="text-white/60 text-xs text-center">
              {t("calendar.restDayHint")}
            </p>
          </div>
        ) : split && summary ? (
          <>
            <p className="text-center text-white font-bold text-4xl">
              {split.title}
            </p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex items-center justify-center gap-1.5 rounded-md bg-black/20 py-1.5 text-white">
                <LuDumbbell size={14} />
                <span className="text-sm font-semibold">
                  {summary.exerciseCount} {t("calendar.exercisesShort")}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 rounded-md bg-black/20 py-1.5 text-white">
                <LuLayers size={14} />
                <span className="text-sm font-semibold">
                  {summary.totalSets} {t("calendar.sets")}
                </span>
              </div>
            </div>
            <button
              onClick={onStartWorkout}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-md bg-white text-darkGrey font-bold cursor-pointer transition hover:scale-[1.02]"
            >
              <LuPlay size={16} />
              {t("calendar.startWorkout")}
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <p className="text-white/70 font-semibold text-xs uppercase tracking-wider text-center">
          {t("calendar.thisWeek")}
        </p>
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="flex flex-col items-center rounded-md bg-black/25 py-2">
            <span className="text-white font-bold text-lg leading-none">
              {sessionsCompleted}/{sessionsPlanned}
            </span>
            <span className="text-white/60 text-[10px] uppercase tracking-wide mt-1">
              {t("calendar.sessions")}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md bg-black/25 py-2">
            <span className="text-white font-bold text-lg leading-none">
              {formatVolume(weekVolume)}
            </span>
            <span className="text-white/60 text-[10px] uppercase tracking-wide mt-1">
              {t("calendar.volume")}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md bg-black/25 py-2">
            <div className="flex items-center gap-1 text-white">
              <LuFlame size={14} className="text-orange-300" />
              <span className="font-bold text-lg leading-none">{streak}</span>
            </div>
            <span className="text-white/60 text-[10px] uppercase tracking-wide mt-1">
              {t("calendar.streak")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarLeftPanel;
