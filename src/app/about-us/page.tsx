import { FooterFooterSection } from "../footer-components/footer.footer";
import { FooterHeroSection } from "../footer-components/footer.hero";
import { FooterNavbarSection } from "../footer-components/footer.navbar";
import { LargeNavbar } from "../global-components/large.navbar";
import { AboutUsMissionBST } from "./components/abous-us.mission";
import { AboutUsWhatYouGet } from "./components/about-us.get";
import { AboutUsHeroSection } from "./components/about-us.hero";
import { AboutUsLegality } from "./components/about-us.legality";
import { AboutUsWhatIsBST } from "./components/about-us.what";

export default function AboutUsFooter() {
  return (
    <>
      <FooterNavbarSection />
      <div className="pt-11 md:pt-22 lg:pt-[70px]">
        <AboutUsHeroSection />
        <AboutUsWhatIsBST />
        <AboutUsMissionBST />
        <AboutUsWhatYouGet />
        <AboutUsLegality />
      </div>
      <FooterFooterSection />
    </>
  );
}
