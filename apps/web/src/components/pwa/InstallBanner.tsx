import { useEffect, useState } from "react";
import { LuDownload, LuX } from "react-icons/lu";
import { useMatch } from "react-router";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import {
  readInstallPrompt,
  saveInstallDismissal,
  shouldShowInstallBanner,
} from "@/utils/install-prompt";
import { useT } from "@/i18n";
import AppIcon from "@/assets/icons/icon-gradient.svg";
import InstallInstructionsModal from "./InstallInstructionsModal";

const InstallBanner = () => {
  const t = useT();
  const { platform, canInstall, promptInstall } = usePwaInstall();
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const inWorkout = Boolean(useMatch("/workout/:splitId"));

  useEffect(() => {
    setAllowed(shouldShowInstallBanner(readInstallPrompt()));
  }, []);

  const shown = allowed && canInstall && !inWorkout;

  useEffect(() => {
    if (!shown) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, [shown]);

  const dismiss = () => {
    saveInstallDismissal(readInstallPrompt());
    setAllowed(false);
  };

  const install = async () => {
    if (platform === "prompt") {
      const accepted = await promptInstall();
      if (!accepted) dismiss();
      return;
    }

    setShowHowTo(true);
  };

  if (!shown) return null;

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-45 px-4 transition-all duration-500 lg:bottom-6 lg:left-auto lg:right-6 lg:w-96 lg:px-0 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl border border-indigo/40 bg-mediumGrey p-3 shadow-lg shadow-black/40">
          <img src={AppIcon} alt="" className="size-11 shrink-0 rounded-lg" />

          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-semibold text-white">
              {t("pwa.banner.title")}
            </p>
            <p className="text-xs leading-snug text-lightGrey/60">
              {t("pwa.banner.description")}
            </p>
          </div>

          <button
            onClick={install}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-indigo px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-darkIndigo"
          >
            <LuDownload size={14} />
            {t("pwa.banner.install")}
          </button>

          <button
            onClick={dismiss}
            title={t("pwa.banner.later")}
            aria-label={t("pwa.banner.dismiss")}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-lightGrey/40 transition-colors hover:text-lightGrey"
          >
            <LuX size={16} />
          </button>
        </div>
      </div>

      <InstallInstructionsModal
        open={showHowTo}
        onClose={() => {
          setShowHowTo(false);
          dismiss();
        }}
      />
    </>
  );
};

export default InstallBanner;
