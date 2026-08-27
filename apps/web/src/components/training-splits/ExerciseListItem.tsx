import { LuChevronDown, LuChevronUp, LuTrash2 } from "react-icons/lu";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { MuscleGroupType } from "@/dtos/muscle.dto";
import { DEFAULT_ACCENT, muscleGroupAccent } from "@/utils";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import { useMuscleGroupLabel, useMuscleLabel, useT } from "@/i18n";

type Props = {
  ex: TrainingSplitExerciseDto;
  index: number;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
};

const ExerciseListItem = ({
  ex,
  isSelected,
  isFirst,
  isLast,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete,
}: Props) => {
  const t = useT();
  const muscleLabel = useMuscleLabel();
  const muscleGroupLabel = useMuscleGroupLabel();
  const exAccent = ex.exercise?.muscleGroup
    ? muscleGroupAccent[ex.exercise.muscleGroup as MuscleGroupType]
    : DEFAULT_ACCENT;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`flex items-center gap-2 p-3 lg:gap-4 lg:p-4 rounded-xl bg-mediumGrey border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group
        ${
          isSelected
            ? "border-indigo/50 shadow-lg shadow-indigo/10"
            : "border-transparent hover:border-white/10"
        }`}
    >
      <div
        className={`w-1 self-stretch rounded-full bg-linear-to-b ${exAccent.gradient} shrink-0`}
      />

      {ex.exercise?.muscleGroup && (
        <div className="w-9 h-9 rounded-lg bg-darkGrey flex items-center justify-center shrink-0">
          <MuscleIcon
            group={ex.exercise.muscleGroup as MuscleGroupType}
            className="w-6 h-6 object-contain"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">
          {ex.exercise?.title ?? "—"}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {ex.exercise?.muscleGroup && (
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full border ${exAccent.chip}`}
            >
              {muscleGroupLabel(ex.exercise.muscleGroup as MuscleGroupType)}
            </span>
          )}
          {ex.exercise?.muscle && (
            <span className="text-[11px] text-lightGrey/50">
              {muscleLabel(ex.exercise.muscle)}
            </span>
          )}
        </div>
      </div>

      <span className="text-sm font-mono bg-darkGrey px-2.5 py-1 rounded-md text-white/80 shrink-0 tabular-nums">
        {ex.sets}×{ex.reps}
      </span>

      <div
        className="flex flex-col gap-0.5 shrink-0"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
          aria-label={t("exercises.moveUp")}
          className="flex items-center justify-center w-8 h-8 lg:w-6 lg:h-6 rounded hover:bg-darkGrey text-lightGrey/50 hover:text-white disabled:opacity-20 cursor-pointer transition"
        >
          <LuChevronUp size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
          aria-label={t("exercises.moveDown")}
          className="flex items-center justify-center w-8 h-8 lg:w-6 lg:h-6 rounded hover:bg-darkGrey text-lightGrey/50 hover:text-white disabled:opacity-20 cursor-pointer transition"
        >
          <LuChevronDown size={14} />
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label={t("exercises.deleteExercise")}
        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-red-500/20 text-lightGrey/40 hover:text-red-400 transition shrink-0 cursor-pointer lg:opacity-0 lg:group-hover:opacity-100"
      >
        <LuTrash2 size={15} />
      </button>
    </div>
  );
};

export default ExerciseListItem;
