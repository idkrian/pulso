import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toDisplayWeight, unitLabel } from "@/utils/units";

export type FormatVolumeFn = (volumeKg: number) => string;

export const useFormatVolume = (): FormatVolumeFn => {
  const { unit } = useAuth();

  return useCallback(
    (volumeKg) => {
      const value = toDisplayWeight(volumeKg, unit);
      const compact =
        value >= 1000
          ? `${(value / 1000).toFixed(1)}k`
          : `${Math.round(value)}`;

      return `${compact} ${unitLabel(unit)}`;
    },
    [unit],
  );
};
