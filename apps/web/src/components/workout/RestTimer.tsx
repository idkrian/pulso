import { LuPause, LuPlay, LuRotateCw } from "react-icons/lu";
import { REST_PRESETS, formatTime } from "@/utils";
import { useT } from "@/i18n";

type Props = {
  remaining: number;
  total: number;
  running: boolean;
  onSelectPreset: (seconds: number) => void;
  onToggle: () => void;
  onReset: () => void;
};

const RestTimer = ({
  remaining,
  total,
  running,
  onSelectPreset,
  onToggle,
  onReset,
}: Props) => {
  const t = useT();
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const ringColor = pct > 60 ? "#10b981" : pct > 30 ? "#f59e0b" : "#ef4444";
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="bg-mediumGrey rounded-2xl p-3 flex items-center gap-3">
      <div className="relative size-20 shrink-0">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#14141f"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${circumference * (1 - pct / 100)}`}
            className="transition-all duration-500 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold tabular-nums">
            {formatTime(remaining)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <span className="text-[10px] uppercase tracking-widest text-lightGrey/60">
          {t("workout.restTimer")}
        </span>
        <div className="flex gap-1 flex-wrap">
          {REST_PRESETS.map((s) => (
            <button
              key={s}
              onClick={() => onSelectPreset(s)}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full transition-colors cursor-pointer ${
                total === s
                  ? "bg-indigo text-white"
                  : "bg-darkGrey hover:bg-indigo/40"
              }`}
            >
              {s}s
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md bg-darkGrey hover:bg-indigo/40 transition-colors cursor-pointer"
          >
            {running ? <LuPause size={12} /> : <LuPlay size={12} />}
          </button>
          <button
            onClick={onReset}
            className="p-1.5 rounded-md bg-darkGrey hover:bg-indigo/40 transition-colors cursor-pointer"
          >
            <LuRotateCw size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestTimer;
