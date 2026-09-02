import type { ExerciseDto } from "./exercise.dto";

export const MuscleGroup = {
  CHEST: "CHEST",
  BACK: "BACK",
  SHOULDERS: "SHOULDERS",
  ARMS: "ARMS",
  LEGS: "LEGS",
  GLUTES: "GLUTES",
  CORE: "CORE",
} as const;

export type MuscleGroupType = (typeof MuscleGroup)[keyof typeof MuscleGroup];

export const Muscle = {
  // Chest
  CHEST_GENERAL: "CHEST_GENERAL",
  UPPER_CHEST: "UPPER_CHEST",
  MIDDLE_CHEST: "MIDDLE_CHEST",
  LOWER_CHEST: "LOWER_CHEST",

  // Back
  BACK_GENERAL: "BACK_GENERAL",
  LATS: "LATS",
  TRAPS: "TRAPS",
  LOWER_BACK: "LOWER_BACK",
  RHOMBOIDS: "RHOMBOIDS",

  // Shoulders
  SHOULDERS_GENERAL: "SHOULDERS_GENERAL",
  FRONT_DELTOID: "FRONT_DELTOID",
  SIDE_DELTOID: "SIDE_DELTOID",
  REAR_DELTOID: "REAR_DELTOID",

  // Arms
  ARMS_GENERAL: "ARMS_GENERAL",
  BICEPS: "BICEPS",
  TRICEPS: "TRICEPS",
  FOREARMS: "FOREARMS",

  // Legs
  LEGS_GENERAL: "LEGS_GENERAL",
  QUADRICEPS: "QUADRICEPS",
  HAMSTRINGS: "HAMSTRINGS",
  ADDUCTORS: "ADDUCTORS",
  CALVES: "CALVES",

  // Glutes
  GLUTES_GENERAL: "GLUTES_GENERAL",

  // Core
  CORE_GENERAL: "CORE_GENERAL",
  ABS: "ABS",
  OBLIQUES: "OBLIQUES",
} as const;

export type MuscleType = (typeof Muscle)[keyof typeof Muscle];

export const MusclesByGroup: Record<MuscleGroupType, MuscleType[]> = {
  CHEST: [
    Muscle.CHEST_GENERAL,
    Muscle.UPPER_CHEST,
    Muscle.MIDDLE_CHEST,
    Muscle.LOWER_CHEST,
  ],
  BACK: [
    Muscle.BACK_GENERAL,
    Muscle.LATS,
    Muscle.TRAPS,
    Muscle.LOWER_BACK,
    Muscle.RHOMBOIDS,
  ],
  SHOULDERS: [
    Muscle.SHOULDERS_GENERAL,
    Muscle.FRONT_DELTOID,
    Muscle.SIDE_DELTOID,
    Muscle.REAR_DELTOID,
  ],
  ARMS: [Muscle.ARMS_GENERAL, Muscle.BICEPS, Muscle.TRICEPS, Muscle.FOREARMS],
  LEGS: [
    Muscle.LEGS_GENERAL,
    Muscle.QUADRICEPS,
    Muscle.HAMSTRINGS,
    Muscle.ADDUCTORS,
    Muscle.CALVES,
  ],
  GLUTES: [Muscle.GLUTES_GENERAL],
  CORE: [Muscle.CORE_GENERAL, Muscle.ABS, Muscle.OBLIQUES],
};

export interface MuscleGroupItemsDto {
  muscleGroup: MuscleGroupType;
  items: ExerciseDto[];
}

export type ExerciseFilter = MuscleGroupType | "ALL";
