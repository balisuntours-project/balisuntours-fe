import { ActivityBestCategory, BestActivityCategoryNameAndListActivity } from "../response/activity.response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ActivityBestCategoryLandingPage, ActivityLandingPage } from "../paramater/activity.paramater";
import ActivityCard from "./utility-components/activity.card";
import { BestCategoryCard } from "./utility-components/category.card";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";

export function LandingPageBestCategorySection(props: ActivityBestCategoryLandingPage) {
    return (
        <>
         <div className="block md:px-5 lg:px-6 xl:px-6 2xl:px-0">
         <h1 className="font-bold text-xl md:text-3xl">Best Category Activities</h1>
        <Carousel
        
          opts={{
            align: "start",
          }}
          className="w-full max-w-full pt-5"
        >
          <CarouselContent>
            {Array.from(props.best_category).map((category, index) => (
              <CarouselItem
                key={index + category.title}
                className=" basis-1/2 md:basis-1/4 lg:basis-1/5"
              >
                <div className="p-0">
                  <BestCategoryCard
                    category={category}
                    activity={ Object.entries(props.best_category_activity).find(([key]) => key === category.title)?.[1] ?? {} as BestActivityCategoryNameAndListActivity}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
        </>
    )
}