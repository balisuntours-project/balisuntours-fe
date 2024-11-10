import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export function LandingPageBenefit() {
    return (
        <div>
        <h1 className="text-xl md:text-3xl font-bold">Why With Us?</h1>
        <Carousel className="w-full max-w-full pt-5">
          <CarouselContent className="overflow-visible -ml-1">
            <CarouselItem className="pl-4 basis-[40%] md:basis-[29%] lg:basis-1/4">
              <div className="flex flex-col gap-3">
                <Image src="/google.svg" objectFit="cover" width={50} height={50} className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]" alt="benefit-svg" />
                <h2 className="text-base md:text-lg font-bold">Find a Joy</h2>
                <p className="text-xs md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat possimus placeat corporis porro vero id, incidunt nulla tempore, recusandae dolorem quisquam nemo inventore aut.</p>
              </div>
            </CarouselItem>
            <CarouselItem className="pl-4 basis-[40%] md:basis-[29%]  lg:basis-1/4">
              <div className="flex flex-col gap-3">
                <Image src="/google.svg" objectFit="cover" width={50} height={50}  className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]" alt="benefit-svg" />
                <h2 className="text-base md:text-lg font-bold">Find a Joy</h2>
                <p className="text-xs md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat possimus placeat corporis porro vero id, incidunt nulla tempore, recusandae dolorem quisquam nemo inventore aut.</p>
              </div>
            </CarouselItem>
            <CarouselItem className="pl-4 basis-[40%] md:basis-[29%]  lg:basis-1/4">
              <div className="flex flex-col gap-3">
                <Image src="/google.svg" objectFit="cover" width={50} height={50}  className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]" alt="benefit-svg" />
                <h2 className="text-base md:text-lg font-bold">Find a Joy</h2>
                <p className="text-xs md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat possimus placeat corporis porro vero id, incidunt nulla tempore, recusandae dolorem quisquam nemo inventore aut.</p>
              </div>
            </CarouselItem>
            <CarouselItem className="pl-4 basis-[40%] md:basis-[29%]  lg:basis-1/4 -mr-8">
              <div className="flex flex-col gap-3">
                <Image src="/google.svg" objectFit="cover" width={50} height={50}  className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]" alt="benefit-svg" />
                <h2 className="text-base md:text-lg font-bold">Find a Joy</h2>
                <p className="text-xs md:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat possimus placeat corporis porro vero id, incidunt nulla tempore, recusandae dolorem quisquam nemo inventore aut.</p>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      
      
    )
}