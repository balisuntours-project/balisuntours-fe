import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ActivityLandingPage } from "../paramaters/activity/paramater";
import ActivityCard from "./utility-components/activity.card";

export function LandingPageActivityMobileSection(props: ActivityLandingPage) {
  return (
    <>
      <div className="block md:hidden">
        {props.best_deals_activity.length > 0 && (
          <div>
            <h1 className="font-bold text-xl">The One And Only</h1>
            <div className="pt-3  mb-11">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-full "
              >
                <CarouselContent>
                  {Array.from(props.best_deals_activity).map(
                    (activity, key) => (
                      <CarouselItem
                        key={key + activity.uuid}
                        className="basis-full"
                      >
                        <div className="p-1">
                          <ActivityCard
                            useMobileHeight={false}
                            activity={activity}
                            tags={{
                              first_tag: "One and Only",
                              second_tag: "Best Experience",
                            }}
                            showDesciption="🌳Explore the mystical temples, walk among the playful residents of nature, and experience the soul of Bali in its most sacred sites."
                          />
                        </div>
                      </CarouselItem>
                    )
                  )}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        )}

        <h1
          id="small-best-attractions"
          className="font-bold text-xl scroll-smooth"
        >
          Popular Activities
        </h1>
        <div className="grid grid-cols-4 gap-2 pt-3 scroll-smooth">
          {Array.from(props.popular_activity).map((activity, index) => (
            <div key={activity.uuid + index + "mb"} className="p-1 col-span-2">
              <ActivityCard
                activity={activity}
                tags={{
                  first_tag: "Popular",
                  second_tag: "Best Experience",
                }}
                useMobileHeight={true}
                showTags={false}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
