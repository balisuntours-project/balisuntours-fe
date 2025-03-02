import { LargeNavbar } from "@/app/global-components/large.navbar";
import { HeroSectionAirportTransfer } from "./components/hero.airport";
import { SearchVechileInputFormCard } from "./utility-components/search-vechile-form.card";
import { VechileServiceAirportTransfer } from "./components/vechile-list.airport";
import { DataSectionAirportTransfer } from "./components/data-section.airport";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";

export default function AiportTransferPage() {
  return (
    <>
      <LargeNavbar />
      <div className="pt-11 md:pt-22 lg:pt-24">
        <div className="pb-0">
          <HeroSectionAirportTransfer>
            <SearchVechileInputFormCard />
          </HeroSectionAirportTransfer>
        </div>
        <div className=" flex flex-col gap-11 md:pt-14 lg:pt-0 pb-11">
          <DataSectionAirportTransfer />
          </div>
        <hr />
        <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          <LandingPageFooterSection />
        </div>
      </div>
    </>
  );
}
