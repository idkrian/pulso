import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LuRotateCw } from "react-icons/lu";
import { getTrainingSplitById } from "@/api/training-split";
import { getExercisePerformances } from "@/api/exercise";
import { createWorkout } from "@/api/workout";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import type { ExercisePerformanceDto } from "@/dtos/exercise.dto";
import Button from "@/components/ui/Button";
import type { ExerciseProgress, LoggedSet } from "@/dtos/workout.dto";
import { DEFAULT_REST } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { formatWeight } from "@/utils/units";
import { useT } from "@/i18n";
import PRToast from "@/components/workout/PRToast";
import WorkoutHeader from "@/components/workout/WorkoutHeader";
import ActiveExerciseCard from "@/components/workout/ActiveExerciseCard";
import RestTimer from "@/components/workout/RestTimer";
import UpNextList from "@/components/workout/UpNextList";
import WorkoutSummaryModal from "@/components/modals/WorkoutSummaryModal";

const Workout = () => {
  const { splitId } = useParams();
  const navigate = useNavigate();
  const { unit } = useAuth();
  const t = useT();

  const [split, setSplit] = useState<TrainingSplitDto | null>(null);
  const [progress, setProgress] = useState<Record<number, ExerciseProgress>>(
    {},
  );
  const [performances, setPerformances] = useState<
    Record<number, ExercisePerformanceDto>
  >({});
  const [activeIndex, setActiveIndex] = useState(0);

  const [workoutSeconds, setWorkoutSeconds] = useState(0);
  const [workoutRunning, setWorkoutRunning] = useState(true);

  const [restRemaining, setRestRemaining] = useState(0);
  const [restTotal, setRestTotal] = useState(DEFAULT_REST);
  const [restRunning, setRestRunning] = useState(false);

  const [showSummary, setShowSummary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pulseVolume, setPulseVolume] = useState(false);
  const [recentPR, setRecentPR] = useState<string | null>(null);
  const prTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (splitId) getTrainingSplitById(splitId).then(setSplit);
  }, [splitId]);

  useEffect(() => {
    if (!split) return;

    const initialProgress: Record<number, ExerciseProgress> = {};
    split.exercises.forEach((ex) => {
      initialProgress[ex.id] = {
        sets: Array.from({ length: ex.sets }, () => ({
          weight: 0,
          reps: 0,
          rpe: 7,
          completed: false,
        })),
        notes: "",
      };
    });
    setProgress(initialProgress);
  }, [split]);

  useEffect(() => {
    if (!split) return;
    let cancelled = false;

    getExercisePerformances(split.exercises.map((ex) => ex.exerciseId))
      .catch(() => [] as ExercisePerformanceDto[])
      .then((list) => {
        if (cancelled) return;

        const byExercise: Record<number, ExercisePerformanceDto> = {};
        list.forEach((item) => {
          byExercise[item.exerciseId] = item;
        });
        setPerformances(byExercise);
      });

    return () => {
      cancelled = true;
    };
  }, [split]);

  useEffect(() => {
    if (!workoutRunning) return;
    const id = window.setInterval(() => setWorkoutSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [workoutRunning]);

  useEffect(() => {
    if (!restRunning) return;
    const id = window.setInterval(() => {
      setRestRemaining((s) => {
        if (s <= 1) {
          setRestRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [restRunning]);

  const orderedExercises = useMemo(
    () => (split ? [...split.exercises].sort((a, b) => a.order - b.order) : []),
    [split],
  );

  const activeExercise = orderedExercises[activeIndex];

  const totalCompletedSets = useMemo(
    () =>
      Object.values(progress).reduce(
        (acc, p) => acc + p.sets.filter((s) => s.completed).length,
        0,
      ),
    [progress],
  );
  const totalSets = useMemo(
    () => Object.values(progress).reduce((acc, p) => acc + p.sets.length, 0),
    [progress],
  );
  const overallPct = totalSets ? (totalCompletedSets / totalSets) * 100 : 0;

  const totalVolume = useMemo(
    () =>
      Object.values(progress).reduce(
        (acc, p) =>
          acc +
          p.sets
            .filter((s) => s.completed)
            .reduce((a, s) => a + s.weight * s.reps, 0),
        0,
      ),
    [progress],
  );

  const exerciseFinishedCount = orderedExercises.filter((ex) =>
    progress[ex.id]?.sets.every((s) => s.completed),
  ).length;

  const addSet = () => {
    if (!activeExercise) return;
    setProgress((prev) => {
      const ex = prev[activeExercise.id];
      if (!ex) return prev;
      const sets = [
        ...ex.sets,
        { weight: 0, reps: 0, rpe: 7, completed: false },
      ];
      return { ...prev, [activeExercise.id]: { ...ex, sets } };
    });
  };

  const updateSet = (
    exerciseId: number,
    setIdx: number,
    patch: Partial<LoggedSet>,
  ) => {
    setProgress((prev) => {
      const ex = prev[exerciseId];
      if (!ex) return prev;
      const sets = ex.sets.map((s, i) =>
        i === setIdx ? { ...s, ...patch } : s,
      );
      return { ...prev, [exerciseId]: { ...ex, sets } };
    });
  };

  const triggerPR = (label: string) => {
    setRecentPR(label);
    if (prTimeout.current) clearTimeout(prTimeout.current);
    prTimeout.current = window.setTimeout(() => setRecentPR(null), 2500);
  };

  const logSet = (splitExerciseId: number, setIdx: number) => {
    const target = progress[splitExerciseId]?.sets[setIdx];
    if (!target || target.completed) return;
    if (target.weight <= 0 || target.reps <= 0) return;

    updateSet(splitExerciseId, setIdx, { completed: true });
    setPulseVolume(true);
    setTimeout(() => setPulseVolume(false), 600);

    // The record comes from the server (all-time across every session), so beating
    // it here is a real PR — not just the heaviest set of today.
    const splitExercise = orderedExercises.find(
      (ex) => ex.id === splitExerciseId,
    );
    const exerciseId = splitExercise?.exerciseId;
    const bestWeight =
      exerciseId !== undefined ? performances[exerciseId]?.bestWeight : null;

    if (bestWeight != null && target.weight > bestWeight) {
      triggerPR(
        t("workout.newPR", {
          exercise: splitExercise?.exercise.title ?? "",
          weight: formatWeight(target.weight, unit),
        }),
      );
      // Raise the bar locally so the next set compares against the new record.
      setPerformances((prev) =>
        exerciseId === undefined || !prev[exerciseId]
          ? prev
          : {
              ...prev,
              [exerciseId]: { ...prev[exerciseId], bestWeight: target.weight },
            },
      );
    }

    setRestRemaining(restTotal);
    setRestRunning(true);

    const allDone = progress[splitExerciseId].sets.every((s, i) =>
      i === setIdx ? true : s.completed,
    );
    if (allDone && activeIndex < orderedExercises.length - 1) {
      setTimeout(() => setActiveIndex((i) => i + 1), 800);
    }
  };

  const finishWorkout = async () => {
    if (!split) return;
    setSubmitting(true);
    try {
      await createWorkout({
        id: split.id,
        title: split.title,
        durationSeconds: workoutSeconds,
        exercises: orderedExercises
          .map((ex) => ({
            exerciseId: ex.exerciseId,
            notes: progress[ex.id].notes.trim() || undefined,
            sets: progress[ex.id].sets
              .filter((s) => s.completed)
              .map((s, i) => ({
                setNumber: i + 1,
                reps: s.reps,
                weight: s.weight,
                rpe: s.rpe,
              })),
          }))
          .filter((ex) => ex.sets.length > 0),
      });
      navigate("/");
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  };

  if (!split || !activeExercise || !progress[activeExercise.id]) {
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
      onSelectPreset={(s) => {
        setRestTotal(s);
        setRestRemaining(s);
        setRestRunning(true);
      }}
      onToggle={() => setRestRunning((r) => !r)}
      onReset={() => {
        setRestRunning(false);
        setRestRemaining(0);
      }}
    />
  );

  return (
    <div className="relative flex w-full flex-col gap-4 text-white lg:h-full lg:min-h-0">
      <PRToast message={recentPR} />

      <WorkoutHeader
        workoutSeconds={workoutSeconds}
        workoutRunning={workoutRunning}
        onToggleRunning={() => setWorkoutRunning((r) => !r)}
        onResetTime={() => {
          setWorkoutSeconds(0);
          setWorkoutRunning(true);
        }}
        exerciseFinishedCount={exerciseFinishedCount}
        totalExercises={orderedExercises.length}
        totalCompletedSets={totalCompletedSets}
        totalSets={totalSets}
        overallPct={overallPct}
        totalVolume={totalVolume}
        pulseVolume={pulseVolume}
      />
      <div className="lg:hidden">{restTimer}</div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:flex-1 lg:min-h-0">
        <ActiveExerciseCard
          exercise={activeExercise}
          progress={progress[activeExercise.id]}
          performance={performances[activeExercise.exerciseId]}
          activeIndex={activeIndex}
          totalExercises={orderedExercises.length}
          addSet={addSet}
          onPrev={() => setActiveIndex((i) => Math.max(0, i - 1))}
          onNext={() =>
            setActiveIndex((i) => Math.min(orderedExercises.length - 1, i + 1))
          }
          onUpdateSet={(setIdx, patch) =>
            updateSet(activeExercise.id, setIdx, patch)
          }
          onLogSet={(setIdx) => logSet(activeExercise.id, setIdx)}
          onUpdateNotes={(value) =>
            setProgress((prev) => ({
              ...prev,
              [activeExercise.id]: { ...prev[activeExercise.id], notes: value },
            }))
          }
        />

        <div className="flex flex-col gap-4 lg:min-h-0">
          <div className="hidden lg:block">{restTimer}</div>
          <UpNextList
            exercises={orderedExercises}
            progress={progress}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>

      <div className="flex shrink-0 justify-end [&>button]:w-full lg:[&>button]:w-auto">
        <Button
          label={t("workout.finish")}
          onClick={() => setShowSummary(true)}
        />
      </div>

      <WorkoutSummaryModal
        open={showSummary}
        title={split.title}
        workoutSeconds={workoutSeconds}
        totalVolume={totalVolume}
        totalCompletedSets={totalCompletedSets}
        submitting={submitting}
        onClose={() => setShowSummary(false)}
        onSave={finishWorkout}
      />
    </div>
  );
};

export default Workout;
