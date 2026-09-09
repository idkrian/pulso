import Skeleton from "@/components/ui/Skeleton";

const MonthGridSkeleton = () => (
  <div className="flex min-w-0 flex-col gap-1.5 xl:h-full">
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {Array.from({ length: 7 }, (_, i) => (
        <Skeleton key={i} className="mx-auto h-3 w-6 bg-white/10" />
      ))}
    </div>
    <div className="grid grid-cols-7 gap-1 sm:gap-2 xl:min-h-0 xl:flex-1 xl:auto-rows-fr">
      {Array.from({ length: 35 }, (_, i) => (
        <Skeleton key={i} className="min-h-16 rounded-lg sm:min-h-24" />
      ))}
    </div>
  </div>
);

export default MonthGridSkeleton;
