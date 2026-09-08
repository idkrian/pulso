import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getTrainingSplitDays } from "@/api/training-split-day";
import { getAllWorkouts } from "@/api/workout";
import { useSwapSplit } from "@/hooks/useSwapSplit";
import { useToday } from "@/hooks/useToday";
import type {
  TrainingSplitDayEntry,
  TrainingSplitDayMap,
} from "@/dtos/training-split-day.dto";
import type { WorkoutSessionDto } from "@/dtos/workout-session.dto";
import {
  getMonthAnchor,
  getMonthGrid,
  getWeekDays,
  isSameDay,
  startOfDay,
  weekRangeParts,
} from "@/utils";
import { useDateLocale, useFormatDate, useT } from "@/i18n";
import {
  computeStreak,
  findSessionOnDate,
  sessionVolume,
  sessionsInRange,
} from "@/utils/workout-history";
import CalendarLeftPanel from "@/components/calendar/CalendarLeftPanel";
import CalendarNavigator, {
  type CalendarView,
} from "@/components/calendar/CalendarNavigator";
import DayCard, { type DayStatus } from "@/components/calendar/DayCard";
import DayCardSkeleton from "@/components/calendar/DayCardSkeleton";
import MonthGrid from "@/components/calendar/MonthGrid";
import MonthGridSkeleton from "@/components/calendar/MonthGridSkeleton";
import SessionDetailModal from "@/components/calendar/SessionDetailModal";
import SwapSplitModal from "@/components/calendar/SwapSplitModal";

const VIEW_STORAGE_KEY = "pulso:calendar-view";

const readStoredView = (): CalendarView => {
  try {
    return localStorage.getItem(VIEW_STORAGE_KEY) === "month"
      ? "month"
      : "week";
  } catch {
    return "week";
  }
};

const Calendar = () => {
  const navigate = useNavigate();
  const t = useT();
  const formatDate = useFormatDate();
  const dateLocale = useDateLocale();
  const [view, setView] = useState<CalendarView>(readStoredView);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [splitsByDay, setSplitsByDay] = useState<TrainingSplitDayMap>({});
  const [sessions, setSessions] = useState<WorkoutSessionDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [openSession, setOpenSession] = useState<WorkoutSessionDto | null>(
    null,
  );

  const refreshSchedule = () =>
    getTrainingSplitDays()
      .then(setSplitsByDay)
      .catch(() => {});
  const refreshSessions = () =>
    getAllWorkouts()
      .then(setSessions)
      .catch(() => {});

  const { swapTarget, openSwap, closeSwap, handleAssign, handleRemove } =
    useSwapSplit(refreshSchedule);

  useEffect(() => {
    Promise.all([refreshSchedule(), refreshSessions()]).finally(() =>
      setLoading(false),
    );
    const onFocus = () => refreshSessions();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const now = useToday();
  const isMonth = view === "month";
  const offset = isMonth ? monthOffset : weekOffset;

  const week = useMemo(
    () => getWeekDays(weekOffset, dateLocale, now),
    [weekOffset, dateLocale, now],
  );
  const monthDays = useMemo(
    () => getMonthGrid(monthOffset, dateLocale, now),
    [monthOffset, dateLocale, now],
  );
  const monthAnchor = useMemo(
    () => getMonthAnchor(monthOffset, now),
    [monthOffset, now],
  );

  const today = useMemo(() => startOfDay(now), [now]);
  const todayDayNumber = now.getDay();
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

  const navigatorLabel = isMonth
    ? formatDate(monthAnchor, { month: "long", year: "numeric" })
    : weekRangeLabel;

  const { rangeStart, rangeEnd } = useMemo(() => {
    if (isMonth) {
      const end = new Date(
        monthAnchor.getFullYear(),
        monthAnchor.getMonth() + 1,
        0,
      );
      end.setHours(23, 59, 59, 999);
      return { rangeStart: startOfDay(monthAnchor), rangeEnd: end };
    }

    const end = new Date(week[6].date);
    end.setHours(23, 59, 59, 999);
    return { rangeStart: startOfDay(week[0].date), rangeEnd: end };
  }, [isMonth, monthAnchor, week]);

  const rangeSessions = useMemo(
    () => sessionsInRange(sessions, rangeStart, rangeEnd),
    [sessions, rangeStart, rangeEnd],
  );

  const rangeVolume = useMemo(
    () => rangeSessions.reduce((a, s) => a + sessionVolume(s), 0),
    [rangeSessions],
  );

  const sessionsPlanned = useMemo(() => {
    const days = isMonth ? monthDays.filter((d) => d.inMonth) : week;
    return days.filter((d) => {
      const entry = splitsByDay[d.dayNumber];
      return entry && !entry.restDay;
    }).length;
  }, [isMonth, monthDays, week, splitsByDay]);

  const sessionsCompleted = rangeSessions.length;
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

  const shiftPeriod = (direction: number) => {
    if (isMonth) setMonthOffset((o) => o + direction);
    else setWeekOffset((o) => o + direction);
  };

  const goToToday = () => {
    setMonthOffset(0);
    setWeekOffset(0);
  };

  const changeView = (next: CalendarView) => {
    setView(next);
    goToToday();
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, next);
    } catch {
      /* empty */
    }
  };

  return (
    <div className="flex w-full flex-col xl:h-full xl:flex-row">
      <CalendarLeftPanel
        loading={loading}
        todayEntry={todayEntry}
        todaySession={todaySession}
        periodLabel={t(isMonth ? "calendar.thisMonth" : "calendar.thisWeek")}
        periodVolume={rangeVolume}
        sessionsCompleted={sessionsCompleted}
        sessionsPlanned={sessionsPlanned}
        streak={streak}
        onStartWorkout={startTodayWorkout}
      />

      <div className="flex w-full min-w-0 flex-col gap-3 p-3 xl:h-full xl:w-[75%] xl:min-h-0 xl:gap-4 xl:p-4">
        <CalendarNavigator
          label={navigatorLabel}
          view={view}
          isCurrentPeriod={offset === 0}
          onPrev={() => shiftPeriod(-1)}
          onNext={() => shiftPeriod(1)}
          onToday={goToToday}
          onViewChange={changeView}
        />

        <div className="min-w-0 xl:flex-1 xl:min-h-0 xl:overflow-y-auto">
          {isMonth ? (
            loading ? (
              <MonthGridSkeleton />
            ) : (
              <MonthGrid
                days={monthDays}
                splitsByDay={splitsByDay}
                sessions={sessions}
                statusOf={dayStatus}
                onSelect={handleDayClick}
              />
            )
          ) : (
            <div className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-7 xl:gap-3">
              {loading &&
                week.map((day) => (
                  <DayCardSkeleton key={day.date.toISOString()} />
                ))}
              {!loading &&
                week.map((day) => {
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
          )}
        </div>
      </div>

      <SessionDetailModal
        open={openSession !== null}
        session={openSession}
        sessions={sessions}
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
