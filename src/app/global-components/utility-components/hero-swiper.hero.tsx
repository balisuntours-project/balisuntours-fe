"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "../../styles/landing-page.hero.css";

import { BANNER_LANDING_PAGE } from "@/lib/global-static-images.const";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";

export function HeroBannerComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const swiperRef = useRef<SwiperInstance | null>(null); // Reference untuk mengontrol Swiper
  const videoTimers = useRef<NodeJS.Timeout | null>(null); // Reference untuk timer
  const videoRefs = useRef<HTMLVideoElement[]>([]);

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
      const currentItem = BANNER_LANDING_PAGE[currentSlideIndex];
      const isVideo = currentItem?.endsWith(".mp4");

      clearVideoTimer(); // Bersihkan timer sebelumnya

      if (isVideo) {
        stopAutoplay(); // Matikan autoplay
        const videoDuration = 19300; // Dapatkan durasi video (24 - 4 (4 detik durasi delay))

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
    new Array(BANNER_LANDING_PAGE.length).fill(false) // Default: semua video belum siap
  );

  const isSSR = typeof window === "undefined";

  return (
    <>
      <div className="relative w-full max-w-full mx-auto hidden md:block">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Simpan instance Swiper
          onSlideChange={handleSlideChange} // Panggil saat slide berubah
          modules={[EffectFade, Autoplay, Navigation]}
          autoplay={false} // Nonaktifkan autoplay secara default
          pagination={{ clickable: true }}
          loop={true}
          effect={"fade"}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          className="w-full h-[500px] md:h-[650px] lg:h-[600px]"
        >
          {BANNER_LANDING_PAGE.map((item, index) => {
            const isVideo = item?.endsWith(".mp4");
            return (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center p-0 h-full">
                  {isVideo ? (
                    <div className="relative w-full h-full">
                      {!isVideoLoaded[index] && (
                        // Loader ditampilkan sampai video siap
                        <Image
                          src="/banner-thumbnail.jpg"
                          alt={`Image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          priority
                          className="zoom-animation brightness-75"
                        />
                      )}
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el; // Simpan reference video
                        }}
                        poster="/banner-thumbnail.jpg"
                        preload="none"
                        autoPlay
                        muted
                        loop={true} // Video tetap di-loop
                        className={`w-full h-full object-cover ${
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
                        {isVisible && <source src={item} type="video/mp4" />}
                      </video>
                    </div>
                  ) : (
                    <Image
                      src={item}
                      alt={`Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      priority
                      className="zoom-animation brightness-75"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Box Overlay */}
        {children}
      </div>
    </>
  );
}
