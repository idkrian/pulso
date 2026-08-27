import { useEffect, useMemo, useState } from "react";
import { LuPlay, LuLogOut, LuCheck, LuX } from "react-icons/lu";
import { Link, NavLink, useLocation, useMatch } from "react-router";
import { getTrainingSplitDays } from "@/api/training-split-day";
import { getAllWorkouts } from "@/api/workout";
import type { TrainingSplitDayMap } from "@/dtos/training-split-day.dto";
import { useAuth } from "@/contexts/AuthContext";
import { useT, useWeekdayInitials } from "@/i18n";
import { completedWeekdays } from "@/utils/workout-history";
import Logo from "@/assets/icons/pulse-gradient.svg";
import { navItems } from "./nav-items";

type WeekCell = {
  letter: string;
  index: number;
  isTraining: boolean;
  isToday: boolean;
  isCompleted: boolean;
  isMissed: boolean;
};

const DayMarker = ({
  isCompleted,
  isMissed,
  isTraining,
}: Pick<WeekCell, "isCompleted" | "isMissed" | "isTraining">) => {
  if (isCompleted)
    return <LuCheck className="text-[11px] text-lightIndigo lg:text-[12px]" />;
  if (isMissed)
    return <LuX className="text-[10px] text-red-400/70 lg:text-[11px]" />;
  if (isTraining)
    return (
      <span className="size-1.5 rounded-full border border-lightIndigo/60" />
    );
  return <span className="size-1 rounded-full bg-lightGrey/20" />;
};

const WeekStrip = ({ cells }: { cells: WeekCell[] }) => {
  const t = useT();

  return (
    <div className="flex min-w-0 flex-1 justify-center gap-1 lg:flex-none lg:justify-start lg:gap-1.5">
      {cells.map(
        ({ letter, index, isTraining, isToday, isCompleted, isMissed }) => {
          let title = t("navbar.day.rest");
          if (isTraining) title = t("navbar.day.scheduled");
          if (isMissed) title = t("navbar.day.missed");
          if (isCompleted) title = t("navbar.day.trained");

          let letterClass = "text-lightGrey/35";
          if (isTraining) letterClass = "text-lightGrey/80";
          if (isToday) letterClass = "text-lightIndigo";

          return (
            <div
              key={index}
              title={isToday ? t("navbar.dayToday", { status: title }) : title}
              className="relative flex h-9 min-w-0 max-w-7 flex-1 flex-col items-center justify-center gap-1 lg:h-9.5 lg:w-7.5 lg:max-w-none"
            >
              <span
                className={`text-[11px] font-medium leading-none tracking-wider lg:text-[11.5px] ${letterClass}`}
              >
                {letter}
              </span>
              <span className="flex h-3 items-center justify-center">
                <DayMarker
                  isCompleted={isCompleted}
                  isMissed={isMissed}
                  isTraining={isTraining}
                />
              </span>
              {isToday && (
                <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-lightIndigo" />
              )}
            </div>
          );
        },
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const t = useT();
  const dayLetters = useWeekdayInitials();
  const [byDay, setByDay] = useState<TrainingSplitDayMap>({});
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      getTrainingSplitDays().then((days) => {
        if (!cancelled) setByDay(days);
      });
      getAllWorkouts().then((sessions) => {
        if (!cancelled) setCompletedDays(completedWeekdays(sessions));
      });
    };

    load();
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
    };
  }, [pathname]);

  const today = new Date().getDay();
  const todayEntry = byDay[today];
  const todaySplit =
    todayEntry && !todayEntry.restDay ? todayEntry.trainingSplit : undefined;

  const weekCells = useMemo<WeekCell[]>(
    () =>
      dayLetters.map((letter, index) => {
        const isTraining = Boolean(byDay[index] && !byDay[index].restDay);
        const isCompleted = completedDays.has(index);
        return {
          letter,
          index,
          isTraining,
          isCompleted,
          isToday: index === today,
          isMissed: isTraining && !isCompleted && index < today,
        };
      }),
    [byDay, completedDays, dayLetters, today],
  );

  const logoutTitle = user
    ? t("navbar.logoutAs", { name: user.name })
    : t("navbar.logout");
  const isWorkoutInProgress = Boolean(useMatch("/workout/:splitId"));

  return (
    <>
      <header className="flex shrink-0 flex-col gap-3 border-b border-mediumGrey pb-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="relative flex shrink-0 items-center">
            <div className="absolute inset-0 rounded-xl bg-indigo/40 blur-xl" />
            <img src={Logo} alt="Pulso" className="relative size-9" />
          </Link>

          <WeekStrip cells={weekCells} />

          <button
            onClick={logout}
            title={logoutTitle}
            aria-label={logoutTitle}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-mediumGrey text-lightGrey/50 transition-colors active:border-red-500/40 active:text-red-400"
          >
            <LuLogOut size={16} />
          </button>
        </div>

        {isWorkoutInProgress ? null : todaySplit ? (
          <Link
            to={`/workout/${todaySplit.id}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-indigo/40 bg-indigo/15 px-3 py-2.5"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-[10px] uppercase tracking-wider text-lightGrey/50">
                {t("common.today")}
              </span>
              <span className="truncate text-sm font-semibold text-lightIndigo">
                {todaySplit.title}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-indigo px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              <LuPlay size={11} />
              {t("navbar.start")}
            </span>
          </Link>
        ) : (
          <div className="rounded-lg border border-mediumGrey px-3 py-2 text-center text-xs uppercase tracking-wider text-lightGrey/50">
            {t("common.restDay")}
          </div>
        )}
      </header>

      <header className="hidden shrink-0 items-center justify-between gap-6 border-b border-mediumGrey pb-4 lg:flex">
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-indigo/40 blur-xl transition group-hover:bg-indigo/60" />
            <img src={Logo} alt="Pulso" className="size-12" />
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map(({ to, labelKey, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex items-center gap-2 py-1 transition-colors ${
                  isActive
                    ? "text-lightIndigo"
                    : "text-lightGrey/50 hover:text-lightGrey"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {t(labelKey)}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-px bg-lightIndigo transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <WeekStrip cells={weekCells} />

            {isWorkoutInProgress ? null : todaySplit ? (
              <Link
                to={`/workout/${todaySplit.id}`}
                className="group flex items-center gap-2 text-xs"
              >
                <span className="uppercase tracking-wider text-lightGrey/50">
                  {t("common.today")}
                </span>
                <span className="font-semibold text-lightIndigo">
                  {todaySplit.title}
                </span>
                <span className="flex items-center gap-1 rounded-md border border-indigo/40 bg-indigo/20 px-2 py-0.5 text-lightIndigo transition group-hover:bg-indigo group-hover:text-white">
                  <LuPlay size={10} />
                  {t("navbar.start")}
                </span>
              </Link>
            ) : (
              <span className="text-xs uppercase tracking-wider text-lightGrey/50">
                {t("common.restDay")}
              </span>
            )}
          </div>

          <button
            onClick={logout}
            title={logoutTitle}
            aria-label={logoutTitle}
            className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-mediumGrey text-lightGrey/50 transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <LuLogOut
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
