import { useState } from "react";
import { LuCheck, LuDownload } from "react-icons/lu";
import Button from "@/components/ui/Button";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useT } from "@/i18n";
import InstallInstructionsModal from "./InstallInstructionsModal";

const InstallAppCard = () => {
  const t = useT();
  const { platform, isStandalone, canInstall, promptInstall } = usePwaInstall();
  const [showHowTo, setShowHowTo] = useState(false);

  if (!isStandalone && !canInstall) return null;

  return (
    <>
      <div className="flex shrink-0 flex-col gap-3 rounded-lg bg-mediumGrey p-4">
        <p className="text-sm font-semibold text-white">{t("pwa.card.title")}</p>

        {isStandalone ? (
          <p className="flex items-center gap-2 text-xs text-lightGrey/60">
            <LuCheck className="text-emerald-400" size={14} />
            {t("pwa.card.installed")}
          </p>
        ) : (
          <>
            <p className="text-xs text-lightGrey/60">
              {t("pwa.card.description")}
            </p>
            <Button
              fullWidth
              label={
                <span className="flex items-center gap-2">
                  <LuDownload size={16} />
                  {t("pwa.card.install")}
                </span>
              }
              onClick={() => {
                if (platform === "prompt") promptInstall();
                else setShowHowTo(true);
              }}
            />
          </>
        )}
      </div>

      <InstallInstructionsModal
        open={showHowTo}
        onClose={() => setShowHowTo(false)}
      />
    </>
  );
};

export default InstallAppCard;
