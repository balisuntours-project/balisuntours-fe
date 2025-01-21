"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageWithLoader } from "./utility-components/with-loader.image";
import { ActivityTitleCard } from "./utility-components/activity-title.card";
import { GlobalUtility } from "@/lib/global.utility";
import { ActivityLocalStorageEnum } from "../enums/activity/activity.enum";
import { RecentlyOrRecomendedActivityParamater } from "../paramaters/activity/paramater";
import { useRecentlyActivityStore } from "../store/recently-activity.store";
import Link from "next/link";

export function LandingRecentlyViewedActivity() {
  const recentlyViewedActivity = useRecentlyActivityStore(
    (state) => state.recentlyViewedActivity
  );

  return (
    <>
      {recentlyViewedActivity.length > 0 && (
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Recently Viewed</h1>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full pt-5"
          >
            <CarouselContent>
              {Array.from(recentlyViewedActivity).map((activity, index) => (
                <CarouselItem
                  key={index}
                  className=" basis-[30%] md:basis-[22%] lg:basis-1/6"
                >
                  <Link
                    href={`/customer/preview/activity/${activity.slug}`}
                    target="__blank"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="lg:p-1">
                        <ImageWithLoader
                          src={activity.image}
                          alt={activity.title}
                          fallbackSrc="/fallback-image.png"
                          classNameProp={`rounded-2xl w-full h-[80px] md:h-[100px] lg:h-[120px] max-h-[80px] md:max-h-[100px] lg:max-h-[120px] object-cover`}
                          skeletonClassName={`rounded-2xl w-full h-[80px] md:h-[100px] lg:h-[120px] max-h-[80px] md:max-h-[100px] lg:max-h-[120px] object-cover`}
                          priority={false}
                          /*   objectFit="cover" */
                          width={500}
                          height={200}
                          quality={100}
                        />
                      </div>
                      <div className="title">
                        <ActivityTitleCard
                          customSizeText="text-xs md:text-sm"
                          title={activity.title}
                        />
                      </div>
                      <div className="price">
                        <span className="text-xs md:text-sm font-semibold text-green-600">
                          From{" "}
                          {GlobalUtility.IdrCurrencyFormat(
                            activity.smaller_price
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      )}
    </>
  );
}
