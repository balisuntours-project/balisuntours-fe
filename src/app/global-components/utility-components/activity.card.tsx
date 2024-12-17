
import { ActivityCardProps, ActivityTags } from "@/app/paramaters/activity/paramater";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalUtility } from "@/lib/global.utility";
import { Star } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { ActivityTitleCard } from "./activity-title.card";
import { useRouter } from "next/navigation";
import Link from "next/link";



const ActivityCard: FC<ActivityCardProps> = ({ activity, tags, useMobileHeight, showDesciption, showTags = true }) => {
 
    return (
      <Link href={`/customer/preview/activity/${activity.slug}`} target="__blank">
      <Card className={`flex flex-col max-h-[400px] ${useMobileHeight ? 'h-[250px]' : 'h-[400px]'}`}>
       
              {/* Bagian Gambar */}
              <div className={`relative w-full ${useMobileHeight ? 'h-[200px]' : 'h-[400px]'}`}>
          <Image
            src={activity.image}
            alt={activity.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
  
        <CardContent className="flex flex-col h-full p-4">
          {/* Title */}
            <ActivityTitleCard title={activity.title} />

          {/* Description */}
          {showDesciption && <p className="text-sm mt-2">{showDesciption}</p>}

              {/* Tag Popular */}
        {showTags && <div className="flex gap-2">
        <div className="mt-1 inline-block bg-red-300 text-white text-[10px] md:text-xs font-normal py-1 px-2 rounded-lg">
          {tags.first_tag}
        </div>
        <div className="mt-1 inline-block bg-red-300 text-white text-[10px] md:text-xs font-normal py-1 px-2 rounded-lg">
         {tags.second_tag}
        </div>
        </div>}

          {/* Rating dan Total Booking */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="text-yellow-500 w-4 h-4 stroke-[1.5] md:w-auto md:h-auto" />
            <span className="text-xs md:text-sm font-medium">{activity.rating}</span>
            <span className="text-xs md:text-sm text-gray-500">({activity.total_participant})</span>
            <span className="hidden md:block text-sm text-gray-500">{activity.ordered}+ times booked</span>
            <span className="block md:hidden text-xs md:text-sm text-gray-500">{activity.ordered}+</span>
          </div>
  
          {/* Spacer */}
          <div className="flex-grow"></div>
  
          {/* From Price */}
          <div className="mt-auto pt-4">
            <span className="text-sm md:text-lg font-semibold text-green-600">From {GlobalUtility.IdrCurrencyFormat(activity.smaller_price)}</span>
          </div>
        </CardContent>
       
      </Card>
      </Link>
    );
  }

  export default ActivityCard
  