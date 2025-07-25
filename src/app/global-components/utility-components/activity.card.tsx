import { ActivityCardProps } from "@/app/paramaters/activity/paramater";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalUtility } from "@/lib/global.utility";
import { Gift, Star, TicketCheck } from "lucide-react";
import { FC } from "react";
import { ActivityTitleCard } from "./activity-title.card";
import Link from "next/link";
import { ImageWithLoader } from "./with-loader.image";

const ActivityCard: FC<ActivityCardProps> = ({
  activity,
  tags,
  useMobileHeight,
  showDesciption,
  showTags = true,
  withStyledConfig = false,
}) => {
  return (
    <Link
      // href={`/customer/preview/activity/${activity.slug}`}
      href={`/experiences/${activity.slug}`}
      passHref
      legacyBehavior
    >
      <a target="_blank">
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
          <div className={`relative w-full`}>
            {activity.is_voucherable && (
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 flex items-stretch">
                {/* Segitiga pita di kiri */}
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[5px] border-r-yellow-400 sm:border-t-[12px] sm:border-b-[12px] sm:border-r-[8px]"></div>

                {/* Tag utama */}
                <div className="bg-yellow-400 text-white text-[7px] sm:text-xs font-semibold px-1 py-[2px] sm:px-2 sm:py-1 rounded-r-md shadow-md uppercase max-w-[110px] sm:max-w-none overflow-hidden flex items-center">
                  {/* Mobile: Icon + short text */}
                  <div className="flex items-center gap-[2px] sm:hidden w-full">
                    <Gift className="w-[10px] h-[10px] stroke-[1.5]" />
                    <span className="leading-[10px]">Activity Voucher</span>
                  </div>

                  {/* Desktop: Full text */}
                  <div className="hidden sm:block items-center">
                    <span>Free Activity Voucher</span>
                  </div>
                </div>
              </div>
            )}

            <ImageWithLoader
              src={activity.image}
              alt={activity.title}
              fallbackSrc="/fallback-image.png"
              classNameProp={`rounded-t-lg w-full ${
                !withStyledConfig
                  ? useMobileHeight == false
                    ? "h-[200px] max-h-[200px]"
                    : "h-[120px] md:h-[200px] max-h-[120px] md:max-h-[200px]"
                  : "h-[120px] md:h-[200px] max-h-[120px] md:max-h-[200px]"
              } object-cover`}
              skeletonClassName={`rounded-t-lg w-full ${
                !withStyledConfig
                  ? useMobileHeight == false
                    ? "h-[200px] max-h-[200px]"
                    : "h-[120px] md:h-[200px] max-h-[120px] md:max-h-[200px]"
                  : "h-[120px] md:h-[200px] max-h-[120px] md:max-h-[200px]"
              }`}
              width={0}
              height={0}
              quality={100}
            />
          </div>

          <CardContent className="flex flex-col h-full p-4">
            {/* Title */}
            <ActivityTitleCard title={activity.title} />

            {/* Description */}
            {showDesciption && <p className="text-sm mt-2">{showDesciption}</p>}

            {/* Tag Popular */}
            <div
              className={`${
                !withStyledConfig
                  ? showTags
                    ? "flex gap-2"
                    : "hidden"
                  : "hidden md:flex gap-2"
              }`}
            >
              <div className="mt-1 inline-block bg-red-300 text-white text-[10px] md:text-xs font-normal py-1 px-2 rounded-lg">
                {tags.first_tag}
              </div>
              <div className="mt-1 inline-block bg-red-300 text-white text-[10px] md:text-xs font-normal py-1 px-2 rounded-lg">
                {tags.second_tag}
              </div>
            </div>

            {/* Rating dan Total Booking */}
            <div className="flex items-center gap-1 mt-2 w-full">
              {/* <Star className="text-yellow-500 w-4 h-4 stroke-[1.5] md:w-auto md:h-auto" /> */}
              <span className="text-xs md:text-sm text-[#EB5E00] font-bold">
                {GlobalUtility.FormatRatingToDecimal(activity.rating)}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                ({activity.total_participant})
              </span>
              <span className="hidden md:block text-sm text-gray-500">
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
            <div className="mt-auto pt-4">
              <span className="text-sm md:text-lg font-semibold text-green-600">
                From {GlobalUtility.IdrCurrencyFormat(activity.smaller_price)}
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default ActivityCard;
