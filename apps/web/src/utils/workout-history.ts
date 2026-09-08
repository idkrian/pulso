import type {
  WorkoutSessionDto,
  WorkoutSetDto,
} from "@/dtos/workout-session.dto";
import { dayKey } from "./date";

export const sessionVolume = (session: WorkoutSessionDto): number =>
  session.workoutExerciseLogs.reduce(
    (sum, log) =>
      sum +
      log.workoutSets.reduce((a, s) => a + (s.weight ?? 0) * (s.reps ?? 0), 0),
    0,
  );

export const sessionTotalSets = (session: WorkoutSessionDto): number =>
  session.workoutExerciseLogs.reduce(
    (sum, log) => sum + log.workoutSets.length,
    0,
  );

export const sessionsInRange = (
  sessions: WorkoutSessionDto[],
  start: Date,
  end: Date,
): WorkoutSessionDto[] =>
  sessions.filter((s) => {
    const t = new Date(s.createdAt).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });

export const completedWeekdays = (
  sessions: WorkoutSessionDto[],
  reference: Date = new Date(),
): Set<number> => {
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());

  const sessionDays = new Set(sessions.map((s) => dayKey(s.createdAt)));
  const days = new Set<number>();

  for (let i = 0; i < 7; i += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    if (sessionDays.has(dayKey(day))) days.add(i);
  }

  return days;
};

export const computeStreak = (sessions: WorkoutSessionDto[]): number => {
  if (sessions.length === 0) return 0;
  const days = new Set(sessions.map((s) => dayKey(s.createdAt)));
  const cursor = new Date();
  // If today has no session, start counting from yesterday so an in-progress day doesn't reset the streak.
  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export interface ExercisePerformance {
  date: string;
  sets: WorkoutSetDto[];
}

export const bestSet = (sets: WorkoutSetDto[]): WorkoutSetDto | null =>
  sets.reduce<WorkoutSetDto | null>((best, set) => {
    if (!best) return set;
    const weight = set.weight ?? 0;
    const bestWeight = best.weight ?? 0;
    if (weight > bestWeight) return set;
    if (weight === bestWeight && set.reps > best.reps) return set;
    return best;
  }, null);

export const previousExercisePerformance = (
  sessions: WorkoutSessionDto[],
  session: WorkoutSessionDto,
  exerciseId: number,
): ExercisePerformance | null => {
  const reference = new Date(session.createdAt).getTime();
  let previous: ExercisePerformance | null = null;
  let previousTime = -Infinity;

  for (const candidate of sessions) {
    if (candidate.id === session.id) continue;

    const time = new Date(candidate.createdAt).getTime();
    if (time >= reference || time <= previousTime) continue;

    const log = candidate.workoutExerciseLogs.find(
      (entry) => entry.exerciseId === exerciseId,
    );
    if (!log) continue;

    previous = { date: candidate.createdAt, sets: log.workoutSets };
    previousTime = time;
  }

  return previous;
};

export const personalRecordSetIds = (
  sessions: WorkoutSessionDto[],
  session: WorkoutSessionDto,
): Set<number> => {
  const reference = new Date(session.createdAt).getTime();
  const ids = new Set<number>();

  for (const log of session.workoutExerciseLogs) {
    let record: number | null = null;

    for (const candidate of sessions) {
      if (candidate.id === session.id) continue;
      if (new Date(candidate.createdAt).getTime() >= reference) continue;

      for (const earlier of candidate.workoutExerciseLogs) {
        if (earlier.exerciseId !== log.exerciseId) continue;
        for (const set of earlier.workoutSets) {
          const weight = set.weight ?? 0;
          if (record === null || weight > record) record = weight;
        }
      }
    }

    if (record === null) continue;

    const ordered = [...log.workoutSets].sort(
      (a, b) => a.setNumber - b.setNumber,
    );

    for (const set of ordered) {
      const weight = set.weight ?? 0;
      if (weight > record) {
        ids.add(set.id);
        record = weight;
      }
    }
  }

  return ids;
};

export const sessionAverageRpe = (
  session: WorkoutSessionDto,
): number | null => {
  const values = session.workoutExerciseLogs.flatMap((log) =>
    log.workoutSets
      .map((set) => set.rpe)
      .filter((rpe): rpe is number => rpe !== null),
  );

  if (values.length === 0) return null;

  const total = values.reduce((sum, rpe) => sum + rpe, 0);
  return Math.round((total / values.length) * 10) / 10;
};

export const sessionsByDay = (
  sessions: WorkoutSessionDto[],
): Map<string, WorkoutSessionDto> => {
  const byDay = new Map<string, WorkoutSessionDto>();

  for (const session of sessions) {
    const key = dayKey(session.createdAt);
    if (!byDay.has(key)) byDay.set(key, session);
  }

  return byDay;
};
