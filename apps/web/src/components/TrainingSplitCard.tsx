import type { MouseEvent } from "react";
import type { TrainingSplitDto } from "../dtos/training-splits.dto";
import {
  LuTrash2,
  LuPencil,
  LuPlay,
  LuClock,
  LuLayers,
  LuDumbbell,
} from "react-icons/lu";
import { useNavigate } from "react-router";
import { DEFAULT_ACCENT, muscleGroupAccent, summarizeSplit } from "../utils";
import { useMuscleGroupLabel, useT } from "@/i18n";

interface TrainingSplitCardProps {
  split: TrainingSplitDto;
  width?: number;
  onDelete?: (split: TrainingSplitDto) => void;
  hideActions?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

const TrainingSplitCard = ({
  split,
  width,
  onDelete,
  hideActions = false,
  fullHeight = false,
  fullWidth = false,
}: TrainingSplitCardProps) => {
  const MAX_EXERCISES_VISIBLE = fullHeight ? 12 : 4;
  const navigate = useNavigate();
  const t = useT();
  const muscleGroupLabel = useMuscleGroupLabel();
  const summary = summarizeSplit(split);
  const accent = summary.primaryGroup
    ? muscleGroupAccent[summary.primaryGroup]
    : DEFAULT_ACCENT;

  const visibleExercises = split.exercises.slice(0, MAX_EXERCISES_VISIBLE);
  const hiddenCount = split.exercises.length - visibleExercises.length;

  const handleCardClick = () => navigate(`/training-splits/${split.id}`);

  const stopAnd = (fn: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className={`group flex flex-col rounded-xl bg-mediumGrey border border-transparent ${accent.ring} shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl overflow-hidden text-left max-w-full ${fullHeight ? "h-full" : ""}`}
      style={
        fullWidth
          ? { width: "100%" }
          : width
            ? { width: `${width}px` }
            : undefined
      }
    >
      <div
        className={`relative bg-linear-to-br ${accent.gradient} px-4 py-3 flex items-center gap-3`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-white truncate">{split.title}</p>
          <p className="text-xs text-white/70">
            {summary.muscleGroups.length === 1
              ? t("trainingSplits.muscleGroupCount", { count: 1 })
              : t("trainingSplits.muscleGroupCountPlural", {
                  count: summary.muscleGroups.length,
                })}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {summary.muscleGroups.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {summary.muscleGroups.slice(0, 4).map(({ group }) => (
              <span
                key={group}
                className={`text-[11px] px-2 py-0.5 rounded-full border ${muscleGroupAccent[group].chip}`}
              >
                {muscleGroupLabel(group)}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 rounded-lg bg-darkGrey/60 p-2 text-white">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1">
              <LuDumbbell size={12} className={accent.text} />
              <span className="text-sm font-bold">{summary.exerciseCount}</span>
            </div>
            <span className="text-[10px] text-lightGrey/60 uppercase tracking-wide">
              {t("trainingSplits.exercises")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-x border-white/5">
            <div className="flex items-center gap-1">
              <LuLayers size={12} className={accent.text} />
              <span className="text-sm font-bold">{summary.totalSets}</span>
            </div>
            <span className="text-[10px] text-lightGrey/60 uppercase tracking-wide">
              {t("trainingSplits.sets")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1">
              <LuClock size={12} className={accent.text} />
              <span className="text-sm font-bold">
                {summary.estimatedMinutes > 0
                  ? `~${summary.estimatedMinutes}m`
                  : "—"}
              </span>
            </div>
            <span className="text-[10px] text-lightGrey/60 uppercase tracking-wide">
              {t("trainingSplits.duration")}
            </span>
          </div>
        </div>

        {visibleExercises.length > 0 && (
          <div className="flex flex-col gap-1">
            {visibleExercises.map((ex) => (
              <div
                key={ex.id}
                className="flex items-center justify-between text-sm text-white/90"
              >
                <span className="truncate pr-2">{ex.exercise.title}</span>
                <span className="text-xs text-lightGrey/60 shrink-0 tabular-nums">
                  {ex.sets}×{ex.reps}
                </span>
              </div>
            ))}
            {hiddenCount > 0 && (
              <span className="text-xs text-lightGrey/50 italic">
                {t("trainingSplits.moreExercises", { count: hiddenCount })}
              </span>
            )}
          </div>
        )}

        {!hideActions && (
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={stopAnd(() => navigate(`/workout/${split.id}`))}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-md bg-indigo hover:bg-darkIndigo text-white text-sm font-semibold cursor-pointer transition"
            >
              <LuPlay size={14} />
              {t("trainingSplits.startWorkout")}
            </button>
            <button
              onClick={stopAnd(() => navigate(`/training-splits/${split.id}`))}
              aria-label={t("trainingSplits.editSplit")}
              className="flex items-center justify-center w-9 h-9 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition"
            >
              <LuPencil size={16} className="text-amber-400" />
            </button>
            {onDelete && (
              <button
                onClick={stopAnd(() => onDelete(split))}
                aria-label={t("trainingSplits.deleteSplit")}
                className="flex items-center justify-center w-9 h-9 rounded-md bg-darkGrey hover:bg-red-500/20 text-white cursor-pointer transition"
              >
                <LuTrash2 size={16} className="text-red-400" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingSplitCard;
