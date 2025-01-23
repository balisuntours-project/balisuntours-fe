import { FooterFooterSection } from "../footer-components/footer.footer";
import { FooterNavbarSection } from "../footer-components/footer.navbar";
import { CharityContent } from "./components/charity.content";
import { CharityHero } from "./components/charity.hero";

export default function CharityFooter() {
  return (
    <>
      <FooterNavbarSection />
      <div className="pt-11 md:pt-22 lg:pt-[70px]">
        <CharityHero />
       <div className="md:container px-3 md:px-8 pt-11 pb-11 w-full max-w-full">
       <CharityContent />
       </div>
      </div>
      <FooterFooterSection />
    </>
  );
}
