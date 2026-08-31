import { useT } from "@/i18n";
import { getPasswordStrength, type PasswordStrength } from "@/utils/password";
import type { TranslationKey } from "@/i18n";

const SEGMENTS = [1, 2, 3, 4] as const;

const BAR_COLOR: Record<Exclude<PasswordStrength, 0>, string> = {
  1: "bg-red-500",
  2: "bg-amber-500",
  3: "bg-lime-500",
  4: "bg-emerald-500",
};

const LABEL_COLOR: Record<Exclude<PasswordStrength, 0>, string> = {
  1: "text-red-400",
  2: "text-amber-400",
  3: "text-lime-400",
  4: "text-emerald-400",
};

const LABEL_KEY: Record<Exclude<PasswordStrength, 0>, TranslationKey> = {
  1: "login.passwordStrength.weak",
  2: "login.passwordStrength.fair",
  3: "login.passwordStrength.good",
  4: "login.passwordStrength.strong",
};

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const t = useT();
  const strength = getPasswordStrength(password);

  if (strength === 0) return null;

  return (
    <div className="space-y-1.5 pt-0.5">
      <div className="flex gap-1.5">
        {SEGMENTS.map((segment) => (
          <div
            key={segment}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              segment <= strength ? BAR_COLOR[strength] : "bg-mediumGrey"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${LABEL_COLOR[strength]}`}>
        {t(LABEL_KEY[strength])}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
