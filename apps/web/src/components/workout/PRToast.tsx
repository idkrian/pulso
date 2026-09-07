import { LuFlame } from "react-icons/lu";

type Props = {
  message: string | null;
};

const PRToast = ({ message }: Props) => (
  <div
    className={`fixed top-[calc(1rem+env(safe-area-inset-top))] left-1/2 z-70 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 transition-all duration-500 lg:top-12 ${
      message
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4 pointer-events-none"
    }`}
  >
    <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-linear-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-500/40">
      <LuFlame size={20} />
      <span className="font-semibold">{message}</span>
    </div>
  </div>
);

export default PRToast;
