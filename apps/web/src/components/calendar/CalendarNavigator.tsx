import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useT } from "@/i18n";

export type CalendarView = "week" | "month";

interface CalendarNavigatorProps {
  label: string;
  view: CalendarView;
  isCurrentPeriod: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
}

const CalendarNavigator = ({
  label,
  view,
  isCurrentPeriod,
  onPrev,
  onNext,
  onToday,
  onViewChange,
}: CalendarNavigatorProps) => {
  const t = useT();
  const isWeek = view === "week";

  const arrowClass =
    "flex shrink-0 items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition";

  const toggleClass = (active: boolean) =>
    `px-3 h-7 rounded text-xs font-semibold transition cursor-pointer ${
      active
        ? "bg-indigo text-white"
        : "text-lightGrey/60 hover:text-white"
    }`;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-darkGrey bg-mediumGrey/60 p-2 sm:flex-row sm:items-center xl:gap-3 xl:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 xl:gap-3">
        <button
          aria-label={t(isWeek ? "calendar.prevWeek" : "calendar.prevMonth")}
          onClick={onPrev}
          className={arrowClass}
        >
          <LuChevronLeft size={18} />
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold capitalize tracking-wide text-white xl:text-base">
          {label}
        </p>
        <button
          aria-label={t(isWeek ? "calendar.nextWeek" : "calendar.nextMonth")}
          onClick={onNext}
          className={arrowClass}
        >
          <LuChevronRight size={18} />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-2">
        {!isCurrentPeriod && (
          <button
            type="button"
            onClick={onToday}
            className="h-8 rounded-md bg-darkGrey px-3 text-xs font-semibold text-white transition hover:bg-darkGrey/70 cursor-pointer"
          >
            {t("calendar.today")}
          </button>
        )}
        <div className="flex items-center gap-0.5 rounded-md bg-darkGrey p-0.5">
          <button
            type="button"
            aria-pressed={isWeek}
            onClick={() => onViewChange("week")}
            className={toggleClass(isWeek)}
          >
            {t("calendar.viewWeek")}
          </button>
          <button
            type="button"
            aria-pressed={!isWeek}
            onClick={() => onViewChange("month")}
            className={toggleClass(!isWeek)}
          >
            {t("calendar.viewMonth")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarNavigator;
