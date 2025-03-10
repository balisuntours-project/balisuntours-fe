import { FooterHeroSection } from "@/app/footer-components/footer.hero";

export function AboutUsHeroSection() {
  return (
    <>
      <FooterHeroSection bannerHeroUrl="/about-us-banner.jpeg" additionalImageStyle="object-[center_75%]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 md:-translate-y-1/4 lg:-translate-y-1/2 w-[100%] bg-opacity-90 text-center p-6 z-10">
          <h1 className="text-xl md:text-3xl font-semibold text-white">
            Explore, Relax, and Let Us Handle the Rest.
          </h1>
          <h2 className="text-base md:text-lg text-white mt-3">
            Here you go!
          </h2>
        </div>
      </FooterHeroSection>
    </>
  );
}
