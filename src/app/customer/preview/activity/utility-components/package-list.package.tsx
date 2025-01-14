"use client";

import { ActivityPackageAction } from "@/app/actions/package/action";
import {
  ItineraryListsParamater,
  PackageListsParamater,
  PriceListsParamater,
} from "@/app/paramaters/activity/paramater";
import { ActivityPackagePriceResponse } from "@/app/responses/activity-package-price/response";
import { ActivityPackagePreviewDetailResponse } from "@/app/responses/activity-package/response";
import { useDatePickerStore } from "@/app/store/date-picker.store";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import { GlobalUtility } from "@/lib/global.utility";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PackageListPackage(props: {
  packages: Array<ActivityPackagePreviewDetailResponse>;
}) {
  /* detail activity state */
  const setSelectedPackage = useDetailActivityStore(
    (state) => state.setSelectedPackage
  );
  const setSelectedItinerary = useDetailActivityStore(
    (state) => state.setSelectedItinerary
  );
  const selectedPackage = useDetailActivityStore(
    (state) => state.selectedPackage
  );
  const setSelectedPrices = useDetailActivityStore(
    (state) => state.setSelectedPrices
  );
  const setSelectPackageLoadStatus = useDetailActivityStore(
    (state) => state.setSelectPackageLoadStatus
  );
  const setTotalPrice = useDetailActivityStore((state) => state.setTotalPrice);
  const setTotalPriceInFormattedCurrency = useDetailActivityStore(
    (state) => state.setTotalPriceInFormattedCurrency
  );
  const setAutoSelectOnPackageSearchParam = useDetailActivityStore(
    (state) => state.setAutoSelectOnPackageSearchParam
  );

  /* Date picker state */
  const setDiffDaysNumber = useDatePickerStore(
    (state) => state.setDiffDaysNumber
  );
  const setCleanCalender = useDatePickerStore(
    (state) => state.setCleanCalender
  );

  const initiatetePricesFromSelectedPackage = (
    prices: Array<ActivityPackagePriceResponse>
  ) => {
    setSelectPackageLoadStatus(true);
    const newPricesData: Array<PriceListsParamater> = prices.map((price) => ({
      ...price, // Salin semua properti objek asli
      qty: 0, // Tetapkan qty menjadi 0
    }));

    setSelectedPrices(() => newPricesData);
    setTimeout(() => {
      setSelectPackageLoadStatus(false);
    }, 500);
  };

  const selectPackageAction = async (
    packageData: PackageListsParamater,
    itinerary: ItineraryListsParamater
  ) => {
    //set to default total price and formated total price
    setTotalPrice(0);
    setTotalPriceInFormattedCurrency(undefined);

    if (packageData.uuid != selectedPackage?.uuid) {
      setSelectedPackage(packageData);
      setSelectedItinerary(itinerary);
      setCleanCalender(true);
      initiatetePricesFromSelectedPackage(packageData.prices);

      const getValidBookDate =
        await ActivityPackageAction.GetPackageValidDateToBook(packageData.uuid);

      setDiffDaysNumber(getValidBookDate.data ?? 1);
    } else {
      setCleanCalender(true);
      setSelectedPackage(undefined);
      setDiffDaysNumber(1);
      setSelectedPrices(() => undefined);
    }
  };

  //jika ada query param
  const searchParam = useSearchParams();
  const packageParam = searchParam.get("package");
  useEffect(() => {
    const handleGetValidDiffDay = async (packageUuid: string) => {
      const getValidBookDate =
        await ActivityPackageAction.GetPackageValidDateToBook(packageUuid);
      setDiffDaysNumber(getValidBookDate.data ?? 1);
    };

    if (packageParam) {
      props.packages.map((item, _) => {
        if (
          GlobalUtility.StringToSlugEncodedString(item.title) == packageParam
        ) {
          handleGetValidDiffDay(item.uuid);
          setAutoSelectOnPackageSearchParam(true);
          setSelectedPackage(item);
          setSelectedItinerary({
            itineraries: item.itineraries,
          });
          setCleanCalender(true);
          initiatetePricesFromSelectedPackage(item.prices);
        }
      });
    }
  }, [packageParam]);

  return (
    <>
      <div className="mt-2 flex gap-4 flex-wrap">
        {props.packages.map((packageData, key) => (
          <div
            key={packageData.uuid}
            onClick={() =>
              selectPackageAction(packageData, {
                itineraries: packageData.itineraries,
              })
            }
            className={`p-2 rounded-lg px-4 cursor-pointer hover:bg-[#FFEDE0]/80 ${
              selectedPackage?.uuid === packageData.uuid
                ? "bg-[#EFF7E8] border-2 border-solid border-[#65ad2e]"
                : "bg-white border border-gray-300 "
            }`}
          >
            <h4 className="text-sm font-bold">{packageData.title}</h4>
          </div>
        ))}
      </div>
    </>
  );
}
