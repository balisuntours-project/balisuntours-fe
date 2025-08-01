import { CheckCheck, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingPageSocial() {
  const trustPoints = [
    "12,000+ guests/year",
    "4.9★ Google & TripAdvisor Ratings",
    "Partnered with Aussie travel groups",
    "Featured in Australian Traveller",
    "Used by Bali resorts and yoga retreats",
  ];

  const logos = [
    {
      src: "/partner/tripadvisor-badge.png",
      alt: "Tripadvisor Badge",
      ota_url:
        "https://www.tripadvisor.com/Attraction_Review-g297701-d4441302-Reviews-or10-Bali_Sun_Tours-Ubud_Gianyar_Regency_Bali.html",
    },
    {
      src: "/partner/kkday.png",
      alt: "KKDAY Badge",
      ota_url: "https://www.kkday.com/en-us/merchant/21496",
    },
    {
      src: "/partner/klook-seeklogo.png",
      alt: "Klook Badge",
      ota_url:
        "https://www.klook.com/en-US/activity/27410-ayung-river-rafting-bali-waterfalls-trip/",
    },
    {
      src: "/partner/pelago.png",
      alt: "Pelago Badge",
      ota_url:
        "https://www.pelago.com/en-US/activity/pqvx9-bali-quad-bike-atv-river-rafting-bali/",
    },
    {
      src: "/partner/shore.png",
      alt: "Shorer Badge",
      ota_url:
        "https://www.shoreexcursionsgroup.com/tour/private-ubud-exploration-for-a-day/asblpvtubudday",
    },
    {
      src: "/partner/tiketcom.png",
      alt: "Tiketcom Badge",
      ota_url: "https://www.tiket.com/to-do/partner/bali-sun-tours-partner",
    },
    {
      src: "/partner/traveloka.webp",
      alt: "Traveloka Badge",
      ota_url:
        "https://www.traveloka.com/id-id/activities/indonesia/product/atv-ride-adventure-in-bali-8903468854484?q=atv%20adventure%20in%20bali",
    },
    {
      src: "/partner/trip-com-seeklogo.png",
      alt: "Tripcom Badge",
      ota_url: "https://us.trip.com/things-to-do/detail/94267433/?locale=en-US",
    },
    {
      src: "/partner/viator-seeklogo.png",
      alt: "Viator Badge",
      ota_url: "https://www.viator.com/operator/7516",
    },
    {
      src: "/partner/groupon.png",
      alt: "Groupon Badge",
      ota_url: "https://www.groupon.com.au/deals/ga-gleaming-bali-tour-3",
    },
  ];

  return (
    <>
      <section className=" md:mt-6 ">
        <div className="max-w-full">
          <h2 className="text-xl md:text-3xl font-extrabold">
            Trusted by Thousands
          </h2>

          <div className="pt-5 space-y-2 mb-8 text-muted-foreground text-base sm:text-lg font-medium text-left">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <CheckCircle
                  strokeWidth={2.75}
                  className="h-full w-full max-h-5 max-w-5 text-[#EB5E00] items-center"
                />
                <span className="text-sm md:text-base">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="relative w-[80px] md:w-[120px] h-[25px] md:h-[40px] grayscale hover:grayscale-0 transition duration-300"
              >
                <Link
                  href={logo.ota_url}
                  target="_blank"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
