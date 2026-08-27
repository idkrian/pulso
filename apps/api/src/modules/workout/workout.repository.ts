import { prisma } from "../../../database/prisma/prisma.js";
import type { CreateWorkoutRequestDto } from "./workout.scheme.js";
import type { Locale } from "../../shared/constants/locales.js";
import { exerciseTranslationInclude } from "../../shared/utils/exercise-translation.js";

const workoutWithDetails = (locale: Locale) => ({
  workoutExerciseLogs: {
    include: {
      exercise: { include: exerciseTranslationInclude(locale) },
      workoutSets: { orderBy: { setNumber: "asc" as const } },
    },
  },
  trainingSplit: true,
});

export const workoutRepository = {
  async createWorkout(userId: number, data: CreateWorkoutRequestDto) {
    return await prisma.workout_sessions.create({
      data: {
        userId,
        trainingSplitId: data.id,
        durationSeconds: data.durationSeconds,
        workoutExerciseLogs: {
          create: data.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            notes: exercise.notes ?? null,
            workoutSets: {
              create: exercise.sets.map((set) => ({
                setNumber: set.setNumber,
                reps: set.reps,
                weight: set.weight,
                rpe: set.rpe,
              })),
            },
          })),
        },
      },
    });
  },

  async getAllWorkouts(userId: number, locale: Locale) {
    return await prisma.workout_sessions.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: workoutWithDetails(locale),
    });
  },

  async getWorkoutById(userId: number, id: number, locale: Locale) {
    return await prisma.workout_sessions.findUnique({
      where: { id, userId },
      include: workoutWithDetails(locale),
    });
  },

  async getMuscleStats(userId: number, startDate: Date) {
    const result = await prisma.$queryRaw<
      { muscle: string; totalSets: bigint }[]
    >`
      SELECT e."muscle", COUNT(ws.id)::bigint AS "totalSets"
      FROM workout_sessions wsess
      JOIN workout_exercise_logs wel ON wel."workoutSessionId" = wsess.id
      JOIN exercises e ON e.id = wel."exerciseId"
      JOIN workout_sets ws ON ws."workoutExerciseLogId" = wel.id
      WHERE wsess."userId" = ${userId}
        AND wsess."createdAt" BETWEEN ${startDate} AND NOW()
      GROUP BY e."muscle"
      ORDER BY "totalSets" DESC
    `;

    return result.map((row) => ({
      muscle: row.muscle,
      totalSets: Number(row.totalSets),
    }));
  },

  async getMuscleGroupStats(userId: number, startDate: Date) {
    const result = await prisma.$queryRaw<
      { muscleGroup: string; totalSets: bigint }[]
    >`
      SELECT e."muscleGroup", COUNT(ws.id)::bigint AS "totalSets"
      FROM workout_sessions wsess
      JOIN workout_exercise_logs wel ON wel."workoutSessionId" = wsess.id
      JOIN exercises e ON e.id = wel."exerciseId"
      JOIN workout_sets ws ON ws."workoutExerciseLogId" = wel.id
      WHERE wsess."userId" = ${userId}
        AND wsess."createdAt" BETWEEN ${startDate} AND NOW()
      GROUP BY e."muscleGroup"
      ORDER BY "totalSets" DESC
    `;

    return result.map((row) => ({
      muscleGroup: row.muscleGroup,
      totalSets: Number(row.totalSets),
    }));
  },

  async getSummaryStats(userId: number) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalWorkouts, totalDuration, workoutsThisWeek, workoutsThisMonth] =
      await Promise.all([
        prisma.workout_sessions.count({ where: { userId } }),
        prisma.workout_sessions.aggregate({
          _sum: { durationSeconds: true },
          where: { userId },
        }),
        prisma.workout_sessions.count({
          where: { userId, createdAt: { gte: startOfWeek } },
        }),
        prisma.workout_sessions.count({
          where: { userId, createdAt: { gte: startOfMonth } },
        }),
      ]);

    return {
      totalWorkouts,
      totalDurationSeconds: totalDuration._sum.durationSeconds ?? 0,
      workoutsThisWeek,
      workoutsThisMonth,
    };
  },
};
