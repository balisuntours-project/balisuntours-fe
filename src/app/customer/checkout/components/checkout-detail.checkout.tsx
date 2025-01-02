"use client";

import { CurrencyAction } from "@/app/actions/currency/action";
import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { CheckoutMappedPackageDataParamater } from "@/app/paramaters/booking/paramater";
import { CheckoutDataPackageResponse } from "@/app/responses/activity-package/response";
import { useBookingStore } from "@/app/store/booking.store";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "@/lib/global.constant";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CheckoutFormTypeMechanism } from "./checkout-form-type-condition.checkout";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import { CheckoutDataActivityResponse } from "@/app/responses/activity/response";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";

export function CheckoutDetail({
  checkoutActivity,
  checkoutPackages,
  minCost,
}: {
  checkoutActivity: Array<CheckoutDataActivityResponse>;
  checkoutPackages: Array<CheckoutDataPackageResponse>;
  minCost: number
}) {
  const setCheckoutPackageBookingData = useBookingStore(
    (state) => state.setCheckoutPackageBookingData
  );
  const checkoutPackageBookingData = useBookingStore(
    (state) => state.checkoutPackageBookingData
  );
  const setMapScopedState = useGoogleMapStore((state) => state.setScopedState);

  const [currencyValue, setCurrencyValue] = useState<number>();
  const [amount, setAmount] = useState<number>();

  const handleFetchCurrency = async () => {
    const result = await CurrencyAction.GetCurrency(
      CurrencyListEnum.usd // usd dulu
    );

    if (result.success) {
      setCurrencyValue(result.data);
    }
  };

  const handleSetTotalAmount = () => {
    if (checkoutPackages) {
      let countAmount = 0;
      checkoutPackages.forEach((itemPackage, _) => {
        countAmount += itemPackage.final_price;
      });

      setAmount(countAmount);
    }
  };

  useEffect(() => {
    if (checkoutPackages) {
      handleFetchCurrency();
      handleSetTotalAmount();

      const packageMappedDataBowl: Array<CheckoutMappedPackageDataParamater> =
        [];
      const mappingData = checkoutPackages.forEach((item, key) => {
        const activityDate = item.prices[0].activity_date; // ambil satu date untuk mapping dipakai pada package yang sesuai
        const sameActivityDateAndPackage = packageMappedDataBowl.find(
          (data) =>
            data.activity_date == activityDate &&
            data.activity_package_uuid == item.activity_package_uuid
        );

        const findDifferentBaseUuid = packageMappedDataBowl.find(
          (data) => data.base_uuid != item.base_uuid
        );

        //do mapping
        if (
          !sameActivityDateAndPackage &&
          (findDifferentBaseUuid || packageMappedDataBowl.length == 0)
        ) {
          let flatPriceInDollar = 0;
          let freeTourMinSpend = null;
          let freeTourTravellerSpend = null;

          // if (flatPriceInDollar) {
          //     pack["final_price_usd"] = flatPriceInDollar;
          // }

          if (item.package_type == ActivityPackageTypeEnum.freeTour) {
            freeTourMinSpend = item.final_price ?? null;
            freeTourTravellerSpend = item.final_price ?? null;
          }

          packageMappedDataBowl.push({
            base_uuid: item.base_uuid,
            activity_package_uuid: item.activity_package_uuid,
            cart_uuids: item.cart_uuids,
            package_title: item.package_title,
            package_type: item.package_type,
            flat_traveller_price: item.flat_traveller_price,
            final_price: item.final_price,
            total_qty_for_free_tour: item.total_qty_for_free_tour,
            price_information_for_free_tour:
              item.price_information_for_free_tour,
            default_pickup_time: item.default_pickup_time,
            departure: item.departure,
            departure_title: item.departure
              ? item.departure.departure_title
              : null,
            pickup_coordinate: item.departure
              ? JSON.stringify(item.departure.departure_map_coordinate)
              : null,
            pickup_location: item.departure
              ? item.departure.departure_map_location
              : null,
            pickup_time: null,
            planned_place_to_visit: null,
            note: null,
            activity_date: activityDate,
            free_tour_minimum_spend: freeTourMinSpend,
            free_tour_traveller_spend: freeTourTravellerSpend,
            free_tour_traveller_spend_in_dollar: flatPriceInDollar,

            //
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
            zoom: DEFAULT_ZOOM,
            auto_complete_value: null,
            input_id: `${GlobalUtility.StringToSlug(item.package_title)}`,
          });

          setMapScopedState(item.base_uuid, "mapScopedPayload", {
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
            zoom: DEFAULT_ZOOM,
          });
        }
      });

      setCheckoutPackageBookingData(packageMappedDataBowl);
    }
  }, [checkoutPackages]);

  return (
    <>
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
        <div className="col-span-8 bg-white rounded-lg h-auto shadow-lg sm:mb-6">
          <div className="p-5 sm:p-5 lg:p-8">
            <div className="flex gap-3 text-sm sm:text-base bg-[#5FA22A] text-white !py-3 p-4 rounded-md">
              <CheckCircle />
              <p>
                {" "}
                Please enter your info carefully. Once submitted it cannot be
                changed.
              </p>
            </div>

            {checkoutPackageBookingData.map((itemPackage, key) => (
              <div key={key} className="mt-6 pb-4 border-b-2">
                <span className="text-bold text-black text-lg font-bold">
                  Booking Information {itemPackage.package_title} on{" "}
                  {GlobalUtility.FormatBeautifullDate(
                    itemPackage.activity_date
                  )}
                </span>

                <CheckoutFormTypeMechanism minCost={minCost} itemPackage={itemPackage} />
              </div>
            ))}

            <form
              action="#"
              method="POST"
              /* @submit.prevent="handleToPayment" */
            >
              <div className="mt-6">
                <span className="text-bold text-black text-lg font-bold">
                  Contact Info
                </span>
                <p className="text-sm sm:text-base text-gray-500">
                  We'll only contact you if there's any updates to your booking
                </p>
                <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div className="flex flex-col col-span-2">
                    <label htmlFor="firstname" className="font-bold">
                      Your Name
                    </label>
                    <input
                      placeholder="Enter your name"
                      required
                      v-model="paymentOrder.firstName"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="font-bold">
                      Phone Number
                    </label>
                    <input
                      placeholder="+62xxx"
                      required
                      v-model="paymentOrder.phone"
                      /* @input="handlePhoneChange" */
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="font-bold">
                      Email
                    </label>
                    <input
                      placeholder="Enter email"
                      required
                      v-model="paymentOrder.email"
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <div className="hidden sm:hidden lg:flex gap-4 items-start">
                  <span className="w-3/4 text-gray-500">
                    Your booking will be submitted once you continue to the next
                    step. (You can choose your payment method in the next step)
                  </span>
                  <button
                    /*  @submit.prevent="handleToPayment"
                                        :disabled="processingPayment" */
                    className="ml-auto w-auto px-5 py-3 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                  >
                    Go to payment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Amount secntion */}
        <div
          id="amountSection"
          className="flex flex-col gap-6 lg:flex lg:flex-col lg:gap-6 lg:col-span-4 lg:sticky lg:top-5 shadow-lg"
        >
          <div className="amount-section bg-white rounded-lg p-5 lg:block">
            <div className="mb-6 mt-3">
              <div
                /*    color="#E1EFFE" */
                /*    density="compact" */
                /*    theme="dark" */
                /*    elevation="0" */
                className="text-sm sm:text-base !text-[#1A56DB]"
              >
                Free cancellation (depend on each package)
              </div>
            </div>
            {checkoutActivity.map((activity, key) => (
              <div
                v-for="(activity, index) in props.activity.data"
                key={key}
                className="flex gap-3 my-5"
              >
                <ImageWithLoader
                  fillAllView={false}
                  src={activity.main_photo}
                  alt={`Activity banner`}
                  fallbackSrc="/fallback-image.png"
                  classNameProp="rounded-lg w-28 h-20 object-cover"
                  skeletonClassName="rounded-lg w-20 h-20"
                  priority={false} // Gambar ini tidak diberi prioritas
                  width={100}
                  height={100}
                />

                <div className=" max-w-auto w-full items-start">
                  <span className="text-black text-lg lg:text-xl font-bold">
                    {activity.title}
                  </span>
                  {activity.packages.map((packageName, index) => (
                    <div key={index}>
                      <p className="text-sm sm:text-base lg:text-base">
                        {packageName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <hr />
            {checkoutPackages.map((itemPackage, key) => (
              <div
                v-for="(pack, index) in props.package.data"
                key={key}
                className="mt-3 mb-5 sm:flex sm:flex-col sm:gap-1 lg:block"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-black font-bold text-lg">
                    {itemPackage.activity_title}
                  </span>

                  <div className="flex flex-col">
                    <span className="text-gray-500">
                      - {itemPackage.package_title}
                    </span>
                    <span className="text-gray-500">
                      - Free cancellation ({itemPackage.cancellation_policy})
                    </span>
                   {!itemPackage.self_confirmation && (
                     <span
                     v-show="pack.self_confirmation == false"
                     className="text-red-500"
                   >
                     - Need confirmation ({itemPackage.confirmation_time}){" "}
                     before book
                   </span>
                   )}
                  </div>

                  <hr />
                </div>

                {itemPackage.prices.map((price, index) => (
                  <div
                    v-for="(price, index) in pack.prices"
                    key={index}
                    className="flex flex-col gap-2 mt-5"
                  >
                    <div className="flex gap-6">
                      <span className="text-gray-500 text-sm">Quantity</span>

                      <div className="ml-auto flex flex-col">
                        <p className="text-black text-end text-sm">
                          {price.title} x {price.qty}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 w-full">
                      <span className="text-gray-500 text-sm">Date</span>

                      <div className="ms-auto text-end">
                        <span className="text-black text-sm">
                          {GlobalUtility.FormatBeautifullDate(
                            price.activity_date
                          )}
                        </span>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}

                <div className="flex gap-2 mt-3">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="ml-auto text-black text-end font-bold text-sm">
                    {GlobalUtility.IdrCurrencyFormat(itemPackage.final_price)}{" "}
                    {currencyValue &&
                      `(${GlobalUtility.ConvertionCurrencyFormat(
                        itemPackage.final_price,
                        currencyValue,
                        CurrencyListEnum.usd
                      )})`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/*  <!-- Sticky total big screen/PC--> */}
          <div className="hidden lg:block total-amount-section bg-gray-50 p-5">
            <div className="flex gap-2">
              <span className="text-gray-500">Amount</span>
              {amount && (
                <span className="ml-auto text-[#EB5E00] text-end text-xl font-extrabold">
                  {GlobalUtility.IdrCurrencyFormat(amount)}{" "}
                  {currencyValue &&
                    `(${GlobalUtility.ConvertionCurrencyFormat(
                      amount,
                      currencyValue,
                      CurrencyListEnum.usd
                    )})`}
                </span>
              )}
            </div>
          </div>

          {/*   <!-- Sticky total Tablet--> */}
          <div className="hidden sm:block lg:hidden total-amount-section bg-gray-200 bg-opacity-20 rounded-xl sticky top-24 p-5">
            <div className="flex gap-2 w-1/4 mx-auto mb-3">
              <span className="text-gray-500 text-lg">Amount</span>
              <span className="ml-auto text-end font-bold text-lg text-[#EB5E00]">
                {/* {{ idrCurrencyFormat(amount)
                                }}{{
                                    amountUsd > 0 ? `($${amountUsd})` : ""
                                }} */}
              </span>
            </div>
            <hr />
            <div className="hidden sm:flex sm:flex-col lg:hidden gap-4 items-start mt-3">
              <span className="w-full">
                Your booking will be submitted once you continue to the next
                step. (You can choose your payment method in the next step)
              </span>
              <button
                /* @click="handleToPayment" */
                className="ml-auto w-auto px-8 py-2 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                Go to payment
              </button>
            </div>
          </div>
          {/* <!-- Payment checkout mobile view --> */}
          <div
            id="mobileCheckout"
            className="hidden sm:hidden h-auto p-5 elevation-4 sticky bottom-0 left-0 right-0 bg-white"
          >
            <div className="flex gap-4 w-full mb-2">
              <span className="text-gray-500 text-lg">Amount</span>
              <span className="ml-auto text-[#EB5E00] text-end font-bold text-lg">
                {/* {{ idrCurrencyFormat(amount)
                                }}{{
                                    amountUsd > 0 ? `($${amountUsd})` : ""
                                }} */}
              </span>
            </div>
            <hr />
            <div className="flex flex-col gap-4 items-start mt-4">
              <span className="w-full font-bold text-xs">
                Your booking will be submitted once you continue to the next
                step. (You can choose your payment method in the next step)
              </span>
              <button
                /*   @click="handleToPayment"
                                :disabled="processingPayment" */
                className="mx-auto w-auto px-8 py-2 bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                Go to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
