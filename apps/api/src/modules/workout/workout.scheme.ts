import z from "zod";

const workoutSetInputSchema = z.object({
  setNumber: z.number().int().positive(),
  reps: z.number().int().positive(),
  weight: z.number().positive(),
  rpe: z.number().min(0).max(10),
});

const workoutExerciseInputSchema = z.object({
  exerciseId: z.number().int().positive(),
  notes: z.string().max(1000).optional(),
  sets: z.array(workoutSetInputSchema).min(1),
});

export const createWorkoutScheme = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().max(255),
  durationSeconds: z.number().int().positive().min(1),
  exercises: z.array(workoutExerciseInputSchema).min(1),
});

export const updateWorkoutScheme = z.object({
  title: z.string().max(255),
  exercises: z.array(workoutExerciseInputSchema).min(1),
});

export const getMuscleStatsScheme = z.object({
  period: z.enum(["week", "month", "trimester", "semester"]).default("week"),
});

export type MuscleStatsPeriod = z.infer<typeof getMuscleStatsScheme>["period"];

export type CreateWorkoutRequestDto = z.infer<typeof createWorkoutScheme>;

export type UpdateWorkoutRequestDto = z.infer<typeof updateWorkoutScheme>;

export type GetMuscleStatsRequestDto = z.infer<typeof getMuscleStatsScheme>;
