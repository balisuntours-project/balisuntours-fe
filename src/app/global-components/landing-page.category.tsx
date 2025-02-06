import { BestActivityCategoryNameAndListActivity } from "../response/activity.response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ActivityBestCategoryLandingPage } from "../paramaters/activity/paramater";
import { BestCategoryCard } from "./utility-components/category.card";

export function LandingPageBestCategorySection(
  props: ActivityBestCategoryLandingPage
) {
  return (
    <>
      <div
        id="best-category"
        className="block md:px-5 lg:px-6 xl:px-6 2xl:px-0 scroll-smooth"
      >
        <h1 className="font-bold text-xl md:text-3xl">
          Tours and Activities Category
        </h1>
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
                    activity={
                      Object.entries(props.best_category_activity).find(
                        ([key]) => key === category.title
                      )?.[1] ?? ({} as BestActivityCategoryNameAndListActivity)
                    }
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/*  <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </>
  );
}
