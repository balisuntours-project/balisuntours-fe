"use client";

import { PopupDetailBooking } from "./popup-detail.booking";
import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { Coins } from "lucide-react";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";

export function DetailsBooking() {
  const selectedBooking = useAirportTransferStore((state) => state.selectedBooking);
  return (
    <>
      <div>
        {selectedBooking ? (
         selectedBooking.booking_vechile.map((item, itemKey) => (
            <PopupDetailBooking
              key={`${itemKey}}`}
              item={item}
            />
          ))
        ) : (
          <EmptyContent
            emptyText="We can't found your booking details"
            suggestionElement={
              <span>Please contact us, so we can check on it.</span>
            }
          >
            <Coins className="w-full h-full" />
          </EmptyContent>
        )}
      </div>
    </>
  );
}
