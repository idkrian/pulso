import { useMemo } from "react";
import type { LanguagePreference } from "@/dtos/auth.dto";
import { useAuth } from "@/contexts/AuthContext";
import { en } from "./en";
import { pt } from "./pt";
import type {
  Dictionary,
  LocaleDictionary,
  TranslationKey,
  TranslationParams,
} from "./types";

export type { TranslationKey, TranslationParams } from "./types";
export type { FormatDateFn } from "./date";
export {
  dateLocaleFor,
  useDateLocale,
  useFormatDate,
  useWeekdayInitials,
} from "./date";
export type { FormatNumberFn } from "./number";
export { useFormatNumber } from "./number";
export type { MuscleOption } from "./muscles";
export {
  useMuscleGroupLabel,
  useMuscleLabel,
  useMusclesByGroup,
} from "./muscles";

const dictionaries: Record<LanguagePreference, LocaleDictionary> = { en, pt };

const lookup = (dict: Dictionary, key: string): string | undefined => {
  let node: string | Dictionary | undefined = dict;
  for (const segment of key.split(".")) {
    if (typeof node !== "object") return undefined;
    node = node[segment];
  }
  return typeof node === "string" ? node : undefined;
};

const interpolate = (template: string, params?: TranslationParams): string =>
  params
    ? template.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in params ? String(params[name]) : match,
      )
    : template;

export type TranslateFn = (
  key: TranslationKey,
  params?: TranslationParams,
) => string;

export const createTranslator =
  (locale: LanguagePreference): TranslateFn =>
  (key, params) => {
    const template = lookup(dictionaries[locale], key) ?? lookup(en, key);

    if (template === undefined) {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] missing translation key: ${key}`);
      }
      return key;
    }

    return interpolate(template, params);
  };

export const useT = (): TranslateFn => {
  const { locale } = useAuth();
  return useMemo(() => createTranslator(locale), [locale]);
};
