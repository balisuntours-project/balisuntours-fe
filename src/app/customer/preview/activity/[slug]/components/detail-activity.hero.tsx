"use client";

import { DetailActivityHeroParamater } from "@/app/paramaters/activity/paramater";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "../../../../../styles/landing-page.hero.css";

import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { BANNER_LANDING_PAGE } from "@/lib/global-static-images.const";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { ActivityStatusEnum } from "@/app/enum/activity.enum";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DetailActivityHero(props: DetailActivityHeroParamater) {
  return (
    <div className="detail-hero">
      {/* Tampilan untuk tablet atau lebih besar */}
      <div className="big-content w-full md:grid-cols-3 lg:grid-cols-4 gap-2 hidden md:grid md:mb-6">
        <div className="md:col-span-2 lg:col-span-3">
          <ImageWithLoader
            src={props.activity_main_photo.files.url}
            alt={props.activity_main_photo.description ?? "banner"}
            fallbackSrc="/fallback-image.png"
            classNameProp="w-full sm:h-[400px] lg:h-[500px] bg-gray-500 rounded-lg object-cover cursor-pointer"
            priority={false}
            width={500}
            height={500}
          />
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-2 max-h-[500px]">
          <ImageWithLoader
            src={props.activity_galleries[0].files.url}
            alt={props.activity_galleries[0].title ?? "gallery-1"}
            fallbackSrc="/fallback-image.png"
            classNameProp="row-span-1 w-full h-[100%] bg-gray-500 rounded-lg object-cover cursor-pointer"
            priority={false}
            width={500}
            height={500}
          />

          <ImageWithLoader
            src={props.activity_galleries[1].files.url}
            alt={props.activity_galleries[1].title ?? "gallery-2"}
            fallbackSrc="/fallback-image.png"
            classNameProp="row-span-1 w-full h-[100%] bg-gray-500 rounded-lg object-cover cursor-pointer"
            priority={false}
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Tampilan untuk layar kecil */}
      <div className="small-content relative w-full max-w-full mx-auto md:hidden">
        <Swiper
          modules={[EffectFade, Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          effect={"fade"}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          className="w-full h-auto"
        >
          <div>
            <SwiperSlide>
              <div className="flex items-center justify-center p-0 h-full">
                <ImageWithLoader
                  src={props.activity_main_photo.files.url}
                  alt={props.activity_main_photo.description ?? "banner"}
                  fallbackSrc="/fallback-image.png"
                  classNameProp="zoom-animation w-full object-cover h-[400px]"
                  priority={false} // Gambar ini tidak diberi prioritas
                  width={400}
                  height={400}
                />
              </div>
            </SwiperSlide>
            {props.activity_galleries.map((gallery, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center p-0 h-full">
                  <ImageWithLoader
                    src={gallery.files.url}
                    alt={`Image ${index + 1}`}
                    fallbackSrc="/fallback-image.png"
                    classNameProp="zoom-animation w-full object-cover h-[400px]"
                    priority={false} // Gambar ini tidak diberi prioritas
                    width={400}
                    height={400}
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      {props.is_published == ActivityStatusEnum.unpublished && (
        <div className="w-full hidden md:grid grid-cols-4 gap-2 mt-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-red-500 rounded-lg p-6 col-span-1 max-h-[100px] text-white text-center font-semibold border-2 border-red-600 transform -rotate-3">
                  <span className="block text-lg">Unpublished</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col">
                  <span>Only admin can see this product</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
