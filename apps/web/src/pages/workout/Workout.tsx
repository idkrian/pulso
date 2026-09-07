import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LuRotateCw, LuTriangleAlert, LuClipboardList } from "react-icons/lu";
import { getTrainingSplitById } from "@/api/training-split";
import { getExercisePerformances } from "@/api/exercise";
import { createWorkout } from "@/api/workout";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import type { ExerciseDto, ExercisePerformanceDto } from "@/dtos/exercise.dto";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import type { LoggedSet, WorkoutEntry } from "@/dtos/workout.dto";
import { DEFAULT_REST } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { formatWeight } from "@/utils/units";
import { useT } from "@/i18n";
import { useStopwatch } from "@/hooks/useStopwatch";
import { useCountdown } from "@/hooks/useCountdown";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";
import {
  clearActiveWorkout,
  readActiveWorkout,
  saveActiveWorkout,
} from "@/utils/active-workout";
import {
  createEntryId,
  emptySet,
  entriesFromSplit,
  entryFromExercise,
} from "@/utils/workout-entry";
import PRToast from "@/components/workout/PRToast";
import WorkoutHeader from "@/components/workout/WorkoutHeader";
import ActiveExerciseCard from "@/components/workout/ActiveExerciseCard";
import RestTimer from "@/components/workout/RestTimer";
import UpNextList from "@/components/workout/UpNextList";
import WorkoutSummaryModal from "@/components/modals/WorkoutSummaryModal";
import ExercisePickerModal from "@/components/modals/ExercisePickerModal";
import ConfirmModal from "@/components/modals/ConfirmModal";

const Workout = () => {
  const { splitId } = useParams();
  const navigate = useNavigate();
  const { unit, user, isAuthenticated } = useAuth();
  const t = useT();

  const [restored] = useState(() => {
    const saved = readActiveWorkout(user?.id);
    return saved && String(saved.splitId) === splitId ? saved : null;
  });

  const [split, setSplit] = useState<TrainingSplitDto | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [entries, setEntries] = useState<WorkoutEntry[]>(
    restored?.entries ?? [],
  );
  const [performances, setPerformances] = useState<
    Record<number, ExercisePerformanceDto>
  >({});
  const [activeIndex, setActiveIndex] = useState(restored?.activeIndex ?? 0);
  const requestedPerformances = useRef(new Set<number>());

  const {
    seconds: workoutSeconds,
    running: workoutRunning,
    toggle: toggleWorkoutTimer,
    reset: resetWorkoutTimer,
    snapshot: timerSnapshot,
  } = useStopwatch(restored?.timer);

  const {
    remaining: restRemaining,
    total: restTotal,
    running: restRunning,
    snapshot: restSnapshot,
    start: startRest,
    toggle: toggleRest,
    reset: resetRest,
  } = useCountdown(DEFAULT_REST, restored?.rest);

  const [showSummary, setShowSummary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pulseVolume, setPulseVolume] = useState(false);
  const [recentPR, setRecentPR] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const prTimeout = useRef<number | null>(null);
  const timeoutsRef = useRef(new Set<number>());

  const [pickerMode, setPickerMode] = useState<"swap" | "add" | null>(null);
  const [pendingSwap, setPendingSwap] = useState<ExerciseDto | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<WorkoutEntry | null>(
    null,
  );

  useEffect(() => {
    if (!splitId) return;
    setLoadError(false);
    getTrainingSplitById(splitId)
      .then(setSplit)
      .catch(() => setLoadError(true));
  }, [splitId, reloadKey]);

  useEffect(() => {
    if (!split || restored) return;
    setEntries(entriesFromSplit(split.exercises));
  }, [split, restored]);

  useEffect(() => {
    setActiveIndex((i) => Math.max(0, Math.min(i, entries.length - 1)));
  }, [entries.length]);

  useEffect(() => {
    const missing = entries
      .map((entry) => entry.exerciseId)
      .filter((id) => !requestedPerformances.current.has(id));

    if (missing.length === 0) return;
    missing.forEach((id) => requestedPerformances.current.add(id));

    getExercisePerformances(missing)
      .then((list) =>
        setPerformances((prev) => {
          const next = { ...prev };
          list.forEach((item) => {
            next[item.exerciseId] = item;
          });
          return next;
        }),
      )
      .catch(() =>
        missing.forEach((id) => requestedPerformances.current.delete(id)),
      );
  }, [entries]);

  useEffect(() => {
    if (!split || entries.length === 0) return;

    saveActiveWorkout(user?.id, {
      splitId: split.id,
      splitTitle: split.title,
      entries,
      activeIndex,
      timer: timerSnapshot,
      rest: restSnapshot,
    });
  }, [split, entries, activeIndex, timerSnapshot, restSnapshot, user?.id]);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      timeouts.clear();
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timeoutsRef.current.delete(id);
      fn();
    }, ms);
    timeoutsRef.current.add(id);
    return id;
  };

  const activeEntry = entries[activeIndex];

  const totalCompletedSets = useMemo(
    () =>
      entries.reduce(
        (acc, entry) => acc + entry.sets.filter((s) => s.completed).length,
        0,
      ),
    [entries],
  );
  const totalSets = useMemo(
    () => entries.reduce((acc, entry) => acc + entry.sets.length, 0),
    [entries],
  );
  const overallPct = totalSets ? (totalCompletedSets / totalSets) * 100 : 0;

  const leaveGuard = useLeaveGuard(totalCompletedSets > 0 && isAuthenticated);

  const totalVolume = useMemo(
    () =>
      entries.reduce(
        (acc, entry) =>
          acc +
          entry.sets
            .filter((s) => s.completed)
            .reduce((a, s) => a + s.weight * s.reps, 0),
        0,
      ),
    [entries],
  );

  const exerciseFinishedCount = entries.filter((entry) =>
    entry.sets.every((s) => s.completed),
  ).length;

  const patchEntry = (
    entryId: string,
    patch: (entry: WorkoutEntry) => WorkoutEntry,
  ) =>
    setEntries((prev) =>
      prev.map((entry) => (entry.entryId === entryId ? patch(entry) : entry)),
    );

  const addSet = () => {
    if (!activeEntry) return;
    patchEntry(activeEntry.entryId, (entry) => ({
      ...entry,
      sets: [...entry.sets, emptySet()],
    }));
  };

  const removeSet = (entryId: string, setIdx: number) =>
    patchEntry(entryId, (entry) =>
      entry.sets.length <= 1
        ? entry
        : { ...entry, sets: entry.sets.filter((_, i) => i !== setIdx) },
    );

  const updateSet = (
    entryId: string,
    setIdx: number,
    patch: Partial<LoggedSet>,
  ) =>
    patchEntry(entryId, (entry) => ({
      ...entry,
      sets: entry.sets.map((s, i) => (i === setIdx ? { ...s, ...patch } : s)),
    }));

  const updateNotes = (entryId: string, notes: string) =>
    patchEntry(entryId, (entry) => ({ ...entry, notes }));

  const loggedSetCount = (entry: WorkoutEntry) =>
    entry.sets.filter((s) => s.completed).length;

  const keepActiveOn = (entryId: string | undefined, next: WorkoutEntry[]) => {
    setEntries(next);
    const idx = next.findIndex((entry) => entry.entryId === entryId);
    if (idx >= 0) setActiveIndex(idx);
  };

  const moveEntry = (entryId: string, direction: -1 | 1) => {
    const from = entries.findIndex((entry) => entry.entryId === entryId);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= entries.length) return;

    const next = [...entries];
    [next[from], next[to]] = [next[to], next[from]];
    keepActiveOn(activeEntry?.entryId, next);
  };

  const removeEntry = (entryId: string) => {
    if (entries.length <= 1) return;
    keepActiveOn(
      activeEntry?.entryId,
      entries.filter((entry) => entry.entryId !== entryId),
    );
  };

  const requestRemoveEntry = (entryId: string) => {
    const entry = entries.find((e) => e.entryId === entryId);
    if (!entry || entries.length <= 1) return;

    if (loggedSetCount(entry) > 0) {
      setPendingRemoval(entry);
      return;
    }
    removeEntry(entryId);
  };

  const swapActiveExercise = (exercise: ExerciseDto) => {
    if (!activeEntry) return;
    patchEntry(activeEntry.entryId, (entry) => ({
      ...entry,
      entryId: createEntryId(),
      exerciseId: exercise.id,
      exercise,
      sets: Array.from({ length: entry.targetSets }, emptySet),
      notes: "",
    }));
  };

  const pickExercise = (exercise: ExerciseDto) => {
    const mode = pickerMode;
    setPickerMode(null);

    if (mode === "add") {
      setEntries((prev) => [...prev, entryFromExercise(exercise)]);
      return;
    }

    if (activeEntry && loggedSetCount(activeEntry) > 0) {
      setPendingSwap(exercise);
      return;
    }
    swapActiveExercise(exercise);
  };

  const triggerPR = (label: string) => {
    setRecentPR(label);
    if (prTimeout.current) {
      window.clearTimeout(prTimeout.current);
      timeoutsRef.current.delete(prTimeout.current);
    }
    prTimeout.current = later(() => setRecentPR(null), 2500);
  };

  const logSet = (entryId: string, setIdx: number) => {
    const entry = entries.find((e) => e.entryId === entryId);
    const target = entry?.sets[setIdx];
    if (!entry || !target || target.completed) return;
    if (target.reps <= 0) return;

    updateSet(entryId, setIdx, { completed: true });
    setPulseVolume(true);
    later(() => setPulseVolume(false), 600);

    // The record comes from the server (all-time across every session), so beating
    // it here is a real PR — not just the heaviest set of today.
    const bestWeight = performances[entry.exerciseId]?.bestWeight;

    if (bestWeight != null && target.weight > bestWeight) {
      triggerPR(
        t("workout.newPR", {
          exercise: entry.exercise.title,
          weight: formatWeight(target.weight, unit),
        }),
      );
      setPerformances((prev) =>
        !prev[entry.exerciseId]
          ? prev
          : {
              ...prev,
              [entry.exerciseId]: {
                ...prev[entry.exerciseId],
                bestWeight: target.weight,
              },
            },
      );
    }

    startRest(restTotal);

    const allDone = entry.sets.every((s, i) =>
      i === setIdx ? true : s.completed,
    );
    if (allDone && activeIndex < entries.length - 1) {
      later(() => setActiveIndex((i) => i + 1), 800);
    }
  };

  const unlogSet = (entryId: string, setIdx: number) =>
    updateSet(entryId, setIdx, { completed: false });

  const finishWorkout = async () => {
    if (!split || totalCompletedSets === 0) return;
    setSaveError(null);
    setSubmitting(true);
    try {
      await createWorkout({
        id: split.id,
        title: split.title,
        durationSeconds: Math.max(1, workoutSeconds),
        exercises: entries
          .map((entry) => ({
            exerciseId: entry.exerciseId,
            notes: entry.notes.trim() || undefined,
            sets: entry.sets
              .filter((s) => s.completed)
              .map((s, i) => ({
                setNumber: i + 1,
                reps: s.reps,
                weight: s.weight,
                rpe: s.rpe,
              })),
          }))
          .filter((entry) => entry.sets.length > 0),
      });
      clearActiveWorkout(user?.id);
      leaveGuard.release();
      navigate("/");
    } catch (e) {
      console.error(e);
      setSaveError(t("workoutSummary.saveFailed"));
      setSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <ErrorState
        icon={<LuTriangleAlert size={32} className="text-red-400" />}
        title={t("workout.loadErrorTitle")}
        description={t("workout.loadErrorDescription")}
      >
        <Button
          label={t("common.retry")}
          onClick={() => setReloadKey((key) => key + 1)}
        />
        <button
          onClick={() => navigate("/training-splits")}
          className="flex h-10 items-center justify-center rounded-md bg-mediumGrey px-4 text-sm font-semibold text-white transition-colors hover:bg-mediumGrey/70 cursor-pointer"
        >
          {t("trainingSplits.backToList")}
        </button>
      </ErrorState>
    );
  }

  if (split && split.exercises.length === 0 && !restored) {
    return (
      <ErrorState
        icon={<LuClipboardList size={32} className="text-lightIndigo" />}
        title={t("workout.emptyTitle")}
        description={t("workout.emptyDescription")}
      >
        <Button
          label={t("workout.editSplit")}
          onClick={() => navigate(`/training-splits/${split.id}`)}
        />
        <button
          onClick={() => navigate("/training-splits")}
          className="flex h-10 items-center justify-center rounded-md bg-mediumGrey px-4 text-sm font-semibold text-white transition-colors hover:bg-mediumGrey/70 cursor-pointer"
        >
          {t("trainingSplits.backToList")}
        </button>
      </ErrorState>
    );
  }

  if (!split || !activeEntry) {
    return (
      <div className="flex w-full h-full items-center justify-center text-white">
        <LuRotateCw size={36} className="animate-spin text-indigo" />
      </div>
    );
  }

  const restTimer = (
    <RestTimer
      remaining={restRemaining}
      total={restTotal}
      running={restRunning}
      onSelectPreset={startRest}
      onToggle={toggleRest}
      onReset={resetRest}
    />
  );

  return (
    <div className="relative flex w-full flex-col gap-4 text-white lg:h-full lg:min-h-0">
      <PRToast message={recentPR} />

      <WorkoutHeader
        workoutSeconds={workoutSeconds}
        workoutRunning={workoutRunning}
        onToggleRunning={toggleWorkoutTimer}
        onResetTime={resetWorkoutTimer}
        exerciseFinishedCount={exerciseFinishedCount}
        totalExercises={entries.length}
        totalCompletedSets={totalCompletedSets}
        totalSets={totalSets}
        overallPct={overallPct}
        totalVolume={totalVolume}
        pulseVolume={pulseVolume}
      />
      <div className="lg:hidden">{restTimer}</div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:flex-1 lg:min-h-0">
        <ActiveExerciseCard
          entry={activeEntry}
          performance={performances[activeEntry.exerciseId]}
          activeIndex={activeIndex}
          totalExercises={entries.length}
          addSet={addSet}
          onPrev={() => setActiveIndex((i) => Math.max(0, i - 1))}
          onNext={() =>
            setActiveIndex((i) => Math.min(entries.length - 1, i + 1))
          }
          onUpdateSet={(setIdx, patch) =>
            updateSet(activeEntry.entryId, setIdx, patch)
          }
          onLogSet={(setIdx) => logSet(activeEntry.entryId, setIdx)}
          onUnlogSet={(setIdx) => unlogSet(activeEntry.entryId, setIdx)}
          onRemoveSet={(setIdx) => removeSet(activeEntry.entryId, setIdx)}
          onUpdateNotes={(value) => updateNotes(activeEntry.entryId, value)}
          onSwapExercise={() => setPickerMode("swap")}
        />

        <div className="flex flex-col gap-4 lg:min-h-0">
          <div className="hidden lg:block">{restTimer}</div>
          <UpNextList
            entries={entries}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            onMove={moveEntry}
            onRemove={requestRemoveEntry}
            onAdd={() => setPickerMode("add")}
          />
        </div>
      </div>

      <div className="flex shrink-0 justify-end [&>button]:w-full lg:[&>button]:w-auto">
        <Button
          label={t("workout.finish")}
          onClick={() => {
            setSaveError(null);
            setShowSummary(true);
          }}
        />
      </div>

      <ExercisePickerModal
        open={pickerMode !== null}
        title={
          pickerMode === "add"
            ? t("workout.addPickerTitle")
            : t("workout.swapPickerTitle")
        }
        currentExerciseId={
          pickerMode === "swap" ? activeEntry.exerciseId : undefined
        }
        usedExerciseIds={entries.map((entry) => entry.exerciseId)}
        onSelect={pickExercise}
        onClose={() => setPickerMode(null)}
      />

      <ConfirmModal
        open={pendingSwap !== null}
        title={t("workout.swapConfirmTitle")}
        description={t("workout.swapConfirmDescription", {
          count: loggedSetCount(activeEntry),
          exercise: activeEntry.exercise.title,
        })}
        confirmLabel={t("workout.swapConfirm")}
        onConfirm={() => {
          if (pendingSwap) swapActiveExercise(pendingSwap);
          setPendingSwap(null);
        }}
        onCancel={() => setPendingSwap(null)}
      />

      <ConfirmModal
        open={pendingRemoval !== null}
        title={t("workout.removeConfirmTitle")}
        description={
          pendingRemoval
            ? t("workout.removeConfirmDescription", {
                count: loggedSetCount(pendingRemoval),
                exercise: pendingRemoval.exercise.title,
              })
            : undefined
        }
        confirmLabel={t("workout.removeConfirm")}
        onConfirm={() => {
          if (pendingRemoval) removeEntry(pendingRemoval.entryId);
          setPendingRemoval(null);
        }}
        onCancel={() => setPendingRemoval(null)}
      />

      <ConfirmModal
        open={leaveGuard.blocked}
        title={t("workout.leaveConfirmTitle")}
        description={t("workout.leaveConfirmDescription")}
        confirmLabel={t("workout.leaveConfirm")}
        cancelLabel={t("workout.leaveCancel")}
        onConfirm={leaveGuard.confirmLeave}
        onCancel={leaveGuard.cancelLeave}
      />

      <WorkoutSummaryModal
        open={showSummary}
        title={split.title}
        workoutSeconds={workoutSeconds}
        totalVolume={totalVolume}
        totalCompletedSets={totalCompletedSets}
        submitting={submitting}
        canSave={totalCompletedSets > 0}
        error={saveError}
        onClose={() => setShowSummary(false)}
        onSave={finishWorkout}
      />
    </div>
  );
};

export default Workout;
