import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function LandingPageBenefit() {
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold">Why With Us?</h1>
      <Carousel className="w-full max-w-full pt-5">
        <CarouselContent className="overflow-visible -ml-1">
          {/* Carousel Item 1 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/tailored.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">
                Tailored Just for You
              </h2>
              <p className="text-xs md:text-sm">
                You are able to customize your tour itinerary and specify
                personal needs.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 2 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/ultimate-comfort.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">
                Ultimate Comfort
              </h2>
              <p className="text-xs md:text-sm">
                Let you enjoy Bali with worry free, any comfortable
                transportation with helpful services from our team are
                available.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 3 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/insider-knowledge.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">
                Insider Knowledge
              </h2>
              <p className="text-xs md:text-sm">
                Our expert local guides showing you Bali’s culture from hidden
                gems to must-see spots ensuring you experience a true Bali
                atmosphere.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 4 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4 -mr-8">
            <div className="flex flex-col gap-3">
              <Image
                src="/unforgetable-moment.png"
                objectFit="cover"
                width={100}
                height={100}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">
                Unforgettable Moments
              </h2>
              <p className="text-xs md:text-sm">
                From adrenaline-pumping to relaxing activities, we strive to
                provide services that exceed your needs to create the
                unforgettable moments.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
