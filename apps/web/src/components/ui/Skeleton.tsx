import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => (
  <span className={cn("block animate-pulse rounded bg-darkGrey", className)} />
);

export default Skeleton;
