import Skeleton from "@/components/ui/Skeleton";

const ExerciseCardSkeleton = () => (
  <div className="flex flex-col gap-2 rounded-xl border border-transparent bg-mediumGrey p-3 sm:gap-3 sm:p-4">
    <div className="flex items-center gap-2 sm:items-start sm:gap-3">
      <Skeleton className="h-9 w-9 shrink-0 rounded-lg sm:h-10 sm:w-10" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="hidden h-3 w-1/2 sm:block" />
      </div>
    </div>
    <Skeleton className="h-5 w-20 rounded-md sm:h-6" />
  </div>
);

export default ExerciseCardSkeleton;
