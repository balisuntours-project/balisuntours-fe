"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { BookingPackageResponse } from "@/app/responses/booking/response";
import { Button } from "@/components/ui/button";
import { PopupDetailBooking } from "./popup-detail.booking";
import { useBookingStore } from "@/app/store/booking.store";
import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { Coins } from "lucide-react";

export function DetailsBooking() {
  const selectedBooking = useBookingStore((state) => state.selectedBooking);
  return (
    <>
      <div>
        {selectedBooking ? (
          Object.entries(selectedBooking.packages).map(([itemKey, item]) => (
            <PopupDetailBooking
              key={`${itemKey}-${item.package_id}`}
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
