import { BestActivityCategoryNameAndListActivity } from "@/app/response/activity.response";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ActivityBestCategoryCard from "./activity-best-category.card";

export function BestCategoryActivityDrawer({
  activityList,
}: {
  activityList: BestActivityCategoryNameAndListActivity;
}) {
  return (
    <Drawer preventScrollRestoration={false}>
      <DrawerTrigger asChild>
        <ExpandedButton title="See activities" />
      </DrawerTrigger>
      <DrawerContent className="px-0 md:px-0 lg:px-11">
        <DrawerHeader>
          <div className="text-center">
            <DrawerTitle>{activityList.name} Best Activity</DrawerTitle>
            <DrawerDescription>
              We have this recomendation for you!
            </DrawerDescription>
          </div>
          <div className="block mx-auto w-full max-w-xs  md:max-w-screen-md xl:max-w-screen-xl px-4 md:px-6 lg:px-6 xl:px-6 2xl:px-0">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-full pt-5"
            >
              <CarouselContent>
                {Array.from(activityList.activities).map((activity, index) => (
                  <CarouselItem
                    key={index + activity.title}
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <div className="p-1">
                      <ActivityBestCategoryCard
                        activity={activity}
                        tags={{
                          first_tag: "Best Category",
                          second_tag: "Best Experience",
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild className="w-3/5 md:w-1/2 xl:w-1/4 mx-auto">
            <ExpandedButton title="Close" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
