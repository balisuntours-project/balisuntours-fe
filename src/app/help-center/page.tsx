import { FooterFooterSection } from "../footer-components/footer.footer";
import { FooterNavbarSection } from "../footer-components/footer.navbar";
import { LandingPageFAQ } from "../global-components/landing-page-faq.activity";
import { HelpCenterHeroSection } from "./components/help-center.hero";

export default function HelpCenterPage() {
    return (
        <>
            <FooterNavbarSection />
                 <div className="pt-11 md:pt-22 lg:pt-[70px]">
                   <HelpCenterHeroSection />
                    <div className="container px-3 md:px-8 pb-11">
                         <LandingPageFAQ />
                    </div>
                 </div>
                 <FooterFooterSection />
        </>
    )
}