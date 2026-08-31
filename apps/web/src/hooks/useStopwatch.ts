import { useCallback, useEffect, useRef, useState } from "react";

export type StopwatchSnapshot = {
  startedAt: number | null;
  accumulatedMs: number;
};

export const useStopwatch = (initial?: StopwatchSnapshot | null) => {
  const [snapshot, setSnapshot] = useState<StopwatchSnapshot>(
    () => initial ?? { startedAt: Date.now(), accumulatedMs: 0 },
  );
  const [seconds, setSeconds] = useState(0);

  const snapshotRef = useRef(snapshot);
  const running = snapshot.startedAt !== null;

  const commit = useCallback((next: StopwatchSnapshot) => {
    snapshotRef.current = next;
    setSnapshot(next);
  }, []);

  const elapsedMs = useCallback(() => {
    const { startedAt, accumulatedMs } = snapshotRef.current;
    return accumulatedMs + (startedAt === null ? 0 : Date.now() - startedAt);
  }, []);

  const sync = useCallback(
    () => setSeconds(Math.floor(elapsedMs() / 1000)),
    [elapsedMs],
  );

  useEffect(() => {
    sync();
    if (!running) return;

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
      commit({ startedAt: null, accumulatedMs: elapsedMs() });
      sync();
      return;
    }

    commit({
      startedAt: Date.now(),
      accumulatedMs: snapshotRef.current.accumulatedMs,
    });
  }, [running, commit, elapsedMs, sync]);

  const reset = useCallback(() => {
    commit({ startedAt: Date.now(), accumulatedMs: 0 });
    setSeconds(0);
  }, [commit]);

  return { seconds, running, snapshot, toggle, reset };
};
