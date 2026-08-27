import { LuLayoutGrid } from "react-icons/lu";
import { MuscleGroup, type MuscleGroupType } from "../../dtos/muscle.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import { useMuscleGroupLabel, useT } from "@/i18n";

export type Filter = MuscleGroupType | "ALL";

type Props = {
  filter: Filter;
  counts: Record<string, number>;
  onChange: (filter: Filter) => void;
};

const ExerciseSidebar = ({ filter, counts, onChange }: Props) => {
  const t = useT();
  const muscleGroupLabel = useMuscleGroupLabel();

  return (
    <aside className="w-64 shrink-0 border-r border-darkGrey bg-darkGrey/40 flex flex-col">
      <div className="px-5 py-5">
        <p className="text-xs uppercase tracking-wider text-lightGrey/60 font-semibold">
          {t("exercises.filterByMuscle")}
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-1">
        <SidebarItem
          label={t("exercises.allExercises")}
          count={counts.ALL ?? 0}
          active={filter === "ALL"}
          onClick={() => onChange("ALL")}
          icon={<LuLayoutGrid size={18} />}
        />
        <div className="h-px bg-mediumGrey my-2" />
        {Object.values(MuscleGroup).map((mg) => (
          <SidebarItem
            key={mg}
            label={muscleGroupLabel(mg)}
            count={counts[mg] ?? 0}
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
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

const SidebarItem = ({ label, count, active, onClick, icon }: ItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      active
        ? "bg-indigo text-white"
        : "text-lightGrey/80 hover:bg-mediumGrey hover:text-white"
    }`}
  >
    <span className={`shrink-0 ${active ? "text-white" : "text-lightIndigo"}`}>
      {icon}
    </span>
    <span className="flex-1 text-left">{label}</span>
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        active
          ? "bg-darkIndigo/60 text-white"
          : "bg-mediumGrey text-lightGrey/60"
      }`}
    >
      {count}
    </span>
  </button>
);

export default ExerciseSidebar;
