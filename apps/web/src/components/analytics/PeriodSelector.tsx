import type { MuscleStatsPeriod } from "@/api/workout";
import { useT, type TranslationKey } from "@/i18n";

const PERIODS: { key: MuscleStatsPeriod; labelKey: TranslationKey }[] = [
  { key: "week", labelKey: "periods.week" },
  { key: "month", labelKey: "periods.month" },
  { key: "trimester", labelKey: "periods.trimester" },
  { key: "semester", labelKey: "periods.semester" },
];

type PeriodSelectorProps = {
  period: MuscleStatsPeriod;
  onChange: (period: MuscleStatsPeriod) => void;
};

const PeriodSelector = ({ period, onChange }: PeriodSelectorProps) => {
  const t = useT();

  return (
    <div className="flex w-full items-center gap-1 rounded-lg bg-darkGrey p-1 lg:w-auto">
      {PERIODS.map(({ key, labelKey }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200 lg:flex-none ${
            period === key
              ? "bg-indigo text-white"
              : "text-lightGrey hover:bg-mediumGrey"
          }`}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
