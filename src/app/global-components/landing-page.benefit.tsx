import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function LandingPageBenefit() {
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold">Why With Us?</h1>
      <Carousel className="w-full max-w-full pt-5">
        <CarouselContent className="overflow-visible -ml-1 gap-3">
          {/* Carousel Item 1 */}
          <CarouselItem className="basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/tailored.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover basis-1/3"
                alt="Tailored"
              />
              <h2 className="text-base md:text-lg font-bold h-12 md:h-6">
                Tailored Just for You
              </h2>
              <p className="text-xs md:text-sm basis-1/3">
                You are able to customize your tour itinerary and specify
                personal needs.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 2 */}
          <CarouselItem className="basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/ultimate-comfort.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover basis-1/3"
                alt="Ultimate Comfort Icon"
              />
              <h2 className="text-base md:text-lg font-bold h-12 md:h-6">
                Ultimate Comfort
              </h2>
              <p className="text-xs md:text-sm basis-1/3">
                Let you enjoy Bali with worry free, any comfortable
                transportation with helpful services from our team are
                available.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 3 */}
          <CarouselItem className="basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/insider-knowledge.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover basis-1/3"
                alt="Insinder Knowledge Icon"
              />
              <h2 className="text-base md:text-lg font-bold h-12 md:h-6">
                Insider Knowledge
              </h2>
              <p className="text-xs md:text-sm basis-1/3">
                Our expert local guides showing you Bali’s culture from hidden
                gems to must-see spots ensuring you experience a true Bali
                atmosphere.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 4 */}
          <CarouselItem className="basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/unforgetable-moment.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover basis-1/3"
                alt="Unforgottable Moment Icon"
              />
              <h2 className="text-base md:text-lg font-bold h-12 md:h-6">
                Unforgettable Moments
              </h2>
              <p className="text-xs md:text-sm basis-1/3">
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
