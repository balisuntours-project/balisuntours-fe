import {
  ActivityCardProps,
} from "@/app/paramaters/activity/paramater";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalUtility } from "@/lib/global.utility";
import { Star, TicketCheck } from "lucide-react";
import { FC } from "react";
import { ActivityTitleCard } from "./activity-title.card";
import Link from "next/link";
import { ImageWithLoader } from "./with-loader.image";

const ActivityBestCategoryCard: FC<ActivityCardProps> = ({
  activity,
  tags,
  useMobileHeight,
  showDesciption,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showTags = true,
}) => {
  return (
    <Link
      href={`/customer/preview/activity/${activity.slug}`}
      passHref
      legacyBehavior
    >
      <a target="_blank">
        <Card
          /*   className={`flex flex-col w-full max-w-[250px] md:max-h-[300px] h-[200px] md:h-[300px]`} */
          className={`flex flex-col w-full max-w-[250px] ${
            useMobileHeight == false
              ? "max-h-[300px] h-[300px]"
              : "max-h-[300px] h-[200px] md:h-[300px]"
          }`}
        >
          {/* Bagian Gambar */}
          <div className={`relative w-full`}>
            <ImageWithLoader
              src={activity.image}
              alt={activity.title}
              fallbackSrc="/fallback-image.png"
              /*  classNameProp="rounded-t-lg"
            skeletonClassName="rounded-t-lg" */
              classNameProp={`rounded-t-lg w-full ${
                useMobileHeight == false
                  ? "h-[140px] max-h-[140px]"
                  : "h-[100px] md:h-[140px] lg:h-[140px]"
              } object-cover`}
              skeletonClassName={`rounded-t-lg w-full ${
                useMobileHeight == false
                  ? "h-[140px] max-h-[140px]"
                  : "h-[100px] md:h-[140px] lg:h-[140px]"
              }`}
              priority={false}
              quality={100}
            />
          </div>

          <CardContent className="flex flex-col h-full p-2 md:p-4 text-start">
            {/* Title */}
            <ActivityTitleCard
              title={activity.title}
              customSizeText="text-xs md:text-base"
            />

            {/* Description */}
            {showDesciption && <p className="text-sm mt-2">{showDesciption}</p>}

            {/* Tag Popular */}
            <div className={`hidden md:flex gap-2`}>
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
              <span className="text-xs md:text-xs font-medium">
                {activity.rating}
              </span>
              <span className="text-xs md:text-xs text-gray-500">
                ({activity.total_participant})
              </span>
              <span className="hidden md:block text-xs text-gray-500">
                {activity.ordered}+ times booked
              </span>
              <div className="flex gap-1 md:hidden">
                <TicketCheck className="block md:hidden w-4 h-4 my-auto stroke-[1.0]" />
                <span className="block md:hidden text-xs md:text-sm text-gray-500">
                  {activity.ordered}+
                </span>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* From Price */}
            <div className="mt-auto pt-1 md:pt-4">
              <span className="text-xs md:text-sm font-semibold text-green-600">
                From {GlobalUtility.IdrCurrencyFormat(activity.smaller_price)}
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default ActivityBestCategoryCard;
