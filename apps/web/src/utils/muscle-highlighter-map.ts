import type { Muscle } from "react-body-highlighter";
import type { MuscleStatsPeriod } from "@/api/workout";
import type { MuscleType } from "@/dtos/muscle.dto";

export const muscleToHighlighter: Partial<Record<MuscleType, Muscle[]>> = {
  CHEST_GENERAL: ["chest"],
  UPPER_CHEST: ["chest"],
  MIDDLE_CHEST: ["chest"],
  LOWER_CHEST: ["chest"],

  BACK_GENERAL: ["upper-back"],
  LATS: ["upper-back"],
  TRAPS: ["trapezius"],
  LOWER_BACK: ["lower-back"],
  RHOMBOIDS: ["upper-back"],

  SHOULDERS_GENERAL: ["front-deltoids", "back-deltoids"],
  FRONT_DELTOID: ["front-deltoids"],
  SIDE_DELTOID: ["front-deltoids"],
  REAR_DELTOID: ["back-deltoids"],

  ARMS_GENERAL: ["biceps", "triceps"],
  BICEPS: ["biceps"],
  TRICEPS: ["triceps"],
  FOREARMS: ["forearm"],

  LEGS_GENERAL: ["quadriceps", "hamstring"],
  QUADRICEPS: ["quadriceps"],
  HAMSTRINGS: ["hamstring"],
  ADDUCTORS: ["adductor"],
  CALVES: ["calves"],

  GLUTES_GENERAL: ["gluteal"],

  CORE_GENERAL: ["abs"],
  ABS: ["abs"],
  OBLIQUES: ["obliques"],
};

export type NormalizedMuscleStat = {
  name: string;
  muscles: Muscle[];
  frequency: number;
};
const WEEKS_PER_PERIOD: Record<MuscleStatsPeriod, number> = {
  week: 1,
  month: 4.33,
  trimester: 13,
  semester: 26,
};

function weeklyAvgToZone(weeklyAvg: number): number {
  if (weeklyAvg < 6) return 1;
  if (weeklyAvg < 10) return 2;
  if (weeklyAvg < 18) return 3;
  if (weeklyAvg < 23) return 4;
  return 5;
}

export function buildHighlighterData(
  stats: { muscle: string; totalSets: number }[],
  period: MuscleStatsPeriod,
): NormalizedMuscleStat[] {
  const weeks = WEEKS_PER_PERIOD[period];

  const aggregated = new Map<Muscle, { totalSets: number; names: string[] }>();

  for (const stat of stats) {
    const highlighterMuscles =
      muscleToHighlighter[stat.muscle as MuscleType] ?? [];

    for (const hMuscle of highlighterMuscles) {
      const existing = aggregated.get(hMuscle);
      if (existing) {
        existing.totalSets += stat.totalSets;
        existing.names.push(stat.muscle);
      } else {
        aggregated.set(hMuscle, {
          totalSets: stat.totalSets,
          names: [stat.muscle],
        });
      }
    }
  }

  return [...aggregated.entries()].map(([muscle, data]) => ({
    name: muscle,
    muscles: [muscle],
    frequency: weeklyAvgToZone(data.totalSets / weeks),
  }));
}
