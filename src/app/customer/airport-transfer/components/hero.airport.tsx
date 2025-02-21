import Image from "next/image";
import React from "react";

export function HeroSectionAirportTransfer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-full max-w-full mx-auto block md:block h-[50vh] md:h-[40vh] lg:h-[65vh]">
        <div className="flex items-center justify-center p-0 h-full">
          <Image
            src="/808-banner.jpg"
            alt={`airport-transfer-hero-banner`}
            layout="fill"
            objectFit="cover"
            priority
            className={`zoom-animation brightness-75`}
          />
        </div>

        {/* Box Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-[90%]">
          {children}
        </div>
      </div>
    </>
  );
}
