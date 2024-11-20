import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function LandingPageNavigationUtility() {
    return (
        <>
         <Card className="w-[90%] mx-auto">
      <CardHeader>
      <div className="grid grid-cols-4 gap-4 text-center">
      <Link href={`${process.env.BACKEND_DOMAIN}/customer/activities`} className="flex flex-col items-center gap-2 col-span-1">
        <Image
          src="/destination.png"
          objectFit="cover"
          width={50}
          height={50}
          className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
          alt="benefit-png"
        />
        <h2 className="text-xs md:text-sm">Explore Destination</h2>
      </Link>
      <Link href={"#best-category"} className="flex flex-col items-center gap-2 col-span-1 smootie-scroll">
        <Image
          src="/other.png"
          objectFit="cover"
          width={50}
          height={50}
          className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
          alt="benefit-png"
        />
        <h2 className="text-xs md:text-sm">Best Category</h2>
      </Link>
      <Link href={`${process.env.BACKEND_DOMAIN}/customer/activities`} className="flex flex-col items-center gap-2 col-span-1">
        <Image
          src="/tour-bus.png"
          objectFit="cover"
          width={50}
          height={50}
          className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
          alt="benefit-png"
        />
        <h2 className="text-xs md:text-sm">Tour & Activity</h2>
      </Link>
      <Link href={"#small-best-attractions"} className="flex flex-col items-center gap-2 col-span-1 smootie-scroll">
        <Image
          src="/camera.png"
          objectFit="cover"
          width={50}
          height={50}
          className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]"
          alt="benefit-svg"
        />
        <h2 className="text-xs md:text-sm">Best Attractions</h2>
      </Link>
    </div>
      </CardHeader>
   
    </Card>
        </>
    )
}