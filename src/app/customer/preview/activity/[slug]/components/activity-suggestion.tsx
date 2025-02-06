import ActivityCard from "@/app/global-components/utility-components/activity.card";
import { ActivitySuggestionType } from "@/app/paramaters/activity/paramater";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function ActivitySuggestion(props: ActivitySuggestionType) {
  return (
    <>
      <div className="md:px-5 lg:px-6 xl:px-6 2xl:px-0 ">
        <h1 className="font-bold text-3xl">People also like this</h1>
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
                className="basis-full md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <ActivityCard
                    activity={activity}
                    tags={{
                      first_tag: "Popular",
                      second_tag: "Best Experience",
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
