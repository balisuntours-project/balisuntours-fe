import ActivityCard from "@/app/global-components/utility-components/activity.card";
import { ActivitySuggestionType } from "@/app/paramaters/activity/paramater";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ActivitySuggestion(props: ActivitySuggestionType) {
  return (
    <>
      <div className="md:px-5 lg:px-6 xl:px-6 2xl:px-0 mt-6 md:mt-11  ">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          Also Recomended For You!
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full pt-5"
        >
          <CarouselContent>
            {Array.from(props.popular_activity).map((activity, index) => (
              <CarouselItem
                key={index}
                className="basis-[45%] md:basis-[40%] lg:basis-1/4"
              >
                <div>
                  <ActivityCard
                    activity={activity}
                    tags={{
                      first_tag: "Popular",
                      second_tag: "Best Experience",
                    }}
                    withStyledConfig={true}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </>
  );
}
