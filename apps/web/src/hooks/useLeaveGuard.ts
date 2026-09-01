import { useCallback, useEffect, useRef } from "react";
import { useBlocker } from "react-router";

export const useLeaveGuard = (enabled: boolean) => {
  const bypass = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: BeforeUnloadEvent) => {
      if (bypass.current) return;
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [enabled]);

  const blocker = useBlocker(
    useCallback(() => enabled && !bypass.current, [enabled]),
  );

  const release = useCallback(() => {
    bypass.current = true;
  }, []);

  return {
    blocked: blocker.state === "blocked",
    confirmLeave: () => blocker.proceed?.(),
    cancelLeave: () => blocker.reset?.(),
    release,
  };
};
