import { LuClock, LuDumbbell, LuLayers, LuX } from "react-icons/lu";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { formatTime } from "@/utils";
import {
  formatVolume,
  sessionTotalSets,
  sessionVolume,
} from "@/utils/workout-history";
import { useFormatDate, useT } from "@/i18n";

interface SessionDetailModalProps {
  open: boolean;
  session: WorkoutSessionDto | null;
  onClose: () => void;
}

const SessionDetailModal = ({
  open,
  session,
  onClose,
}: SessionDetailModalProps) => {
  const t = useT();
  const formatDate = useFormatDate();

  if (!open || !session) return null;

  const volume = sessionVolume(session);
  const totalSets = sessionTotalSets(session);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-mediumGrey rounded-lg w-full max-w-[520px] max-h-[85dvh] overflow-hidden shadow-2xl text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-4 border-b border-darkGrey">
          <div>
            <h2 className="text-xl font-bold">
              {session.trainingSplit?.title ??
                t("sessionDetailModal.fallbackTitle")}
            </h2>
            <p className="text-xs text-lightGrey/60 capitalize">
              {formatDate(session.createdAt, { dateStyle: "full" })}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t("common.close")}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-darkGrey hover:bg-darkGrey/70 text-white cursor-pointer transition"
          >
            <LuX size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 px-6 py-4 border-b border-darkGrey">
          <div className="flex flex-col items-center rounded-md bg-darkGrey/60 py-2">
            <div className="flex items-center gap-1 text-white">
              <LuClock size={14} className="text-indigo" />
              <span className="font-bold">
                {formatTime(session.durationSeconds)}
              </span>
            </div>
            <span className="text-[10px] text-lightGrey/60 uppercase">
              {t("sessionDetailModal.duration")}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md bg-darkGrey/60 py-2">
            <div className="flex items-center gap-1 text-white">
              <LuLayers size={14} className="text-indigo" />
              <span className="font-bold">{totalSets}</span>
            </div>
            <span className="text-[10px] text-lightGrey/60 uppercase">
              {t("sessionDetailModal.sets")}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md bg-darkGrey/60 py-2">
            <div className="flex items-center gap-1 text-white">
              <LuDumbbell size={14} className="text-indigo" />
              <span className="font-bold">{formatVolume(volume)}</span>
            </div>
            <span className="text-[10px] text-lightGrey/60 uppercase">
              {t("sessionDetailModal.volume")}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-lightGrey/60 mb-3">
            {t("sessionDetailModal.exercises")}
          </p>
          <div className="flex flex-col gap-3">
            {session.workoutExerciseLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-md bg-darkGrey/40 p-3 border border-darkGrey"
              >
                <p className="font-semibold text-sm">{log.exercise.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {log.workoutSets.map((set) => (
                    <span
                      key={set.id}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-indigo/15 text-lightIndigo border border-indigo/30 tabular-nums"
                    >
                      {set.weight ?? 0}kg × {set.reps}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailModal;
