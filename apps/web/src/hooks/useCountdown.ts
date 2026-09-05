import { useCallback, useEffect, useRef, useState } from "react";

export type CountdownSnapshot = {
  startedAt: number | null;
  remainingMs: number;
  totalSeconds: number;
};

const msLeft = ({ startedAt, remainingMs }: CountdownSnapshot) =>
  startedAt === null
    ? remainingMs
    : Math.max(0, remainingMs - (Date.now() - startedAt));

export const useCountdown = (
  defaultSeconds: number,
  initial?: CountdownSnapshot | null,
) => {
  const [snapshot, setSnapshot] = useState<CountdownSnapshot>(
    () =>
      initial ?? {
        startedAt: null,
        remainingMs: 0,
        totalSeconds: defaultSeconds,
      },
  );
  const [remaining, setRemaining] = useState(() =>
    Math.ceil(msLeft(snapshot) / 1000),
  );

  const snapshotRef = useRef(snapshot);
  const running = snapshot.startedAt !== null;

  const commit = useCallback((next: CountdownSnapshot) => {
    snapshotRef.current = next;
    setSnapshot(next);
  }, []);

  const sync = useCallback(() => {
    const current = snapshotRef.current;
    const left = msLeft(current);

    setRemaining(Math.ceil(left / 1000));

    if (left <= 0 && current.startedAt !== null) {
      commit({
        startedAt: null,
        remainingMs: 0,
        totalSeconds: current.totalSeconds,
      });
    }
  }, [commit]);

  useEffect(() => {
    sync();
    if (!running) return;

    const id = window.setInterval(sync, 250);
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

  const start = useCallback(
    (seconds: number) => {
      commit({
        startedAt: Date.now(),
        remainingMs: seconds * 1000,
        totalSeconds: seconds,
      });
      setRemaining(seconds);
    },
    [commit],
  );

  const toggle = useCallback(() => {
    const { startedAt, totalSeconds } = snapshotRef.current;
    const left = msLeft(snapshotRef.current);

    if (startedAt !== null) {
      commit({ startedAt: null, remainingMs: left, totalSeconds });
      setRemaining(Math.ceil(left / 1000));
      return;
    }

    if (left <= 0) {
      start(totalSeconds);
      return;
    }

    commit({ startedAt: Date.now(), remainingMs: left, totalSeconds });
  }, [commit, start]);

  const reset = useCallback(() => {
    commit({
      startedAt: null,
      remainingMs: 0,
      totalSeconds: snapshotRef.current.totalSeconds,
    });
    setRemaining(0);
  }, [commit]);

  return {
    remaining,
    total: snapshot.totalSeconds,
    running,
    snapshot,
    start,
    toggle,
    reset,
  };
};
