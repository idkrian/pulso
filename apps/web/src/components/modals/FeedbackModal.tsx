import type { ReactNode } from "react";
import { GrClose } from "react-icons/gr";
import { ImCheckmark } from "react-icons/im";
import { useT } from "@/i18n";

type Props = {
  open: boolean;
  status: "success" | "error";
  children?: ReactNode;
  onClose?: () => void;
  description: string;
};

const FeedbackModal = ({
  open,
  status,
  children,
  onClose,
  description,
}: Props) => {
  const t = useT();

  if (!open) return null;

  const titles = {
    success: {
      title: t("feedbackModal.success"),
      description,
      color: "green",
      icon: <ImCheckmark color="green" size={40} />,
    },
    error: {
      title: t("feedbackModal.error"),
      description,
      color: "red",
      icon: <GrClose color="red" size={40} />,
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-mediumGrey rounded-lg p-6 w-80 shadow-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          {titles[status].icon}
          <h2 className="text-3xl font-bold">{titles[status].title}</h2>
          <p className="text-md">{titles[status].description}</p>
          <p>{children}</p>
          {onClose && (
            <button
              className="w-full rounded bg-indigo px-3 py-2 text-sm font-semibold cursor-pointer"
              onClick={onClose}
            >
              {t("feedbackModal.ok")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
