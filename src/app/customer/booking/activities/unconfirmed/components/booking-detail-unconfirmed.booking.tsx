"use client";

import {
  BookingDetailResponse,
  BookingResponse,
  CheckoutBookingIpay88Response,
  CheckoutBookingIpaymuResponse,
  CheckoutBookingResponse,
} from "@/app/responses/booking/response";

import { GlobalUtility } from "@/lib/global.utility";
import { BookingPaymentStatusEnum } from "@/app/enums/booking/booking.enum";
import { Button } from "@/components/ui/button";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";

import { useBookingStore } from "@/app/store/booking.store";

import { useToast } from "@/hooks/use-toast";

import { useEffect, useMemo, useState } from "react";
import { ConfirmationDialog } from "@/app/global-components/utility-components/confirmation.dialog";
import { BookingAction } from "@/app/actions/booking/action";
import { HttpStatus, PaymentGatewayEnum } from "@/lib/global.enum";
import { UnconfirmedStatusBooking } from "../utility-components/unconfirmed-status.booking";
import { DetailsBooking } from "../../transaction/utility-components/details.booking";
import { UnconfirmedEmptyContent } from "../utility-components/unconfirmed-empty-content.booking";
import {
  CheckoutUnconfirmedBookingPackageData,
  CheckoutUnconfirmedBookingParamater,
} from "@/app/paramaters/booking/paramater";
import { useLoaderStore } from "@/app/store/loader.store";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { useRouter } from "next/navigation";
import { BookingUtility } from "@/lib/booking.utility";

export function BookingDetailUnconfirmed({
  bookingsData,
}: {
  bookingsData: BookingResponse;
}) {
  const { toast } = useToast();

  const setSelectedBooking = useBookingStore(
    (state) => state.setSelectedBooking
  );

  const [currentCanceledBookingOrderId, setCurrentCanceledBookingOrderId] =
    useState<string | undefined>(undefined);

  const [useStateListClient, setUseStateListClient] = useState<boolean>(false);
  const [clientBookingList, setClientBookingList] = useState<
    Array<BookingDetailResponse>
  >(bookingsData.bookings);

  const sourceItems = useMemo(() => {
    return !useStateListClient ? bookingsData.bookings : clientBookingList;
  }, [useStateListClient, clientBookingList]);

  const handleCancelBooking = async (orderId: string, bookingUuid: string) => {
    const activityUuids: Array<string> = Object.entries(
      bookingsData.packages[orderId].packages
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ).flatMap(([key, value]) => {
      return value.activity_uuid;
    });

    const result = await BookingAction.CancelBooking(bookingUuid, {
      activity: activityUuids,
    });

    if (result.status_code == HttpStatus.OK) {
      setCurrentCanceledBookingOrderId(orderId);
      setUseStateListClient(true);
      toast({
        description: `Booking canceled!`,
        variant: "success",
      });

      return;
    } else {
      toast({
        description: `Something happen, you can ignore this booking`,
        variant: "info",
      });

      return;
    }
  };

  useEffect(() => {
    if (currentCanceledBookingOrderId) {
      setClientBookingList((prev) =>
        prev.filter((item) => item.order_id !== currentCanceledBookingOrderId)
      );
    }
  }, [currentCanceledBookingOrderId]);

  const setIsloading = useLoaderStore((state) => state.setIsLoading);
  const router = useRouter();

  const handleCheckoutBooking = async (booking: BookingDetailResponse) => {
    const mappingPackage = Object.entries(
      bookingsData.packages[booking.order_id].packages
    ).reduce((acc, [key, value]) => {
      acc[key] = {
        ...value,
        is_customer_set_pickup_information: value.package_type,
      };
      return acc;
    }, {} as { [key: string]: CheckoutUnconfirmedBookingPackageData });

    const payload: CheckoutUnconfirmedBookingParamater = {
      order: booking,
      package: mappingPackage,
    };

    setIsloading(true);
    const checkout = await BookingAction.CheckoutUnconfirmedBooking(payload);
    setIsloading(false);
    if (checkout.success) {
    
      const finalResult = checkout.data as CheckoutBookingResponse;

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
    } else {
      const finalResult = checkout.data as string; //errror response from backend
        toast({
          description: `${finalResult}`,
          variant: "danger",
        });
    }
  };

  return (
    <>
      <TextLoader title="Hold a second" text="We are preparing your book!" />
      {sourceItems.length > 0 ? (
        <div className="md:col-span-3 flex flex-col gap-5">
          {sourceItems.map((booking, key) => (
            <div
              key={key}
              className="h-auto bg-gray-200 bg-opacity-20 rounded-lg"
            >
              <div className="p-6">
                <div className="grid grid-cols-5 gap-5 lg:items-start">
                  <div className="flex flex-col gap-2 lg:ml-auto col-span-5 lg:col-span-2 lg:order-2">
                    <UnconfirmedStatusBooking status={booking.status} />

                    <div className="hidden lg:flex">
                      <div className="ms-auto">
                        <DynamicDialog
                          key={`${booking.order_id}-${key}`}
                          useSmallVersion={true}
                          trigger={
                            <Button
                              onClick={() =>
                                setSelectedBooking(
                                  bookingsData.packages[booking.order_id]
                                )
                              }
                              variant="link"
                              className="text-black text-base underline font-bold w-[100px]"
                            >
                              See detail
                            </Button>
                          }
                        >
                          <DetailsBooking />
                        </DynamicDialog>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 col-span-5 lg:flex-row lg:col-span-3 lg:order-1">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500 block">
                        Order ID:
                        <span className="text-black"> {booking.order_id}</span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Traveller name:
                        <span className="text-black">
                          {" "}
                          {booking.buyer_name}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Traveller email:
                        <span className="text-black">
                          {" "}
                          {booking.buyer_email}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Traveler phone:
                        <span className="text-black">
                          {" "}
                          {booking.buyer_phone}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex col-span-5 lg:hidden">
                    <div className="ms-auto">
                      <DynamicDialog
                        key={`${booking.order_id}-${key}`}
                        useSmallVersion={true}
                        trigger={
                          <Button
                            onClick={() =>
                              setSelectedBooking(
                                bookingsData.packages[booking.order_id]
                              )
                            }
                            variant="link"
                            className="text-black text-base underline font-bold w-[100px]"
                          >
                            See detail
                          </Button>
                        }
                      >
                        <DetailsBooking />
                      </DynamicDialog>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="py-4 px-6">
                <div className="mx-auto flex flex-col lg:flex-row gap-3 lg:gap-11">
                  <div className="w-[100%] lg:ms-auto lg:text-end lg:w-[40%] lg:order-2">
                    <span className="text-lg font-extrabold text-black">
                      {GlobalUtility.IdrCurrencyFormat(Number(booking.amount))}
                    </span>
                  </div>

                  <div className="flex flex-row gap-3 items-start w-[100%] lg:w-[60%] lg:mr-auto lg:order-1">
                    <ConfirmationDialog
                      onClick={() =>
                        handleCancelBooking(booking.order_id, booking.uuid)
                      }
                      dialogTitle="Continue cancel booking?"
                      dialogDescription="You need to make a new booking and should wait for confirmation again after this action!"
                    >
                      <Button
                        variant="outline"
                        className="w-auto lg:w-auto text-sm md:text-base px-4 py-2"
                      >
                        Cancel
                      </Button>
                    </ConfirmationDialog>
                    {booking.status == BookingPaymentStatusEnum.confirmed && (
                      <ConfirmationDialog
                        onClick={() => handleCheckoutBooking(booking)}
                        dialogTitle="Checkout booking?"
                        dialogDescription="Yoi will redirected to payment page!"
                      >
                        <Button
                          type="button"
                          rel="noopener noreferrer"
                          className="w-auto lg:w-auto text-white cursor-pointer text-sm md:text-base px-4 py-[8px] lg:py-[6px] bg-[#008000]  hover:bg-[#008000] hover:opacity-90 rounded-md text-center"
                        >
                          Checkout
                        </Button>
                      </ConfirmationDialog>
                    )}

                    {booking.status == BookingPaymentStatusEnum.unconfirmed && (
                      <Button
                        type="button"
                        className="w-auto lg:w-auto cursor-not-allowed text-sm md:text-base px-4 py-[8px] lg:py-[6px] bg-[#cfc0c4] hover:bg-[#cfc0c4]/80 text-white hover:opacity-90 rounded-md text-center"
                      >
                        Checkout
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <UnconfirmedEmptyContent />
      )}
    </>
  );
}
