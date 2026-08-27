import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { dateLocaleFor } from "./date";

export type FormatNumberFn = (value: number) => string;

export const useFormatNumber = (): FormatNumberFn => {
  const { locale } = useAuth();
  return useMemo(() => {
    const formatter = new Intl.NumberFormat(dateLocaleFor(locale));
    return (value) => formatter.format(value);
  }, [locale]);
};
