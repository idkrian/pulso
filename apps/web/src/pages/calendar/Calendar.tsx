import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getTrainingSplitDays } from "@/api/training-split-day";
import { getAllWorkouts } from "@/api/workout";
import { useSwapSplit } from "@/hooks/useSwapSplit";
import type {
  TrainingSplitDayEntry,
  TrainingSplitDayMap,
} from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import { getWeekDays, isSameDay, startOfDay, weekRangeParts } from "@/utils";
import { useDateLocale, useT } from "@/i18n";
import {
  computeStreak,
  findSessionOnDate,
  sessionVolume,
  sessionsInRange,
} from "@/utils/workout-history";
import CalendarLeftPanel from "@/components/calendar/CalendarLeftPanel";
import WeekNavigator from "@/components/calendar/WeekNavigator";
import DayCard, { type DayStatus } from "@/components/calendar/DayCard";
import SessionDetailModal from "@/components/calendar/SessionDetailModal";
import SwapSplitModal from "@/components/calendar/SwapSplitModal";

const Calendar = () => {
  const navigate = useNavigate();
  const t = useT();
  const dateLocale = useDateLocale();
  const [weekOffset, setWeekOffset] = useState(0);
  const [splitsByDay, setSplitsByDay] = useState<TrainingSplitDayMap>({});
  const [sessions, setSessions] = useState<WorkoutSessionDto[]>([]);

  const [openSession, setOpenSession] = useState<WorkoutSessionDto | null>(
    null,
  );

  const refreshSchedule = () => getTrainingSplitDays().then(setSplitsByDay);
  const refreshSessions = () => getAllWorkouts().then(setSessions);

  const { swapTarget, openSwap, closeSwap, handleAssign, handleRemove } =
    useSwapSplit(refreshSchedule);

  useEffect(() => {
    refreshSchedule();
    refreshSessions();
    const onFocus = () => refreshSessions();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const week = useMemo(
    () => getWeekDays(weekOffset, dateLocale),
    [weekOffset, dateLocale],
  );
  const today = useMemo(() => startOfDay(new Date()), []);
  const todayDayNumber = new Date().getDay();
  const todayEntry = splitsByDay[todayDayNumber];
  const todaySession = useMemo(
    () => findSessionOnDate(sessions, today),
    [sessions, today],
  );

  const weekRangeLabel = useMemo(() => {
    const parts = weekRangeParts(week, dateLocale);
    if (!parts) return "";
    const { sameMonth, ...values } = parts;
    return sameMonth
      ? t("calendar.weekRange", values)
      : t("calendar.weekRangeCrossMonth", values);
  }, [week, dateLocale, t]);

  const { weekStart, weekEnd } = useMemo(() => {
    const start = startOfDay(week[0].date);
    const end = new Date(week[6].date);
    end.setHours(23, 59, 59, 999);
    return { weekStart: start, weekEnd: end };
  }, [week]);

  const weekSessions = useMemo(
    () => sessionsInRange(sessions, weekStart, weekEnd),
    [sessions, weekStart, weekEnd],
  );

  const weekVolume = useMemo(
    () => weekSessions.reduce((a, s) => a + sessionVolume(s), 0),
    [weekSessions],
  );

  const sessionsPlanned = useMemo(
    () =>
      week.filter((d) => {
        const entry = splitsByDay[d.dayNumber];
        return entry && !entry.restDay;
      }).length,
    [week, splitsByDay],
  );

  const sessionsCompleted = weekSessions.length;
  const streak = useMemo(() => computeStreak(sessions), [sessions]);

  const dayStatus = (date: Date, entry?: TrainingSplitDayEntry): DayStatus => {
    const dayStart = startOfDay(date);
    const isToday = isSameDay(dayStart, today);
    const isPast = dayStart.getTime() < today.getTime();
    const session = findSessionOnDate(sessions, dayStart);

    if (session) return "completed";
    if (entry?.restDay) return "rest";
    if (!entry) return isToday ? "today" : "empty";
    if (isToday) return "today";
    if (isPast) return "missed";
    return "upcoming";
  };

  const handleDayClick = (
    date: Date,
    dayName: string,
    dayNumber: number,
    entry: TrainingSplitDayEntry | undefined,
    session: WorkoutSessionDto | undefined,
    status: DayStatus,
  ) => {
    if (session) {
      setOpenSession(session);
      return;
    }
    if (status === "today" && entry && !entry.restDay) {
      navigate(`/workout/${entry.trainingSplit.id}`);
      return;
    }
    openSwap({ date, dayName, dayNumber, entry });
  };

  const startTodayWorkout = () => {
    if (todayEntry && !todayEntry.restDay) {
      navigate(`/workout/${todayEntry.trainingSplit.id}`);
    }
  };

  return (
    <div className="flex w-full flex-col xl:h-full xl:flex-row">
      <CalendarLeftPanel
        todayEntry={todayEntry}
        todaySession={todaySession}
        weekVolume={weekVolume}
        sessionsCompleted={sessionsCompleted}
        sessionsPlanned={sessionsPlanned}
        streak={streak}
        onStartWorkout={startTodayWorkout}
      />

      <div className="flex w-full min-w-0 flex-col gap-3 p-3 xl:h-full xl:w-[75%] xl:min-h-0 xl:gap-4 xl:p-4">
        <WeekNavigator
          label={weekRangeLabel}
          onPrev={() => setWeekOffset((o) => o - 1)}
          onNext={() => setWeekOffset((o) => o + 1)}
        />

        <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-7 xl:gap-3 xl:flex-1 xl:min-h-0 xl:overflow-y-auto">
          {week.map((day) => {
            const entry = splitsByDay[day.dayNumber];
            const session = findSessionOnDate(sessions, day.date);
            const status = dayStatus(day.date, entry);
            return (
              <DayCard
                key={day.date.toISOString()}
                date={day.date}
                dayName={day.dayName}
                dayLabel={day.day}
                status={status}
                entry={entry}
                session={session}
                onClick={() =>
                  handleDayClick(
                    day.date,
                    day.dayName,
                    day.dayNumber,
                    entry,
                    session,
                    status,
                  )
                }
                onEdit={() =>
                  openSwap({
                    date: day.date,
                    dayName: day.dayName,
                    dayNumber: day.dayNumber,
                    entry,
                  })
                }
              />
            );
          })}
        </div>
      </div>

      <SessionDetailModal
        open={openSession !== null}
        session={openSession}
        onClose={() => setOpenSession(null)}
      />

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

export default Calendar;
