import { LuRotateCw } from "react-icons/lu";

type Props = {
  size?: number;
};

const Spinner = ({ size = 36 }: Props) => (
  <LuRotateCw size={size} className="animate-spin text-indigo" />
);

export default Spinner;
