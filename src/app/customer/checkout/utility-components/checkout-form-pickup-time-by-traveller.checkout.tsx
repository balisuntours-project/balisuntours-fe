"use client";

import { GoogleMapViewComponent } from "@/app/global-components/utility-components/google-map.view";
import {
  defaultBookingScopedState,
  useBookingStore,
} from "@/app/store/booking.store";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useCheckoutBookingProvider } from "../provider/checkout-booking.provider";
import { defaultScopedMapCoordinate, useGoogleMapStore } from "@/app/store/google-map.store";

export function CheckoutFormPickupTimeByTravellerType({
  pickupTimeList,
  baseUuid,
}: {
  pickupTimeList: Array<string>;
  baseUuid: string;
}) {
  const scopedBookingState = useBookingStore(
    (state) => state.bookingScopedState[baseUuid] || defaultBookingScopedState
  );
  const scopedMapState = useGoogleMapStore(
    (state) => state.mapScopedState[baseUuid] || defaultScopedMapCoordinate
  );
  const setBookingScopedState = useBookingStore(
    (state) => state.setScopedState
  );
  const setIsCheckoutButtonTriggered = useBookingStore((state) => state.setIsCheckoutButtonTriggered);

  const changeValue = (value: string) => {
    setBookingScopedState(
      baseUuid,
      "checkoutPayload",
      scopedBookingState.checkoutPayload
        ? {
            ...scopedBookingState.checkoutPayload,
            pickup_time: value,
          }
        : undefined
    );
  };

  const isCheckoutButtonTriggered = useBookingStore(
    (state) => state.isCheckoutButtonTriggered
  );

  const { pickupTimeRef, mapLocationRef } = useCheckoutBookingProvider();

  useEffect(() => {
    if (isCheckoutButtonTriggered) {
        setIsCheckoutButtonTriggered(false)
      if (
        mapLocationRef.current &&
        !scopedMapState.mapScopedPayload?.name
      ) {
        mapLocationRef.current.classList.remove("hidden");
        mapLocationRef.current.classList.add("block");
        mapLocationRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      if (
        pickupTimeRef.current &&
        !scopedBookingState.checkoutPayload?.pickup_time
      ) {
        pickupTimeRef.current.classList.remove("hidden");
        pickupTimeRef.current.classList.add("block");
        pickupTimeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isCheckoutButtonTriggered]);

  useEffect(() => {
    if(scopedMapState.mapScopedPayload) {
        if (
            scopedMapState.mapScopedPayload.name &&
            mapLocationRef.current
          ) {
            mapLocationRef.current.classList.add("hidden");
            mapLocationRef.current.classList.remove("block");
          }
    }

    if (scopedBookingState.checkoutPayload) {
      if (
        scopedBookingState.checkoutPayload.pickup_time &&
        pickupTimeRef.current
      ) {
        pickupTimeRef.current.classList.add("hidden");
        pickupTimeRef.current.classList.remove("block");
      }
    }
  }, [scopedBookingState.checkoutPayload, scopedMapState.mapScopedPayload]);

  return (
    <>
      <div className="mt-2 lg:mt-4">
        <div className="flex flex-col">
          <Label
            htmlFor="map-input"
            className="text-xs mb-1 sm:text-sm text-gray-500"
          >
            *Pickup location & map
            <span className="italic">
              (NOTE: Pick-up points outside the
              <span className="font-bold">{" "}(Coverage Pickup Location){" "}</span>
              areas will incur additional charges)
            </span>
          </Label>

          <div className="relative">
            <div className="w-full h-[250px] lg:h-[400px] mt-2">
              <p
                className="activity-date-info text-xs md:text-sm text-red-500 hidden"
                ref={mapLocationRef}
              >
                Where will we pick you up?
              </p>
              <GoogleMapViewComponent
              mapStyle="w-full h-[200px] md:h-[350px]"
                scopedId={baseUuid}
                withSearchAutoComplete={true}
                readonlyMap={false}
              />
            </div>
          </div>

          <div className="mt-auto p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="relative col-span-2">
              <Label htmlFor="pickup-time" className="font-bold">
                *Select Pickup Time
              </Label>
              <Select onValueChange={changeValue}>
                <SelectTrigger className="px-4 py-2 text base md:text-sm">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pickup time</SelectLabel>
                    {pickupTimeList.length > 0 &&
                      pickupTimeList.map((time, key) => (
                        <SelectItem key={key} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p
                className="activity-date-info text-xs md:text-sm text-red-500 hidden"
                ref={pickupTimeRef}
              >
                What time should we pick you up?
              </p>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
