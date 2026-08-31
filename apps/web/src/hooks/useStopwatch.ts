import { useCallback, useEffect, useRef, useState } from "react";

export const useStopwatch = (autoStart = true) => {
  const [running, setRunning] = useState(autoStart);
  const [seconds, setSeconds] = useState(0);

  const startedAtRef = useRef<number | null>(autoStart ? Date.now() : null);
  const accumulatedRef = useRef(0);

  const elapsedMs = useCallback(
    () =>
      accumulatedRef.current +
      (startedAtRef.current === null ? 0 : Date.now() - startedAtRef.current),
    [],
  );

  const sync = useCallback(
    () => setSeconds(Math.floor(elapsedMs() / 1000)),
    [elapsedMs],
  );

  useEffect(() => {
    if (!running) return;

    sync();
    const id = window.setInterval(sync, 500);
    return () => window.clearInterval(id);
  }, [running, sync]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", sync);
    window.addEventListener("pageshow", sync);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, [sync]);

  const toggle = useCallback(() => {
    if (running) {
      accumulatedRef.current = elapsedMs();
      startedAtRef.current = null;
      setRunning(false);
      sync();
      return;
    }

    startedAtRef.current = Date.now();
    setRunning(true);
  }, [running, elapsedMs, sync]);

  const reset = useCallback(() => {
    accumulatedRef.current = 0;
    startedAtRef.current = Date.now();
    setRunning(true);
    setSeconds(0);
  }, []);

  return { seconds, running, toggle, reset };
};
