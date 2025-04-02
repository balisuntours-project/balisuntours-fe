"use client";

import {
  BookingPackageDynamicPropertyResponse,
  BookingResponse,
} from "@/app/responses/booking/response";
import { PaymentStatusBooking } from "../utility-components/payment-status.booking";
import { GlobalUtility } from "@/lib/global.utility";
import {
  BookingPaymentStatusEnum,
  ReviewValidPayloadEnum,
} from "@/app/enums/booking/booking.enum";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { useBookingStore } from "@/app/store/booking.store";
import { DetailsBooking } from "../utility-components/details.booking";
import { ReviewBookingForm } from "../utility-components/review-booking.form";
import { useDraggableStore } from "@/app/store/draggable.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { useToast } from "@/hooks/use-toast";
import {
  AddReviewParamater,
  ReviewDataParamater,
} from "@/app/paramaters/activity-review/paramater";
import { ActivityAction } from "@/app/actions/activity/action";
import { useLoaderStore } from "@/app/store/loader.store";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { useState } from "react";
import { LoaderSvg } from "@/app/global-components/utility-components/loader.svg";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";
import { ConfirmationDialog } from "@/app/global-components/utility-components/confirmation.dialog";
import { BookingAction } from "@/app/actions/booking/action";
import { HttpStatus } from "@/lib/global.enum";

export function BookingDetail({
  bookingsData,
}: {
  bookingsData: BookingResponse;
}) {
  const { toast } = useToast();

  const setSelectedBooking = useBookingStore(
    (state) => state.setSelectedBooking
  );
  const setIsOnSubmit = useBookingStore((state) => state.setIsOnSubmit);

  const reviewItems = useBookingStore((state) => state.reviewItems);
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const isLoading = useLoaderStore((state) => state.isLoading);
  const setForceCloseDialog = useLoaderStore(
    (state) => state.setForceCloseDialog
  );
  const [listOnReviewedBooking, setListOnReviewedBooking] = useState<Array<string>>(
    []
  );
  const [listOnCanceledBooking, setListOnCanceledBooking] = useState<Array<string>>(
    []
  );

  const handlePostReview = async (orderId: string) => {
    //check before post
    setIsOnSubmit(true);

    let isValid: boolean = true;
    const validReview = Object.entries(reviewItems).reduce(
      (acc, [key, value]) => {
        if (
          value.name.length >= ReviewValidPayloadEnum.minCharacterName &&
          value.comment.length >= ReviewValidPayloadEnum.minCharacterComment
        ) {
          acc[key] = value; // Tetap menyimpan key dan value
        }
        return acc;
      },
      {} as { [key: string]: ReviewDataParamater }
    );

    if (Object.entries(validReview).length == 0) {
      toast({
        description: `Hold up, there's any field need to fill correctly!`,
        variant: "warning",
      });
      return;
    }

    const ReviewsData: AddReviewParamater = {
      order_id: orderId,
      reviews: validReview,
    };

    setIsLoading(true);
    const result = await ActivityAction.PostReview(ReviewsData);
    setIsLoading(false);
    setForceCloseDialog(true);

    setListOnReviewedBooking((prevList) => [...prevList, orderId]);

    toast({
      description: `Posted, thanks for sharing your experience`,
      variant: "success",
    });
  };

  const handleCancelBooking = async (orderId: string, bookingUuid: string) => {
    const activityUuids: Array<string> = Object.entries(
      bookingsData.packages[orderId].packages
    ).flatMap(([key, value]) => {
      return value.activity_uuid;
    });

    const result = await BookingAction.CancelBooking(bookingUuid, {
      activity: activityUuids,
    });

    if (result.status_code == HttpStatus.OK) {
      setListOnCanceledBooking((prevList) => [...prevList, orderId]);
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

  return (
    <>
      <div className="md:col-span-3 flex flex-col gap-5">
        {bookingsData.bookings.map((booking, key) => (
          <div
            key={key}
            className="h-auto bg-gray-200 bg-opacity-20 rounded-lg"
          >
            <div className="p-6">
              <div className="grid grid-cols-5 gap-5 lg:items-start">
                <div className="flex flex-col gap-2 lg:ml-auto col-span-5 lg:col-span-2 lg:order-2">
                  <PaymentStatusBooking
                    status={
                      listOnCanceledBooking.every(
                        (list) => list !== booking.order_id
                      )
                        ? booking.status
                        : BookingPaymentStatusEnum.cancel
                    }
                  />

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
                      <span className="text-black"> {booking.buyer_name}</span>
                    </span>
                    <span className="text-sm text-gray-500 block">
                      Traveller email:
                      <span className="text-black"> {booking.buyer_email}</span>
                    </span>
                    <span className="text-sm text-gray-500 block">
                      Traveler phone:
                      <span className="text-black"> {booking.buyer_phone}</span>
                    </span>

                    {booking.itineraries_path && (
                      <span className="text-sm text-gray-500 block">
                        Itineraries activity:
                        <Link
                          className="text-black underline cursor-pointer"
                          target="__blank"
                          rel="noopener noreferrer"
                          href={booking.itineraries_path}
                        >
                          Itineraries PDF
                        </Link>
                      </span>
                    )}
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

                {listOnCanceledBooking.every(
                  (list) => list !== booking.order_id
                ) && (
                  <div className="flex flex-row gap-3 items-start w-[100%] lg:w-[60%] lg:mr-auto lg:order-1">
                    {(booking.status ==
                      BookingPaymentStatusEnum.choosePaymentMethod ||
                      booking.status == BookingPaymentStatusEnum.pending) && (
                      <ConfirmationDialog
                        onClick={() =>
                          handleCancelBooking(booking.order_id, booking.uuid)
                        }
                        dialogTitle="Continue cancel booking?"
                        dialogDescription="You need to make a new booking after this action!"
                      >
                        <Button
                          variant="outline"
                          className="w-auto lg:w-auto text-sm md:text-base px-4 py-2"
                        >
                          Cancel
                        </Button>
                      </ConfirmationDialog>
                    )}
                    {(booking.status == BookingPaymentStatusEnum.paid ||
                      booking.status ==
                        BookingPaymentStatusEnum.choosePaymentMethod ||
                      booking.status == BookingPaymentStatusEnum.pending) && (
                      <Link
                        href={booking.payment_url ?? "#"}
                        rel="noopener noreferrer"
                        className="w-1/2 lg:w-auto text-white cursor-pointer text-sm md:text-base px-4 py-[8px] lg:py-[6px] bg-[#008000]  hover:bg-[#008000] hover:opacity-90 rounded-md text-center"
                      >
                        Payment page
                      </Link>
                    )}

                    {booking.status === BookingPaymentStatusEnum.paid &&
                      bookingsData.packages[booking.order_id] &&
                      !booking.is_reviewed &&
                      listOnReviewedBooking.every(
                        (list) => list !== booking.order_id
                      ) && (
                        <DynamicDialog
                          useSmallVersion={true}
                          trigger={
                            <Button className="text-white w-auto lg:w-auto text-sm md:text-base px-4 py-2 bg-[#008000]  hover:bg-[#008000]">
                              Post review
                            </Button>
                          }
                        >
                          <div className="flex flex-col gap-4">
                            {Object.entries(
                              bookingsData.packages[booking.order_id].packages
                            ).map(([key, item]) => (
                              <div className="" key={key}>
                                <ReviewBookingForm
                                  packageDetail={item}
                                  orderId={booking.order_id}
                                  packageId={key}
                                />
                              </div>
                            ))}
                            <div className="button-comment max-w-md mx-auto">
                              {!isLoading ? (
                                <AuthButton
                                  onClick={() =>
                                    handlePostReview(booking.order_id)
                                  }
                                  title="Post reviews"
                                />
                              ) : (
                                <DisabledButton title="Posting..." />
                              )}
                            </div>
                          </div>
                        </DynamicDialog>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
