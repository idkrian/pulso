import type { ExerciseDto } from "@/dtos/exercise.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import { useMuscleGroupLabel, useMuscleLabel, useT } from "@/i18n";

type Props = {
  exercise: ExerciseDto;
  onClick: () => void;
};

const ExerciseCard = ({ exercise, onClick }: Props) => {
  const t = useT();
  const muscleLabel = useMuscleLabel();
  const muscleGroupLabel = useMuscleGroupLabel();

  return (
    <button
      onClick={onClick}
      className="group text-left bg-mediumGrey hover:bg-mediumGrey/70 border border-transparent hover:border-indigo/50 rounded-xl p-3 transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col gap-2 sm:gap-3 sm:p-4"
    >
      <div className="flex items-center gap-2 sm:items-start sm:gap-3">
        <div className="w-9 h-9 rounded-lg bg-darkGrey flex items-center justify-center shrink-0 sm:w-10 sm:h-10">
          <MuscleIcon
            group={exercise.muscleGroup}
            className="w-7 h-7 object-contain sm:w-8 sm:h-8"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-sm line-clamp-2 sm:text-base sm:line-clamp-1">
            {exercise.title}
          </p>
          <p className="hidden text-xs text-lightGrey/60 sm:block">
            {muscleGroupLabel(exercise.muscleGroup)}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-xs px-2 py-0.5 rounded bg-darkIndigo/40 text-lightIndigo border border-indigo/30 sm:py-1 sm:rounded-md">
          {muscleLabel(exercise.muscle)}
        </span>
        {exercise.userId !== null && (
          <span className="text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-darkGrey text-lightGrey/60">
            {t("exercises.custom")}
          </span>
        )}
      </div>
    </button>
  );
};

export default ExerciseCard;
