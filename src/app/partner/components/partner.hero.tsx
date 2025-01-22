import { FooterHeroSection } from "@/app/footer-components/footer.hero";

export function PartnerHeroSection() {
  return (
    <>
      <FooterHeroSection bannerHeroUrl="/rafting.jpg">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 md:-translate-y-1/4 lg:-translate-y-1/2 w-[100%] bg-opacity-90 text-center p-6 z-10">
          <h1 className="text-xl md:text-3xl font-semibold text-white">
            Collaborate, Expand, and Grow Together.
          </h1>
          <h2 className="text-base md:text-lg text-white mt-3">
            Join our partnership program and elevate your business!
          </h2>
        </div>
      </FooterHeroSection>
    </>
  );
}
