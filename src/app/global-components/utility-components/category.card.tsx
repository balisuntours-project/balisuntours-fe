import { ActivityBestCategory } from "@/app/response/activity.response";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ActivityTitleCard } from "./activity-title.card";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { BestCategoryActivityDrawer } from "./best-category-activity.drawer";

export function BestCategoryCard({category, useMobileHeight} : {category: ActivityBestCategory, useMobileHeight?: boolean}) {
    return (
        <Card className={`flex flex-col max-h-[400px] ${useMobileHeight ? 'h-[250px]' : 'h-[400px]'}`}>
        {/* Bagian Gambar */}
        <div className={`relative w-full ${useMobileHeight ? 'h-[200px]' : 'h-[400px]'}`}>
          <Image
            src={category.image}
            alt={category.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
  
        <CardContent className="flex flex-col h-full p-4">
          {/* Title */}
            <ActivityTitleCard title={category.title} />

          {/* Description */}
         

              {/* Tag Popular */}
      

          {/* Rating dan Total Booking */}
        
          {/* Spacer */}
          <div className="flex-grow"></div>
          {/* From Price */}
          <BestCategoryActivityDrawer />
        </CardContent>
      </Card>
    )
}