import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  LuArrowLeft,
  LuClipboardList,
  LuPlus,
  LuRotateCw,
} from "react-icons/lu";
import { TbPencil } from "react-icons/tb";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import type { TrainingSplitExerciseDto } from "@/dtos/training-split-exercise.dto";
import type { CreateTrainingSplitRequestDto } from "@/dtos/training-splits.dto";
import {
  MuscleGroup,
  MusclesByGroup,
  type MuscleGroupType,
  type MuscleType,
} from "@/dtos/muscle.dto";
import { getAllExercises } from "@/api/exercise";
import { createTrainingSplit } from "@/api/training-split";
import FeedbackModal from "@/components/modals/FeedbackModal";
import ExerciseListItem from "@/components/training-splits/ExerciseListItem";
import ExerciseEditPanel from "@/components/training-splits/ExerciseEditPanel";
import { useT } from "@/i18n";

const TrainingSplitCreate = () => {
  const navigate = useNavigate();
  const t = useT();
  const rowIdRef = useRef(0);

  const [title, setTitle] = useState(() => t("trainingSplits.defaultTitle"));
  const [editingTitle, setEditingTitle] = useState(false);
  const [rows, setRows] = useState<TrainingSplitExerciseDto[]>([]);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<"success" | "error">(
    "error",
  );
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  useEffect(() => {
    getAllExercises().then(setExercises);
  }, []);

  const filterByMuscle = (muscle: MuscleType) =>
    exercises.filter((ex) => ex.muscle === muscle);

  const orderedRows = useMemo(
    () => [...rows].sort((a, b) => a.order - b.order),
    [rows],
  );

  const selectedExercise =
    selectedIndex !== null ? (orderedRows[selectedIndex] ?? null) : null;

  const summary = useMemo(() => {
    const totalSets = rows.reduce((sum, r) => sum + (r.sets ?? 0), 0);
    return {
      exerciseCount: rows.length,
      totalSets,
      estimatedMinutes: totalSets > 0 ? Math.round(totalSets * 2 + 5) : 0,
    };
  }, [rows]);

  const buildRow = (
    exercise: ExerciseDto,
    order: number,
  ): TrainingSplitExerciseDto => ({
    id: --rowIdRef.current,
    createdAt: new Date(),
    updatedAt: new Date(),
    trainingSplitId: 0,
    exerciseId: exercise.id,
    order,
    sets: 3,
    reps: "10",
    exercise,
  });

  const patchById = (
    targetId: number,
    patch: Partial<TrainingSplitExerciseDto>,
  ) => {
    setRows((prev) =>
      prev.map((row) => (row.id === targetId ? { ...row, ...patch } : row)),
    );
  };

  const updateExercise = (
    orderedIndex: number,
    patch: Partial<TrainingSplitExerciseDto>,
  ) => {
    const target = orderedRows[orderedIndex];
    if (target) patchById(target.id, patch);
  };

  const moveExercise = (orderedIndex: number, direction: -1 | 1) => {
    const swapIndex = orderedIndex + direction;
    if (swapIndex < 0 || swapIndex >= orderedRows.length) return;
    const a = orderedRows[orderedIndex];
    const b = orderedRows[swapIndex];
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === a.id) return { ...row, order: b.order };
        if (row.id === b.id) return { ...row, order: a.order };
        return row;
      }),
    );
    setSelectedIndex((current) => {
      if (current === orderedIndex) return swapIndex;
      if (current === swapIndex) return orderedIndex;
      return current;
    });
  };

  const deleteExercise = (orderedIndex: number) => {
    const target = orderedRows[orderedIndex];
    if (!target) return;
    setRows((prev) =>
      prev
        .filter((row) => row.id !== target.id)
        .sort((a, b) => a.order - b.order)
        .map((row, i) => ({ ...row, order: i + 1 })),
    );
    setSelectedIndex(null);
  };

  const addExercise = () => {
    const defaultMuscle = MusclesByGroup[MuscleGroup.CHEST][0];
    const defaultExercise = filterByMuscle(defaultMuscle)[0] ?? exercises[0];
    if (!defaultExercise) return;

    const newRow = buildRow(defaultExercise, rows.length + 1);
    setRows((prev) => [...prev, newRow]);
    setSelectedIndex(rows.length);
  };

  const handleMuscleGroupChange = (
    orderedIndex: number,
    newMg: MuscleGroupType,
  ) => {
    const firstExercise = exercises.find((e) => e.muscleGroup === newMg);
    if (!firstExercise) return;
    updateExercise(orderedIndex, {
      exercise: firstExercise,
      exerciseId: firstExercise.id,
    });
  };

  const handleMuscleChange = (orderedIndex: number, newMuscle: MuscleType) => {
    const firstExercise = filterByMuscle(newMuscle)[0];
    if (!firstExercise) return;
    updateExercise(orderedIndex, {
      exercise: firstExercise,
      exerciseId: firstExercise.id,
    });
  };

  const handleExerciseChange = (orderedIndex: number, exerciseId: number) => {
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex) return;
    updateExercise(orderedIndex, { exercise: ex, exerciseId: ex.id });
  };

  const submitTrainingSplit = async () => {
    const payload: CreateTrainingSplitRequestDto = {
      title,
      exercises: orderedRows.map(({ exerciseId, sets, reps, order }) => ({
        exerciseId,
        sets,
        reps,
        order,
      })),
    };

    setSaving(true);
    try {
      await createTrainingSplit(payload);
      setFeedbackStatus("success");
    } catch (error) {
      console.log(error);
      setFeedbackStatus("error");
    } finally {
      setSaving(false);
      setOpenFeedbackModal(true);
    }
  };

  return (
    <div className="flex w-full flex-col text-white lg:h-full lg:min-h-0 lg:overflow-hidden">
      <FeedbackModal
        open={openFeedbackModal}
        status={feedbackStatus}
        description={
          feedbackStatus === "success"
            ? t("trainingSplits.createdSuccess")
            : t("trainingSplits.createError")
        }
        onClose={() => {
          setOpenFeedbackModal(false);
          if (feedbackStatus === "success") navigate("/training-splits");
        }}
      />

      <header className="flex shrink-0 items-center gap-2 border-b border-darkGrey px-3 py-3 lg:gap-4 lg:px-6 lg:py-4">
        <button
          onClick={() => navigate("/training-splits")}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-md bg-mediumGrey hover:bg-mediumGrey/70 cursor-pointer transition"
        >
          <LuArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          {editingTitle ? (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
              className="text-lg lg:text-2xl font-bold bg-transparent border-b border-indigo outline-none text-white w-full min-w-0 max-w-md"
            />
          ) : (
            <button
              onClick={() => setEditingTitle(true)}
              className="flex items-center gap-2 group cursor-pointer min-w-0"
            >
              <h1 className="min-w-0 truncate text-lg font-bold text-white lg:text-2xl">
                {title}
              </h1>
              <TbPencil
                size={16}
                className="text-lightGrey/40 group-hover:text-indigo transition shrink-0"
              />
            </button>
          )}
        </div>

        {summary.exerciseCount > 0 && (
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

        <button
          onClick={submitTrainingSplit}
          disabled={saving || rows.length === 0}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-indigo hover:bg-darkIndigo text-white text-sm font-semibold cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed min-w-20 shrink-0"
        >
          {saving ? (
            <LuRotateCw size={14} className="animate-spin" />
          ) : (
            t("trainingSplits.createAction")
          )}
        </button>
      </header>

      <div className="flex lg:flex-1 lg:min-h-0 lg:overflow-hidden">
        <div className="flex flex-col flex-1 min-w-0 gap-3 p-3 lg:overflow-y-auto lg:p-6">
          {rows.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-5 px-6">
              <div className="w-20 h-20 rounded-2xl bg-mediumGrey flex items-center justify-center">
                <LuClipboardList size={40} className="text-indigo" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white">
                  {t("trainingSplits.buildTitle")}
                </h2>
                <p className="text-sm text-lightGrey/50 max-w-sm">
                  {t("trainingSplits.buildDescription")}
                </p>
              </div>
              <button
                onClick={addExercise}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo hover:bg-darkIndigo text-white font-semibold cursor-pointer transition duration-300 hover:-translate-y-0.5 shadow-lg shadow-indigo/20"
              >
                <LuPlus size={16} />
                {t("trainingSplits.addFirstExercise")}
              </button>
            </div>
          ) : (
            <>
              {orderedRows.map((ex, index) => (
                <ExerciseListItem
                  key={ex.id}
                  ex={ex}
                  index={index}
                  isSelected={selectedIndex === index}
                  isFirst={index === 0}
                  isLast={index === orderedRows.length - 1}
                  onSelect={() =>
                    setSelectedIndex(selectedIndex === index ? null : index)
                  }
                  onMoveUp={() => moveExercise(index, -1)}
                  onMoveDown={() => moveExercise(index, 1)}
                  onDelete={() => deleteExercise(index)}
                />
              ))}

              <button
                onClick={addExercise}
                className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-white/10 hover:border-indigo/50 text-lightGrey/50 hover:text-indigo transition-all cursor-pointer"
              >
                <LuPlus size={14} />
                <span className="text-sm font-medium">
                  {t("trainingSplits.addExercise")}
                </span>
              </button>
            </>
          )}
        </div>

        <aside
          className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] shrink-0 flex-col overflow-hidden rounded-t-2xl border-t border-mediumGrey bg-darkGrey pb-[env(safe-area-inset-bottom)] transition-transform duration-300 lg:static lg:max-h-none lg:translate-y-0 lg:rounded-none lg:border-l lg:border-t-0 lg:pb-0 lg:transition-[width] ${
            selectedIndex !== null
              ? "translate-y-0 lg:w-80"
              : "translate-y-full pointer-events-none lg:w-0 lg:pointer-events-auto"
          }`}
        >
          <div className="flex w-full min-h-0 flex-col h-full lg:w-80">
            {selectedExercise && selectedIndex !== null && (
              <ExerciseEditPanel
                exercise={selectedExercise}
                exercises={exercises}
                onClose={() => setSelectedIndex(null)}
                onUpdate={(patch) => updateExercise(selectedIndex, patch)}
                onDelete={() => deleteExercise(selectedIndex)}
                onMuscleGroupChange={(mg) =>
                  handleMuscleGroupChange(selectedIndex, mg)
                }
                onMuscleChange={(muscle) =>
                  handleMuscleChange(selectedIndex, muscle)
                }
                onExerciseChange={(exerciseId) =>
                  handleExerciseChange(selectedIndex, exerciseId)
                }
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TrainingSplitCreate;
