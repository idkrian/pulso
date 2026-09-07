import { LuRefreshCw } from "react-icons/lu";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useT } from "@/i18n";

const UpdateToast = () => {
  const t = useT();
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  return (
    <div
      className={`fixed top-4 left-1/2 z-70 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 transition-all duration-500 lg:top-12 ${
        needRefresh
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 rounded-full bg-indigo py-2 pl-5 pr-2 shadow-lg shadow-indigo/40">
        <span className="text-sm font-semibold text-white">
          {t("pwa.update.message")}
        </span>
        <button
          onClick={() => updateServiceWorker(true)}
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/25"
        >
          <LuRefreshCw size={13} />
          {t("pwa.update.action")}
        </button>
      </div>
    </div>
  );
};

export default UpdateToast;
