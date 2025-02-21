/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  CheckoutFinalPayloadParamater,
  CheckoutMappedPackageDataParamater,
  CheckoutPackageOrderDataPayload,
} from "@/app/paramaters/booking/paramater";
import {
  CheckoutBookingIpay88Response,
  CheckoutBookingIpaymuResponse,
  CheckoutBookingResponse,
  CheckoutUserDataRespnse,
} from "@/app/responses/booking/response";
import { useBookingStore } from "@/app/store/booking.store";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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
import {
  ActivityPackageSelfConfirmationStatus,
  ActivityPackageTypeEnum,
} from "@/app/enums/activity/activity.enum";
import { GoogleMapViewParamater } from "@/app/paramaters/google-map/paramater";
import { UnTriggeredConfirmationDialog } from "@/app/global-components/utility-components/untriggered-confirmation.dialog";
import { useToast } from "@/hooks/use-toast";
import { useLoaderStore } from "@/app/store/loader.store";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { BookingAction } from "@/app/actions/booking/action";
import { CurrencyListEnum, PaymentGatewayEnum } from "@/lib/global.enum";
import { useRouter } from "next/navigation";
import { BookingUtility } from "@/lib/booking.utility";

export function CheckoutForm({
  userData,
  minCost,
}: {
  userData: CheckoutUserDataRespnse;
  minCost: number;
}) {
  const scopedBookingState = useBookingStore(
    (state) => state.bookingScopedState
  );
  const checkoutActivities = useBookingStore(
    (state) => state.checkoutActivities
  );
  const checkoutPackages = useBookingStore((state) => state.checkoutPackages);
  const checkoutCartData = useBookingStore((state) => state.checkoutCartData);
  const setIsCheckoutButtonTriggered = useBookingStore(
    (state) => state.setIsCheckoutButtonTriggered
  );
  const scopedGoogleMapState = useGoogleMapStore(
    (state) => state.mapScopedState
  );
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const currencyValue = useBookingStore((state) => state.currencyValue);
  const checkoutAmount = useBookingStore((state) => state.checkoutAmount);

  const router = useRouter();
  const { toast } = useToast();
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

  const [waitingPackageAvailable, setWaitingPackageAvailable] =
    useState<boolean>(false);
  const [waitingPackageMessage, setWaitingPackageMessage] =
    useState<string>("");

  //method to checking is there any empty required data
  const checkAnyEmptyRequiredData = (
    payload: CheckoutMappedPackageDataParamater,
    mapPayload?: GoogleMapViewParamater
  ) => {
    if (payload.package_type == ActivityPackageTypeEnum.basicItinerary) {
      if (!payload.pickup_time) {
        return true;
      }

      return false;
    }

    if (payload.package_type == ActivityPackageTypeEnum.freeTour) {
      if (!payload.planned_place_to_visit || !payload.pickup_time) {
        return true;
      } else if (
        !payload.free_tour_traveller_spend ||
        payload.free_tour_traveller_spend < minCost
      ) {
        return true;
      }

      return false;
    }

    if (payload.package_type == ActivityPackageTypeEnum.pickupTimeByTraveller) {
      if (
        !payload.planned_place_to_visit ||
        !payload.pickup_time ||
        !mapPayload?.name
      ) {
        return true;
      }

      return false;
    }

    if (payload.package_type == ActivityPackageTypeEnum.pickupTimeByTeam) {
      if (!payload.pickup_time || !mapPayload?.name) {
        return true;
      }
      return false;
    }

    return true;
  };

  const checkIsThereAnyNeedConfirmationPackage = (
    payloads: Array<CheckoutPackageOrderDataPayload>
  ) => {
    let anyNeedConfirmationPackage: boolean = false;
    const packageTitles: Array<string> = [];
    payloads.forEach((item, _) => {
      if (
        item.self_confirmation == ActivityPackageSelfConfirmationStatus.waiting
      ) {
        if (!anyNeedConfirmationPackage) {
          anyNeedConfirmationPackage = true;
        }

        packageTitles.push(item.package_title);
      }
    });

    setWaitingPackageMessage(
      `There are packages that need confirmation before booking:\n" ${packageTitles.join(
        "\n"
      )}`
    );
    return anyNeedConfirmationPackage;
  };

  const handleCheckoutBooking = async (
    values: z.infer<typeof TravellerDataSchema>
  ) => {
    setIsCheckoutButtonTriggered(true);
    const mappingPackageOrderpayload: Array<CheckoutPackageOrderDataPayload> =
      [];

    let anyNullRequiredData: boolean = false;

    for (const [key, value] of Object.entries(scopedBookingState)) {
      const matchingEntry = Object.entries(scopedGoogleMapState).find(
        ([mapKey, _]) => mapKey === key
      );

      if (value.checkoutPayload) {
        anyNullRequiredData = checkAnyEmptyRequiredData(
          value.checkoutPayload,
          matchingEntry ? matchingEntry[1].mapScopedPayload : undefined
        );

        if (anyNullRequiredData) {
          // Jika anyNullRequiredData true, hentikan loop
          break;
        }

        const payload: CheckoutPackageOrderDataPayload = {
          base_uuid: key,
          self_confirmation: value.checkoutPayload.self_confirmation,
          package_title: value.checkoutPayload.package_title,
          /* tiga property diatas tidak akan dikiirm ke checkout karena hanya digunakan untuk kebutuhan mengatur mapping/flow data */
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
    }

    if (anyNullRequiredData) {
      return;
    }

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

    setFinalBookingPayload(postPayload);

    if (checkIsThereAnyNeedConfirmationPackage(mappingPackageOrderpayload)) {
      setWaitingPackageAvailable(true);
      return;
    }

    setIsLoading(true);
    const result = await BookingAction.CheckoutBooking(postPayload);

    //setIsCheckoutButtonTriggered(false)
    if (result.success) {
      const finalResult = result.data as CheckoutBookingResponse;
      if (finalResult.payment_gateway == PaymentGatewayEnum.IPAYMU) {
        const paymentGatewayPayload =
          finalResult.payload as CheckoutBookingIpaymuResponse;
        router.push(paymentGatewayPayload.next_url);
      } else if (finalResult.payment_gateway == PaymentGatewayEnum.IPAY88) {
        const paymentGatewayPayload =
          finalResult.payload as CheckoutBookingIpay88Response;
        BookingUtility.handleIpay88Checkout(
          paymentGatewayPayload.checkout_id,
          paymentGatewayPayload.signature,
          paymentGatewayPayload.checkout_url
        );
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      const finalResult = result.data as string; //errror response from backend
      toast({
        description: `${finalResult}`,
        variant: "danger",
      });
    }
  };

  const handleCheckoutWaitingBooking = async () => {
    setWaitingPackageAvailable(false);
    if (finalBookingPayload) {
      setIsLoading(true);
      const result = await BookingAction.CheckoutBooking(finalBookingPayload);

      if (result.success) {
        const finalResult = result.data as CheckoutBookingResponse;
        if (finalResult.payment_gateway == PaymentGatewayEnum.IPAYMU) {
          const paymentGatewayPayload =
            finalResult.payload as CheckoutBookingIpaymuResponse;
          router.push(paymentGatewayPayload.next_url);
        } else if (finalResult.payment_gateway == PaymentGatewayEnum.IPAY88) {
          const paymentGatewayPayload =
            finalResult.payload as CheckoutBookingIpay88Response;
          BookingUtility.handleIpay88Checkout(
            paymentGatewayPayload.checkout_id,
            paymentGatewayPayload.signature,
            paymentGatewayPayload.checkout_url
          );
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const finalResult = result.data as string; //errror response from backend
        toast({
          description: `${finalResult}`,
          variant: "danger",
        });
      }
    } else {
      toast({
        description: `Please retry click checkout button!`,
        variant: "info",
      });
    }
  };

  return (
    <>
      <TextLoader title="Wait a second" text="Redirecting to payment page..." />
      <UnTriggeredConfirmationDialog
        openState={waitingPackageAvailable}
        dialogTitle="Hold on!"
        dialogDescription={waitingPackageMessage}
        onClick={() => handleCheckoutWaitingBooking()}
        onClickCancel={() => setWaitingPackageAvailable(false)}
      />
      <div className="mt-6">
        <span className="text-bold text-black text-lg font-bold">
          Contact Info
        </span>
        <p className="text-sm sm:text-base text-gray-500">
          We&quot;ll only contact you if there&quot;s any updates to your
          booking
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
                           id="customer-name"
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
                            id="customer-phone"
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
                           id="customer-email"
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
                <div
                  className={
                    GlobalUtility.CheckScreenOnMobile()
                      ? "fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10 "
                      : "md:flex gap-4 items-start"
                  }
                >
                  <div className="flex gap-2 md:hidden mb-3">
                    <span className="text-gray-500">Amount</span>
                    {checkoutAmount && (
                      <span className="ml-auto text-[#EB5E00] text-end text-xl font-extrabold">
                        {GlobalUtility.IdrCurrencyFormat(checkoutAmount)}{" "}
                        {currencyValue &&
                          `(${GlobalUtility.ConvertionCurrencyFormat(
                            checkoutAmount,
                            currencyValue,
                            CurrencyListEnum.usd
                          )})`}
                      </span>
                    )}
                  </div>
                  <hr />
                  <span className="w-3/4 text-gray-500">
                    Your booking will be submitted once you continue to the next
                    step. (You can choose your payment method in the next step)
                  </span>
                  <Button className="ml-auto mt-2 md:mt-0 w-full md:w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:bg-[#EB5E00]/80 hover:-translate-y-1 hover:shadow-lg">
                    Go to payment
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
