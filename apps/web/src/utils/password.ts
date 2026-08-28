export const MIN_PASSWORD_LENGTH = 8;

export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

const CHARACTER_CLASSES = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];

const countCharacterClasses = (password: string): number =>
  CHARACTER_CLASSES.filter((pattern) => pattern.test(password)).length;

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (password.length === 0) return 0;
  if (password.length < MIN_PASSWORD_LENGTH) return 1;

  let score = 2;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (countCharacterClasses(password) >= 3) score += 1;

  return Math.min(score, 4) as PasswordStrength;
};
