"use client";

import { ActivityAction } from "@/app/actions/activity/action";
import {
  CheckoutFinalPayloadParamater,
  CheckoutPackageOrderDataPayload,
} from "@/app/paramaters/booking/paramater";
import { CheckoutUserDataRespnse } from "@/app/responses/booking/response";
import { useBookingStore } from "@/app/store/booking.store";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TravellerDataSchema } from "../validation/traveller-data.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GlobalUtility } from "@/lib/global.utility";

export function CheckoutForm({
  userData,
}: {
  userData: CheckoutUserDataRespnse;
}) {
  const scopedBookingState = useBookingStore(
    (state) => state.bookingScopedState
  );
  const checkoutActivities = useBookingStore(
    (state) => state.checkoutActivities
  );
  const checkoutPackages = useBookingStore((state) => state.checkoutPackages);
  const checkoutCartData = useBookingStore((state) => state.checkoutCartData);
  const scopedGoogleMapState = useGoogleMapStore(
    (state) => state.mapScopedState
  );

  const [travellerInformation, setTravellerInformation] =
    useState<CheckoutUserDataRespnse>(userData);
  const [finalBookingPayload, setFinalBookingPayload] =
    useState<CheckoutFinalPayloadParamater>();

  const TravellerDataForm = useForm<z.infer<typeof TravellerDataSchema>>({
    resolver: zodResolver(TravellerDataSchema),
    defaultValues: {
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
    },
  });

  const handleCheckoutBooking = async (
    values: z.infer<typeof TravellerDataSchema>
  ) => {
    const mappingPackageOrderpayload: Array<CheckoutPackageOrderDataPayload> =
      [];
    Object.entries(scopedBookingState).map(([key, value]) => {
      const matchingEntry = Object.entries(scopedGoogleMapState).find(
        ([mapKey, _]) => mapKey === key
      );

      if (value.checkoutPayload) {
        const payload: CheckoutPackageOrderDataPayload = {
          base_uuid: key,
          activity_date: value.checkoutPayload.activity_date,
          activity_package_uuid: value.checkoutPayload.activity_package_uuid,
          cart_uuids: value.checkoutPayload.cart_uuids,
          departure_title: value.checkoutPayload.departure_title,
          pickup_time: value.checkoutPayload.pickup_time,
          planned_place_to_visit: value.checkoutPayload.planned_place_to_visit,
          note: value.checkoutPayload.note,
          free_tour_traveller_spend:
            value.checkoutPayload.free_tour_traveller_spend,
          pickup_coordinate: matchingEntry
            ? JSON.stringify({
                lat: matchingEntry[1].mapScopedPayload?.lat,
                lng: matchingEntry[1].mapScopedPayload?.lng,
              })
            : null,
          pickup_location: matchingEntry
            ? matchingEntry[1].mapScopedPayload?.name ?? "Venue"
            : null,
        };

        mappingPackageOrderpayload.push(payload);
      }
    });

    setFinalBookingPayload({
      activity: checkoutActivities,
      package: checkoutPackages,
      firstName: values.name,
      lastName: "",
      email: values.email,
      phone: values.phone,
      packageOrderData: mappingPackageOrderpayload,
      cartData: checkoutCartData,
    });

    const postPayload = {
      activity: checkoutActivities,
      package: checkoutPackages,
      firstName: values.name,
      lastName: "",
      email: values.email,
      phone: values.phone,
      packageOrderData: mappingPackageOrderpayload,
      cartData: checkoutCartData,
    };

    const result = await ActivityAction.CheckoutBooking(postPayload);
    console.log(result.data);
    console.log(result);
  };

  const handlePhoneChange = () => {};

  return (
    <>
      <div className="mt-6">
        <span className="text-bold text-black text-lg font-bold">
          Contact Info
        </span>
        <p className="text-sm sm:text-base text-gray-500">
          We'll only contact you if there's any updates to your booking
        </p>
        <div className="mt-4 p-5 border-2 rounded-lg ">
          <Form {...TravellerDataForm}>
            <form
              onSubmit={TravellerDataForm.handleSubmit(handleCheckoutBooking)}
            >
              <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
                <div className="flex flex-col col-span-2">
                  <FormField
                    control={TravellerDataForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Your name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            required
                            {...field}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <FormField
                    control={TravellerDataForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+918712xxx"
                            required
                            {...field}
                            onChange={(e) => {
                              const formattedValue =
                                GlobalUtility.InputFormatterForPhoneAllowNumberAndPlus(
                                  e.target.value
                                );
                              field.onChange(formattedValue); // Panggil onChange bawaan React Hook Form
                            }}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    control={TravellerDataForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="yukikato@gmail.com"
                            required
                            {...field}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <div className="hidden sm:hidden lg:flex gap-4 items-start">
                  <span className="w-3/4 text-gray-500">
                    Your booking will be submitted once you continue to the next
                    step. (You can choose your payment method in the next step)
                  </span>
                  <Button className="ml-auto w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                    Go to payment
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* <div className="flex flex-col gap-4 mt-6">
        <div className="hidden sm:hidden lg:flex gap-4 items-start">
          <span className="w-3/4 text-gray-500">
            Your booking will be submitted once you continue to the next step.
            (You can choose your payment method in the next step)
          </span>
          <Button className="ml-auto w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
            Go to payment
          </Button>
        </div>
      </div> */}
    </>
  );
}
