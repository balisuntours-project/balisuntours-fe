import { CheckCheck, CheckCircle } from "lucide-react";
import Image from "next/image";

export function LandingPageSocial() {
  const trustPoints = [
    "12,000+ guests/year",
    "4.9★ Google & TripAdvisor Ratings",
    "Partnered with Aussie travel groups",
    "Featured in Australian Traveller",
    "Used by Bali resorts and yoga retreats",
  ];

  const logos = [
    { src: "/partner/tripadvisor-badge.png", alt: "Tripadvisor Badge" },
    { src: "/partner/kkday.png", alt: "KKDAY Badge" },
    { src: "/partner/klook-seeklogo.png", alt: "Klook Badge" },
    { src: "/partner/pelago.png", alt: "Pelago Badge" },
    { src: "/partner/shore.png", alt: "Shorer Badge" },
    { src: "/partner/tiketcom.png", alt: "Tiketcom Badge" },
    { src: "/partner/traveloka.webp", alt: "Traveloka Badge" },
    { src: "/partner/trip-com-seeklogo.png", alt: "Tripcom Badge" },
    { src: "/partner/viator-seeklogo.png", alt: "Viator Badge" },
  ];
  return (
    <>
      <section className=" md:mt-6 ">
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
                className="relative w-[80px] md:w-[120px] h-[25px] md:h-[40px] grayscale hover:grayscale-0 transition duration-300"
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
