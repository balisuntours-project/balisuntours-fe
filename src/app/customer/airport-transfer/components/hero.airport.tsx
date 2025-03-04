import Image from "next/image";
import React from "react";

export function HeroSectionAirportTransfer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-auto md:h-[40vh] lg:h-[65vh] relative w-full ">
       <div className="w-full max-w-full mx-auto hidden md:block">
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
       <div className="px-6 md:px-0 md:hidden flex flex-col w-full max-w-full mx-auto bg-gradient-to-b from-[#008000] to-white">
        <div className="w-full mt-12">{children}</div>
      </div>
      </div>
     
    </>
  );
}
