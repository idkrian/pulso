import { useCallback, useEffect, useRef, useState } from "react";

export type InstallPlatform = "prompt" | "ios" | "unsupported";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const isIosDevice = () => {
  const ua = navigator.userAgent;
  const iPadOs = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/.test(ua) || iPadOs;
};

const isRunningStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.matchMedia("(display-mode: window-controls-overlay)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

export const usePwaInstall = () => {
  const deferred = useRef<BeforeInstallPromptEvent | null>(null);
  const [installable, setInstallable] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(isRunningStandalone);
  const [isIos] = useState(isIosDevice);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferred.current = event as BeforeInstallPromptEvent;
      setInstallable(true);
    };

    const onInstalled = () => {
      deferred.current = null;
      setInstallable(false);
      setInstalled(true);
    };

    const media = window.matchMedia("(display-mode: standalone)");
    const onDisplayModeChange = () => setIsStandalone(isRunningStandalone());

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    media.addEventListener("change", onDisplayModeChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      media.removeEventListener("change", onDisplayModeChange);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const event = deferred.current;
    if (!event) return false;

    deferred.current = null;
    setInstallable(false);

    const { outcome } = await event.prompt().then(() => event.userChoice);
    return outcome === "accepted";
  }, []);

  let platform: InstallPlatform = "unsupported";
  if (installable) platform = "prompt";
  else if (isIos) platform = "ios";

  return {
    platform,
    isStandalone,
    canInstall: !isStandalone && !installed && platform !== "unsupported",
    promptInstall,
  };
};
