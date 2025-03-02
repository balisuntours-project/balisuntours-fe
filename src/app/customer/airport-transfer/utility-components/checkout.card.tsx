"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, CarFront, CheckCheck, CheckCircle, Filter, Settings2 } from "lucide-react";
import { SelectedCarDetail } from "./selected-car-detail.popup";
import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { useEffect, useState } from "react";
import { GlobalUtility } from "@/lib/global.utility";
import ReactDOM from "react-dom";
import { FilterCard } from "./filter.card";

export function CheckoutCard() {
  const selectedCar = useAirportTransferStore((state) => state.selectedCar);

  return (
    <>
      <div className=" lg:border  lg:border-gray-300 lg:rounded-lg lg:p-6">
        <div className="hidden lg:flex flex-col gap-3">
          <span className="mr-auto text-black text-end font-bold text-base">
            Why choose private transfers?
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <CheckCircle className="h-4 w-4 fill-[#06ea06]" />
              <span className="text-sm">Time-saving</span>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle className="h-4 w-4 fill-[#06ea06]" />
              <span className="text-sm">Comfortable & reliable</span>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle className="h-4 w-4 fill-[#06ea06]" />
              <span className="text-sm">Family-friendly</span>
            </div>
          </div>
        </div>

        <div className="fixed lg:relative bottom-0 lg:bottom-auto left-0 lg:left-auto w-full rounded-t-2xl lg:rounded-t-none border-t lg:border-t-0 border-gray-300 bg-white h-auto p-6 lg:p-0 z-10 md:z-auto">
          <div className="md:mt-3 w-full flex flex-col gap-2">
            <div className="flex gap-3 justify-end items-center">
              <div className="block lg:hidden">
                <DynamicDialog
                  trigger={
                    <div className="flex gap-1 justify-end items-center cursor-pointer">
                      <Settings2 className="h-6 w-6 " />
                    </div>
                  }
                >
                  <FilterCard fromPopup={true} />
                </DynamicDialog>
              </div>
              <DynamicDialog
                trigger={
                  <div className="flex gap-1 justify-end items-center cursor-pointer">
                    <CarFront className="h-6 w-6 " />
                    <span className="text-sm underline text-blue-500">
                      {selectedCar.length}
                    </span>
                  </div>
                }
              >
                {selectedCar.length > 0 ? (
                  selectedCar.map((car, key) => (
                    <SelectedCarDetail key={key} selectedVechile={car} />
                  ))
                ) : (
                  <EmptyContent emptyText="No car selected!">
                    <Car className="w-full h-full" />
                  </EmptyContent>
                )}
              </DynamicDialog>
            </div>
            <AuthButton title="Book now" rouded="rounded-lg w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
