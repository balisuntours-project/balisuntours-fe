import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ActivityLandingPage } from "../paramater/activity.paramater";
import ActivityCard from "./utility-components/activity.card";

export function LandingPageActivityMobileSection(props: ActivityLandingPage) {
    return (
       <>
       <div className="block md:hidden">
        <h1 className="font-bold text-xl">The One And Only</h1>
      <div className="pt-3  mb-11">
      <Carousel
     
          opts={{
            align: "start",
          }}
          className="w-full max-w-full "
        >
          <CarouselContent>
            {Array.from(props.best_deals_activity).map((activity, key) => (
              <CarouselItem
                key={activity.uuid + key}
                className="basis-full"
              >
                <div className="p-1">
                  <ActivityCard
                    activity={activity}
                    tags={{
                      first_tag: "One and Only",
                      second_tag: "Best Experience",
                    }}
                    showDesciption="🌳Explore the mystical temples, walk among the playful residents of nature, and experience the soul of Bali in its most sacred sites."
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
        </Carousel>
      </div>
       

      <h1 className="font-bold text-xl">Popular Activities</h1>
      <div className="grid grid-cols-4 gap-2 pt-3">
      {Array.from(props.popular_activity).map((activity, index) => (
             <div className="p-1 col-span-2">
             <ActivityCard
                key={activity.uuid + index}
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
    )
}