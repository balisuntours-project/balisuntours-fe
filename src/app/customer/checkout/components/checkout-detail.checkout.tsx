"use client";

import { CurrencyAction } from "@/app/actions/currency/action";
import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { CheckoutMappedPackageDataParamater } from "@/app/paramaters/booking/paramater";
import { CheckoutDataPackageResponse } from "@/app/responses/activity-package/response";
import { useBookingStore } from "@/app/store/booking.store";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "@/lib/global.constant";
import { CurrencyListEnum } from "@/lib/global.enum";
import { GlobalUtility } from "@/lib/global.utility";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CheckoutFormTypeMechanism } from "./checkout-form-type-condition.checkout";
import { useGoogleMapStore } from "@/app/store/google-map.store";
import { CheckoutDataActivityResponse } from "@/app/responses/activity/response";
import { CheckoutAmountSection } from "./checkout-amount-section.checkout";
import { CheckoutUserDataRespnse } from "@/app/responses/booking/response";
import { CheckoutForm } from "./checkout-form-checkout";

export function CheckoutDetail({
  checkoutActivities,
  checkoutPackages,
  minCost,
  userData,
  cartData,
}: {
  checkoutActivities: Array<CheckoutDataActivityResponse>;
  checkoutPackages: Array<CheckoutDataPackageResponse>;
  minCost: number;
  userData: CheckoutUserDataRespnse;
  cartData: Array<string>
}) {
  const setCheckoutPackageBookingData = useBookingStore(
    (state) => state.setCheckoutPackageBookingData
  );
  const checkoutPackageBookingData = useBookingStore(
    (state) => state.checkoutPackageBookingData
  );
  const setCheckoutActivities = useBookingStore(
    (state) => state.setCheckoutActivities
  );
  const setCheckoutPackages = useBookingStore(
    (state) => state.setCheckoutPackages
  );
  const setCheckoutCartData = useBookingStore(
    (state) => state.setCheckoutCartData
  );
  const setCurrencyValue = useBookingStore((state) => state.setCurrencyValue);
  const setBookingScopedState = useBookingStore(
    (state) => state.setScopedState
  );

  const setScopedMapState = useGoogleMapStore((state) => state.setScopedState);

  const setCheckoutAmount = useBookingStore((state) => state.setCheckoutAmount);


  useEffect(() => {
    setCheckoutActivities(checkoutActivities)
    setCheckoutPackages(checkoutPackages)
    setCheckoutCartData(cartData)
  }, [checkoutActivities, checkoutPackages, cartData])

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

      setCheckoutAmount(countAmount);
    }
  };

  useEffect(() => {
    if (checkoutPackages) {
      handleFetchCurrency();
      handleSetTotalAmount();

      const packageMappedDataBowl: Array<CheckoutMappedPackageDataParamater> =
        [];
      checkoutPackages.forEach((item, _) => {
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
          !sameActivityDateAndPackage ||
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

          const payload = {
            base_uuid: item.base_uuid,
            self_confirmation: item.self_confirmation,
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
          };

          packageMappedDataBowl.push(payload);
          setBookingScopedState(item.base_uuid, "checkoutPayload", payload);
          if (
            item.package_type == ActivityPackageTypeEnum.pickupTimeByTeam ||
            item.package_type == ActivityPackageTypeEnum.pickupTimeByTraveller
          ) {
            setScopedMapState(item.base_uuid, "mapScopedPayload", {
              lat: DEFAULT_LAT,
              lng: DEFAULT_LNG,
              zoom: DEFAULT_ZOOM,
            });
          } else if (
            item.package_type == ActivityPackageTypeEnum.basicItinerary
          ) {
            setScopedMapState(item.base_uuid, "mapScopedPayload", {
              lat: item.departure?.departure_map_coordinate
                ? item.departure.departure_map_coordinate.lat
                : DEFAULT_LAT,
              lng: item.departure?.departure_map_coordinate
                ? item.departure.departure_map_coordinate.lng
                : DEFAULT_LNG,
              zoom: 18,
            });
          }
        }
      });

      setCheckoutPackageBookingData(packageMappedDataBowl);
    }
  }, [checkoutPackages]);

  useEffect(() => {
    if(checkoutPackageBookingData) {
      console.log(checkoutPackageBookingData)
      console.log(checkoutPackages)
    }
  }, [checkoutPackageBookingData])

  const [isPackageStateLoaded, setIsPackageStateLoaded] = useState<boolean>(false)
  useEffect(() => {
    if(checkoutPackageBookingData) {
      setIsPackageStateLoaded(true)
    }
  }, [checkoutPackageBookingData])

  return (
    <>
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
        <div className="col-span-8 bg-white rounded-lg h-auto shadow-lg sm:mb-6">
          <div className="p-5 sm:p-5 lg:p-8">
            <div className="flex gap-3 items-center text-sm sm:text-base bg-[#5FA22A] text-white !py-3 p-4 rounded-md">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
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

                <CheckoutFormTypeMechanism
                  minCost={minCost}
                  itemPackage={itemPackage}
                />
              </div>
            ))}

            {/* Travaeller information section */}
            <CheckoutForm minCost={minCost} userData={userData} />
          </div>
        </div>

        {/* Amount secntion */}
        <CheckoutAmountSection
          checkoutActivities={checkoutActivities}
          checkoutPackages={checkoutPackages}
        />
      </div>
    </>
  );
}
