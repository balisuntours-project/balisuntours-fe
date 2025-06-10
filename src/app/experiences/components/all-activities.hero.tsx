"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "../../styles/landing-page.hero.css";
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
