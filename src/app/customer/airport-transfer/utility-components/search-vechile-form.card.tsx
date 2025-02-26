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
import { useEffect, useRef, useState } from "react";
import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
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
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDatePickerStore } from "@/app/store/date-picker.store";
import { GlobalUtility } from "@/lib/global.utility";
import { DateTimePicker } from "./date-time-picker.input";
import { GetVechileRecomendationsParamater } from "@/app/paramaters/airport-transfer/paramater";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { InputSkeleton } from "@/app/skeletons-component/input.skeleton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [originCoordinate, setOriginCoordinate] = useState<null | string>(null);
  const [destinationCoordinate, setDestinationCoordinate] = useState<
    null | string
  >(null);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const setScopedMapId = "randstring123";

  const scopedMapState = useGoogleMapStore(
    (state) =>
      state.mapScopedState[setScopedMapId!] || defaultScopedMapCoordinate
  );

  const baliAirportName =
    "Bandara Internasional I Gusti Ngurah Rai (DPS), Tuban, Kabupaten Badung, Bali, Indonesia";
  const baliAirportCoordinateString = JSON.stringify({
    lat: -8.746993299999998,
    lng: 115.1681655,
  });
  const SearchVecileForm = useForm<z.infer<typeof SearchVechileSchema>>({
    resolver: zodResolver(SearchVechileSchema),
    defaultValues: {
      transfer_type: transferType,
      origin:
        transferType == TransferTypeEnum.airportToHotel ? baliAirportName : "",
      destination:
        transferType == TransferTypeEnum.airportToHotel ? "" : baliAirportName,
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

    const paramater: GetVechileRecomendationsParamater = {
      administrative_area_level_3: administrativeLvl3,
      administrative_area_level_4: administrativeLvl4,
      origin: origin,
      destination: destination,
      transfer_date_time: format(selectedDate, "yyyy-MM-dd HH:mm:ss"),
      transfer_type: values.transfer_type,
      total_passanger: values.total_passanger,
    };

    const action = await AirportTransferAction.GetVechilRecomendationRequest(
      paramater
    );
    console.log(action.data);
  };

  const handleAirportToHotelMap = () => {
    if (scopedMapState.mapScopedPayload) {
      setOriginCoordinate(baliAirportCoordinateString);
      setDestinationCoordinate(
        JSON.stringify({
          lat: scopedMapState.mapScopedPayload.lat,
          lng: scopedMapState.mapScopedPayload.lng,
        })
      );
      setOrigin(baliAirportName);
      setDestination(scopedMapState.mapScopedPayload.name ?? "");
    } else {
      setOrigin(baliAirportName);
      setDestination("");
    }
  };

  const handleHotelToAirportMap = () => {
    if (scopedMapState.mapScopedPayload) {
      setOriginCoordinate(
        JSON.stringify({
          lat: scopedMapState.mapScopedPayload.lat,
          lng: scopedMapState.mapScopedPayload.lng,
        })
      );
      setOrigin(scopedMapState.mapScopedPayload.name ?? "");
      setDestination(baliAirportName);
      setDestinationCoordinate(baliAirportCoordinateString);
    } else {
      setOrigin("");
      setDestination(baliAirportName);
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
    if (value == TransferTypeEnum.airportToHotel) {
      setDestination("");
      setOrigin(baliAirportName);
    } else {
      setOrigin("");
      setDestination(baliAirportName);
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
          <RadioGroup
            defaultValue={transferType}
            onValueChange={(value) =>
              handleChangeTransferType(value as TransferTypeEnum)
            }
            className="grid grid-cols-2 md:flex gap-6 mb-4"
          >
            <div className="col-span-1 flex items-center space-x-2">
              <RadioGroupItem value={TransferTypeEnum.airportToHotel} id="r1" />
              <Label htmlFor="r1">Airport pick up</Label>
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
              className="grid grid-cols-2 md:grid-cols-[2.5fr_2.5fr_2.5fr_2.5fr_2fr] gap-4 items-start"
            >
              <div className="col-span-1">
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
                        value={baliAirportName}
                        readOnly
                      />
                    ) : (
                      <GoogleMapViewComponent
                        withSearchAutoComplete={true}
                        showMap={false}
                        readonlyMap={false}
                        scopedId={setScopedMapId}
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
              <div className="col-span-1">
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
                        scopedId={setScopedMapId}
                        passWithAdministrativeData={true}
                        loaderComponent={<InputSkeleton />}
                      />
                    ) : (
                      <Input
                        className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="To Destination"
                        type="text"
                        value={baliAirportName}
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
              <div className="flex items-end md:mt-[4vh] col-span-2 md:col-span-1">
                <AuthButton title="Search Car" rouded="rounded-lg w-full" />
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
}
