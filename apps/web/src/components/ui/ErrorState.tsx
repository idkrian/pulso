import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
};

const ErrorState = ({ icon, title, description, children }: Props) => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-12 text-center text-white">
    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-mediumGrey">
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-lightGrey/60">{description}</p>
    </div>
    {children && (
      <div className="flex flex-wrap items-center justify-center gap-2">
        {children}
      </div>
    )}
  </div>
);

export default ErrorState;
