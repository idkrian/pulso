import Skeleton from "@/components/ui/Skeleton";

const DayCardSkeleton = () => (
  <div className="flex flex-row overflow-hidden rounded-xl border-2 border-transparent bg-mediumGrey shadow-md xl:flex-col">
    <div className="flex w-16 shrink-0 flex-col justify-center gap-1.5 bg-darkGrey/50 px-3 py-2 xl:w-auto">
      <Skeleton className="h-3.5 w-10 bg-white/10" />
      <Skeleton className="h-3 w-6 bg-white/10" />
    </div>
    <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 xl:min-h-[140px]">
      <Skeleton className="h-7 w-full rounded-md" />
      <div className="grid grid-cols-2 gap-1.5">
        <Skeleton className="h-8 rounded-md" />
        <Skeleton className="h-8 rounded-md" />
      </div>
    </div>
  </div>
);

export default DayCardSkeleton;
