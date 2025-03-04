"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SearchVechileSchema } from "../validation/search-vechile.validation";
import { z } from "zod";
import { GoogleMapViewComponent } from "@/app/global-components/utility-components/google-map.view";
import { CheckoutButton } from "@/app/global-components/utility-components/checkout.button";
import { act, useEffect, useRef, useState } from "react";
import { GetPriceMethodTypeEnum, TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import {
  defaultScopedMapCoordinate,
  useGoogleMapStore,
} from "@/app/store/google-map.store";
import { AirportTransferAction } from "@/app/actions/airport-transfer/action";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDatePickerStore } from "@/app/store/date-picker.store";
import { GlobalUtility } from "@/lib/global.utility";
import { DateTimePicker } from "./date-time-picker.input";
import { GetVechileRecomendationsParamater } from "@/app/paramaters/airport-transfer/paramater";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { InputSkeleton } from "@/app/skeletons-component/input.skeleton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  AIPORT_BALI_COORDINATE,
  AIPORT_TRANSFER_KEY_FOR_SCOPED_MAP,
  AIRPORT_BALI_NAME,
  AIRPORT_PLACE_ID,
} from "@/app/constants/airport-transfer/airport-transfer.constant";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";

export function SearchVechileInputFormCard() {
  const selectedDate = useDatePickerStore((state) => state.selectedDate);
  const setSelectedDate = useDatePickerStore((state) => state.setSelectedDate);
  const [transferType, setTransferType] = useState<TransferTypeEnum>(
    TransferTypeEnum.airportToHotel
  );
  const [administrativeLvl3, setAdministrativeLvl3] = useState<null | string>(
    null
  );
  const [administrativeLvl4, setAdministrativeLvl4] = useState<null | string>(
    null
  );
  const [originPlaceID, setOriginPlaceID] = useState<undefined | string>(
    undefined
  );
  const [destinationPlaceID, setDestinationPlaceID] = useState<
    undefined | string
  >(undefined);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const { toast } = useToast();

  const scopedMapState = useGoogleMapStore(
    (state) =>
      state.mapScopedState[AIPORT_TRANSFER_KEY_FOR_SCOPED_MAP!] ||
      defaultScopedMapCoordinate
  );
  const setOnInteractWithSearch = useAirportTransferStore(
    (state) => state.setOnInteractWithSearch
  );
  const setBookingBaseData = useAirportTransferStore(
    (state) => state.setBookingBaseData
  );
  const originCoordinate = useAirportTransferStore(
    (state) => state.originCoordinate
  );
  const setOriginCoordinate = useAirportTransferStore(
    (state) => state.setOriginCoordinate
  );
  const destinationCoordinate = useAirportTransferStore(
    (state) => state.destinationCoordinate
  );
  const setDestinationCoordinate = useAirportTransferStore(
    (state) => state.setDestinationCoordinate
  );

  const onSearch = useAirportTransferStore((state) => state.onSearch);
  const setOnSearch = useAirportTransferStore((state) => state.setOnSearch);
  const setRecomendedVechiles = useAirportTransferStore(
    (state) => state.setRecomendedVechiles
  );
  const setIdleRecomendedVechiles = useAirportTransferStore(
    (state) => state.setIdleRecomendedVechiles
  );
  const setRangeVechilePrice = useAirportTransferStore(
    (state) => state.setRangeVechilePrice
  );

  const baliAirportCoordinate = AIPORT_BALI_COORDINATE;
  const SearchVecileForm = useForm<z.infer<typeof SearchVechileSchema>>({
    resolver: zodResolver(SearchVechileSchema),
    defaultValues: {
      transfer_type: transferType,
      origin:
        transferType == TransferTypeEnum.airportToHotel
          ? AIRPORT_BALI_NAME
          : "",
      destination:
        transferType == TransferTypeEnum.airportToHotel
          ? ""
          : AIRPORT_BALI_NAME,
      total_passanger: 2,
      transfer_date_time: "",
      origin_coordinate: null,
      destination_coordinate: null,
      administrative_area_level_3: null,
      administrative_area_level_4: null,
    },
  });

  const transferDateTimeRef = useRef<HTMLParagraphElement>(null);
  const originRef = useRef<HTMLParagraphElement>(null);
  const destinationRef = useRef<HTMLParagraphElement>(null);

  const handleSearchVechile = async (
    values: z.infer<typeof SearchVechileSchema>
  ) => {
    // Daftar validasi dan ref yang diperlukan
    const validations = [
      { condition: !origin, ref: originRef },
      {
        condition: !destination,
        ref: destinationRef,
      },
      {
        condition: !selectedDate,
        ref: transferDateTimeRef,
      },
    ];

    // Loop melalui validasi dan tampilkan pesan jika ada yang tidak valid
    if (!origin || !destination || !selectedDate) {
      for (const { condition, ref } of validations) {
        if (condition) {
          if (ref.current) {
            ref.current.classList.remove("hidden");
            ref.current.classList.add("block");
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }

      return;
    }

    // if (!administrativeLvl3 && !administrativeLvl4) {
    //   return;
    // }

    if (!originCoordinate || !destinationCoordinate) {
      toast({
        description: `Select valid location!`,
        variant: "danger",
      });
      return;
    }

    const paramater: GetVechileRecomendationsParamater = {
      administrative_area_level_3: administrativeLvl3,
      administrative_area_level_4: administrativeLvl4,
      origin: origin,
      destination: destination,
      origin_coordinate: JSON.stringify(originCoordinate),
      origin_place_id: originPlaceID,
      destination_place_id: destinationPlaceID,
      destination_coordinate: JSON.stringify(destinationCoordinate),
      transfer_date_time: format(selectedDate, "yyyy-MM-dd HH:mm:ss"),
      transfer_type: transferType,
      total_passanger: values.total_passanger,
    };

    setBookingBaseData({
      transfer_type: transferType,
      vechile_price_method_type: GetPriceMethodTypeEnum.dinamicByDistance,
      origin: origin,
      destination: destination,
      origin_coordinate: JSON.stringify(originCoordinate),
      destination_coordinate: JSON.stringify(destinationCoordinate),
      total_passanger: values.total_passanger,
      transfer_date_time: format(selectedDate, "yyyy-MM-dd HH:mm:ss"),
    })

    setOnSearch(true);
    const action = await AirportTransferAction.GetVechilRecomendationRequest(
      paramater
    );
    setOnSearch(false);

    if (!action.success) {
      //set state2 ke default
      setOnInteractWithSearch(true);
      setIdleRecomendedVechiles([]);
      setRecomendedVechiles([]);
      setRangeVechilePrice({
        lowest: 0,
        highest: 0,
      });

      toast({
        description: `${action.data}`,
        variant: "danger",
      });

      return;
    }

    setOnInteractWithSearch(true);
    setRecomendedVechiles(action.data);
    setIdleRecomendedVechiles(action.data);
    if (action.data.length > 0) {
      const prices = action.data.map((vechile) => vechile.price);

      const lowestPrice = Math.min(...prices);
      const highestPrice = Math.max(...prices);

      setRangeVechilePrice({
        lowest: lowestPrice,
        highest: highestPrice,
      });
    } else {
      setRangeVechilePrice({
        lowest: 0,
        highest: 0,
      });
    }
  };

  const handleAirportToHotelMap = () => {
    if (scopedMapState.mapScopedPayload) {
      setOriginCoordinate(baliAirportCoordinate);
      setOriginPlaceID(AIRPORT_PLACE_ID);
      setOrigin(AIRPORT_BALI_NAME);

      setDestinationCoordinate({
        lat: scopedMapState.mapScopedPayload.lat,
        lng: scopedMapState.mapScopedPayload.lng,
      });
      setDestinationPlaceID(scopedMapState.mapScopedPayload.place_id);
      setDestination(scopedMapState.mapScopedPayload.name ?? "");
    } else {
      setOrigin(AIRPORT_BALI_NAME);
      setDestination("");
    }
  };

  const handleHotelToAirportMap = () => {
    if (scopedMapState.mapScopedPayload) {
      setOriginCoordinate({
        lat: scopedMapState.mapScopedPayload.lat,
        lng: scopedMapState.mapScopedPayload.lng,
      });
      setOriginPlaceID(scopedMapState.mapScopedPayload.place_id);
      setOrigin(scopedMapState.mapScopedPayload.name ?? "");

      setDestination(AIRPORT_BALI_NAME);
      setDestinationPlaceID(AIRPORT_PLACE_ID);
      setDestinationCoordinate(baliAirportCoordinate);
    } else {
      setOrigin("");
      setDestination(AIRPORT_BALI_NAME);
    }
  };

  useEffect(() => {
    if (scopedMapState.mapScopedPayload) {
      setAdministrativeLvl3(
        scopedMapState.mapScopedPayload.administrative_area_level_3 ?? null
      );
      setAdministrativeLvl4(
        scopedMapState.mapScopedPayload.administrative_area_level_4 ?? null
      );
    }

    if (transferType == TransferTypeEnum.airportToHotel) {
      handleAirportToHotelMap();
    } else {
      handleHotelToAirportMap();
    }
  }, [scopedMapState.mapScopedPayload]);

  const handleChangeTransferType = (value: TransferTypeEnum) => {
    setTransferType(value);
    setRecomendedVechiles([]);
    setOnInteractWithSearch(false);
    if (value == TransferTypeEnum.airportToHotel) {
      setDestination("");
      setOrigin(AIRPORT_BALI_NAME);
    } else {
      setOrigin("");
      setDestination(AIRPORT_BALI_NAME);
    }

    if (destinationRef.current) {
      destinationRef.current.classList.remove("block");
      destinationRef.current.classList.add("hidden");
    }
    if (originRef.current) {
      originRef.current.classList.remove("block");
      originRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    const validations = [
      { condition: origin, ref: originRef },
      {
        condition: destination,
        ref: destinationRef,
      },
      {
        condition: selectedDate,
        ref: transferDateTimeRef,
      },
    ];

    for (const { condition, ref } of validations) {
      if (condition) {
        if (ref.current) {
          ref.current.classList.remove("block");
          ref.current.classList.add("hidden");
        }
      }
    }
  }, [origin, destination, selectedDate]);
  return (
    <>
      <Card>
        <div className="p-4">
          <div className="grid md:hidden grid-cols-12 gap-2 w-full mb-4">
            <div
              onClick={() =>
                handleChangeTransferType(TransferTypeEnum.airportToHotel)
              }
              className={`${
                transferType == TransferTypeEnum.airportToHotel
                  ? "bg-[#008000] hover:bg-[#008000]/80 text-white"
                  : "bg-gray-50 hover:bg-gray-50/80"
              } rounded-lg cursor-pointer p-1 col-span-6 text-center border border-gray-200`}
            >
              Airport pick up
            </div>
            <div
              onClick={() =>
                handleChangeTransferType(TransferTypeEnum.hotelToAirport)
              }
              className={`${
                transferType == TransferTypeEnum.hotelToAirport
                  ? "bg-[#008000] hover:bg-[#008000]/80 text-white"
                  : "bg-gray-50 hover:bg-gray-50/80"
              } rounded-lg cursor-pointer p-1 col-span-6 text-center border border-gray-200`}
            >
              Airport dropoff
            </div>
          </div>
          <RadioGroup
            defaultValue={transferType}
            onValueChange={(value) =>
              handleChangeTransferType(value as TransferTypeEnum)
            }
            className="hidden grid-cols-2 md:flex gap-6 mb-4"
          >
            <div className="col-span-1 flex items-center space-x-2">
              <RadioGroupItem
                value={TransferTypeEnum.airportToHotel}
                id="r1"
                className=""
              />
              <Label htmlFor="r1" className="">
                Airport pick up
              </Label>
            </div>
            <div className="col-span-1 flex items-center space-x-2">
              <RadioGroupItem value={TransferTypeEnum.hotelToAirport} id="r2" />
              <Label htmlFor="r2">Airport dropoff</Label>
            </div>
          </RadioGroup>
          <Form {...SearchVecileForm}>
            <form
              onSubmit={SearchVecileForm.handleSubmit(handleSearchVechile)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Mencegah submit form
                }
              }}
              className="grid grid-cols-2 md:grid-cols-[2.5fr_2.5fr_2.5fr_2.5fr_2fr] gap-2 md:gap-4 items-start"
            >
              <div className="col-span-2 md:col-span-1">
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    From
                  </FormLabel>
                  <FormControl>
                    {transferType == TransferTypeEnum.airportToHotel ? (
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="From Origin"
                        type="text"
                        value={AIRPORT_BALI_NAME}
                        readOnly
                      />
                    ) : (
                      <GoogleMapViewComponent
                        withSearchAutoComplete={true}
                        showMap={false}
                        readonlyMap={false}
                        scopedId={AIPORT_TRANSFER_KEY_FOR_SCOPED_MAP}
                        passWithAdministrativeData={true}
                        loaderComponent={<InputSkeleton />}
                      />
                    )}
                  </FormControl>
                  <p
                    className="qty-activity text-sm text-red-500 hidden"
                    ref={originRef}
                  >
                    Fill the origin!
                  </p>
                </FormItem>
              </div>
              <div className="col-span-2 md:col-span-1">
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    To
                  </FormLabel>
                  <FormControl>
                    {transferType == TransferTypeEnum.airportToHotel ? (
                      <GoogleMapViewComponent
                        withSearchAutoComplete={true}
                        showMap={false}
                        readonlyMap={false}
                        scopedId={AIPORT_TRANSFER_KEY_FOR_SCOPED_MAP}
                        passWithAdministrativeData={true}
                        loaderComponent={<InputSkeleton />}
                      />
                    ) : (
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="To Destination"
                        type="text"
                        value={AIRPORT_BALI_NAME}
                        readOnly
                      />
                    )}
                  </FormControl>
                  <p
                    className="qty-activity text-sm text-red-500 hidden"
                    ref={destinationRef}
                  >
                    Fill the destination!
                  </p>
                </FormItem>
              </div>
              <div className="col-span-2 md:col-span-1">
                <FormItem>
                  <FormLabel className="text-gray-700 text-sm font-semibold">
                    Date & Time
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      selectedDate={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </FormControl>
                  <p
                    className="qty-activity text-sm text-red-500 hidden"
                    ref={transferDateTimeRef}
                  >
                    When we pick you up?
                  </p>
                </FormItem>
              </div>
              <div className="col-span-2 md:col-span-1">
                <FormField
                  control={SearchVecileForm.control}
                  name="total_passanger"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-semibold">
                        Passanger
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Total passanger"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end col-span-2 md:col-span-1 w-full">
                <FormItem className="w-full">
                  <Label className="text-white dark:text-black hidden md:inline-block">
                    .
                  </Label>

                  {!onSearch ? (
                    <AuthButton title="Search Car" rouded="rounded-lg w-full" />
                  ) : (
                    <DisabledButton
                      title="Searching..."
                      rouded="rounded-lg w-full"
                    />
                  )}
                </FormItem>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
}
