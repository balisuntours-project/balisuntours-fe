import { FooterFooterSection } from "../footer-components/footer.footer";
import { FooterNavbarSection } from "../footer-components/footer.navbar";
import { PartnerFormSection } from "./components/partner.form";
import { PartnerHeroSection } from "./components/partner.hero";

export default function PartnerInquiry() {
  return (
    <>
      <FooterNavbarSection />
      <div className="pt-11 md:pt-22 lg:pt-[70px]">
        <PartnerHeroSection />
        <PartnerFormSection />
      </div>
      <FooterFooterSection />
    </>
  );
}
