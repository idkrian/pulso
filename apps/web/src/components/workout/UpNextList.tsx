import {
  LuChevronDown,
  LuChevronUp,
  LuCircleCheck,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import type { WorkoutEntry } from "@/dtos/workout.dto";
import { useT } from "@/i18n";

type Props = {
  entries: WorkoutEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onMove: (entryId: string, direction: -1 | 1) => void;
  onRemove: (entryId: string) => void;
  onAdd: () => void;
};

const actionClass =
  "flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-lightGrey/40 transition-colors hover:bg-indigo/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-lightGrey/40";

const UpNextList = ({
  entries,
  activeIndex,
  onSelect,
  onMove,
  onRemove,
  onAdd,
}: Props) => {
  const t = useT();

  return (
    <div className="flex flex-col rounded-2xl bg-mediumGrey p-3 lg:min-h-0 lg:flex-1">
      <span className="shrink-0 text-[10px] uppercase tracking-widest text-lightGrey/60">
        {t("workout.upNext")}
      </span>
      <div className="mt-2 flex flex-col gap-1.5 pr-1 lg:flex-1 lg:overflow-y-auto">
        {entries.map((entry, i) => {
          const done = entry.sets.every((s) => s.completed);
          const isActive = i === activeIndex;
          const completed = entry.sets.filter((s) => s.completed).length;
          return (
            <div
              key={entry.entryId}
              className={`flex items-center gap-1 rounded-lg p-2 transition-all ${
                isActive
                  ? "bg-indigo/30 border border-indigo"
                  : done
                    ? "bg-emerald-500/10 opacity-60 hover:opacity-100"
                    : "bg-darkGrey hover:bg-darkGrey/60"
              }`}
            >
              <button
                onClick={() => onSelect(i)}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
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
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs truncate">
                    {entry.exercise.title}
                  </p>
                  <p className="text-[10px] text-lightGrey/50 tabular-nums">
                    {entry.targetSets} × {entry.targetReps} · {completed}/
                    {entry.sets.length}
                  </p>
                </div>
              </button>

              <div className="flex shrink-0 items-center">
                <button
                  onClick={() => onMove(entry.entryId, -1)}
                  disabled={i === 0}
                  title={t("workout.moveUp")}
                  aria-label={t("workout.moveUp")}
                  className={actionClass}
                >
                  <LuChevronUp size={14} />
                </button>
                <button
                  onClick={() => onMove(entry.entryId, 1)}
                  disabled={i === entries.length - 1}
                  title={t("workout.moveDown")}
                  aria-label={t("workout.moveDown")}
                  className={actionClass}
                >
                  <LuChevronDown size={14} />
                </button>
                <button
                  onClick={() => onRemove(entry.entryId)}
                  disabled={entries.length <= 1}
                  title={t("workout.removeExercise")}
                  aria-label={t("workout.removeExercise")}
                  className={`${actionClass} hover:bg-red-500/10 hover:text-red-400`}
                >
                  <LuTrash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={onAdd}
          className="group flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-indigo/30 text-[11px] font-semibold uppercase tracking-wider text-lightIndigo/70 transition-colors hover:border-indigo/60 hover:bg-indigo/10 hover:text-lightIndigo"
        >
          <LuPlus
            size={14}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          {t("workout.addExercise")}
        </button>
      </div>
    </div>
  );
};

export default UpNextList;
