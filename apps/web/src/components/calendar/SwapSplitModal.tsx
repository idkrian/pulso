import { useEffect, useState } from "react";
import { LuMoon, LuTrash2, LuX } from "react-icons/lu";
import type { TrainingSplitDto } from "@/dtos/training-splits.dto";
import type { TrainingSplitDayEntry } from "@/dtos/training-split-day.dto";
import { getAllUserTrainingSplits } from "@/api/training-split";
import { useFormatDate, useT } from "@/i18n";

interface SwapSplitModalProps {
  open: boolean;
  date: Date;
  dayName: string;
  currentEntry?: TrainingSplitDayEntry;
  onClose: () => void;
  onAssign: (trainingSplitId: number, restDay: boolean) => Promise<void>;
  onRemove: () => Promise<void>;
}

const SwapSplitModal = ({
  open,
  date,
  dayName,
  currentEntry,
  onClose,
  onAssign,
  onRemove,
}: SwapSplitModalProps) => {
  const t = useT();
  const formatDate = useFormatDate();
  const [splits, setSplits] = useState<TrainingSplitDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    getAllUserTrainingSplits()
      .then(setSplits)
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  const handlePick = async (splitId: number) => {
    setSaving(true);
    try {
      await onAssign(splitId, false);
    } finally {
      setSaving(false);
    }
  };

  const handleRest = async () => {
    setSaving(true);
    try {
      // assign as rest day; backend still requires a trainingSplitId, use current or first available
      const splitId = currentEntry?.trainingSplit.id ?? splits[0]?.id;
      if (splitId == null) return;
      await onAssign(splitId, true);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setSaving(true);
    try {
      await onRemove();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-mediumGrey rounded-lg w-full max-w-[480px] max-h-[85dvh] overflow-hidden shadow-2xl text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-4 border-b border-darkGrey">
          <div>
            <h2 className="text-xl font-bold capitalize">{dayName}</h2>
            <p className="text-xs text-lightGrey/60">
              {formatDate(date, { dateStyle: "long" })}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t("common.close")}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 cursor-pointer transition"
          >
            <LuX size={16} />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-lightGrey/60 mb-3">
            {t("swapSplitModal.pickSplit")}
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-10 text-lightGrey/50 text-sm">
              {t("swapSplitModal.loading")}
            </div>
          ) : splits.length === 0 ? (
            <p className="text-sm text-lightGrey/60 text-center py-6">
              {t("swapSplitModal.noSplits")}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {splits.map((s) => {
                const isCurrent =
                  currentEntry?.trainingSplit.id === s.id &&
                  !currentEntry?.restDay;
                return (
                  <button
                    key={s.id}
                    disabled={saving}
                    onClick={() => handlePick(s.id)}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-left border cursor-pointer transition disabled:opacity-50 ${
                      isCurrent
                        ? "bg-indigo/20 border-indigo"
                        : "bg-darkGrey/40 border-darkGrey hover:border-indigo/40"
                    }`}
                  >
                    <span className="font-semibold text-sm">{s.title}</span>
                    <span className="text-[11px] text-lightGrey/60">
                      {t("swapSplitModal.exerciseCount", {
                        count: s.exercises.length,
                      })}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 px-6 py-3 border-t border-darkGrey">
          <button
            onClick={handleRest}
            disabled={saving || splits.length === 0}
            className="flex items-center gap-1.5 px-3 h-9 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-sm font-semibold cursor-pointer transition disabled:opacity-50"
          >
            <LuMoon size={14} />
            {t("swapSplitModal.markAsRest")}
          </button>

          {currentEntry && (
            <button
              onClick={handleRemove}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 h-9 rounded-md bg-red-500/15 hover:bg-red-500/30 text-red-300 text-sm font-semibold cursor-pointer transition disabled:opacity-50"
            >
              <LuTrash2 size={14} />
              {t("swapSplitModal.clearDay")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapSplitModal;
