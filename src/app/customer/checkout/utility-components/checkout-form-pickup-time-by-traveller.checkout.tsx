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
import { useCheckoutBookingProvider } from "../provider/checkout-booking.provider";
import { defaultScopedMapCoordinate, useGoogleMapStore } from "@/app/store/google-map.store";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";

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
  const isCheckoutButtonTriggered = useBookingStore(
    (state) => state.isCheckoutButtonTriggered
  );
  const setIsCheckoutButtonTriggered = useBookingStore((state) => state.setIsCheckoutButtonTriggered);

  const { planningItineraryRef, pickupTimeRef, mapLocationRef } =
    useCheckoutBookingProvider();

  useEffect(() => {
    if (isCheckoutButtonTriggered) {
        setIsCheckoutButtonTriggered(false)
      if (
        planningItineraryRef.current &&
        !scopedBookingState.checkoutPayload?.planned_place_to_visit
      ) {
        planningItineraryRef.current.classList.remove("hidden");
        planningItineraryRef.current.classList.add("block");
        planningItineraryRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

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
        scopedBookingState.checkoutPayload.planned_place_to_visit &&
        planningItineraryRef.current
      ) {
        planningItineraryRef.current.classList.add("hidden");
        planningItineraryRef.current.classList.remove("block");
      }

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
            className="text-xs mb-1 md:text-md text-gray-500"
          >
            *Pickup location & map
            <span className="italic">
              (NOTE: Pick-up points outside the
              {" "}<span className="font-bold">(Coverage Pickup Location){" "}</span>
              areas will incur additional charges)
            </span>
          </Label>

          <div className="relative">
            <div className="w-full h-[250px] md:h-[400px] mt-2">
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
            <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
          <div className="flex flex-col gap-1 col-span-2">
            <Label htmlFor="planned-place" className="font-bold">
              *Fill out your planning itinerary
            </Label>
            <Textarea
              required
              placeholder="Your planning itinerary, example: &#10;Monkey forest,&#10;Rice Terrace,&#10;Uluwatu Temple,&#10;etc,"
              onChange={(e) =>
                setBookingScopedState(
                  baseUuid,
                  "checkoutPayload",
                  scopedBookingState.checkoutPayload
                    ? {
                        ...scopedBookingState.checkoutPayload,
                        planned_place_to_visit: e.target.value,
                      }
                    : undefined
                )
              }
              className={CHECKOUT_INPUT_STYLE}
            ></Textarea>
            <p
              className="activity-date-info text-xs md:text-sm text-red-500 hidden"
              ref={planningItineraryRef}
            >
              Where is your planning?
            </p>
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
                setBookingScopedState(
                  baseUuid,
                  "checkoutPayload",
                  scopedBookingState.checkoutPayload
                    ? {
                        ...scopedBookingState.checkoutPayload,
                        pickup_time: e.target.value,
                      }
                    : undefined
                )
              }
              className={CHECKOUT_INPUT_STYLE}
            />
            <p
              className="activity-date-info text-xs md:text-sm text-red-500 hidden"
              ref={pickupTimeRef}
            >
              What time should we pick you up?
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="note" className="font-bold">
              Note
            </Label>
            <Textarea
              onChange={(e) =>
                setBookingScopedState(
                  baseUuid,
                  "checkoutPayload",
                  scopedBookingState.checkoutPayload
                    ? {
                        ...scopedBookingState.checkoutPayload,
                        note: e.target.value,
                      }
                    : undefined
                )
              }
              className={CHECKOUT_INPUT_STYLE}
              id="note"
              placeholder="Leave note for us..."
            ></Textarea>
          </div>
        </div>
          </div>
        </div>

       
      </div>
    </>
  );
}
