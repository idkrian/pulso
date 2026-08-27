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
  BICEPS_LONG_HEAD: "BICEPS_LONG_HEAD",
  BICEPS_SHORT_HEAD: "BICEPS_SHORT_HEAD",
  TRICEPS_LONG_HEAD: "TRICEPS_LONG_HEAD",
  TRICEPS_LATERAL_HEAD: "TRICEPS_LATERAL_HEAD",
  TRICEPS_MEDIAL_HEAD: "TRICEPS_MEDIAL_HEAD",

  // Forearms
  FOREARMS_GENERAL: "FOREARMS_GENERAL",
  BRACHIORADIALIS: "BRACHIORADIALIS",
  PRONATOR_TERES: "PRONATOR_TERES",
  FLEXORS: "FLEXORS",
  EXTENSORS: "EXTENSORS",

  // Legs
  LEGS_GENERAL: "LEGS_GENERAL",
  QUADRICEPS: "QUADRICEPS",
  HAMSTRINGS: "HAMSTRINGS",
  CALVES: "CALVES",

  // Glutes
  GLUTES_GENERAL: "GLUTES_GENERAL",
  GLUTEUS_MAXIMUS: "GLUTEUS_MAXIMUS",
  GLUTEUS_MEDIUS: "GLUTEUS_MEDIUS",
  GLUTEUS_MINIMUS: "GLUTEUS_MINIMUS",

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
  ARMS: [
    Muscle.ARMS_GENERAL,
    Muscle.BICEPS_LONG_HEAD,
    Muscle.BICEPS_SHORT_HEAD,
    Muscle.TRICEPS_LONG_HEAD,
    Muscle.TRICEPS_LATERAL_HEAD,
    Muscle.TRICEPS_MEDIAL_HEAD,
    Muscle.FOREARMS_GENERAL,
    Muscle.BRACHIORADIALIS,
    Muscle.PRONATOR_TERES,
    Muscle.FLEXORS,
    Muscle.EXTENSORS,
  ],
  LEGS: [
    Muscle.LEGS_GENERAL,
    Muscle.QUADRICEPS,
    Muscle.HAMSTRINGS,
    Muscle.CALVES,
  ],
  GLUTES: [
    Muscle.GLUTES_GENERAL,
    Muscle.GLUTEUS_MAXIMUS,
    Muscle.GLUTEUS_MEDIUS,
    Muscle.GLUTEUS_MINIMUS,
  ],
  CORE: [Muscle.CORE_GENERAL, Muscle.ABS, Muscle.OBLIQUES],
};

export interface MuscleGroupItemsDto {
  muscleGroup: MuscleGroupType;
  items: ExerciseDto[];
}

export type ExerciseFilter = MuscleGroupType | "ALL";
