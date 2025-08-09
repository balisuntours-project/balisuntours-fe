"use client";

import { useEffect } from "react";
import { Activity } from "../responses/activity/response";
import ActivityCard from "./utility-components/activity.card";
import { ImageWithLoader } from "./utility-components/with-loader.image";
import AOS from "aos";
import "aos/dist/aos.css";

export function LandingPageBestActivity({
  popularActivity,
}: {
  popularActivity: Activity;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    AOS.refresh();
  }, []);
  return (
     <div className="-mx-[0.75rem] md:-mx-[4rem] w-screen h-[400px] md:h-[600px] relative">
        {/* Background Image */}
        <ImageWithLoader
          src={popularActivity.image}
          fallbackSrc="/fallback-image.png"
          width={0}
          height={0}
          quality={100}
          alt="rafting"
          classNameProp="w-full h-full object-cover"
        />

        {/* Overlay redup di seluruh gambar */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Card di atas image */}
        <div className="absolute top-4 right-4 md:top-11 md:right-11 lg:right-24 w-full max-w-[300px] md:max-w-[400px]">
          {/* Mobile */}
          <div data-aos="fade-up-left" className="block md:hidden rounded-xl shadow-lg overflow-hidden">
            <ActivityCard
              activity={popularActivity}
              tags={{
                first_tag: "3 hrs",
                second_tag: "Certified Guides",
                third_tag: "Lunch Included",
              }}
              showTags={true}
              onlyContent={true}
            />
          </div>

          {/* Desktop */}
          <div data-aos="fade-up-left" className="hidden md:block rounded-xl shadow-lg overflow-hidden">
            <ActivityCard
              activity={popularActivity}
              tags={{
                first_tag: "3 hrs",
                second_tag: "Certified Guides",
                third_tag: "Lunch Included",
              }}
            />
          </div>
        </div>
      </div>
  );
}
