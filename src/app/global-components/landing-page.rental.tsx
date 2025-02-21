import Link from "next/link";
import { ImageWithLoader } from "./utility-components/with-loader.image";

export function LandingPageRentalVechileSection() {
  return (
    <>
      <div
        id="vehicle-rental"
        className="block md:px-5 lg:px-6 xl:px-6 2xl:px-0 scroll-smooth"
      >
        <h1 className="font-bold text-xl md:text-3xl">
          Need a Ride in Bali? We've Got You Covered!
        </h1>
        <div className="banner-image w-full max-w-full mt-3">
          <Link
            href={`https://808.rent`}
            target="__blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-2 col-span-1"
          >
             <ImageWithLoader
            src="/808-banner.jpg"
            alt="Vehicle rental banner"
            fallbackSrc="/fallback-image.png"
            classNameProp="row-span-1 w-full h-[100%] bg-gray-500 rounded-lg object-cover cursor-pointer"
            skeletonClassName="rounded-lg h-[100%]"
            priority={false}
            width={500}
            height={500}
          />
          </Link>
        </div>
        <p className="mt-4 text-gray-600 text-sm md:text-base">
          We also offer reliable transportation services with a wide range of
          well-maintained vehicles. Whether you need a car for small group even
          a big group!, we ensure a comfortable and hassle-free experience
          throughout your journey.
        </p>
      </div>
    </>
  );
}
