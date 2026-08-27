import type { en } from "./en";

export type TranslationParams = Record<string, string | number>;

export type Dictionary = { [key: string]: string | Dictionary };

type Join<K, P> = K extends string
  ? P extends string
    ? P extends ""
      ? K
      : `${K}.${P}`
    : never
  : never;

type Leaves<T> = T extends string
  ? ""
  : { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T];

export type TranslationKey = Leaves<typeof en>;

export type LocaleDictionary = typeof en;
