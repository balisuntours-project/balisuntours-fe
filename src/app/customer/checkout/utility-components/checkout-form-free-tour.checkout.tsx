"use client";

import { CheckoutFreeTourTypeViewParamater } from "@/app/paramaters/booking/paramater";
import {
  defaultBookingScopedState,
  useBookingStore,
} from "@/app/store/booking.store";
import { AdormentInput } from "@/components/ui/adorment-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";
import { FormEvent, useEffect, useState } from "react";
import { useCheckoutBookingProvider } from "../provider/checkout-booking.provider";
import { CHECKOUT_INPUT_STYLE } from "@/lib/global.constant";

export function CheckoutFormFreeTourType({
  pickupTimeList,
  minCost,
  baseUuid,
  finalPrice,
  totalQty,
  priceInformation,
  defaultTravellerSpend,
}: CheckoutFreeTourTypeViewParamater) {
  const scopedBookingState = useBookingStore(
    (state) => state.bookingScopedState[baseUuid] || defaultBookingScopedState
  );
  const setBookingScopedState = useBookingStore(
    (state) => state.setScopedState
  );

  const currencyValue = useBookingStore((state) => state.currencyValue);
  const checkoutAmount = useBookingStore((state) => state.checkoutAmount);
  const setCheckoutAmount = useBookingStore((state) => state.setCheckoutAmount);
  const isCheckoutButtonTriggered = useBookingStore(
    (state) => state.isCheckoutButtonTriggered
  );
  const setIsCheckoutButtonTriggered = useBookingStore((state) => state.setIsCheckoutButtonTriggered);

  const [minimumSpendMessage, setMinimumSpendMessage] = useState("");
  const validateInputFlatPrice = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (Number(input.value) < minCost) {
      setMinimumSpendMessage(
        `Please input price at minimum of Hundred Thousand Rupiah (5 zeros)`
      );
    } else {
      setMinimumSpendMessage("");
    }

    const regex = /^\d*\.?\d*$/; // Regex untuk angka dengan atau tanpa desimal

    const inputedPrice: number = Number(input.value);
    // Hanya simpan nilai jika sesuai dengan regex
    if (regex.test(input.value)) {
      setCheckoutAmount(
        checkoutAmount +
          inputedPrice -
          (scopedBookingState.checkoutPayload
            ? scopedBookingState.checkoutPayload?.final_price
            : 0)
      );

      setBookingScopedState(
        baseUuid,
        "checkoutPayload",
        scopedBookingState.checkoutPayload
          ? {
              ...scopedBookingState.checkoutPayload,
              free_tour_traveller_spend: inputedPrice,
              final_price: inputedPrice,
            }
          : undefined
      );
    }
  };

  //diambil dari context provider
  const { planningItineraryRef, pickupTimeRef, freeTourServiceRef } =
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
        freeTourServiceRef.current &&
        (!scopedBookingState.checkoutPayload?.free_tour_traveller_spend ||
          (scopedBookingState.checkoutPayload.free_tour_traveller_spend &&
            scopedBookingState.checkoutPayload.free_tour_traveller_spend <
              minCost))
      ) {
        freeTourServiceRef.current.classList.remove("hidden");
        freeTourServiceRef.current.classList.add("block");
        freeTourServiceRef.current.scrollIntoView({
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
    if (scopedBookingState.checkoutPayload) {
      if (scopedBookingState.checkoutPayload.pickup_time && pickupTimeRef.current) {
        pickupTimeRef.current.classList.add("hidden");
        pickupTimeRef.current.classList.remove("block");
      }

      if (scopedBookingState.checkoutPayload.planned_place_to_visit && planningItineraryRef.current) {
        planningItineraryRef.current.classList.add("hidden");
        planningItineraryRef.current.classList.remove("block");
      }

      if (scopedBookingState.checkoutPayload.free_tour_traveller_spend && scopedBookingState.checkoutPayload.free_tour_traveller_spend > minCost && freeTourServiceRef.current) {
        freeTourServiceRef.current.classList.add("hidden");
        freeTourServiceRef.current.classList.remove("block");
      }
    }
  }, [scopedBookingState.checkoutPayload]);

  return (
    <>
      <div className="mt-2 lg:mt-4">
        <Label
          htmlFor="map-input"
          className="text-xs mb-1 sm:text-sm text-gray-500"
        >
          *This is a free tour, cost start from{" "}
          <span className="font-bold">
            {GlobalUtility.IdrCurrencyFormat(minCost)} for {totalQty}{" "}
            {priceInformation}
          </span>
          , and you can go visit best attractions
        </Label>
        <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
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
              Oh, you did'nt fill planning yet!
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="departure-title" className="font-bold">
              *How much is worth to pay for this service?
            </Label>
            <AdormentInput
              type="number"
              required
              onChange={(e) => validateInputFlatPrice(e)}
              placeholder="700000"
              className="flex-grow w-full px-4 py-2 text-base md:text-sm focus:outline-none min-h-full"
              startAdornment={
                <span className="bg-[#5FA22A] text-white rounded-l-md text-xs sm:text-sm px-4 flex items-center justify-center h-full w-auto">
                  Rp
                </span>
              }
              endAdornment={
                <span className="bg-[#5FA22A] text-white rounded-r-md text-xs sm:text-sm px-4 flex items-center justify-center h-full w-auto">
                  {currencyValue ? (
                    GlobalUtility.ConvertionCurrencyFormat(
                      scopedBookingState.checkoutPayload
                        ?.free_tour_traveller_spend ?? 0,
                      currencyValue,
                      CurrencyListEnum.usd
                    )
                  ) : (
                    <span>...</span>
                  )}
                </span>
              }
            />

            {!minimumSpendMessage ? (
              <p className="text-xs text-gray-400">
                Price shown here is the minimum cost in Indonesian Rupiah (IDR),
                please input it manually as you wish (e.g 700000)
              </p>
            ) : (
              <p className="text-xs text-red-400">{minimumSpendMessage}</p>
            )}
            <p
              className="activity-date-info text-xs md:text-sm text-red-500 hidden"
              ref={freeTourServiceRef}
            >
              how much it worth?!
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="pickup-time" className="font-bold">
              *Select your preferred pickup time
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
              Oh, you did'nt pick a time yet!
            </p>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
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
    </>
  );
}
