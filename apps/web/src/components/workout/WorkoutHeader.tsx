import { LuPause, LuPlay, LuRotateCw, LuTimer, LuTrophy } from "react-icons/lu";
import { formatTime } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toDisplayWeight, unitLabel } from "@/utils/units";
import { useFormatNumber, useT } from "@/i18n";

type Props = {
  workoutSeconds: number;
  workoutRunning: boolean;
  onToggleRunning: () => void;
  onResetTime: () => void;
  exerciseFinishedCount: number;
  totalExercises: number;
  totalCompletedSets: number;
  totalSets: number;
  overallPct: number;
  totalVolume: number;
  pulseVolume: boolean;
};

const WorkoutHeader = ({
  workoutSeconds,
  workoutRunning,
  onToggleRunning,
  onResetTime,
  exerciseFinishedCount,
  totalExercises,
  totalCompletedSets,
  totalSets,
  overallPct,
  totalVolume,
  pulseVolume,
}: Props) => {
  const t = useT();
  const { unit } = useAuth();
  const formatNumber = useFormatNumber();

  return (
    <div className="grid shrink-0 grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
      <div className="flex items-center gap-2 rounded-xl bg-mediumGrey p-3 lg:gap-3 lg:p-4">
        <div className="hidden rounded-lg bg-indigo/20 p-2 text-lightIndigo lg:block">
          <LuTimer size={24} />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[10px] uppercase tracking-wider text-lightGrey/60 lg:text-xs">
            <span className="lg:hidden">{t("workout.time")}</span>
            <span className="hidden lg:inline">{t("workout.workoutTime")}</span>
          </span>
          <span className="text-lg font-bold tabular-nums lg:text-2xl">
            {formatTime(workoutSeconds)}
          </span>
        </div>
        <div className="ml-auto flex shrink-0 gap-1">
          <button
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-darkGrey"
            onClick={onToggleRunning}
            aria-label={
              workoutRunning ? t("workout.pause") : t("workout.resume")
            }
          >
            {workoutRunning ? <LuPause size={20} /> : <LuPlay size={20} />}
          </button>
          <button
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-darkGrey"
            onClick={onResetTime}
            aria-label={t("workout.resetTime")}
          >
            <LuRotateCw size={20} />
          </button>
        </div>
      </div>

      <div className="order-last col-span-2 flex flex-col justify-center gap-2 rounded-xl bg-mediumGrey p-3 lg:order-0 lg:col-span-1 lg:p-4">
        <div className="flex justify-between text-[10px] uppercase tracking-wider text-lightGrey/60 lg:text-xs">
          <span>{t("workout.progress")}</span>
          <span>
            {t("workout.exercisesDone", {
              done: exerciseFinishedCount,
              total: totalExercises,
            })}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-darkGrey">
          <div
            className="h-full rounded-full bg-linear-to-r from-indigo to-lightIndigo transition-all duration-500 ease-out"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <span className="text-[10px] tabular-nums text-lightGrey/60 lg:text-xs">
          {t("workout.setsDone", {
            done: totalCompletedSets,
            total: totalSets,
          })}
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-mediumGrey p-3 lg:gap-3 lg:p-4">
        <div className="hidden rounded-lg bg-indigo/20 p-2 text-lightIndigo lg:block">
          <LuTrophy size={24} />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[10px] uppercase tracking-wider text-lightGrey/60 lg:text-xs">
            {t("workout.volume")}
          </span>
          <span
            className={`truncate text-lg font-bold tabular-nums transition-all duration-300 lg:text-2xl ${
              pulseVolume ? "scale-110 text-lightIndigo" : ""
            }`}
          >
            {formatNumber(toDisplayWeight(totalVolume, unit))} {unitLabel(unit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHeader;
