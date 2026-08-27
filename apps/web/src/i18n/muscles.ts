import { useCallback, useMemo } from "react";
import {
  MusclesByGroup,
  type MuscleGroupType,
  type MuscleType,
} from "@/dtos/muscle.dto";
import { useT } from "./index";

export type MuscleOption = { text: string; value: MuscleType };

export const useMuscleLabel = () => {
  const t = useT();
  return useCallback((muscle: MuscleType) => t(`muscles.${muscle}`), [t]);
};

export const useMuscleGroupLabel = () => {
  const t = useT();
  return useCallback(
    (group: MuscleGroupType) => t(`muscleGroups.${group}`),
    [t],
  );
};

export const useMusclesByGroup = (): Record<
  MuscleGroupType,
  MuscleOption[]
> => {
  const muscleLabel = useMuscleLabel();
  return useMemo(() => {
    const entries = Object.entries(MusclesByGroup) as [
      MuscleGroupType,
      MuscleType[],
    ][];
    return Object.fromEntries(
      entries.map(([group, muscles]) => [
        group,
        muscles.map((value) => ({ text: muscleLabel(value), value })),
      ]),
    ) as Record<MuscleGroupType, MuscleOption[]>;
  }, [muscleLabel]);
};
