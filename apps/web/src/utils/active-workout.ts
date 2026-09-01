import type { WorkoutEntry } from "@/dtos/workout.dto";
import type { StopwatchSnapshot } from "@/hooks/useStopwatch";

const STORAGE_PREFIX = "pulso:active-workout";
const MAX_AGE_MS = 6 * 60 * 60 * 1000;
const CURRENT_VERSION = 2;

export interface ActiveWorkout {
  version: number;
  splitId: number;
  splitTitle: string;
  entries: WorkoutEntry[];
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
    const expired = Date.now() - stored.updatedAt > MAX_AGE_MS;

    if (expired || stored.version !== CURRENT_VERSION) {
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
  workout: Omit<ActiveWorkout, "version" | "updatedAt">,
) => {
  try {
    localStorage.setItem(
      storageKey(userId),
      JSON.stringify({
        ...workout,
        version: CURRENT_VERSION,
        updatedAt: Date.now(),
      }),
    );
  } catch {
    return;
  }
};

export const clearActiveWorkout = (userId?: number) =>
  localStorage.removeItem(storageKey(userId));

export const completedSetCount = (workout: ActiveWorkout): number =>
  workout.entries.reduce(
    (acc, entry) => acc + entry.sets.filter((s) => s.completed).length,
    0,
  );
