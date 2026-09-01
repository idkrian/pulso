import { useEffect, useMemo, useRef, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { getAllExercises } from "@/api/exercise";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import { MuscleGroup, type ExerciseFilter } from "@/dtos/muscle.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import { useMuscleGroupLabel, useMuscleLabel, useT } from "@/i18n";

type Props = {
  open: boolean;
  title: string;
  currentExerciseId?: number;
  usedExerciseIds?: number[];
  onSelect: (exercise: ExerciseDto) => void;
  onClose: () => void;
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const ExercisePickerModal = ({
  open,
  title,
  currentExerciseId,
  usedExerciseIds = [],
  onSelect,
  onClose,
}: Props) => {
  const t = useT();
  const muscleLabel = useMuscleLabel();
  const muscleGroupLabel = useMuscleGroupLabel();

  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ExerciseFilter>("ALL");
  const loaded = useRef(false);

  useEffect(() => {
    if (!open) return;

    setSearch("");
    setFilter("ALL");

    if (loaded.current) return;
    loaded.current = true;

    let cancelled = false;
    setLoading(true);
    getAllExercises()
      .then((list) => {
        if (!cancelled) setExercises(list);
      })
      .catch(() => {
        loaded.current = false;
        if (!cancelled) setExercises([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const visible = useMemo(() => {
    const term = normalize(search.trim());

    return exercises
      .filter((ex) => filter === "ALL" || ex.muscleGroup === filter)
      .filter((ex) => !term || normalize(ex.title).includes(term))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [exercises, filter, search]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[520px] max-h-[85dvh] flex-col overflow-hidden rounded-2xl bg-mediumGrey text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-darkGrey px-5 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            aria-label={t("common.close")}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-darkGrey transition hover:bg-darkGrey/70"
          >
            <LuX size={16} />
          </button>
        </div>

        <div className="flex shrink-0 flex-col gap-3 px-5 py-4">
          <div className="relative">
            <LuSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-lightGrey/40"
            />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("exercisePicker.searchPlaceholder")}
              className="w-full rounded-lg border border-transparent bg-darkGrey py-2.5 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-lightGrey/40 focus:border-indigo"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("ALL")}
              className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                filter === "ALL"
                  ? "border-indigo bg-darkGrey text-white"
                  : "border-transparent bg-darkGrey text-lightGrey/80 hover:border-indigo/40 hover:text-white"
              }`}
            >
              {t("exercisePicker.all")}
            </button>
            {Object.values(MuscleGroup).map((group) => {
              const active = filter === group;
              return (
                <button
                  key={group}
                  onClick={() => setFilter(group)}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-indigo bg-darkGrey text-white"
                      : "border-transparent bg-darkGrey text-lightGrey/80 hover:border-indigo/40 hover:text-white"
                  }`}
                >
                  <MuscleIcon group={group} className="size-4 object-contain" />
                  {muscleGroupLabel(group)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          {loading ? (
            <p className="py-10 text-center text-sm text-lightGrey/50">
              {t("exercisePicker.loading")}
            </p>
          ) : visible.length === 0 ? (
            <p className="py-10 text-center text-sm text-lightGrey/60">
              {t("exercisePicker.empty")}
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {visible.map((ex) => {
                const isCurrent = ex.id === currentExerciseId;
                const isUsed = usedExerciseIds.includes(ex.id);

                return (
                  <button
                    key={ex.id}
                    disabled={isCurrent}
                    onClick={() => onSelect(ex)}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                      isCurrent
                        ? "cursor-not-allowed border-indigo bg-indigo/20"
                        : "cursor-pointer border-darkGrey bg-darkGrey/40 hover:border-indigo/40"
                    }`}
                  >
                    <MuscleIcon
                      group={ex.muscleGroup}
                      className="size-7 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {ex.title}
                      </p>
                      <p className="truncate text-[11px] text-lightGrey/50">
                        {muscleLabel(ex.muscle)}
                      </p>
                    </div>
                    {(isCurrent || isUsed) && (
                      <span className="shrink-0 rounded-md bg-mediumGrey px-2 py-1 text-[10px] uppercase tracking-wider text-lightGrey/60">
                        {isCurrent
                          ? t("exercisePicker.current")
                          : t("exercisePicker.inWorkout")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisePickerModal;
