import { FaPlus } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import type { ExerciseFilter, MuscleGroupType } from "@/dtos/muscle.dto";
import { useMuscleGroupLabel, useT } from "@/i18n";

type Props = {
  filter: ExerciseFilter;
  onCreate: () => void;
};

const ExercisesEmptyState = ({ filter, onCreate }: Props) => {
  const t = useT();
  const muscleGroupLabel = useMuscleGroupLabel();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-12 lg:h-full lg:py-20">
      <div className="w-20 h-20 rounded-2xl bg-mediumGrey flex items-center justify-center">
        <LuLayoutGrid size={32} className="text-lightIndigo" />
      </div>
      <div>
        <p className="text-lg font-semibold">{t("exercises.emptyTitle")}</p>
        <p className="text-sm text-lightGrey/60 max-w-sm">
          {filter === "ALL"
            ? t("exercises.emptyAll")
            : t("exercises.emptyFiltered", {
                group: muscleGroupLabel(filter as MuscleGroupType),
              })}
        </p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center gap-2 bg-indigo hover:bg-lightIndigo transition-colors rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
      >
        <FaPlus size={12} />
        {t("exercises.newExercise")}
      </button>
    </div>
  );
};

export default ExercisesEmptyState;
