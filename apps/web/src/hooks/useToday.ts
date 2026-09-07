import { useEffect, useState } from "react";
import { dayKey } from "@/utils/date";

const msUntilNextDay = (): number => {
  const next = new Date();
  next.setHours(24, 0, 0, 0);
  return Math.max(1000, next.getTime() - Date.now());
};

export const useToday = (): Date => {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    let timeoutId = 0;

    const sync = () => {
      setToday((current) =>
        dayKey(new Date()) === dayKey(current) ? current : new Date(),
      );
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(sync, msUntilNextDay());
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };

    timeoutId = window.setTimeout(sync, msUntilNextDay());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", sync);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return today;
};
