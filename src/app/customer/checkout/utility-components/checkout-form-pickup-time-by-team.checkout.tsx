"use client";

import { GoogleMapViewComponent } from "@/app/global-components/utility-components/google-map.view";
import {
  defaultBookingScopedState,
  useBookingStore,
} from "@/app/store/booking.store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export function CheckoutFormPickupTimeByTeamType({
  pickupTimeList,
  baseUuid,
}: {
  pickupTimeList: Array<string>;
  baseUuid: string;
}) {
  const scopedBookingState = useBookingStore(
    (state) => state.bookingScopedState[baseUuid] || defaultBookingScopedState
  );
  const setBookingScopedState = useBookingStore(
    (state) => state.setScopedState
  );

  useEffect(() => {
        console.log(scopedBookingState.checkoutPayload)
  }, [scopedBookingState.checkoutPayload])

  return (
    <>
      <div className="mt-2 lg:mt-4">
        <div className="flex flex-col">
          <Label
            htmlFor="map-input"
            className="text-xs mb-1 md:text-md text-gray-500"
          >
            *Pickup location & map
            <span className="italic">
              (NOTE: Pick-up points outside the
              <span className="font-bold">(Coverage Pickup Location)</span>
              areas will incur additional charges)
            </span>
          </Label>

          <div className="relative">
            <div className="w-full h-[250px] lg:h-[400px] mt-2">
              <GoogleMapViewComponent
                scopedId={baseUuid}
                withSearchAutoComplete={true}
                readonlyMap={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col gap-1 col-span-2">
            <Label htmlFor="planned-place" className="font-bold">
              *Fill out your planning itinerary
            </Label>
            <Textarea
              required
              placeholder="Your planning itinerary, example: &#10;Monkey forest,&#10;Rice Terrace,&#10;Uluwatu Temple,&#10;etc,"
              onChange={(e) =>
                setBookingScopedState(baseUuid, "checkoutPayload", scopedBookingState.checkoutPayload ? {
                    ...scopedBookingState.checkoutPayload,
                    planned_place_to_visit: e.target.value,
                  } : undefined)
              }
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></Textarea>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="pickup-time" className="font-bold">
              *Pickup Time
            </Label>
            <Input
              type="time"
              placeholder="Pickup time"
              required
              onChange={(e) =>
                setBookingScopedState(baseUuid, "checkoutPayload", scopedBookingState.checkoutPayload ? {
                    ...scopedBookingState.checkoutPayload,
                    pickup_time: e.target.value,
                  } : undefined)
              }
              className=" py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        

          <div className="flex flex-col gap-1">
            <Label htmlFor="note" className="font-bold">
              Note
            </Label>
            <Textarea
              onChange={(e) =>
                setBookingScopedState(baseUuid, "checkoutPayload", scopedBookingState.checkoutPayload ? {
                    ...scopedBookingState.checkoutPayload,
                    note: e.target.value,
                  } : undefined)
              }
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              id="note"
              placeholder="Leave note for us..."
            ></Textarea>
          </div>
        </div>
      </div>
    </>
  );
}
