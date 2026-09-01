import { LuRotateCw } from "react-icons/lu";

interface ButtonProps {
  label: string | React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  color?: "error" | "alert";
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  label,
  onClick,
  loading,
  color,
  fullWidth,
  disabled,
}: ButtonProps) => {
  const colorClasses = {
    error: "bg-red-500 hover:bg-red-600",
    alert: "bg-yellow-500 hover:bg-yellow-600",
  };

  const defaultClasses = "bg-indigo hover:bg-darkIndigo";
  const colorClass = color ? colorClasses[color] : defaultClasses;
  const fullWidthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`flex px-3 justify-center items-center cursor-pointer min-w-24 h-10 text-center text-white font-semibold ${colorClass} ${fullWidthClass} rounded-md transform-gpu will-change-transform transition duration-300 ease-in-out hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:brightness-100`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="w-full h-full flex justify-center items-center">
        {loading ? (
          <LuRotateCw size={24} className="rotate animate-spin" />
        ) : (
          label
        )}
      </div>
    </button>
  );
};

export default Button;
