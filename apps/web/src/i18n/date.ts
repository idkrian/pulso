import { useMemo } from "react";
import type { LanguagePreference } from "@/dtos/auth.dto";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/date";

const DATE_LOCALES: Record<LanguagePreference, string> = {
  en: "en-US",
  pt: "pt-BR",
};

export const dateLocaleFor = (locale: LanguagePreference): string =>
  DATE_LOCALES[locale];

export const useDateLocale = (): string => {
  const { locale } = useAuth();
  return dateLocaleFor(locale);
};

export type FormatDateFn = (
  date: Date | string,
  opts: Intl.DateTimeFormatOptions,
) => string;

export const useFormatDate = (): FormatDateFn => {
  const { locale } = useAuth();
  return useMemo(() => {
    const dateLocale = dateLocaleFor(locale);
    return (date, opts) => formatDate(date, opts, dateLocale);
  }, [locale]);
};

const SUNDAY_UTC = Date.UTC(2024, 0, 7);
const DAY_MS = 86_400_000;

export const useWeekdayInitials = (): string[] => {
  const { locale } = useAuth();
  return useMemo(() => {
    const format = new Intl.DateTimeFormat(dateLocaleFor(locale), {
      weekday: "narrow",
      timeZone: "UTC",
    });
    return Array.from({ length: 7 }, (_, index) =>
      format.format(new Date(SUNDAY_UTC + index * DAY_MS)),
    );
  }, [locale]);
};
