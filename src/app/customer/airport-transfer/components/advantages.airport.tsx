import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function AdvantagesAirportTransferSection() {
  return (
    <>
      <Carousel className="w-full max-w-full pt-5">
        <CarouselContent className="flex flex-col lg:flex-row overflow-visible -ml-1 gap-3">
          {/* Carousel Item 1 */}
          <CarouselItem className="basis-[100%] md:basis-[29%] lg:basis-1/3">
            <div className="flex gap-3">
              <Image
                src="/tailored.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover lg:basis-1/4"
                alt="Tailored"
              />
              <div className="flex flex-col">
                <h2 className="text-sm md:text-base font-bold">
                  Tailored Just for You
                </h2>
                <p className="text-xs md:text-xs basis-1/3">
                  You are able to customize your tour itinerary and specify
                  personal needs.
                </p>
              </div>
            </div>
          </CarouselItem>

          {/* Carousel Item 2 */}
          <CarouselItem className="basis-[100%] md:basis-[29%] lg:basis-1/3">
            <div className="flex gap-3">
              <Image
                src="/ultimate-comfort.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover lg:basis-1/4"
                alt="Ultimate Comfort Icon"
              />
              <div className="flex flex-col">
                <h2 className="text-sm md:text-base font-bold">
                  Ultimate Comfort
                </h2>
                <p className="text-xs md:text-xs basis-1/3">
                  Let you enjoy Bali with worry free, any comfortable
                  transportation with helpful services from our team are
                  available.
                </p>
              </div>
            </div>
          </CarouselItem>

          {/* Carousel Item 3 */}
          <CarouselItem className="basis-[100%] md:basis-[29%] lg:basis-1/3">
            <div className="flex gap-3">
              <Image
                src="/insider-knowledge.png"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover lg:basis-1/4"
                alt="Insinder Knowledge Icon"
              />
              <div className="flex flex-col">
                <h2 className="text-sm md:text-base font-bold">
                  Insider Knowledge
                </h2>
                <p className="text-xs md:text-xs basis-1/3">
                  Our expert local guides showing you Bali’s culture from hidden
                  gems to must-see spots ensuring you experience a true Bali
                  atmosphere.
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
