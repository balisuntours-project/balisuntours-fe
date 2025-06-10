"use client";

import {
  ActivityPackageTypeEnum,
  IncrementDecrementEnum,
} from "@/app/enums/activity/activity.enum";
import { PriceListsParamater } from "@/app/paramaters/activity/paramater";
import { PriceListSkeleton } from "@/app/skeletons-component/price-list.skeleton";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import { ActivityUtility } from "@/lib/activity.utility";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";
import { useActivityDate } from "../provider/activity-booking-date.provider";
import { QtyPlusMinusSection } from "@/app/global-components/utility-components/qty-plus-minus.section";
import { useEffect } from "react";
import { useBookingStore } from "@/app/store/booking.store";

export function PriceListPackage() {
  const selectPackageLoadStatus = useDetailActivityStore(
    (state) => state.selectPackageLoadStatus
  );
  const selectedPackage = useDetailActivityStore(
    (state) => state.selectedPackage
  );
  const selectedPrices = useDetailActivityStore(
    (state) => state.selectedPrices
  );
  const setSelectedPrices = useDetailActivityStore(
    (state) => state.setSelectedPrices
  );
  const currencyValue = useBookingStore((state) => state.currencyValue);
  const setCurrencyValue = useBookingStore((state) => state.setCurrencyValue);

  const totalPrice = useDetailActivityStore((state) => state.totalPrice);
  const setTotalPrice = useDetailActivityStore((state) => state.setTotalPrice);
  const setTotalPriceInFormattedCurrency = useDetailActivityStore(
    (state) => state.setTotalPriceInFormattedCurrency
  );

  const incrementDecrementQty = (
    priceUuid: string,
    action: IncrementDecrementEnum
  ) => {
    let newQty = 1;
    let canUpdatedTotalPrice = false;
    let priceData: PriceListsParamater = {} as PriceListsParamater;
    setSelectedPrices((prevPrices) =>
      prevPrices!.map((price) => {
        if (price.uuid === priceUuid) {
          //inisiasi
          const isIncrement = action === IncrementDecrementEnum.increment;
          priceData = price;

          // Hitung jumlah baru berdasarkan increment atau decrement
          newQty = isIncrement
            ? price.qty < price.minimum_qty
              ? price.minimum_qty
              : 1
            : price.qty === price.minimum_qty
            ? price.minimum_qty
            : 1;

          const updatedQty = isIncrement
            ? Math.min(price.qty + newQty, price.maximum_qty)
            : Math.max(price.qty - newQty, 0);

          //hilangkan validation book dulu jika increment
          if (isIncrement) {
            if (priceQtyEmptyRef.current) {
              priceQtyEmptyRef.current.classList.remove("block");
              priceQtyEmptyRef.current.classList.add("hidden");
            }

            if (price.qty < price.maximum_qty) canUpdatedTotalPrice = true;
          } else if (!isIncrement && price.qty > 0) {
            canUpdatedTotalPrice = true;
          } else {
            canUpdatedTotalPrice = false;
          }

          return {
            ...price, // Salin properti objek asli
            qty: updatedQty, // Perbarui jumlah
          };
        }

        return price; // Objek lain tidak berubah
      })
    );

    //atur total price

    if (canUpdatedTotalPrice) {
      const newTotalPrice = ActivityUtility.CalculateTotalPrice({
        new_qty: newQty,
        price: priceData.price,
        current_total_price: totalPrice,
        action: action,
      });

      setTotalPrice(newTotalPrice);
      formattedPriceAction(newTotalPrice);
    }
  };

  let debounceTimeoutGetFormattedPrice: NodeJS.Timeout | undefined;
  const formattedPriceAction = async (totalPrice: number) => {
    clearTimeout(debounceTimeoutGetFormattedPrice);

    // Set a new timeout for the debounce
    debounceTimeoutGetFormattedPrice = setTimeout(async () => {
      //getSelectedCountry()
      if (currencyValue) {
        const formattedPrice = GlobalUtility.ConvertionCurrencyFormat(
          totalPrice,
          currencyValue,
          CurrencyListEnum.usd
        );

        setTotalPriceInFormattedCurrency(formattedPrice);
      }
    }, 100); // Adjust the debounce delay (in milliseconds) as needed
  };

  useEffect(() => {
    setCurrencyValue(CurrencyListEnum.usd);
  }, []);

  //diambil dari context provider
  const { priceQtyEmptyRef } = useActivityDate();
  return (
    <>
      {selectedPackage && (
        <div>
          <hr className="my-7" />

          <div>
            <div className="flex">
              <span className="text-base text-gray-500">Booking For</span>
              <span className="text-base text-gray-500 ms-auto">Quantity</span>
            </div>
            <p
              className="qty-activity text-sm text-red-500 hidden"
              ref={priceQtyEmptyRef}
            >
              Hold on, add to at least one price below!
            </p>
          </div>

          {/* Price lists */}
          {!selectPackageLoadStatus ? (
            <div className="w-full flex flex-col gap-4">
              {selectedPrices!.map((price) => (
                <div key={price.uuid} className="w-full">
                  <div>
                    <p className="text-sm text-black mb-1">{price.title}</p>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <span className="text-sm text-[#EB5E00]">
                        <span>
                          {GlobalUtility.IdrCurrencyFormat(price.price)}
                        </span>
                        {price.price_information && (
                          <span>/{price.price_information}</span>
                        )}
                      </span>
                    </div>
                    <div className="col-span-6">
                      <QtyPlusMinusSection
                        qty={price.qty}
                        onClick={(action) =>
                          incrementDecrementQty(price.uuid, action)
                        }
                      />
                      {/*  <div className="flex justify-end gap-4">
                        <Button
                          onClick={() =>
                            incrementDecrementQty(
                              price.uuid,
                              IncrementDecrementEnum.decrement
                            )
                          }
                          className="h-7 w-7"
                          variant="outline"
                          size="icon"
                        >
                          <Minus className="text-[#EB5E00]" />
                        </Button>

                        <span className="text-base font-extrabold my-auto">
                          {price.qty}
                        </span>

                        <Button
                          onClick={() =>
                            incrementDecrementQty(
                              price.uuid,
                              IncrementDecrementEnum.increment
                            )
                          }
                          className="h-7 w-7"
                          variant="outline"
                          size="icon"
                        >
                          <Plus className="text-[#EB5E00]" />
                        </Button>
                      </div> */}
                    </div>
                  </div>

                  {price.minimum_qty != 1 && price.qty > 0 && (
                    <div className="">
                      <p className="qty-min text-xs text-yellow-400">
                        Book at least {price.minimum_qty} qty
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {/* Untuk free tour */}
              {selectedPackage?.package_type ==
                ActivityPackageTypeEnum.freeTour && (
                <div className="mx-auto ">
                  <span className="text-sm text-black">
                    *{selectedPackage?.remaining_stock_daily_free_tours} booking
                    left today
                  </span>
                </div>
              )}
            </div>
          ) : (
            [...Array(3)].map((_, index) => <PriceListSkeleton key={index} />)
          )}
        </div>
      )}
      {/* End Price lists */}
    </>
  );
}
