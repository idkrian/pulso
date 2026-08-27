import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TrainingSplitCard from "../components/TrainingSplitCard";
import Button from "@/components/ui/Button";
import { getTrainingSplitDays } from "@/api/training-split-day";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";
import { useSwapSplit } from "@/hooks/useSwapSplit";
import MuscleHeatmap from "@/components/analytics/MuscleHeatmap";
import PeriodSelector from "@/components/analytics/PeriodSelector";
import WorkoutStatsCards from "@/components/charts/WorkoutStatsCards";
import MuscleGroupRadarChart from "@/components/charts/MuscleGroupRadarChart";
import WorkoutFrequencyChart from "@/components/charts/WorkoutFrequencyChart";
import type { MuscleStatsPeriod } from "@/api/workout";
import { LuPencil } from "react-icons/lu";
import SwapSplitModal from "@/components/calendar/SwapSplitModal";
import { useFormatDate, useT } from "@/i18n";

const Dashboard = () => {
  const t = useT();
  const formatDate = useFormatDate();
  const [trainingSplitByDay, setTrainingSplitByDay] =
    useState<TrainingSplitDayMap>({});
  const [period, setPeriod] = useState<MuscleStatsPeriod>("week");
  const todayNumber = new Date().getDay();
  const navigate = useNavigate();
  const todayEntry = trainingSplitByDay[todayNumber];
  const todaySplit =
    todayEntry && !todayEntry.restDay ? todayEntry.trainingSplit : undefined;

  const refreshSchedule = () =>
    getTrainingSplitDays().then(setTrainingSplitByDay);

  const { swapTarget, openSwap, closeSwap, handleAssign, handleRemove } =
    useSwapSplit(refreshSchedule);

  useEffect(() => {
    refreshSchedule();
  }, []);

  const openTodaySwap = () =>
    openSwap({
      date: new Date(),
      dayName: formatDate(new Date(), { weekday: "long" }),
      dayNumber: todayNumber,
      entry: todayEntry,
    });

  return (
    <div className="flex w-full flex-col gap-3 lg:h-full lg:overflow-hidden">
      <WorkoutStatsCards />
      <div className="flex items-center justify-end">
        <PeriodSelector period={period} onChange={setPeriod} />
      </div>
      <div className="grid min-w-0 gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[300px_1fr_minmax(280px,320px)]">
        <div className="order-2 flex min-w-0 flex-col gap-3 lg:order-0 lg:min-h-0">
          <MuscleGroupRadarChart period={period} />
          <WorkoutFrequencyChart />
        </div>
        <div className="order-1 flex min-w-0 flex-col rounded-lg bg-mediumGrey p-3 lg:order-0 lg:min-h-0">
          <MuscleHeatmap period={period} />
        </div>
        <div className="order-3 flex min-w-0 flex-col gap-3 rounded-lg bg-mediumGrey p-3 lg:order-0 lg:min-h-0 lg:overflow-y-auto">
          {todaySplit ? (
            <>
              <p className="text-center text-lg font-semibold text-white">
                {t("dashboard.todaysTraining")}
              </p>
              <TrainingSplitCard
                fullHeight
                fullWidth
                split={todaySplit}
                hideActions
              />
              <div className="flex w-full gap-2">
                <Button
                  fullWidth
                  label={t("dashboard.startWorkout")}
                  onClick={() => navigate(`/workout/${todaySplit.id}`)}
                />
                <button
                  type="button"
                  onClick={openTodaySwap}
                  title={t("dashboard.editWorkout")}
                  aria-label={t("dashboard.editWorkout")}
                  className="flex items-center justify-center h-full w-12 shrink-0 rounded-md bg-darkGrey/60 hover:bg-darkGrey text-white/70 hover:text-white transition cursor-pointer"
                >
                  <LuPencil size={14} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <p className="text-5xl">🔋</p>
              <p className="text-2xl font-bold text-white">
                {t("common.restDay")}
              </p>
              <p className="text-sm font-medium text-lightGrey text-center">
                {t("dashboard.restDayHint")}
              </p>
            </div>
          )}
        </div>
      </div>

      {swapTarget && (
        <SwapSplitModal
          open
          date={swapTarget.date}
          dayName={swapTarget.dayName}
          currentEntry={swapTarget.entry}
          onClose={closeSwap}
          onAssign={handleAssign}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default Dashboard;
