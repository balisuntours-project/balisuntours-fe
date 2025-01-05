"use client";

import { GoogleMapViewComponent } from "@/app/global-components/utility-components/google-map.view";
import { defaultBookingScopedState, useBookingStore } from "@/app/store/booking.store";

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
    const setBookingScopedState = useBookingStore((state) => state.setScopedState)

    const changeValue = (value: string) => {
        setBookingScopedState(baseUuid, 'checkoutPayload' , scopedBookingState.checkoutPayload ? {
            ...scopedBookingState.checkoutPayload,
            pickup_time: value
        } : undefined)
    }

    useEffect(() => {
           if(scopedBookingState.checkoutPayload){
                console.log(scopedBookingState.checkoutPayload)
            }
    }, [scopedBookingState.checkoutPayload])

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

          <div className="mt-auto p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="relative col-span-2">
              <Label htmlFor="pickup-time" className="font-bold">
                *Select Pickup Time (Required)
              </Label>
              <Select onValueChange={changeValue}>
                <SelectTrigger className="px-4 py-2">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pickup time</SelectLabel>
                        {pickupTimeList.length > 0 && pickupTimeList.map((time, key) => (
                            <SelectItem key={key} value={time}>{time}</SelectItem>
                        ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/*   <select
              v-model="
                                                packageOrderData[index]
                                                    .pickup_time
                                            "
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled selected>
                Select a time
              </option>
              <option
                v-if="
                                                    packageOrderData[index]
                                                        ?.default_pickup_time
                                                "
                v-for="(
                                                    time, key
                                                ) in packageOrderData[index]
                                                    .default_pickup_time"
                :key="key"
                                                :value="time"
              >
                 {{ time }}
              </option>
            </select> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
