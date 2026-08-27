import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useT } from "@/i18n";

interface WeekNavigatorProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
}

const WeekNavigator = ({ label, onPrev, onNext }: WeekNavigatorProps) => {
  const t = useT();

  return (
    <div className="flex items-center gap-2 rounded-lg border border-darkGrey bg-mediumGrey/60 px-2 py-2 xl:gap-3 xl:px-4">
      <button
        aria-label={t("calendar.prevWeek")}
        onClick={onPrev}
        className="flex shrink-0 items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition"
      >
        <LuChevronLeft size={18} />
      </button>
      <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold capitalize tracking-wide text-white xl:text-base">
        {label}
      </p>
      <button
        aria-label={t("calendar.nextWeek")}
        onClick={onNext}
        className="flex shrink-0 items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition"
      >
        <LuChevronRight size={18} />
      </button>
    </div>
  );
};

export default WeekNavigator;
