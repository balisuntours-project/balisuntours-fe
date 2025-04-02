"use client";

import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { TransactionListBookingVechileResponse } from "@/app/responses/airport-transfer/response";
import { GlobalUtility } from "@/lib/global.utility";
import { Luggage, User } from "lucide-react";
import Link from "next/link";

export function PopupDetailBooking({
  item,
}: {
  item: TransactionListBookingVechileResponse;
}) {
  return (
    <>
      <div className="flex-col gap-4 mb-6">
        <div className=" p-4 rounded-xl border-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="col-span-2 max-w-full md:max-w-[200px] w-full">
              <ImageWithLoader
                src={item.vechile.vechile_main_photo_url}
                alt={`Car picture`}
                fallbackSrc="/fallback-image.png"
                classNameProp="rounded-lg w-full mx-auto md:mx-0  h-[150px] md:w-[200px] md:h-[200px] object-cover"
                skeletonClassName="rounded-lg"
                priority={false} // Gambar ini tidak diberi prioritas
                width={150}
                height={150}
              />
            </div>

            <div className="col-span-3 ">
              <div className="flex flex-col gap-1 text-start">
                <span className="text-lg font-bold text-black">
                  {item.vechile.name}
                </span>
                <span className="text-sm text-gray-500">
                  {item.vechile.vechile_category}
                </span>
                <div className="text-sm text-gray-500">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                      <User className="h-4 w-4" />
                      <span className="text-gray-500 my-auto">
                        {item.vechile.total_seat}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Luggage className="h-4 w-4" />
                      <span className="text-gray-500 my-auto">
                        {item.vechile.total_seat}
                      </span>
                    </div>
                  </div>
                </div>
      
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <div className="flex">
              <span className="text-bold text-start">{item.qty} Unit</span>

              <span className="text-bold text-end ml-auto">{GlobalUtility.IdrCurrencyFormat(item.total_amount * item.qty)}</span>
            </div>
        </div>
      </div>
    </>
  );
}
