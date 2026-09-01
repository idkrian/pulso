import { LuLayoutGrid } from "react-icons/lu";
import { MuscleGroup, type ExerciseFilter } from "@/dtos/muscle.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import Skeleton from "@/components/ui/Skeleton";
import { useMuscleGroupLabel, useT } from "@/i18n";

type Props = {
  filter: ExerciseFilter;
  counts: Record<string, number>;
  loading?: boolean;
  onChange: (filter: ExerciseFilter) => void;
};

const ExerciseSidebar = ({
  filter,
  counts,
  loading = false,
  onChange,
}: Props) => {
  const t = useT();
  const muscleGroupLabel = useMuscleGroupLabel();

  return (
    <aside className="flex shrink-0 flex-col border-b border-darkGrey bg-darkGrey/40 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="hidden px-5 py-5 lg:block">
        <p className="text-xs uppercase tracking-wider text-lightGrey/60 font-semibold">
          {t("exercises.filterByMuscle")}
        </p>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-4 py-3 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-x-visible lg:overflow-y-auto lg:px-3 lg:py-0 lg:pb-4">
        <SidebarItem
          label={t("exercises.allExercises")}
          count={counts.ALL ?? 0}
          loading={loading}
          active={filter === "ALL"}
          onClick={() => onChange("ALL")}
          icon={<LuLayoutGrid size={18} />}
        />
        <div className="hidden h-px bg-mediumGrey my-2 lg:block" />
        {Object.values(MuscleGroup).map((mg) => (
          <SidebarItem
            key={mg}
            label={muscleGroupLabel(mg)}
            count={counts[mg] ?? 0}
            loading={loading}
            active={filter === mg}
            onClick={() => onChange(mg)}
            icon={<MuscleIcon group={mg} />}
          />
        ))}
      </nav>
    </aside>
  );
};

type ItemProps = {
  label: string;
  count: number;
  loading: boolean;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

const SidebarItem = ({
  label,
  count,
  loading,
  active,
  onClick,
  icon,
}: ItemProps) => (
  <button
    onClick={onClick}
    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer lg:w-full lg:shrink lg:gap-3 lg:rounded-lg lg:px-3 lg:py-2.5 lg:text-sm ${
      active
        ? "bg-indigo text-white"
        : "bg-mediumGrey/60 text-lightGrey/80 hover:bg-mediumGrey hover:text-white lg:bg-transparent"
    }`}
  >
    <span className={`shrink-0 ${active ? "text-white" : "text-lightIndigo"}`}>
      {icon}
    </span>
    <span className="lg:flex-1 lg:text-left">{label}</span>
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] lg:text-xs ${
        active
          ? "bg-darkIndigo/60 text-white"
          : "bg-mediumGrey text-lightGrey/60"
      }`}
    >
      {loading ? (
        <Skeleton className="inline-block h-[0.9em] w-2.5 align-middle bg-lightGrey/20" />
      ) : (
        count
      )}
    </span>
  </button>
);

export default ExerciseSidebar;
