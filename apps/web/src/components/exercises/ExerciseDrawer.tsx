import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import type { ExerciseStatsDto } from "@/dtos/exercise.dto";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import ExerciseProgressChart from "@/components/charts/ExerciseProgressChart";
import { getExerciseStats } from "@/api/exercise";
import { useAuth } from "@/contexts/AuthContext";
import { formatWeight } from "@/utils/units";
import {
  useFormatDate,
  useMuscleGroupLabel,
  useMuscleLabel,
  useT,
} from "@/i18n";

type Props = {
  exercise: ExerciseDto | null;
  onClose: () => void;
  onEdit?: (exercise: ExerciseDto) => void;
  onDelete?: (exercise: ExerciseDto) => void;
};

const ExerciseDrawer = ({ exercise, onClose, onEdit, onDelete }: Props) => {
  const open = !!exercise;
  const { unit } = useAuth();
  const t = useT();
  const formatDate = useFormatDate();
  const muscleLabel = useMuscleLabel();
  const muscleGroupLabel = useMuscleGroupLabel();
  const [stats, setStats] = useState<ExerciseStatsDto | null>(null);
  const [loading, setLoading] = useState(false);
  const isCustom = exercise?.userId !== null;

  useEffect(() => {
    if (!exercise) return;
    setStats(null);
    setLoading(true);
    getExerciseStats(exercise.id)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [exercise?.id]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-dvh w-96 max-w-full bg-darkGrey border-l border-mediumGrey z-50 transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {exercise && (
          <>
            <div className="flex items-center justify-between p-5 border-b border-mediumGrey">
              <p className="text-xs uppercase tracking-wider text-lightGrey/60 font-semibold">
                {t("exerciseDrawer.title")}
              </p>
              <IoClose
                size={22}
                className="cursor-pointer text-lightGrey/70 hover:text-white"
                onClick={onClose}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-mediumGrey flex items-center justify-center">
                  <MuscleIcon group={exercise.muscleGroup} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{exercise.title}</h2>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isCustom
                          ? "bg-darkIndigo/40 text-lightIndigo"
                          : "bg-mediumGrey text-lightGrey/60"
                      }`}
                    >
                      {isCustom
                        ? t("exerciseDrawer.custom")
                        : t("exerciseDrawer.catalog")}
                    </span>
                  </div>
                  <p className="text-sm text-lightGrey/60">
                    {muscleGroupLabel(exercise.muscleGroup)}
                  </p>
                </div>
              </div>

              <Section label={t("exerciseDrawer.primaryMuscle")}>
                <span className="inline-block text-sm px-3 py-1.5 rounded-md bg-darkIndigo/40 text-lightIndigo border border-indigo/30">
                  {muscleLabel(exercise.muscle)}
                </span>
              </Section>

              {exercise.description && (
                <Section label={t("exerciseDrawer.description")}>
                  <p className="text-sm text-lightGrey leading-relaxed">
                    {exercise.description}
                  </p>
                </Section>
              )}

              <Section label={t("exerciseDrawer.personalBest")}>
                {loading ? (
                  <Placeholder />
                ) : stats?.personalBest ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Stat
                        value={`${formatWeight(stats.personalBest.weight, unit)} × ${stats.personalBest.reps}`}
                      />
                      <Stat
                        value={t("exerciseDrawer.estimatedOneRepMax", {
                          weight: formatWeight(
                            stats.personalBest.estimatedOneRepMax,
                            unit,
                          ),
                        })}
                      />
                    </div>
                    {stats.bestWeight !== null && (
                      <p className="text-xs text-lightGrey/50">
                        {t("exerciseDrawer.heaviestEver", {
                          weight: formatWeight(stats.bestWeight, unit),
                        })}
                      </p>
                    )}
                  </div>
                ) : (
                  <Empty text={t("exerciseDrawer.noPersonalBest")} />
                )}
              </Section>

              <Section label={t("exerciseDrawer.progression")}>
                {loading ? (
                  <Placeholder />
                ) : stats && stats.history.length > 0 ? (
                  <ExerciseProgressChart history={stats.history} />
                ) : (
                  <Empty text={t("exerciseDrawer.noProgression")} />
                )}
              </Section>

              <Section label={t("exerciseDrawer.lastPerformed")}>
                {loading ? (
                  <Placeholder />
                ) : stats?.lastPerformed ? (
                  <p className="text-sm text-lightGrey">
                    {formatDate(stats.lastPerformed, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                ) : (
                  <Empty text={t("exerciseDrawer.notPerformed")} />
                )}
              </Section>

              <Section label={t("exerciseDrawer.history")}>
                {loading ? (
                  <Placeholder />
                ) : stats && stats.history.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {/* Chart reads oldest-first; the log reads newest-first. */}
                    {[...stats.history].reverse().map((entry, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex items-baseline justify-between">
                          <p className="text-xs text-lightGrey/50">
                            {formatDate(entry.date, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] text-lightGrey/40">
                            {t("exerciseDrawer.volume", {
                              weight: formatWeight(entry.totalVolume, unit),
                            })}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          {entry.sets.map((set) => (
                            <p
                              key={set.setNumber}
                              className="text-sm text-lightGrey"
                            >
                              {t("exerciseDrawer.setNumber", {
                                number: set.setNumber,
                              })}{" "}
                              <span className="font-medium">
                                {t("exerciseDrawer.setDetail", {
                                  reps: set.reps,
                                  weight: formatWeight(set.weight, unit),
                                })}
                              </span>
                              {set.rpe !== null && (
                                <span className="text-lightGrey/40">
                                  {" "}
                                  {t("exerciseDrawer.rpe", { rpe: set.rpe })}
                                </span>
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty text={t("exerciseDrawer.noProgression")} />
                )}
              </Section>
            </div>

            <div className="flex gap-2 p-5 border-t border-mediumGrey">
              {isCustom ? (
                <>
                  <button
                    onClick={() => onEdit?.(exercise)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold bg-mediumGrey hover:bg-mediumGrey/70 transition-colors cursor-pointer"
                  >
                    <FiEdit2 size={14} />
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => onDelete?.(exercise)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                  >
                    <FiTrash2 size={14} />
                    {t("common.delete")}
                  </button>
                </>
              ) : (
                <p className="flex-1 text-center text-xs text-lightGrey/50 py-2.5">
                  {t("exerciseDrawer.catalogLocked")}
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
};

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <p className="text-xs uppercase tracking-wider text-lightGrey/50 font-semibold">
      {label}
    </p>
    {children}
  </div>
);

const Stat = ({ value }: { value: string }) => (
  <span className="text-sm font-semibold px-3 py-1.5 rounded-md bg-mediumGrey text-white">
    {value}
  </span>
);

const Empty = ({ text }: { text: string }) => (
  <p className="text-sm text-lightGrey/60 italic">{text}</p>
);

const Placeholder = () => (
  <div className="h-5 w-32 rounded bg-mediumGrey animate-pulse" />
);

export default ExerciseDrawer;
