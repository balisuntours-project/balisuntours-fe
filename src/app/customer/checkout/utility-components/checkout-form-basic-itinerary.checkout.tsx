"use client";

import { GoogleMapDialogComponent } from "@/app/global-components/utility-components/google-map.dialog";
import { CheckoutBasicItineraryPayloadData } from "@/app/paramaters/booking/paramater";
import {
  defaultBookingScopedState,
  useBookingStore,
} from "@/app/store/booking.store";
import { AdormentInput } from "@/components/ui/adorment-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "@/lib/global.constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import { useEffect } from "react";

export function CheckoutFormBasicItineraryType({
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

  const dataPayload: CheckoutBasicItineraryPayloadData = scopedBookingState
    .checkoutPayload?.departure
    ? {
        lat: scopedBookingState.checkoutPayload.departure
          ?.departure_map_coordinate.lat,
        lng: scopedBookingState.checkoutPayload.departure
          ?.departure_map_coordinate.lng,
        zoom: 18,
        departure_title:
          scopedBookingState.checkoutPayload.departure.departure_title,
        departure_map_location:
          scopedBookingState.checkoutPayload.departure.departure_map_location ??
          "Venue",
        pickup_time_list:
          scopedBookingState.checkoutPayload.default_pickup_time,
        departure_additional_information:
          scopedBookingState.checkoutPayload.departure.departure_description ??
          "No additional informations",
      }
    : {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
        zoom: DEFAULT_ZOOM,
        departure_title: "Meet at venue",
        departure_map_location: "Venue",
        pickup_time_list: [],
        departure_additional_information: "No additional informations",
      };

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

  return (
    <>
      <div className="mt-2 lg:mt-4">
        <Label
          htmlFor="map-input"
          className="text-xs mb-1 sm:text-sm text-gray-500"
        >
          *The following is the Pickup/Meet Up Information for this activity
        </Label>
        <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="departure-title" className="font-bold">
              Meet up information
            </Label>
            <Input
              placeholder="Pickup/Meet Up Information"
              readOnly
              required
              value={dataPayload.departure_title}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="pickup-time" className="font-bold">
              *Select meet up time
            </Label>
            <Select onValueChange={changeValue}>
              <SelectTrigger className="px-4 py-2">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pickup time</SelectLabel>
                  {dataPayload.pickup_time_list.length > 0 &&
                    dataPayload.pickup_time_list.map((time, key) => (
                      <SelectItem key={key} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <Label htmlFor="departure-title" className="font-bold">
              Meetup location
            </Label>

            <div className="relative cursor-pointer">
              <GoogleMapDialogComponent readonlyMap={true} scopedId={baseUuid}>
                <AdormentInput
                  placeholder="Departure Location"
                  readOnly
                  required
                  className="pl-10 pr-4 py-2 border cursor-pointer rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-full"
                  value={dataPayload.departure_map_location}
                  startAdornment={
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🗺️
                    </i>
                  }
                />
              </GoogleMapDialogComponent>
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <Label htmlFor="departure-title" className="font-bold">
              Additional information
            </Label>
            <div
              className="px-4 py-2 text-gray-500"
              dangerouslySetInnerHTML={{
                __html: dataPayload.departure_additional_information,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
