import type { Locale } from "../constants/locales.js";

export const exerciseTranslationInclude = (locale: Locale) => ({
  translations: {
    where: { locale },
    select: { title: true, description: true },
  },
});

type TranslatableExercise = {
  title: string;
  description: string | null;
  translations: { title: string; description: string | null }[];
};

export const withExerciseTranslation = <T extends TranslatableExercise>(
  exercise: T,
) => {
  const { translations, ...rest } = exercise;
  const translation = translations[0];

  return {
    ...rest,
    title: translation?.title ?? exercise.title,
    description: translation?.description ?? exercise.description,
  };
};

export const withTranslatedSplitExercises = <
  S extends { exercises: { exercise: TranslatableExercise }[] },
>(
  split: S,
) => ({
  ...split,
  exercises: split.exercises.map((splitExercise) => ({
    ...splitExercise,
    exercise: withExerciseTranslation(splitExercise.exercise),
  })),
});
