import { DetailActivityTitleParamater } from "@/app/paramaters/activity/paramater";
import { MapPin, Mountain, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { GoogleMapDialogComponent } from "@/app/global-components/utility-components/google-map.dialog";
import Image from "next/image";
import { GlobalUtility } from "@/lib/global.utility";

export function DetailActivityTitle(props: DetailActivityTitleParamater) {
  return (
    <>
      <div className="detail-title pt-4 md:px-0 md:pt-0">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold">
          {props.title}
        </h1>
        <p className="mt-2 text-muted-foreground text-base sm:text-lg">
          Best Activity on Bali with great view and itineraries
        </p>

        <div className="flex flex-col-reverse md:flex-col">
          <div className="mt-1 md:mt-5 flex gap-4">
            <div className="flex gap-0 flex-wrap">
              <MapPin className=" w-5 h-5 my-auto stroke-[1.5] me-1  md:w-auto md:h-auto md:me-2" />
              <GoogleMapDialogComponent
                lat={props.coordinate_location.lat}
                lng={props.coordinate_location.lng}
                zoom={props.zoom_map}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm md:text-lg cursor-pointer underline">
                        {props.activity_address}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See location</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </GoogleMapDialogComponent>
            </div>

            <div className="ml-auto flex gap-0 flex-wrap">
              <Mountain className=" me-1 md:me-2 w-5 h-5 stroke-[1.5] md:w-auto md:h-auto" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-sm md:text-lg cursor-pointer">
                      {props.activity_categories[0].name}{" "}
                      {props.activity_categories.length - 1}+
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {props.activity_categories.map((category, key) => (
                      <p key={key}>{category.name}</p>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="sm:mt-3 lg:mt-6 mb-3">
            <div className="flex gap-2 md:hidden mt-3 justify-start items-start">
              <div className="relative w-[100px] h-[32px] grayscale hover:grayscale-0 transition duration-300">
                <Image
                  src="/partner/tripadvisor-badge.png"
                  alt="Tripadvisor Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-[100px] h-[32px] grayscale hover:grayscale-0 transition duration-300">
                <Image
                  src="/partner/tripadvisor-badge.png"
                  alt="Tripadvisor Badge"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="stars flex flex-row gap-1 mt-3 items-start text-sm md:text-base">
              {/* Star rating and participants */}
              <div className="flex gap-1 items-center">
                <div className="flex items-center">
                  <span className="text-[#EB5E00] font-bold">
                    {GlobalUtility.FormatRatingToDecimal(props.rating)}
                  </span>
                  <span className="font-bold ms-[2px]">
                    ({props.total_participant} reviews)
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-gray-500 text-sm md:text-base">
                  {props.ordered}+ booked
                </span>
                <div className="hidden md:flex gap-2 -mt-1 justify-start items-start">
                  <div className="relative w-[100px] h-[32px] grayscale hover:grayscale-0 transition duration-300">
                    <Image
                      src="/partner/tripadvisor-badge.png"
                      alt="Tripadvisor Badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative w-[100px] h-[32px] grayscale hover:grayscale-0 transition duration-300">
                    <Image
                      src="/partner/tripadvisor-badge.png"
                      alt="Tripadvisor Badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
