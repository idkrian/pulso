import { LuTrophy } from "react-icons/lu";
import Button from "@/components/ui/Button";
import { formatTime } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toDisplayWeight, unitLabel } from "@/utils/units";
import { useFormatNumber, useT } from "@/i18n";

type Props = {
  open: boolean;
  title: string;
  workoutSeconds: number;
  totalVolume: number;
  totalCompletedSets: number;
  submitting: boolean;
  onClose: () => void;
  onSave: () => void;
};

const WorkoutSummaryModal = ({
  open,
  title,
  workoutSeconds,
  totalVolume,
  totalCompletedSets,
  submitting,
  onClose,
  onSave,
}: Props) => {
  const t = useT();
  const { unit } = useAuth();
  const formatNumber = useFormatNumber();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm lg:p-8">
      <div className="my-auto w-full max-w-lg rounded-2xl border border-indigo/30 bg-linear-to-br from-mediumGrey to-darkGrey p-5 shadow-2xl lg:p-8">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="rounded-full bg-indigo/20 p-3">
            <LuTrophy size={36} className="text-lightIndigo" />
          </div>
          <h2 className="text-center text-2xl font-bold lg:text-3xl">
            {t("workoutSummary.title")}
          </h2>
          <p className="text-center text-lightGrey/60">{title}</p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2 lg:gap-3">
          <div className="rounded-xl bg-darkGrey p-2 text-center lg:p-4">
            <p className="text-[10px] uppercase text-lightGrey/50 lg:text-xs">
              {t("workoutSummary.time")}
            </p>
            <p className="mt-1 text-lg font-bold tabular-nums lg:text-2xl">
              {formatTime(workoutSeconds)}
            </p>
          </div>
          <div className="rounded-xl bg-darkGrey p-2 text-center lg:p-4">
            <p className="text-[10px] uppercase text-lightGrey/50 lg:text-xs">
              {t("workoutSummary.volume")}
            </p>
            <p className="mt-1 text-lg font-bold tabular-nums lg:text-2xl">
              {formatNumber(toDisplayWeight(totalVolume, unit))}
              <span className="text-xs text-lightGrey/50 lg:text-sm">
                {" "}
                {unitLabel(unit)}
              </span>
            </p>
          </div>
          <div className="rounded-xl bg-darkGrey p-2 text-center lg:p-4">
            <p className="text-[10px] uppercase text-lightGrey/50 lg:text-xs">
              {t("workoutSummary.sets")}
            </p>
            <p className="mt-1 text-lg font-bold tabular-nums lg:text-2xl">
              {totalCompletedSets}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 lg:flex-row lg:justify-end lg:gap-3 [&>button]:w-full lg:[&>button]:w-auto">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md px-4 py-2.5 text-lightGrey transition-colors hover:bg-darkGrey"
          >
            {t("workoutSummary.keepGoing")}
          </button>
          <Button
            label={t("workoutSummary.save")}
            onClick={onSave}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummaryModal;
