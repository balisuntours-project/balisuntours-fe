"use client";

import { DetailActivityPackageParamater } from "@/app/paramaters/activity/paramater";
import { DatePickerPackage } from "../../utility-components/datepicker.package";
import { useEffect, useState } from "react";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import { PackageListPackage } from "../../utility-components/package-list.package";
import { PriceListPackage } from "../../utility-components/price-list.package";
import { PackageItineraries } from "../../utility-components/itineraries.package";
import { WhatToExceptActivity } from "../../utility-components/what-to-expect.activity";
import { CheckoutSectionPackage } from "../../utility-components/checkout-section.package";
import { ActivityDateProvider } from "../provider/activity-booking-date.provider";

export function DetailActivityPackage(props: DetailActivityPackageParamater) {
  const setPackages = useDetailActivityStore((state) => state.setPackages);

  useEffect(() => {
    setPackages(props.activity_packages);
  }, []);

  return (
    <>
      <div className="mt-6 md:mt-11 ">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8">
          {/* Description & Itinerary section */}
          <div className="col-span-7">
            <div className="bg-[#EFF7E8] p-6 rounded-lg">
              <h2 className="text-xl md:text-3xl font-semibold text-black mb-4">
                Highlight
              </h2>
              <div
                className="text-justify list-disc list-inside text-sm"
                dangerouslySetInnerHTML={{ __html: props.description }}
              />
            </div>
            <div className="hidden md:block">
            <PackageItineraries />
            <WhatToExceptActivity
              additional_description={props.additional_description}
              activity_galleries={props.activity_galleries}
            />
            </div>
          </div>
          {/* End Description & Itinerary section */}

          <div className="col-span-5">
            <div className="border  border-gray-300 rounded-lg p-6 md:sticky top-[18%] max-h-[550px] overflow-auto">
              <h2 className="text-3xl font-semibold text-black mb-3">
                Package Options
              </h2>
              <div className="h-auto w-full">
                <h3 className="text-base text-gray-500 mt-4">Dates</h3>

                <ActivityDateProvider>
                  <div className="relative mt-1">
                    <DatePickerPackage />
                  </div>

                  <hr className="my-7" />

                  <h3 className="text-base text-gray-500">Package type</h3>
                  <div className="packages-list">
                    <PackageListPackage packages={props.activity_packages} />
                  </div>

                  <div className="prices-list">
                    <PriceListPackage />
                  </div>

                  <div className="checkout-section">
                    <CheckoutSectionPackage is_published={props.is_published} />
                  </div>
                </ActivityDateProvider>
              </div>
            </div>
            <div className="block md:hidden">
            <PackageItineraries />
            <WhatToExceptActivity
              additional_description={props.additional_description}
              activity_galleries={props.activity_galleries}
            />
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
}
