"use client";

import { PaymentStatusBooking } from "../utility-components/payment-status.booking";
import { GlobalUtility } from "@/lib/global.utility";
import {
  BookingPaymentStatusEnum,
  ReviewValidPayloadEnum,
} from "@/app/enums/booking/booking.enum";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { DetailsBooking } from "../utility-components/details.booking";
import { TransactionListResponse } from "@/app/responses/airport-transfer/response";
import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";

export function BookingDetail({
  bookingsData,
}: {
  bookingsData: Array<TransactionListResponse>;
}) {
  const setSelectedBooking = useAirportTransferStore(
    (state) => state.setSelectedBooking
  );

  return (
    <>
      <div className="md:col-span-3 flex flex-col gap-5">
        {bookingsData.length > 0 &&
          bookingsData?.map((booking, key) => (
            <div
              key={key}
              className="h-auto bg-gray-200 bg-opacity-20 rounded-lg"
            >
              <div className="p-6">
                <div className="grid grid-cols-5 gap-5 lg:items-start">
                  <div className="flex flex-col gap-2 lg:ml-auto col-span-5 lg:col-span-2 lg:order-2">
                    <PaymentStatusBooking
                      status={booking.booking_info.status}
                    />

                    <div className="hidden lg:flex">
                      <div className="ms-auto">
                        <DynamicDialog
                          key={`${booking.booking_info.booking_id}-${key}`}
                          useSmallVersion={true}
                          trigger={
                            <Button
                              onClick={() =>
                                setSelectedBooking({
                                  booking_vechile: booking.booking_vechile,
                                })
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
                        Booking ID:
                        <span className="text-black">
                          {" "}
                          {booking.booking_info.booking_id}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Flight No:
                        <span className="text-black">
                          {" "}
                          {booking.booking_detail.flight_number}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Transfer type:
                        <span className="text-black">
                          {" "}
                          {booking.booking_detail.transfer_type ==
                          TransferTypeEnum.airportToHotel
                            ? "Airport pickup"
                            : "Airport dropoff"}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Transfer Date:
                        <span className="text-black">
                          {" "}
                          {GlobalUtility.FormatBeautifullDate(
                            booking.booking_detail.transfer_date_time,
                            true
                          )}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Total Passanger:
                        <span className="text-black">
                          {" "}
                          {booking.booking_detail.total_passanger}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Participant full name:
                        <span className="text-black">
                          {" "}
                          {booking.booking_info.customer_title}{" "}
                          {booking.booking_info.customer_first_name}{" "}
                          {booking.booking_info.customer_last_name}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        From:{" "}
                        <Link
                          href={
                            booking.booking_detail.origin_coordinate
                              ? `https://www.google.com/maps?q=${booking.booking_detail.origin_coordinate.lat},${booking.booking_detail.origin_coordinate.lng}`
                              : "#"
                          }
                          target="_blank" // Buka di tab baru
                          rel="noopener noreferrer" // Keamanan untuk tab baru
                          className="text-blue-500 hover:underline"
                        >
                          {booking.booking_detail.origin}
                        </Link>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        To:{" "}
                        <Link
                          href={
                            booking.booking_detail.destination_coordinate
                              ? `https://www.google.com/maps?q=${booking.booking_detail.destination_coordinate.lat},${booking.booking_detail.destination_coordinate.lng}`
                              : "#"
                          }
                          target="_blank" // Buka di tab baru
                          rel="noopener noreferrer" // Keamanan untuk tab baru
                          className="text-blue-500 hover:underline"
                        >
                          {booking.booking_detail.destination}
                        </Link>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Participant email:
                        <span className="text-black">
                          {" "}
                          {booking.booking_info.customer_email}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500 block">
                        Participant phone:
                        <span className="text-black">
                          {" "}
                          {booking.booking_info.customer_phone}
                        </span>
                      </span>

                      {booking.booking_info.payment_pdf_path && (
                        <span className="text-sm text-gray-500 block">
                          Booking detail PDF:{" "}
                          <Link
                            className="text-black underline cursor-pointer"
                            target="__blank"
                            rel="noopener noreferrer"
                            href={booking.booking_info.payment_pdf_path}
                          >
                            Pdf path
                          </Link>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex col-span-5 lg:hidden">
                    <div className="ms-auto">
                      <DynamicDialog
                        key={`${booking.booking_info.booking_id}-${key}`}
                        useSmallVersion={true}
                        trigger={
                          <Button
                            onClick={() =>
                              setSelectedBooking({
                                booking_vechile: booking.booking_vechile,
                              })
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
                      {GlobalUtility.IdrCurrencyFormat(
                        Number(booking.booking_info.amount)
                      )}
                    </span>
                  </div>

                  <div className="flex flex-row gap-3 items-start w-[100%] lg:w-[60%] lg:mr-auto lg:order-1">
                    {(booking.booking_info.status ==
                      BookingPaymentStatusEnum.paid ||
                      booking.booking_info.status ==
                        BookingPaymentStatusEnum.choosePaymentMethod ||
                      booking.booking_info.status ==
                        BookingPaymentStatusEnum.pending) && (
                      <Link
                        href={booking.booking_info.payment_url ?? "#"}
                        rel="noopener noreferrer"
                        className="w-1/2 lg:w-auto text-white cursor-pointer text-sm md:text-base px-4 py-[8px] lg:py-[6px] bg-[#008000]  hover:bg-[#008000] hover:opacity-90 rounded-md text-center"
                      >
                        Payment page
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
