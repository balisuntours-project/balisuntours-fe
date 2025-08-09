"use client"

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function LandingPageWhyUs() {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false,
        });
    
        AOS.refresh();
      }, []);
    const whyWithUs = [
        {
            src: "/whyus/over.svg",
            description: "Over 12 Years Crafting The Authentic Balinese Cultural Tours and Experiences"
        },
         {
            src: "/whyus/driver.svg",
            description: "Licensed Drivers Who Speak English/Chinese/Japan"
        },
         {
            src: "/whyus/pricing.svg",
            description: "Transparent Pricing – No Hidden Fees"
        },
         {
            src: "/whyus/freepick.svg",
            description: "Free Hotel Pickup in Key Areas"
        },
         {
            src: "/whyus/wa-response.svg",
            description: "Fast Response via WhatsApp"
        },
    ]

  return (
    <>
      <div className="-mx-[0.75rem] md:-mx-[4rem] w-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="font-bold text-xl md:text-3xl text-center">
            {" "}
            Why Travelers Trust Bali SUN Tours?
          </h1>
          <div className="flex flex-wrap justify-center gap-3 py-6">
            {whyWithUs.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-1 md:space-y-0 w-full max-w-full sm:max-w-[calc(33.333%_-_16px)] lg:max-w-[calc(20%_-_16px)]"
              >
                <div data-aos="fade-up" className="relative w-[35px] md:w-[50px] h-[35px] md:h-[50px] grayscale hover:grayscale-0 transition duration-300">
                  <Image
                    src={item.src}
                    alt={`Why Us ${idx}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm leading-snug w-full max-w-[70%] md:max-w-full pt-0 md:pt-1 lg:pt-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm md:text-base text-green-700 font-medium mt-4 md:mt-8">
            We’re not just a tour provider – we’re your local friend in Bali.
          </p>
        </div>
      </div>
    </>
  );
}
