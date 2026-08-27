import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { dayKey, isSameDay } from "./date";

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

export const findSessionOnDate = (
  sessions: WorkoutSessionDto[],
  date: Date,
): WorkoutSessionDto | undefined =>
  sessions.find((s) => isSameDay(s.createdAt, date));

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

export const formatVolume = (volume: number): string => {
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}k`;
  return `${volume}`;
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
