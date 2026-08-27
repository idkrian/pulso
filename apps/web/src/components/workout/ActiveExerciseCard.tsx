import {
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
  LuStickyNote,
} from "react-icons/lu";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { ExerciseProgress, LoggedSet } from "@/dtos/workout.dto";
import type { ExercisePerformanceDto } from "@/dtos/exercise.dto";
import { useAuth } from "@/contexts/AuthContext";
import { formatWeight, unitLabel } from "@/utils/units";
import { useT } from "@/i18n";
import SetRow from "./SetRow";

type Props = {
  exercise: TrainingSplitExerciseDto;
  progress: ExerciseProgress;
  performance?: ExercisePerformanceDto | undefined;
  activeIndex: number;
  totalExercises: number;
  addSet: () => void;
  onPrev: () => void;
  onNext: () => void;
  onUpdateSet: (setIdx: number, patch: Partial<LoggedSet>) => void;
  onLogSet: (setIdx: number) => void;
  onUpdateNotes: (value: string) => void;
};

const ActiveExerciseCard = ({
  exercise,
  progress,
  performance,
  activeIndex,
  totalExercises,
  onPrev,
  onNext,
  onUpdateSet,
  onLogSet,
  onUpdateNotes,
  addSet,
}: Props) => {
  const { unit } = useAuth();
  const t = useT();
  const completedSets = progress.sets.filter((s) => s.completed).length;
  const lastSets = performance?.lastPerformed?.sets ?? [];
  const topLastSet = lastSets.reduce<(typeof lastSets)[number] | null>(
    (best, set) => (!best || set.weight > best.weight ? set : best),
    null,
  );

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-indigo/10 bg-linear-to-br from-mediumGrey to-darkGrey p-3 shadow-md shadow-indigo/10 lg:col-span-2 lg:min-h-0 lg:overflow-hidden lg:p-5">
      <div className="flex items-center justify-between shrink-0">
        <button
          className="p-1.5 rounded-lg bg-darkGrey hover:bg-indigo/30 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={onPrev}
          disabled={activeIndex === 0}
        >
          <LuChevronLeft size={18} />
        </button>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-lightIndigo">
            {t("workout.exerciseCounter", {
              current: activeIndex + 1,
              total: totalExercises,
            })}
          </p>
          <h2 className="text-xl font-bold leading-tight">
            {exercise.exercise.title}
          </h2>
          <p className="text-xs text-lightGrey/60">
            {t("workout.target", {
              sets: exercise.sets,
              reps: exercise.reps,
            })}
          </p>
        </div>

        <button
          className="p-1.5 rounded-lg bg-darkGrey hover:bg-indigo/30 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={activeIndex === totalExercises - 1}
        >
          <LuChevronRight size={18} />
        </button>
      </div>

      {(topLastSet || performance?.bestWeight != null) && (
        <div className="flex items-center justify-center gap-4 shrink-0 text-[11px]">
          {topLastSet && (
            <span className="text-lightGrey/70">
              {t("workout.lastTimeMax")}{" "}
              <strong className="text-white">
                {formatWeight(topLastSet.weight, unit)} × {topLastSet.reps}
              </strong>
            </span>
          )}
          {performance?.bestWeight != null && (
            <span className="text-lightGrey/70">
              {t("workout.personalRecord")}{" "}
              <strong className="text-amber-400">
                {formatWeight(performance.bestWeight, unit)}
              </strong>
            </span>
          )}
        </div>
      )}

      <div className="flex gap-1.5 justify-center shrink-0">
        {progress.sets.map((s, i) => (
          <div
            key={i}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              s.completed
                ? "bg-linear-to-r from-indigo to-lightIndigo"
                : "bg-darkGrey"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 pr-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        <div className="hidden shrink-0 grid-cols-[28px_1fr_70px_1.2fr_56px] gap-2 px-2 text-[10px] uppercase tracking-wider text-lightGrey/50 lg:grid">
          <span>{t("workout.colSet")}</span>
          <span>{t("workout.colWeight", { unit: unitLabel(unit) })}</span>
          <span className="text-center">{t("workout.colReps")}</span>
          <span>{t("workout.colRpe")}</span>
          <span></span>
        </div>

        {progress.sets.map((set, i) => (
          <SetRow
            key={i}
            set={set}
            index={i}
            targetReps={exercise.reps}
            onUpdate={(patch) => onUpdateSet(i, patch)}
            onLog={() => onLogSet(i)}
          />
        ))}
        <button
          onClick={addSet}
          className="group flex items-center justify-center gap-1.5 h-10 shrink-0 rounded-lg border border-dashed border-indigo/30 text-lightIndigo/70 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors hover:border-indigo/60 hover:bg-indigo/10 hover:text-lightIndigo"
        >
          <LuPlus
            size={16}
            className="transition-transform group-hover:rotate-90 duration-300"
          />
          {t("workout.addSet")}
        </button>
      </div>

      <div className="flex items-start gap-2 shrink-0">
        <LuStickyNote size={14} className="mt-1.5 text-lightIndigo shrink-0" />
        <textarea
          value={progress.notes}
          placeholder={t("workout.notesPlaceholder")}
          onChange={(e) => onUpdateNotes(e.target.value)}
          className="flex-1 bg-darkGrey/60 rounded-lg px-2 py-1.5 text-xs outline-none focus:bg-darkGrey resize-none"
          rows={1}
        />
      </div>

      <p className="text-[10px] text-lightGrey/40 text-center shrink-0">
        {t("workout.setsLogged", {
          done: completedSets,
          total: progress.sets.length,
        })}
      </p>
    </div>
  );
};

export default ActiveExerciseCard;
