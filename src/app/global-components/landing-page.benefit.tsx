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
      <h1 className="text-xl md:text-3xl font-bold">Why Choose Bali Sun Tours?</h1>
      <Carousel className="w-full max-w-full pt-5">
        <CarouselContent className="overflow-visible -ml-1">
          {/* Carousel Item 1 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/tailor.svg"
                objectFit="cover"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">Tailored Just for You</h2>
              <p className="text-xs md:text-sm">
                Get a customized Bali itinerary that matches your interests—whether it’s adventure, culture, or relaxation.
                We design your perfect Bali escape.
              </p>
            </div>
          </CarouselItem>
          
          {/* Carousel Item 2 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/comfort.svg"
                objectFit="cover"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">Ultimate Comfort</h2>
              <p className="text-xs md:text-sm">
                Relax in luxury with air-conditioned transport and VIP services, letting you enjoy Bali without a worry.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 3 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
            <div className="flex flex-col gap-3">
              <Image
                src="/guide.svg"
                objectFit="cover"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">Insider Knowledge</h2>
              <p className="text-xs md:text-sm">
                Our expert local guides will show you the best of Bali—from hidden gems to must-see spots—ensuring you experience the island like a local.
              </p>
            </div>
          </CarouselItem>

          {/* Carousel Item 4 */}
          <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4 -mr-8">
            <div className="flex flex-col gap-3">
              <Image
                src="/adventure.svg"
                objectFit="cover"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">Unforgettable Moments</h2>
              <p className="text-xs md:text-sm">
                From adrenaline-pumping water sports to relaxing beach days, we offer unforgettable experiences that make Bali unforgettable.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
