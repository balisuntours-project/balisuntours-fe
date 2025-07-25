"use client";

import {
  ActivityBannerAndGalleriesParamater,
  DetailActivityHeroParamater,
} from "@/app/paramaters/activity/paramater";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "../../../styles/landing-page.hero.css";

import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { ActivityStatusEnum } from "@/app/enums/activity/activity.enum";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { GlobalUtility } from "@/lib/global.utility";
import { ActivityGalleryResponse } from "@/app/responses/activity-gallery/response";

export function DetailActivityHero(props: DetailActivityHeroParamater) {
  const swiperRef = useRef<SwiperInstance | null>(null); // Reference untuk mengontrol Swiper
  const videoTimers = useRef<NodeJS.Timeout | null>(null); // Reference untuk timer
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const bannerImage: Array<ActivityBannerAndGalleriesParamater> = [
    {
      url: props.activity_main_photo.url,
      video_thumbnail_url:
        props.activity_main_photo.video_thumbnail_url,
      video_duration_in_seconds:
        props.activity_main_photo.video_duration_in_seconds,
      uuid: props.activity_main_photo.uuid,
      title: props.activity_main_photo.description,
    },
    ...props.activity_galleries.map(
      (gallery): ActivityBannerAndGalleriesParamater => ({
        url: gallery.url,
        uuid: gallery.uuid,
        title: gallery.uuid,
      })
    ),
  ];

  // Fungsi untuk memulai autoplay
  const startAutoplay = () => {
    if (swiperRef.current && swiperRef.current.params?.autoplay) {
      swiperRef.current.params.autoplay = {
        delay: 4000,
        //disableOnInteraction: true
      }; // Atur delay
      swiperRef.current.autoplay.start(); // Mulai autoplay
    }
  };

  // Fungsi untuk menghentikan autoplay
  const stopAutoplay = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop(); // Hentikan autoplay
    }
  };

  const clearVideoTimer = () => {
    if (videoTimers.current) {
      clearTimeout(videoTimers.current);
      videoTimers.current = null;
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const currentSlideIndex = swiperRef.current.realIndex;
      const currentItem = bannerImage[currentSlideIndex];
      const isVideo = currentItem ? GlobalUtility.CheckAnyVideoFormat(currentItem.url) : false;

      clearVideoTimer(); // Bersihkan timer sebelumnya

      if (isVideo) {
        stopAutoplay(); // Matikan autoplay
        const videoDuration = currentItem.video_duration_in_seconds ? (currentItem.video_duration_in_seconds * 1000) - 4000 : 26000; // Dapatkan durasi video (24 - 4 (4 detik durasi delay))

        // Mulai ulang video dari awal
        const videoElement = videoRefs.current[currentSlideIndex];
        if (videoElement) {
          videoElement.currentTime = 0; // Set video ke awal
          videoElement.play(); // Pastikan video diputar
        }

        // Atur timer untuk mulai autoplay setelah video selesai
        videoTimers.current = setTimeout(() => {
          startAutoplay();
        }, videoDuration /* * 1000 */); // Konversi durasi ke milidetik
      } else {
        startAutoplay(); // Aktifkan autoplay untuk slide gambar
      }
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 } // 50% elemen harus terlihat sebelum dimuat
      );

      const currentSlideIndex = swiperRef.current.realIndex;
      const videoElement = videoRefs.current[currentSlideIndex];
      if (videoElement) {
        observer.observe(videoElement);
      }

      return () => {
        if (videoElement) {
          observer.unobserve(videoElement);
        }
      };
    }
  }, []);

  const [isVideoLoaded, setIsVideoLoaded] = useState(
    new Array(bannerImage.length).fill(false) // Default: semua video belum siap
  );

  const isVideo = GlobalUtility.CheckAnyVideoFormat(
    props.activity_main_photo.url
  );

  return (
    <div className="detail-hero">
      {/* Tampilan untuk tablet atau lebih besar */}
      <div className="big-content w-full md:grid-cols-3 lg:grid-cols-4 gap-2 hidden md:grid md:mb-6">
        <div className="md:col-span-2 lg:col-span-3">
          {isVideo ? (
            <video
              poster={props.activity_main_photo?.video_thumbnail_url}
              preload="none"
              autoPlay
              muted
              loop={true} // Video tetap di-loop
              className={`w-full sm:h-[400px] rounded-lg lg:h-[500px] object-cover opacity-100 transition-opacity duration-500`}
            >
              <source
                src={props.activity_main_photo?.url}
                type={`video/${isVideo}`}
              />
            </video>
          ) : (
            <ImageWithLoader
              src={props.activity_main_photo?.url}
              alt={props.activity_main_photo?.description ?? "banner"}
              fallbackSrc="/fallback-image.png"
              classNameProp="w-full sm:h-[400px] lg:h-[500px] bg-gray-500 rounded-lg object-cover cursor-pointer"
              skeletonClassName="rounded-lg"
              priority={false}
              width={500}
              height={500}
            />
          )}
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-2 max-h-[500px]">
          <ImageWithLoader
            src={props.activity_galleries[0]?.url}
            alt={props.activity_galleries[0]?.title ?? "gallery-1"}
            fallbackSrc="/fallback-image.png"
            classNameProp="row-span-1 w-full h-[100%] bg-gray-500 rounded-lg object-cover cursor-pointer"
            skeletonClassName="rounded-lg"
            priority={false}
            width={500}
            height={500}
          />

          <ImageWithLoader
            src={props.activity_galleries[1]?.url}
            alt={props.activity_galleries[1]?.title ?? "gallery-2"}
            fallbackSrc="/fallback-image.png"
            classNameProp="row-span-1 w-full h-[100%] bg-gray-500 rounded-lg object-cover cursor-pointer"
            skeletonClassName="rounded-lg"
            priority={false}
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Tampilan untuk layar kecil */}
      <div className="small-content relative w-full max-w-full mx-auto md:hidden">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Simpan instance Swiper
          modules={[EffectFade, Autoplay, Navigation, Pagination]}
          onSlideChange={handleSlideChange}
          autoplay={false}
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
            {bannerImage.map((item, index) => {
              const isVideo = GlobalUtility.CheckAnyVideoFormat(item.url);
              const itemGallery = item as ActivityGalleryResponse;
              return (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center p-0 h-full">
                    {isVideo ? (
                      <div className="relative w-full h-full">
                        {!isVideoLoaded[index] && (
                          // Loader ditampilkan sampai video siap

                          <ImageWithLoader
                            src={item.url}
                            alt="main-banner"
                            fallbackSrc="/fallback-image.png"
                            classNameProp="zoom-animation w-full object-cover h-[400px]"
                            priority={false} // Gambar ini tidak diberi prioritas
                            width={400}
                            height={400}
                          />
                        )}
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[index] = el; // Simpan reference video
                          }}
                          poster={item?.video_thumbnail_url}
                          preload="none"
                          autoPlay
                          muted
                          loop={true} // Video tetap di-loop
                          className={`w-full h-[400px] object-cover ${
                            isVideoLoaded[index] ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-500`}
                          onCanPlayThrough={() => {
                            // Video sudah siap diputar
                            setIsVideoLoaded((prev) => {
                              const updated = [...prev];
                              updated[index] = true;
                              return updated;
                            });
                          }}
                          onPlay={stopAutoplay}
                        >
                          {isVisible && (
                            <source
                              src={itemGallery?.url}
                              type={`video/${isVideo}`}
                            />
                          )}
                        </video>
                      </div>
                    ) : (
                      <div className="relative h-full w-full">
                        <ImageWithLoader
                          src={itemGallery.url}
                          alt={itemGallery.title ?? "gallaries-" + index}
                          fallbackSrc="/fallback-image.png"
                          classNameProp="zoom-animation w-full object-cover h-[400px]"
                          priority={false} // Gambar ini tidak diberi prioritas
                          width={400}
                          height={400}
                        />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
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

      {/* <iframe src='https://widgets.sociablekit.com/tripadvisor-reviews/iframe/25577624' width='100%' height='1000'></iframe> */}
    </div>
  );
}

//https://widgets.sociablekit.com/tripadvisor-reviews/iframe/25577624
