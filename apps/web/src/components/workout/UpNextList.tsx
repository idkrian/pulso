import { LuCircleCheck } from "react-icons/lu";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { ExerciseProgress } from "@/dtos/workout.dto";
import { useT } from "@/i18n";

type Props = {
  exercises: TrainingSplitExerciseDto[];
  progress: Record<number, ExerciseProgress>;
  activeIndex: number;
  onSelect: (index: number) => void;
};

const UpNextList = ({ exercises, progress, activeIndex, onSelect }: Props) => {
  const t = useT();

  return (
    <div className="flex flex-col rounded-2xl bg-mediumGrey p-3 lg:min-h-0 lg:flex-1">
      <span className="shrink-0 text-[10px] uppercase tracking-widest text-lightGrey/60">
        {t("workout.upNext")}
      </span>
      <div className="mt-2 flex flex-col gap-1.5 pr-1 lg:flex-1 lg:overflow-y-auto">
        {exercises.map((ex, i) => {
          const done = progress[ex.id]?.sets.every((s) => s.completed);
          const isActive = i === activeIndex;
          const completed =
            progress[ex.id]?.sets.filter((s) => s.completed).length ?? 0;
          return (
            <button
              key={ex.id}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo/30 border border-indigo"
                  : done
                    ? "bg-emerald-500/10 opacity-60 hover:opacity-100"
                    : "bg-darkGrey hover:bg-darkGrey/60"
              }`}
            >
              <span
                className={`size-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  done
                    ? "bg-emerald-500/30 text-emerald-400"
                    : isActive
                      ? "bg-indigo text-white"
                      : "bg-mediumGrey text-lightGrey/60"
                }`}
              >
                {done ? <LuCircleCheck size={12} /> : i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs truncate">
                  {ex.exercise.title}
                </p>
                <p className="text-[10px] text-lightGrey/50">
                  {ex.sets} × {ex.reps}
                </p>
              </div>
              <span className="text-[10px] text-lightGrey/40 tabular-nums">
                {completed}/{ex.sets}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UpNextList;
