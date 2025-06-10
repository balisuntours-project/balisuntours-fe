import { LargeNavbar } from "@/app/global-components/large.navbar";
import { HeroSectionAirportTransfer } from "./components/hero.airport";
import { SearchVechileInputFormCard } from "./utility-components/search-vechile-form.card";
import { DataSectionAirportTransfer } from "./components/data-section.airport";
import { LandingPageFooterSection } from "@/app/global-components/landing-page.footer";
import { notFound } from "next/navigation";

export default function AiportTransferPage() {
  notFound();
  return (
    <>
      <LargeNavbar />
      <div className="pt-20 md:pt-22 lg:pt-24">
        <div className="pb-4 md:pb-4 lg:pb-0">
          <HeroSectionAirportTransfer>
            <SearchVechileInputFormCard />
          </HeroSectionAirportTransfer>
        </div>
        <div className=" flex flex-col gap-11 md:pt-14 lg:pt-0 pb-16">
          <DataSectionAirportTransfer />
          </div>
        <hr />
        <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
          <LandingPageFooterSection className="mb-24 md:mb-0" />
        </div>
      </div>
    </>
  );
}
