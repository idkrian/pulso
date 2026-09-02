import z from "zod";
import {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/client.js";
import { isMuscleInGroup } from "../../shared/constants/muscles.js";

const withMuscleInGroup = <T extends z.ZodType<{ muscleGroup: MuscleGroup; muscle: Muscle }>>(
  schema: T,
) =>
  schema.superRefine((value, ctx) => {
    if (!isMuscleInGroup(value.muscleGroup, value.muscle)) {
      ctx.addIssue({
        code: "custom",
        path: ["muscle"],
        message: `Muscle ${value.muscle} does not belong to muscle group ${value.muscleGroup}`,
      });
    }
  });

export const createExerciseSchema = withMuscleInGroup(
  z.object({
    title: z.string().max(255),
    description: z.string().optional(),
    muscleGroup: z.enum(MuscleGroup),
    muscle: z.enum(Muscle),
  }),
);

export const updateExerciseSchema = withMuscleInGroup(
  z.object({
    title: z.string().max(255),
    description: z.string().optional(),
    muscleGroup: z.enum(MuscleGroup),
    muscle: z.enum(Muscle),
  }),
);

export type CreateExerciseRequestDto = z.infer<typeof createExerciseSchema>;

export type UpdateExerciseRequestDto = z.infer<typeof updateExerciseSchema>;
