import { ActivityBestCategory } from "../response/activity.response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ActivityLandingPage } from "../paramater/activity.paramater";
import ActivityCard from "./utility-components/activity.card";
import { BestCategoryCard } from "./utility-components/category.card";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";

export function LandingPageBestCategorySection({bestCategory}: {bestCategory: Array<ActivityBestCategory>}) {
    return (
        <>
         <div className="block md:px-5 lg:px-6 xl:px-6 2xl:px-0">
         <h1 className="font-bold text-3xl">Best Category Activities</h1>
        <Carousel
        
          opts={{
            align: "start",
          }}
          className="w-full max-w-full pt-5"
        >
          <CarouselContent>
            {Array.from(bestCategory).map((category, index) => (
              <CarouselItem
                key={index + category.title}
                className="basis-full md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <BestCategoryCard
                    category={category}
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