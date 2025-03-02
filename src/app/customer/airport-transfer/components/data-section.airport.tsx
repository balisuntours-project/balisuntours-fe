"use client";

import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { AdvantagesAirportTransferSection } from "./advantages.airport";
import { VechileServiceAirportTransfer } from "./vechile-list.airport";

export function DataSectionAirportTransfer() {
  const onInteractWithSearch = useAirportTransferStore(
    (state) => state.onInteractWithSearch
  );
  return (
    <>
      <div className="w-full max-w-[90%] mx-auto lg:mt-24">
        <div className="flex flex-col gap-4">
          {onInteractWithSearch ? (
            <VechileServiceAirportTransfer />
          ) : (
            <AdvantagesAirportTransferSection />
          )}
        </div>
      </div>
    </>
  );
}
