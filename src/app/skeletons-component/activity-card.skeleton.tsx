import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonActivityCardProps {
  withStyledConfig?: boolean;
  useMobileHeight?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
}

export function ActivityCardSkeleton({
  withStyledConfig = false,
  useMobileHeight = true,
  showDescription = true,
  showTags = true,
}: SkeletonActivityCardProps) {
  return (
    <Card
      className={`flex flex-col ${
        !withStyledConfig
          ? useMobileHeight == false
            ? "max-h-[400px] h-[400px]"
            : "max-h-[400px] h-[250px] md:h-[400px]"
          : "max-h-[400px] h-[250px] md:h-[400px]"
      }`}
    >
      {/* Bagian Gambar */}
      <div className="relative w-full">
        <Skeleton
          className={`rounded-t-lg w-full ${
            !withStyledConfig
              ? useMobileHeight == false
                ? "h-[200px] max-h-[200px]"
                : "h-[120px] md:h-[200px] max-h-[120px] md:max-h-[200px]"
              : "h-[120px] md:h-[200px] max-h-[120px] md:max-h-[200px]"
          }`}
        />
      </div>

      <CardContent className="flex flex-col h-full p-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded-md" />

        {/* Description */}
        {showDescription && <Skeleton className="mt-2 h-4 w-full rounded-md" />}

        {/* Tag Popular */}
        {showTags && (
          <div
            className={`${
              !withStyledConfig
                ? "flex gap-2 mt-3"
                : "hidden md:flex gap-2 mt-3"
            }`}
          >
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-lg" />
          </div>
        )}

        {/* Rating dan Total Booking */}
        <div className="flex items-center gap-1 mt-2 w-full">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-8 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* From Price */}
        <div className="mt-auto hidden md:block pt-4">
          <Skeleton className="h-6 w-1/2 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
