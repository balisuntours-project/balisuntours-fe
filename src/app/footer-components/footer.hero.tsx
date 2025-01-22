import Image from "next/image";

export function FooterHeroSection({ children, bannerHeroUrl }: { children: React.ReactNode, bannerHeroUrl: string }) {
  return (
    <>
      <div className="relative w-full max-w-full mx-auto block md:block h-[50vh] md:h-[40vh] lg:h-[65vh]">
        <div className="flex items-center justify-center p-0 h-full">
          <Image
            src={bannerHeroUrl}
            alt={`footer-hero-banner`}
            layout="fill"
            objectFit="cover"
            priority
            className="zoom-animation brightness-75"
          />
        </div>

        {/* Box Overlay */}
        {children}
      </div>
    </>
  );
}
