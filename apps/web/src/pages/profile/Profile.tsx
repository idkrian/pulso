import { useEffect, useState } from "react";
import { LuScale, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { createBodyWeight, getBodyWeights } from "@/api/body-weight";
import BodyWeightChart from "@/components/charts/BodyWeightChart";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import type { BodyWeightDto } from "@/dtos/body-weight.dto";
import type { LanguagePreference, UnitPreference } from "@/dtos/auth.dto";
import { formatWeight, toCanonicalWeight, unitLabel } from "@/utils/units";
import { useFormatDate, useT } from "@/i18n";

const UNITS: UnitPreference[] = ["KG", "LB"];
const LANGUAGES: { value: LanguagePreference; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "pt", label: "PT" },
];

const Profile = () => {
  const { user, unit, locale, updateProfile } = useAuth();
  const t = useT();
  const formatDate = useFormatDate();
  const [entries, setEntries] = useState<BodyWeightDto[]>([]);
  const [weightInput, setWeightInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getBodyWeights().then(setEntries).catch(console.error);
  }, []);

  const latest = entries.at(-1) ?? null;
  const previous = entries.at(-2) ?? null;
  const delta = latest && previous ? latest.weight - previous.weight : null;

  const logWeight = async () => {
    const typed = Number(weightInput);
    if (!typed || typed <= 0 || saving) return;

    setSaving(true);
    try {
      const created = await createBodyWeight({
        weight: toCanonicalWeight(typed, unit),
      });
      setEntries((prev) => {
        const rest = prev.filter((e) => e.id !== created.id);
        return [...rest, created];
      });
      setWeightInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const changeUnit = async (next: UnitPreference) => {
    if (next === unit) return;
    try {
      await updateProfile({ unitPreference: next });
    } catch (error) {
      console.error(error);
    }
  };

  const changeLanguage = async (next: LanguagePreference) => {
    if (next === locale) return;
    try {
      await updateProfile({ languagePreference: next });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 lg:h-full lg:overflow-hidden">
      <div className="grid shrink-0 grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3">
        <div className="flex min-w-0 items-center gap-2 rounded-lg bg-mediumGrey px-3 py-2.5 lg:gap-3 lg:px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-darkIndigo/40">
            <LuScale className="h-4 w-4 text-lightIndigo" />
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold leading-tight text-white">
              {latest ? formatWeight(latest.weight, unit) : "--"}
            </p>
            <p className="truncate text-xs text-lightGrey/60">
              {t("profile.currentWeight")}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 rounded-lg bg-mediumGrey px-3 py-2.5 lg:gap-3 lg:px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-darkIndigo/40">
            {delta !== null && delta < 0 ? (
              <LuTrendingDown className="h-4 w-4 text-emerald-400" />
            ) : (
              <LuTrendingUp className="h-4 w-4 text-lightIndigo" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold leading-tight text-white">
              {delta !== null
                ? `${delta > 0 ? "+" : ""}${formatWeight(delta, unit)}`
                : "--"}
            </p>
            <p className="truncate text-xs text-lightGrey/60">
              {t("profile.sinceLastEntry")}
            </p>
          </div>
        </div>

        <div className="col-span-2 flex min-w-0 items-center justify-between gap-3 rounded-lg bg-mediumGrey px-3 py-2.5 lg:col-span-1 lg:px-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name}
            </p>
            <p className="truncate text-xs text-lightGrey/60">{user?.email}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex gap-1">
              {UNITS.map((option) => (
                <button
                  key={option}
                  onClick={() => changeUnit(option)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-colors cursor-pointer ${
                    unit === option
                      ? "bg-indigo text-white"
                      : "bg-darkGrey/60 text-lightGrey/60 hover:text-white"
                  }`}
                >
                  {unitLabel(option)}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {LANGUAGES.map((option) => (
                <button
                  key={option.value}
                  onClick={() => changeLanguage(option.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-colors cursor-pointer ${
                    locale === option.value
                      ? "bg-indigo text-white"
                      : "bg-darkGrey/60 text-lightGrey/60 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 gap-3 lg:flex-1 lg:min-h-0 lg:grid-cols-[280px_1fr]">
        <div className="flex min-w-0 flex-col gap-3 rounded-lg bg-mediumGrey p-4 lg:min-h-0">
          <p className="text-sm font-semibold text-white">
            {t("profile.logBodyWeight")}
          </p>
          <p className="text-xs text-lightGrey/60">{t("profile.weighHint")}</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step={0.1}
              value={weightInput}
              placeholder="0"
              onChange={(e) => setWeightInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && logWeight()}
              className="w-full bg-darkGrey/60 rounded-md px-3 py-2 text-sm font-semibold text-white outline-none focus:bg-darkGrey transition-colors"
            />
            <span className="text-xs font-semibold uppercase text-lightGrey/60 shrink-0">
              {unitLabel(unit)}
            </span>
          </div>
          <Button
            fullWidth
            label={saving ? t("profile.saving") : t("profile.logWeight")}
            onClick={logWeight}
          />

          <div className="mt-2 flex max-h-56 flex-col gap-1.5 overflow-y-auto lg:max-h-none lg:min-h-0">
            {[...entries]
              .reverse()
              .slice(0, 10)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between text-xs px-2 py-1.5 rounded-md bg-darkGrey/40"
                >
                  <span className="text-lightGrey/60">
                    {formatDate(entry.createdAt, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-semibold text-white">
                    {formatWeight(entry.weight, unit)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <BodyWeightChart entries={entries} />
      </div>
    </div>
  );
};

export default Profile;
