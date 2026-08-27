import { LuArrowLeft, LuPlay, LuRotateCw } from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import { useT } from "@/i18n";

type Summary = {
  exerciseCount: number;
  totalSets: number;
  estimatedMinutes: number;
};

type Props = {
  formData: TrainingSplitDto;
  editingTitle: boolean;
  hasChanges: boolean;
  saving: boolean;
  summary: Summary | null;
  onTitleChange: (title: string) => void;
  onEditingTitleToggle: (value: boolean) => void;
  onBack: () => void;
  onStart: () => void;
  onSave: () => void;
};

const TrainingSplitHeader = ({
  formData,
  editingTitle,
  hasChanges,
  saving,
  summary,
  onTitleChange,
  onEditingTitleToggle,
  onBack,
  onStart,
  onSave,
}: Props) => {
  const t = useT();

  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-darkGrey px-3 py-3 lg:gap-4 lg:px-6 lg:py-4">
      <button
        onClick={onBack}
        className="flex items-center justify-center w-9 h-9 shrink-0 rounded-md bg-mediumGrey hover:bg-mediumGrey/70 cursor-pointer transition"
      >
        <LuArrowLeft size={18} />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        {editingTitle ? (
          <input
            autoFocus
            value={formData.title}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={() => onEditingTitleToggle(false)}
            onKeyDown={(e) => e.key === "Enter" && onEditingTitleToggle(false)}
            className="text-lg lg:text-2xl font-bold bg-transparent border-b border-indigo outline-none text-white w-full min-w-0 max-w-md"
          />
        ) : (
          <button
            onClick={() => onEditingTitleToggle(true)}
            className="flex min-w-0 items-center gap-2 group cursor-pointer"
          >
            <h1 className="min-w-0 truncate text-lg font-bold text-white lg:text-2xl">
              {formData.title}
            </h1>
            <TbPencil
              size={16}
              className="text-lightGrey/40 group-hover:text-indigo transition shrink-0"
            />
          </button>
        )}
      </div>

      {summary && (
        <div className="hidden md:flex items-center gap-3 text-sm text-lightGrey/60 shrink-0">
          <span>
            {t("trainingSplits.summaryExercises", {
              count: summary.exerciseCount,
            })}
          </span>
          <span>·</span>
          <span>
            {t("trainingSplits.summarySets", { count: summary.totalSets })}
          </span>
          <span>·</span>
          <span>
            {t("trainingSplits.summaryMinutes", {
              count: summary.estimatedMinutes,
            })}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onStart}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-mediumGrey hover:bg-mediumGrey/70 text-white text-sm font-semibold cursor-pointer transition"
        >
          <LuPlay size={13} />
          {t("trainingSplits.start")}
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="relative flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-indigo hover:bg-darkIndigo text-white text-sm font-semibold cursor-pointer transition disabled:opacity-60 min-w-16"
        >
          {saving ? (
            <LuRotateCw size={14} className="animate-spin" />
          ) : (
            t("trainingSplits.save")
          )}
          {hasChanges && !saving && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-darkGrey" />
          )}
        </button>
      </div>
    </header>
  );
};

export default TrainingSplitHeader;
