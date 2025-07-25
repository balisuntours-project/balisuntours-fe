import { CheckCheck, CheckCircle } from "lucide-react";
import Image from "next/image";

export function TrustSocialProofPackage() {
  const trustPoints = [
    "12,000+ guests/year",
    "4.9★ Google & TripAdvisor Ratings",
    "Partnered with Aussie travel groups",
    "Featured in Australian Traveller",
    "Used by Bali resorts and yoga retreats",
  ];

  const logos = [
    { src: "/partner/tripadvisor-badge.png", alt: "Tripadvisor Badge" },
    { src: "/partner/tripadvisor-badge.png", alt: "Google Reviews Badge" },
    { src: "/partner/tripadvisor-badge.png", alt: "Australian Traveller" },
    { src: "/partner/tripadvisor-badge.png", alt: "Bali Resort Partner" },
    { src: "/partner/tripadvisor-badge.png", alt: "Yoga Retreat Partner" },
  ];
  return (
    <>
      <section className="mt-6 md:mt-11 ">
        <div className="max-w-full">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
            Trusted by Thousands
          </h2>

          <div className="mt-4 space-y-2 mb-8 text-muted-foreground text-base sm:text-lg font-medium text-left">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="flex gap-2"
              >
                <CheckCircle
                  strokeWidth={2.75}
                  className="h-full w-full max-h-6 max-w-6 text-[#EB5E00] text-2xl items-center"
                />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="relative w-[120px] h-[40px] grayscale hover:grayscale-0 transition duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
