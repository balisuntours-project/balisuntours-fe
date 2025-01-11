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
import { HeroBannerComponent } from "@/app/global-components/utility-components/hero-swiper.hero";

export function AllActivitiesHero() {
 
  return (
    <>
      <HeroBannerComponent>
        <AllActivitiesTitleHero />
      </HeroBannerComponent>

    </>
  );
}
