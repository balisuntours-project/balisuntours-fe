import { LargeNavbar } from "@/app/global-components/large.navbar";
import { HeroSectionAirportTransfer } from "./components/hero.airport";
import { SearchVechileInputFormCard } from "./utility-components/search-vechile-form.card";

export default function AiportTransferPage() {
  return (
    <>
      <LargeNavbar />
      <div className="pt-11 md:pt-22 lg:pt-24">
        <HeroSectionAirportTransfer>
            <SearchVechileInputFormCard />
        </HeroSectionAirportTransfer>
      </div>
    </>
  );
}
