"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "../../../styles/landing-page.hero.css";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

import axios from "axios";
import { BANNER_LANDING_PAGE } from "@/lib/global-static-images.const";
import { AllActivitiesTitleHero } from "../utility-components/title.hero";

export function AllActivitiesHero() {
 
  return (
    <>
      <div className="relative w-full max-w-full mx-auto hidden md:block">
        <Swiper
          modules={[EffectFade, Autoplay, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          effect={"fade"}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          className="w-full h-[500px] md:h-[650px] lg:h-[600px]"
        >
          {BANNER_LANDING_PAGE.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center p-0 h-full">
                <Image
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="zoom-animation brightness-75"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

         {/* Box Overlay */}
        <AllActivitiesTitleHero />
      </div>

      <div className="block md:hidden w-full max-w-full mx-auto">
          
      </div>
    </>
  );
}
