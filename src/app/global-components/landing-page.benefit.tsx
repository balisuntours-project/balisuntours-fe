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
                src="/tailor.svg"
                objectFit="cover"
                width={50}
                height={50}
                className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
                alt="benefit-svg"
              />
              <h2 className="text-base md:text-lg font-bold">Tailored Experiences</h2>
              <p className="text-xs md:text-sm">
                Bali Sun Tours offers customized travel itineraries to fit your unique interests and preferences.
                Whether you're into serene beach getaways or cultural explorations, we curate the perfect trip for you.
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
              <h2 className="text-base md:text-lg font-bold">Unmatched Comfort</h2>
              <p className="text-xs md:text-sm">
                Enjoy the utmost comfort with fully air-conditioned vehicles and top-notch services. Let us take care of all
                the details, so you can focus on enjoying Bali to the fullest!
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
              <h2 className="text-base md:text-lg font-bold">Expert Local Guides</h2>
              <p className="text-xs md:text-sm">
                Our local guides have an intimate knowledge of Bali’s hidden gems. With their insider tips and unique insights,
                you’ll experience Bali in a way most tourists never will.
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
              <h2 className="text-base md:text-lg font-bold">Memorable Adventures</h2>
              <p className="text-xs md:text-sm">
                From thrilling water sports to tranquil moments on Bali’s stunning beaches, we offer experiences that will
                create memories you’ll cherish forever.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
