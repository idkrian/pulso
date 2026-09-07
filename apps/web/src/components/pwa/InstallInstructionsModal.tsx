import { LuShare, LuSquarePlus } from "react-icons/lu";
import Button from "@/components/ui/Button";
import { useT } from "@/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Step = ({
  index,
  text,
  icon,
}: {
  index: number;
  text: string;
  icon?: React.ReactNode;
}) => (
  <li className="flex items-center gap-3">
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-darkIndigo/40 text-xs font-bold text-lightIndigo">
      {index}
    </span>
    <span className="flex flex-1 items-center gap-2 text-sm text-lightGrey/80">
      {text}
      {icon}
    </span>
  </li>
);

const InstallInstructionsModal = ({ open, onClose }: Props) => {
  const t = useT();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-mediumGrey rounded-lg p-6 w-full max-w-96 shadow-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{t("pwa.howTo.title")}</h2>
          <p className="text-sm text-lightGrey/70">{t("pwa.howTo.ios.intro")}</p>

          <ol className="flex flex-col gap-3">
            <Step
              index={1}
              text={t("pwa.howTo.ios.step1")}
              icon={<LuShare className="shrink-0 text-lightIndigo" />}
            />
            <Step
              index={2}
              text={t("pwa.howTo.ios.step2")}
              icon={<LuSquarePlus className="shrink-0 text-lightIndigo" />}
            />
            <Step index={3} text={t("pwa.howTo.ios.step3")} />
          </ol>

          <Button fullWidth label={t("pwa.howTo.done")} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default InstallInstructionsModal;
