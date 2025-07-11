import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ActivityLandingPage } from "../paramaters/activity/paramater";
import ActivityCard from "./utility-components/activity.card";

export function LandingPageActivityDesktopSection(props: ActivityLandingPage) {
    return (
       <>
     
         <div className="hidden md:block md:px-5 lg:px-6 xl:px-6 2xl:px-0 ">
         <h1 className="font-bold text-3xl">Popular Activities</h1>
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
             {/* {Array.from(props.best_deals_activity).map((activity, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <ActivityCard
                    activity={activity}
                    tags={{
                      first_tag: "One and Only",
                      second_tag: "Best Experience",
                    }}
                  />
                </div>
              </CarouselItem>
            ))} */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
       </>
    )
}