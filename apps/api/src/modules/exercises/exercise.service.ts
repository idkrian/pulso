import type { Response } from "express";
import { requestErrorHandler } from "../../shared/utils/requestHandlers.js";
import { exerciseRepository } from "./exercise.repository.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";
import type { Locale } from "../../shared/constants/locales.js";
import { withExerciseTranslation } from "../../shared/utils/exercise-translation.js";
import type {
  ExerciseHistoryEntryDto,
  ExercisePerformanceDto,
  ExercisePersonalBestDto,
  ExerciseSetDto,
  ExerciseStatsDto,
} from "./exercise.model.js";

type LogRow = {
  exerciseId: number;
  workoutSession: { createdAt: Date };
  workoutSets: {
    setNumber: number;
    reps: number;
    weight: { toString(): string };
    rpe: { toString(): string } | null;
  }[];
};

const round = (value: number) => Math.round(value * 100) / 100;

// Epley: a single rep is already the max, so only multi-rep sets get extrapolated.
const estimateOneRepMax = (weight: number, reps: number) =>
  reps <= 1 ? weight : weight * (1 + reps / 30);

// Prisma returns Decimal columns as objects, so they are normalized to numbers here.
const toSetDto = (set: LogRow["workoutSets"][number]): ExerciseSetDto => ({
  setNumber: set.setNumber,
  reps: set.reps,
  weight: Number(set.weight),
  rpe: set.rpe === null ? null : Number(set.rpe),
});

/** Logs arrive newest-first; history is returned oldest-first so charts read left to right. */
const buildHistory = (logs: LogRow[]): ExerciseHistoryEntryDto[] =>
  logs
    .map((log) => {
      const sets = log.workoutSets.map(toSetDto);
      return {
        date: log.workoutSession.createdAt.toISOString(),
        maxWeight: sets.reduce((max, s) => Math.max(max, s.weight), 0),
        totalVolume: round(sets.reduce((sum, s) => sum + s.weight * s.reps, 0)),
        estimatedOneRepMax: round(
          sets.reduce(
            (max, s) => Math.max(max, estimateOneRepMax(s.weight, s.reps)),
            0,
          ),
        ),
        sets,
      };
    })
    .reverse();

/** The all-time best set, ranked by estimated 1RM rather than raw weight. */
const computePersonalBest = (
  logs: LogRow[],
): ExercisePersonalBestDto | null => {
  let best: ExercisePersonalBestDto | null = null;

  for (const log of logs) {
    const date = log.workoutSession.createdAt.toISOString();
    for (const rawSet of log.workoutSets) {
      const set = toSetDto(rawSet);
      const estimated = estimateOneRepMax(set.weight, set.reps);
      if (!best || estimated > best.estimatedOneRepMax) {
        best = {
          weight: set.weight,
          reps: set.reps,
          estimatedOneRepMax: round(estimated),
          date,
        };
      }
    }
  }

  return best;
};

/** Heaviest weight ever moved, regardless of reps — drives the "top weight" PR toast. */
const computeBestWeight = (logs: LogRow[]): number | null => {
  const weights = logs.flatMap((log) =>
    log.workoutSets.map((set) => Number(set.weight)),
  );
  return weights.length ? Math.max(...weights) : null;
};

const buildPerformance = (
  exerciseId: number,
  logs: LogRow[],
): ExercisePerformanceDto => {
  const latest = logs[0];

  return {
    exerciseId,
    lastPerformed: latest
      ? {
          date: latest.workoutSession.createdAt.toISOString(),
          sets: latest.workoutSets.map(toSetDto),
        }
      : null,
    personalBest: computePersonalBest(logs),
    bestWeight: computeBestWeight(logs),
  };
};

export const exerciseService = {
  async createExercise(userId: number, data: CreateExerciseRequestDto) {
    return await exerciseRepository.createExercise(userId, data);
  },

  async getAllExercises(userId: number, locale: Locale) {
    const exercises = await exerciseRepository.getAllExercises(userId, locale);
    return exercises.map(withExerciseTranslation);
  },

  async getAllExercisesByMuscleGroup(userId: number, locale: Locale) {
    return await exerciseRepository.getAllExercisesByMuscleGroup(userId, locale);
  },

  async updateExercise(
    userId: number,
    exerciseId: number,
    data: UpdateExerciseRequestDto,
  ) {
    return await exerciseRepository.updateExercise(userId, exerciseId, data);
  },

  async deleteExercise(userId: number, exerciseId: number, res: Response) {
    if (!exerciseId) {
      return requestErrorHandler(res, "Exercise ID not informed!");
    }
    return await exerciseRepository.deleteExercise(userId, exerciseId);
  },

  async getExerciseStats(
    userId: number,
    exerciseId: number,
  ): Promise<ExerciseStatsDto> {
    const logs = await exerciseRepository.getExerciseLogs(userId, exerciseId);

    if (logs.length === 0) {
      return {
        personalBest: null,
        bestWeight: null,
        lastPerformed: null,
        history: [],
      };
    }

    return {
      personalBest: computePersonalBest(logs),
      bestWeight: computeBestWeight(logs),
      lastPerformed: logs[0]!.workoutSession.createdAt.toISOString(),
      history: buildHistory(logs),
    };
  },

  /**
   * Batched so the live workout can load every exercise's history in one request
   * instead of one call per exercise.
   */
  async getExercisePerformances(
    userId: number,
    exerciseIds: number[],
  ): Promise<ExercisePerformanceDto[]> {
    if (exerciseIds.length === 0) return [];

    const logs = await exerciseRepository.getLogsForExercises(
      userId,
      exerciseIds,
    );

    const logsByExercise = new Map<number, LogRow[]>();
    for (const log of logs) {
      const current = logsByExercise.get(log.exerciseId) ?? [];
      current.push(log);
      logsByExercise.set(log.exerciseId, current);
    }

    return exerciseIds.map((exerciseId) =>
      buildPerformance(exerciseId, logsByExercise.get(exerciseId) ?? []),
    );
  },
};
