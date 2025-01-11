"use client";

import { LandingPageSearchBoxUtility } from "./utility-components/landing-page.searchbox";

import { LandingPageMenuBar } from "./landing-page.menubar";

import { HeroBannerComponent } from "./utility-components/hero-swiper.hero";

export function LandingPageHeroSection() {
  return (
    <>
      <HeroBannerComponent>
        <LandingPageSearchBoxUtility />
      </HeroBannerComponent>

      <div className="block md:hidden w-full max-w-full mx-auto">
        <LandingPageMenuBar />
      </div>
    </>
  );
}
