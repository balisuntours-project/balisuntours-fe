"use client";

import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import {
  BookedVechileResponse,
  BookingDataResponse,
} from "@/app/responses/airport-transfer/response";
import { GlobalUtility } from "@/lib/global.utility";
import { ArrowLeftCircle, ArrowRightCircle, Luggage, User } from "lucide-react";

export function CheckoutAmountSectionAirportTransfer({
  bookedVechile,
  bookingData,
}: {
  bookedVechile: Array<BookedVechileResponse>;
  bookingData: BookingDataResponse;
}) {
  return (
    <>
      <div
        id="amountSection"
        className="flex flex-col gap-6 lg:mb-44 md:mb-0 mt-4 md:mt-0 lg:flex lg:flex-col lg:gap-6 lg:col-span-4 lg:sticky lg:top-5 shadow-lg"
      >
        <div className="amount-section bg-white rounded-lg p-5 lg:block">
          <div className="mb-6 mt-3 bg-[#5FA22A] p-4 rounded-md">
            <div className="text-sm sm:text-base  text-white">
              Free cancellation up to 24 hour(s) before your pick-up time
            </div>
          </div>
          {bookedVechile.map((vechile, key) => (
            <div key={key} className="flex flex-col gap-2 my-5">
              <div className="flex gap-3">
                <ImageWithLoader
                  fillAllView={false}
                  src={vechile.vechile_main_photo}
                  alt={`vechile banner`}
                  fallbackSrc="/fallback-image.png"
                  classNameProp="rounded-lg w-28 h-20 object-cover"
                  skeletonClassName="rounded-lg w-20 h-20"
                  priority={false} // Gambar ini tidak diberi prioritas
                  width={100}
                  height={100}
                />

                <div className=" max-w-auto w-full items-start flex flex-col">
                  <span className="text-black text-base lg:text-base font-bold">
                    {vechile.name}
                  </span>
                  <span className="text-sm lg:text-base">
                    {vechile.vechile_category}
                  </span>
                  <div className="flex gap-2 mt-1 items-center">
                    <div className="flex gap-1 items-center">
                      <User className="h-4 w-4" />
                      <span className=" my-auto">{vechile.total_seat}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Luggage className="h-4 w-4" />
                      <span className=" my-auto">{vechile.total_seat}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-400 text-start">
                Your driver will wait for free for{" "}
                {vechile.driver_free_waiting_time_in_minutes} minutes. After{" "}
                {GlobalUtility.FormatBeautifullDate(
                  bookingData.transfer_date_time,
                  true
                )}{" "}
                you might need to pay a waiting fee.
              </span>
            </div>
          ))}
          <hr />
          <div className="w-full mt-2">
            <span className="text-gray-400 text-sm text-start">
              Pick-up date & time
            </span>
            <div className="flex flex-col">
              <span className="text-base">
                Total {bookingData.total_passanger} Passanger
              </span>
              <span className="text-base">
                {GlobalUtility.FormatBeautifullDate(
                  bookingData.transfer_date_time,
                  true
                )}{" "}
                (Local time)
              </span>

              <div className="flex flex-col mt-3 gap-3">
                {/* Origin */}
                <div className="flex items-start gap-1">
                  <ArrowRightCircle className="flex-none w-5 h-5 fill-current text-green-500 stroke-white stroke-2" />
                  <span className="text-base">{bookingData.origin}</span>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-1">
                  <ArrowLeftCircle className="flex-none w-5 h-5 fill-current text-blue-500 stroke-white stroke-2" />
                  <span className="text-base">{bookingData.destination}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Sticky total big screen/PC--> */}
        <div className="hidden lg:block total-amount-section bg-gray-50 p-5">
          <div className="flex gap-2">
            <span className="text-gray-500">Amount</span>
            <span className="ml-auto text-[#EB5E00] text-end text-xl font-extrabold">
              {GlobalUtility.IdrCurrencyFormat(bookingData.total_amount)}{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
