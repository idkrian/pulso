import { useMemo, type ReactNode } from "react";
import {
  LuClock,
  LuDumbbell,
  LuGauge,
  LuLayers,
  LuTrophy,
  LuX,
} from "react-icons/lu";
import type {
  WorkoutSessionDto,
  WorkoutSetDto,
} from "@/dtos/workout-session.dto";
import { formatTime } from "@/utils";
import {
  bestSet,
  personalRecordSetIds,
  previousExercisePerformance,
  sessionAverageRpe,
  sessionTotalSets,
  sessionVolume,
} from "@/utils/workout-history";
import { useFormatVolume } from "@/hooks/useFormatVolume";
import { useAuth } from "@/contexts/AuthContext";
import { formatWeight } from "@/utils/units";
import { useFormatDate, useT } from "@/i18n";

interface SessionDetailModalProps {
  open: boolean;
  session: WorkoutSessionDto | null;
  sessions: WorkoutSessionDto[];
  onClose: () => void;
}

const SessionDetailModal = ({
  open,
  session,
  sessions,
  onClose,
}: SessionDetailModalProps) => {
  const t = useT();
  const formatDate = useFormatDate();
  const formatVolume = useFormatVolume();
  const { unit } = useAuth();

  const recordSetIds = useMemo(
    () =>
      session ? personalRecordSetIds(sessions, session) : new Set<number>(),
    [sessions, session],
  );

  if (!open || !session) return null;

  const averageRpe = sessionAverageRpe(session);

  const summaryCards: { icon: ReactNode; value: string; label: string }[] = [
    {
      icon: <LuClock size={14} className="text-indigo" />,
      value: formatTime(session.durationSeconds),
      label: t("sessionDetailModal.duration"),
    },
    {
      icon: <LuLayers size={14} className="text-indigo" />,
      value: String(sessionTotalSets(session)),
      label: t("sessionDetailModal.sets"),
    },
    {
      icon: <LuDumbbell size={14} className="text-indigo" />,
      value: formatVolume(sessionVolume(session)),
      label: t("sessionDetailModal.volume"),
    },
    {
      icon: <LuGauge size={14} className="text-indigo" />,
      value: averageRpe === null ? "—" : String(averageRpe),
      label: t("sessionDetailModal.avgRpe"),
    },
  ];

  const renderDelta = (current: WorkoutSetDto, previous: WorkoutSetDto) => {
    const delta = (current.weight ?? 0) - (previous.weight ?? 0);

    if (delta === 0) {
      return (
        <span className="shrink-0 rounded-full bg-darkGrey px-1.5 py-0.5 text-[10px] font-semibold text-lightGrey/50">
          =
        </span>
      );
    }

    const positive = delta > 0;

    return (
      <span
        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
          positive
            ? "bg-emerald-500/15 text-emerald-300"
            : "bg-red-500/15 text-red-300"
        }`}
      >
        {positive ? "+" : "-"}
        {formatWeight(Math.abs(delta), unit)}
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-mediumGrey rounded-lg w-full max-w-140 max-h-[85dvh] overflow-hidden shadow-2xl text-white flex flex-col"
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

        <div className="grid grid-cols-2 gap-2 px-6 py-4 border-b border-darkGrey sm:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col items-center rounded-md bg-darkGrey/60 py-2"
            >
              <div className="flex items-center gap-1 text-white">
                {card.icon}
                <span className="font-bold">{card.value}</span>
              </div>
              <span className="text-[10px] text-lightGrey/60 uppercase">
                {card.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-lightGrey/60 mb-3">
            {t("sessionDetailModal.exercises")}
          </p>
          <div className="flex flex-col gap-3">
            {session.workoutExerciseLogs.map((log) => {
              const previous = previousExercisePerformance(
                sessions,
                session,
                log.exerciseId,
              );
              const previousBest = previous ? bestSet(previous.sets) : null;
              const currentBest = bestSet(log.workoutSets);

              return (
                <div
                  key={log.id}
                  className="rounded-md bg-darkGrey/40 p-3 border border-darkGrey"
                >
                  <p className="font-semibold text-sm">{log.exercise.title}</p>

                  <div className="mt-2 flex flex-col gap-1">
                    {log.workoutSets.map((set) => (
                      <div
                        key={set.id}
                        className="flex items-center gap-2 rounded-md bg-darkGrey/60 px-2 py-1.5 text-xs"
                      >
                        <span className="w-4 shrink-0 text-center text-lightGrey/40 tabular-nums">
                          {set.setNumber}
                        </span>
                        <span className="font-semibold text-white tabular-nums">
                          {formatWeight(set.weight ?? 0, unit)} × {set.reps}
                        </span>
                        {set.rpe !== null && (
                          <span className="text-lightGrey/50 tabular-nums">
                            {t("sessionDetailModal.rpe", { rpe: set.rpe })}
                          </span>
                        )}
                        {recordSetIds.has(set.id) && (
                          <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-300">
                            <LuTrophy size={10} />
                            {t("sessionDetailModal.personalRecord")}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[11px] text-lightGrey/50">
                    {previousBest ? (
                      <>
                        <span className="min-w-0 truncate tabular-nums">
                          {t("sessionDetailModal.previousBest", {
                            weight: formatWeight(previousBest.weight ?? 0, unit),
                            reps: previousBest.reps,
                          })}
                        </span>
                        {currentBest && renderDelta(currentBest, previousBest)}
                      </>
                    ) : (
                      <span>{t("sessionDetailModal.firstTime")}</span>
                    )}
                  </div>

                  {log.notes && (
                    <p className="mt-2 text-xs italic text-lightGrey/60">
                      {log.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {session.notes && (
            <div className="mt-4 rounded-md bg-darkGrey/40 p-3 border border-darkGrey">
              <p className="text-xs uppercase tracking-wider text-lightGrey/60 mb-1">
                {t("sessionDetailModal.sessionNotes")}
              </p>
              <p className="text-sm text-lightGrey">{session.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetailModal;
