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
import { useEffect, useState } from "react";
import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { defaultScopedMapCoordinate, useGoogleMapStore } from "@/app/store/google-map.store";
import { AirportTransferAction } from "@/app/actions/airport-transfer/action";
import { format } from "date-fns";

export function SearchVechileInputFormCard() {
  const [transferType, setTransferType] = useState<TransferTypeEnum>(
    TransferTypeEnum.airportToHotel
  );
  const [administrativeLvl3, setAdministrativeLvl3] = useState<null|string>(null)
  const [administrativeLvl4, setAdministrativeLvl4] = useState<null|string>(null)
  const [originCoordinate, setOriginCoordinate] = useState<null|string>(null)
  const [destinationCoordinate, setDestinationCoordinate] = useState<null|string>(null)
  const [origin, setOrigin] = useState<null|string>(null)
  const [destination, setDestination] = useState<null|string>(null)
  
  const setScopedMapId = "randstring123";
  
  const scopedMapState = useGoogleMapStore(
      (state) => state.mapScopedState[setScopedMapId!] || defaultScopedMapCoordinate
    );

  const baliAirportName =
    "Bandara Internasional I Gusti Ngurah Rai (DPS), Tuban, Kabupaten Badung, Bali, Indonesia";
  const baliAirportCoordinateString = JSON.stringify({
    lat: -8.746993299999998,
    lng: 115.1681655,
  })
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

  const handleSearchVechile = async (
    values: z.infer<typeof SearchVechileSchema>
  ) => {
    console.log(values)

    if(!administrativeLvl3 && !administrativeLvl4) {
        return
    }
    values.administrative_area_level_3 = administrativeLvl3
    values.administrative_area_level_4 = administrativeLvl4
    values.origin_coordinate = originCoordinate
    values.destination_coordinate = destinationCoordinate
    values.origin = origin
    values.destination = destination

    values.transfer_date_time = format(new Date(values.transfer_date_time), "yyyy-MM-dd HH:mm:ss");
    
    values.transfer_type as TransferTypeEnum
    const action = await AirportTransferAction.GetVechilRecomendationRequest(values);
    console.log(action.data)
  };

  useEffect(() => {
       if(scopedMapState.mapScopedPayload) {
            setAdministrativeLvl3(scopedMapState.mapScopedPayload.administrative_area_level_3 ?? null)
            setAdministrativeLvl4(scopedMapState.mapScopedPayload.administrative_area_level_4 ?? null)

            if(transferType == TransferTypeEnum.airportToHotel) {
                setOriginCoordinate(baliAirportCoordinateString)
                setDestinationCoordinate(JSON.stringify({
                    lat: scopedMapState.mapScopedPayload.lat,
                    lng: scopedMapState.mapScopedPayload.lng,
                }))
                setOrigin(baliAirportName)
                setDestination(scopedMapState.mapScopedPayload.name ?? null)
            }else {
                setOriginCoordinate(JSON.stringify({
                    lat: scopedMapState.mapScopedPayload.lat,
                    lng: scopedMapState.mapScopedPayload.lng,
                }))
                setOrigin(scopedMapState.mapScopedPayload.name ?? null)
                setDestination(baliAirportCoordinateString)
                setDestinationCoordinate(baliAirportCoordinateString)
            }
       }
  }, [scopedMapState.mapScopedPayload])
  return (
    <>
      <Card>
        <div className="p-4">
          <Form {...SearchVecileForm}>
            <form
              onSubmit={SearchVecileForm.handleSubmit(handleSearchVechile)}
              className="grid grid-cols-[2.5fr_2.5fr_2.5fr_2.5fr_2fr] gap-4"
            >
              <div className="">
                <FormField
                  control={SearchVecileForm.control}
                  name="origin"
                  render={({ field }) => (
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
                            mapStyle="w-full h-[200px] md:h-[350px]"
                            showMap={false}
                            readonlyMap={false}
                            scopedId={setScopedMapId}
                            passWithAdministrativeData={true}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={SearchVecileForm.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-semibold">
                        To
                      </FormLabel>
                      <FormControl>
                        {transferType == TransferTypeEnum.airportToHotel ? (
                          <GoogleMapViewComponent
                            withSearchAutoComplete={true}
                            mapStyle="w-full h-[200px] md:h-[350px]"
                            showMap={false}
                            readonlyMap={false}
                            scopedId={setScopedMapId}
                            passWithAdministrativeData={true}
                            {...field}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={SearchVecileForm.control}
                  name="transfer_date_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-semibold">
                        Date & Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Date & Time"
                          type="datetime-local"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
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
              <div className="mt-auto w-full">
                <CheckoutButton>Search Car</CheckoutButton>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
}
