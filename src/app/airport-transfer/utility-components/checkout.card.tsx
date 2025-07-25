"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { Car, CarFront, CheckCircle, Settings2 } from "lucide-react";
import { SelectedCarDetail } from "./selected-car-detail.popup";
import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { useEffect, useState } from "react";
import { GlobalUtility } from "@/lib/global.utility";
import { FilterCard } from "./filter.card";
import { useToast } from "@/hooks/use-toast";
import {
  CarCheckoutParamater,
  CheckoutBookingCarDataCompleteParamater,
} from "@/app/paramaters/airport-transfer/paramater";
import { useLoaderStore } from "@/app/store/loader.store";
import { AirportTransferAction } from "@/app/actions/airport-transfer/action";
import { useRouter } from "next/navigation";
import { useAuthPopupStore } from "@/app/store/auth-popup.store";
import { CurrencyListEnum, HttpStatus } from "@/lib/global.enum";
import { useBookingStore } from "@/app/store/booking.store";
import { CurrencyAction } from "@/app/actions/currency/action";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import { InfoButton } from "@/components/custom-ui/info.button";
import { WhatsappFixedBadge } from "@/app/global-components/utility-components/whatsapp-fixed.badge";

export function CheckoutCard() {
  const selectedCar = useAirportTransferStore((state) => state.selectedCar);
  const [totalPrice, setTotalPrice] = useState(0);

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const setShowAuthPopup = useAuthPopupStore((state) => state.setShowAuthPopup);
  const setTriggerNextRouteAfterLogin = useAuthPopupStore((state) => state.setTriggerNextRouteAfterLogin);
  const triggerNextRouteAfterLogin = useAuthPopupStore((state) => state.triggerNextRouteAfterLogin);
  const currencyValue = useBookingStore((state) => state.currencyValue);
  const setCurrencyValue = useBookingStore((state) => state.setCurrencyValue);
  const totalPriceInFormattedCurrency = useDetailActivityStore(
    (state) => state.totalPriceInFormattedCurrency
  );
  const setTotalPriceInFormattedCurrency = useDetailActivityStore(
    (state) => state.setTotalPriceInFormattedCurrency
  );

  const router = useRouter();
  const { toast } = useToast();
  const bookingBaseData = useAirportTransferStore(
    (state) => state.bookingBaseData
  );

  const handleBookingCar = async () => {
    if (!bookingBaseData) {
      toast({
        description: `Hold on, fill the form first!`,
        variant: "info",
      });

      return;
    }

    if (selectedCar.length == 0) {
      toast({
        description: `No car selected!`,
        variant: "info",
      });

      return;
    }

    const vechileData: Array<CarCheckoutParamater> = selectedCar.map((car) => {
      return {
        uuid: car.uuid,
        qty: car.qty,
      };
    });
    setIsLoading(true);
    const payload: CheckoutBookingCarDataCompleteParamater = {
      ...bookingBaseData,
      vechile_data: vechileData,
    };

    const result = await AirportTransferAction.AddBookingVechileData(payload);
    setIsLoading(false);

    if (result.status_code == HttpStatus.UNAUTHORIZED) {
      setShowAuthPopup(true);

      return;
    }

    if (!result.success) {
      toast({
        description: result.data,
        variant: result.status_code == 500 ? "danger" : "warning",
      });

      return;
    }

    router.push(
      `/customer/airport-transfer/checkout?booking_uuid=${result.data}`
    );
  };

  let debounceTimeoutGetFormattedPrice: NodeJS.Timeout | undefined;
  const handleDebounceCurrencyChange = () => {
    clearTimeout(debounceTimeoutGetFormattedPrice);

    // Set a new timeout for the debounce
    debounceTimeoutGetFormattedPrice = setTimeout(async () => {
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
    setCurrencyValue(CurrencyListEnum.usd); //usd dulu
  }, []);

  useEffect(() => {
    handleDebounceCurrencyChange();
  }, [totalPrice]);

  useEffect(() => {
    if (selectedCar.length > 0) {
      let countPrice = 0;
      selectedCar.map((car) => {
        countPrice += car.price * car.qty;
      });

      setTotalPrice(countPrice);
    } else {
      setTotalPrice(0);
    }
  }, [selectedCar]);

  useEffect(() => {
    if(triggerNextRouteAfterLogin) {
      setTriggerNextRouteAfterLogin(undefined)
      handleBookingCar()
    }
  }, [triggerNextRouteAfterLogin])
  return (
    <>
      <div className="z-50"></div>
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
 
        <div className="fixed lg:relative bottom-0 lg:bottom-auto left-0 lg:left-auto w-full rounded-t-2xl lg:rounded-t-none border-t lg:border-t-0 border-gray-300 bg-white h-auto p-6 lg:p-0 z-10 lg:z-auto">
          <div className="md:mt-3 w-full flex flex-col gap-2">
            <div className="flex gap-3 w-full">
              <div className="flex justify-start">
                <span className="text-[#EB5E00] text-start text-lg font-bold">
                  {totalPrice && totalPrice > 0
                    ? GlobalUtility.IdrCurrencyFormat(totalPrice) +
                      (totalPriceInFormattedCurrency
                        ? ` (${totalPriceInFormattedCurrency})`
                        : "")
                    : "Rp.-"}
                </span>
              </div>
              <div className="flex gap-3 ms-auto justify-end items-center">
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
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <DynamicDialog
                  trigger={
                    // <div className="flex gap-1 justify-end items-center cursor-pointer">
                    //   <CarFront className="h-6 w-6 " />
                    //   <span className="text-sm underline text-blue-500">
                    //     {selectedCar.length}
                    //   </span>
                    // </div>
                    <InfoButton
                      title={`Selected car(${selectedCar.length})`}
                      rouded="rounded-lg w-full"
                    />
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
              <div className="col-span-6">
                <AuthButton
                  onClick={() => handleBookingCar()}
                  title="Book now"
                  rouded="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
