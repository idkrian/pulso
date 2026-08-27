import { prisma } from "../../../database/prisma/prisma.js";
import type {
  CreateExerciseRequestDto,
  UpdateExerciseRequestDto,
} from "./exercise.schema.js";
import type { Locale } from "../../shared/constants/locales.js";
import { AppError } from "../../shared/middlewares/request-error-handler.js";
import { HttpStatus } from "../../shared/constants/http-status.js";
import { exerciseTranslationInclude } from "../../shared/utils/exercise-translation.js";

export const exerciseRepository = {
  async createExercise(userId: number, data: CreateExerciseRequestDto) {
    return await prisma.exercises.create({
      data: {
        title: data.title,
        muscleGroup: data.muscleGroup,
        muscle: data.muscle,
        description: data.description ?? null,
        userId,
      },
    });
  },

  async getAllExercises(userId: number, locale: Locale) {
    return await prisma.exercises.findMany({
      where: { OR: [{ userId: null }, { userId }] },
      include: exerciseTranslationInclude(locale),
    });
  },

  async getAllExercisesByMuscleGroup(userId: number, locale: Locale) {
    return await prisma.$queryRaw`
      SELECT
        e."muscleGroup",
        json_agg(json_build_object(
          'id', e.id,
          'title', COALESCE(t.title, e.title),
          'description', COALESCE(t.description, e.description),
          'muscle', e.muscle,
          'userId', e."userId"
        )) AS items
      FROM "exercises" e
      LEFT JOIN "exercise_translations" t
        ON t."exerciseId" = e.id AND t.locale = ${locale}
      WHERE e."userId" IS NULL OR e."userId" = ${userId}
      GROUP BY e."muscleGroup"
    `;
  },

  async updateExercise(
    userId: number,
    exerciseId: number,
    data: UpdateExerciseRequestDto,
  ) {
    return await prisma.exercises.update({
      where: { id: exerciseId, userId },
      data,
    });
  },

  async deleteExercise(userId: number, exerciseId: number) {
    return await prisma.$transaction(async (tx) => {
      const owned = await tx.exercises.findFirst({
        where: { id: exerciseId, userId },
        select: { id: true },
      });
      if (!owned) {
        throw new AppError("Exercise not found", HttpStatus.NOT_FOUND);
      }

      const loggedCount = await tx.workout_exercise_logs.count({
        where: { exerciseId },
      });
      if (loggedCount > 0) {
        throw new AppError(
          "This exercise has logged workouts and can't be deleted",
          HttpStatus.CONFLICT,
        );
      }

      await tx.training_split_exercises.deleteMany({ where: { exerciseId } });

      return await tx.exercises.delete({ where: { id: exerciseId } });
    });
  },

  async getExerciseLogs(userId: number, exerciseId: number) {
    return await prisma.workout_exercise_logs.findMany({
      where: { exerciseId, workoutSession: { userId } },
      include: {
        workoutSession: { select: { createdAt: true } },
        workoutSets: {
          select: { setNumber: true, reps: true, weight: true, rpe: true },
          orderBy: { setNumber: "asc" },
        },
      },
      orderBy: { workoutSession: { createdAt: "desc" } },
    });
  },

  async getLogsForExercises(userId: number, exerciseIds: number[]) {
    return await prisma.workout_exercise_logs.findMany({
      where: { exerciseId: { in: exerciseIds }, workoutSession: { userId } },
      include: {
        workoutSession: { select: { createdAt: true } },
        workoutSets: {
          select: { setNumber: true, reps: true, weight: true, rpe: true },
          orderBy: { setNumber: "asc" },
        },
      },
      orderBy: { workoutSession: { createdAt: "desc" } },
    });
  },
};
