import type { ExerciseProgress } from "@/dtos/workout.dto";
import type { StopwatchSnapshot } from "@/hooks/useStopwatch";

const STORAGE_PREFIX = "pulso:active-workout";
const MAX_AGE_MS = 6 * 60 * 60 * 1000;

export interface ActiveWorkout {
  splitId: number;
  splitTitle: string;
  progress: Record<number, ExerciseProgress>;
  activeIndex: number;
  timer: StopwatchSnapshot;
  updatedAt: number;
}

const storageKey = (userId?: number) => `${STORAGE_PREFIX}:${userId ?? "anon"}`;

export const readActiveWorkout = (userId?: number): ActiveWorkout | null => {
  const key = storageKey(userId);

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const stored = JSON.parse(raw) as ActiveWorkout;
    if (Date.now() - stored.updatedAt > MAX_AGE_MS) {
      localStorage.removeItem(key);
      return null;
    }

    return stored;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const saveActiveWorkout = (
  userId: number | undefined,
  workout: Omit<ActiveWorkout, "updatedAt">,
) => {
  try {
    localStorage.setItem(
      storageKey(userId),
      JSON.stringify({ ...workout, updatedAt: Date.now() }),
    );
  } catch {
    return;
  }
};

export const clearActiveWorkout = (userId?: number) =>
  localStorage.removeItem(storageKey(userId));

export const completedSetCount = (workout: ActiveWorkout): number =>
  Object.values(workout.progress).reduce(
    (acc, p) => acc + p.sets.filter((s) => s.completed).length,
    0,
  );
