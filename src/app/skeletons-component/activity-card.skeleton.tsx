import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ActivityCardSkeleton: FC<{ useMobileHeight?: boolean }> = ({ useMobileHeight = false }) => {
  return (
    <Card className={`flex flex-col max-h-[400px] h-[250px] md:h-[400px]`}>
       
              {/* Bagian Gambar */}
              <div className={`relative w-full h-[250px] md:h-[400px] `}>
        <Skeleton className="w-full h-full rounded-t-lg" />
      </div>

      <CardContent className="flex flex-col h-full p-4">
        {/* Title */}
        <Skeleton className="w-3/4 h-2 md:h-6 mb-2" />

        {/* Description */}
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-5/6 h-4 mb-4" />

        {/* Tags */}
        <div className="hidden md:flex gap-2">
          <Skeleton className="w-16 h-6 rounded-lg" />
          <Skeleton className="w-20 h-6 rounded-lg" />
        </div>

        {/* Rating dan Total Booking */}
        <div className="flex items-center gap-1 mt-4">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* From Price */}
        <Skeleton className="w-1/2 h-6 mt-auto pt-4" />
      </CardContent>
    </Card>
  );
};

export default ActivityCardSkeleton;
