
import { ActivityCardProps, ActivityTags } from "@/app/paramater/activity.paramater";
import { Activity } from "@/app/response/activity.response";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalUtility } from "@/lib/global.utility";
import { Star } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { ActivityTitleCard } from "./activity-title.card";
import { useRouter } from "next/navigation";
import Link from "next/link";


const ActivityBestCategoryCard: FC<ActivityCardProps> = ({ activity, tags, useMobileHeight, showDesciption, showTags = true }) => {
  return (
    <Link href={`${process.env.BACKEND_DOMAIN}/customer/preview/activity/${activity.slug}`} target="__blank">
        <Card className={`flex flex-col w-full max-w-[250px] md:max-h-[300px] h-[200px] md:h-[300px]`}>
        {/* Bagian Gambar */}
        <div className={`relative w-full h-[100px] md:h-[150px] lg:h-[130px]`}>
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            objectFit="cover"
            quality={100}
            className="rounded-t-lg"
          />
        </div>
  
        <CardContent className="flex flex-col h-[110px] md:h-[150px] lg:h-[200px] p-2 md:p-4 text-start">
          {/* Title */}
            <ActivityTitleCard title={activity.title} customSizeText="text-xs md:text-base" />

          {/* Description */}
          {showDesciption && <p className="text-sm mt-2">{showDesciption}</p>}

              {/* Tag Popular */}
              <div className="hidden md:flex gap-2">
        <div className="mt-1 inline-block bg-red-300 text-white text-[7px] md:text-[8px] font-normal py-1 px-2 rounded-lg">
          {tags.first_tag}
        </div>
        <div className="mt-1 inline-block bg-red-300 text-white text-[7px] md:text-[8px] font-normal py-1 px-2 rounded-lg">
         {tags.second_tag}
        </div>
        </div>

          {/* Rating dan Total Booking */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="text-yellow-500 w-4 h-4 stroke-[1.5] md:w-auto" />
            <span className="text-xs md:text-xs font-medium">{activity.rating}</span>
            <span className="text-xs md:text-xs text-gray-500">({activity.total_participant})</span>
            <span className="hidden md:block text-xs text-gray-500">{activity.ordered}+ times booked</span>
          </div>
  
          {/* Spacer */}
          <div className="flex-grow"></div>
  
          {/* From Price */}
          <div className="mt-auto pt-1 md:pt-4">
            <span className="text-xs md:text-sm font-semibold text-green-600">From {GlobalUtility.IdrCurrencyFormat(activity.smaller_price)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
    );
  }

  export default ActivityBestCategoryCard
  