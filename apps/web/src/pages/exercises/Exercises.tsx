import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { deleteExercise, getMuscleGroups } from "@/api/exercise";
import {
  MuscleGroup,
  type ExerciseFilter,
  type MuscleGroupItemsDto,
  type MuscleGroupType,
} from "@/dtos/muscle.dto";
import { useMuscleGroupLabel, useMuscleLabel, useT } from "@/i18n";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import { getApiErrorMessage } from "@/utils/error";
import ExerciseModal from "@/components/modals/ExerciseModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import ExerciseSidebar from "@/components/exercises/ExerciseSidebar";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import ExercisesEmptyState from "@/components/exercises/ExercisesEmptyState";
import ExerciseDrawer from "@/components/exercises/ExerciseDrawer";

const Exercises = () => {
  const t = useT();
  const muscleLabel = useMuscleLabel();
  const muscleGroupLabel = useMuscleGroupLabel();
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupItemsDto[]>([]);
  const [filter, setExerciseFilter] = useState<ExerciseFilter>("ALL");
  const [search, setSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDto | null>(
    null,
  );
  const [createOpen, setCreateOpen] = useState<MuscleGroupType | null>(null);
  const [editExercise, setEditExercise] = useState<ExerciseDto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ExerciseDto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchData = () => getMuscleGroups().then(setMuscleGroups);

  const openDelete = (exercise: ExerciseDto) => {
    setDeleteError(null);
    setDeleteTarget(exercise);
  };

  const closeDelete = () => {
    setDeleteError(null);
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteExercise(deleteTarget.id);
      setDeleteTarget(null);
      setSelectedExercise(null);
      await fetchData();
    } catch (error) {
      setDeleteError(getApiErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allExercises: ExerciseDto[] = useMemo(
    () =>
      muscleGroups.flatMap((g) =>
        g.items.map((item) => ({ ...item, muscleGroup: g.muscleGroup })),
      ),
    [muscleGroups],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { ALL: allExercises.length };
    muscleGroups.forEach((g) => {
      map[g.muscleGroup] = g.items.length;
    });
    return map;
  }, [muscleGroups, allExercises]);

  const visibleExercises = useMemo(() => {
    const base =
      filter === "ALL"
        ? allExercises
        : allExercises.filter((e) => e.muscleGroup === filter);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        muscleLabel(e.muscle).toLowerCase().includes(q),
    );
  }, [allExercises, filter, search, muscleLabel]);

  const headerLabel =
    filter === "ALL"
      ? t("exercises.allExercises")
      : muscleGroupLabel(filter as MuscleGroupType);

  const openCreate = () =>
    setCreateOpen(filter === "ALL" ? MuscleGroup.CHEST : filter);

  return (
    <div className="flex w-full flex-col text-white lg:h-full lg:flex-row lg:overflow-hidden">
      <ExerciseSidebar
        filter={filter}
        counts={counts}
        onChange={setExerciseFilter}
      />

      <main className="flex min-w-0 flex-1 flex-col lg:overflow-hidden">
        <header className="flex flex-col gap-3 border-b border-darkGrey px-4 py-4 lg:flex-row lg:items-center lg:gap-4 lg:px-8 lg:py-6">
          <div className="flex min-w-0 items-center gap-3 lg:contents">
            <div className="flex min-w-0 flex-col">
              <h1 className="truncate text-xl font-bold lg:text-2xl">
                {headerLabel}
              </h1>
              <p className="text-sm text-lightGrey/60">
                {visibleExercises.length}{" "}
                {visibleExercises.length === 1 ? "exercise" : "exercises"}
              </p>
            </div>
            <div className="hidden flex-1 lg:block" />
            <button
              onClick={openCreate}
              className="ml-auto flex shrink-0 items-center gap-2 bg-indigo hover:bg-lightIndigo transition-colors rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer lg:order-3 lg:ml-0"
            >
              <FaPlus size={12} />
              <span className="hidden sm:inline">
                {t("exercises.newExercise")}
              </span>
              <span className="sm:hidden">{t("exercises.newShort")}</span>
            </button>
          </div>
          <div className="relative w-full lg:order-2 lg:w-80 lg:max-w-full">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-lightGrey/50"
              size={16}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("exercises.searchPlaceholder")}
              className="w-full bg-mediumGrey rounded-lg pl-9 pr-3 py-2 text-sm outline-none border border-transparent focus:border-indigo transition-colors"
            />
          </div>
        </header>

        <div className="flex-1 p-4 lg:overflow-y-auto lg:p-8">
          {visibleExercises.length === 0 ? (
            <ExercisesEmptyState filter={filter} onCreate={openCreate} />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:gap-4">
              {visibleExercises.map((ex) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onClick={() => setSelectedExercise(ex)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ExerciseDrawer
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onEdit={(ex) => {
          setSelectedExercise(null);
          setEditExercise(ex);
        }}
        onDelete={openDelete}
      />

      {(createOpen || editExercise) && (
        <ExerciseModal
          open
          exercise={editExercise}
          initialGroup={createOpen ?? MuscleGroup.CHEST}
          onClose={() => {
            setCreateOpen(null);
            setEditExercise(null);
          }}
          onSuccess={fetchData}
        />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title={t("exercises.deleteTitle")}
        description={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed.`
            : undefined
        }
        error={deleteError}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
};

export default Exercises;
