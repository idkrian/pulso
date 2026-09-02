import {
  Muscle,
  MuscleGroup,
} from "../../../database/prisma/generated/prisma/client.js";

export const musclesByGroup: Record<MuscleGroup, Muscle[]> = {
  CHEST: ["CHEST_GENERAL", "UPPER_CHEST", "MIDDLE_CHEST", "LOWER_CHEST"],
  BACK: ["BACK_GENERAL", "LATS", "TRAPS", "LOWER_BACK", "RHOMBOIDS"],
  SHOULDERS: [
    "SHOULDERS_GENERAL",
    "FRONT_DELTOID",
    "SIDE_DELTOID",
    "REAR_DELTOID",
  ],
  ARMS: ["ARMS_GENERAL", "BICEPS", "TRICEPS", "FOREARMS"],
  LEGS: ["LEGS_GENERAL", "QUADRICEPS", "HAMSTRINGS", "ADDUCTORS", "CALVES"],
  GLUTES: ["GLUTES_GENERAL"],
  CORE: ["CORE_GENERAL", "ABS", "OBLIQUES"],
};

export function isMuscleInGroup(group: MuscleGroup, muscle: Muscle): boolean {
  return musclesByGroup[group].includes(muscle);
}
