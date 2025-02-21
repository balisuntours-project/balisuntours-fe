import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function LandingPageNavigationUtility() {
  return (
    <Card className="w-[90%] mx-auto">
      <CardHeader>
        <div className="grid grid-cols-4 gap-4 text-center">
          <Link
            href={`https://808.rent`}
            target="__blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 col-span-1"
          >
            <Image
              src="/rent.png"
              width={50}
              height={50}
              className="h-[50px] w-[50px] md:h-[50px] md:w-[50px] object-cover"
              alt="Rental Car"
            />
            <h2 className="text-xs md:text-sm">Car Rental</h2>
          </Link>
          <Link
            href={"#best-category"}
            className="flex flex-col items-center gap-2 col-span-1"
          >
            <Image
              src="/best-category.png"
              width={50}
              height={50}
              className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover"
              alt="Best Category"
            />
            <h2 className="text-xs md:text-sm">Best Category</h2>
          </Link>
          <Link
            href={`/customer/activities`}
            className="flex flex-col items-center gap-2 col-span-1"
          >
            <Image
              src="/buss.png"
              width={50}
              height={50}
              className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover"
              alt="Tour & Activity"
            />
            <h2 className="text-xs md:text-sm">Tour & Activity</h2>
          </Link>
          <Link
            href={"#small-best-attractions"}
            className="flex flex-col items-center gap-2 col-span-1"
          >
            <Image
              src="/camera.png"
              width={50}
              height={50}
              className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover"
              alt="Best Attraction"
            />
            <h2 className="text-xs md:text-sm">Best Attractions</h2>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}
