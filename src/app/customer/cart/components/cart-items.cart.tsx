"use client";

import {
  CartItemsResponse,
  CartValueItemResponse,
} from "@/app/responses/cart/response";

import { useCartStore } from "@/app/store/cart.store";
import { GlobalUtility } from "@/lib/global.utility";
import { useEffect, useMemo, useState } from "react";
import { CurrencyAction } from "@/app/actions/currency/action";
import { CurrencyListEnum, HttpStatus } from "@/lib/global.enum";

import { MechanismRederCartItems } from "../utility-components/cart-render-condition";
import { useLoaderStore } from "@/app/store/loader.store";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { CartAction } from "@/app/actions/cart/action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { CartEmptyContent } from "../utility-components/cart-empty.content";

export function CartItemsList({ items }: { items: CartItemsResponse | null }) {
  const router = useRouter();
  const { toast } = useToast();
  const selectedCartsTotalAmount = useCartStore(
    (state) => state.selectedCartsTotalAmount
  );
  const selectedCarts = useCartStore((state) => state.selectedCarts);

  const setSelectedCartsTotalAmount = useCartStore(
    (state) => state.setSelectedCartsTotalAmount
  );
  const afterCleaningCart = useCartStore((state) => state.afterCleaningCart);
  const [totalPriceInFormattedCurrency, setTotalPriceInFormattedCurrency] =
    useState<string | undefined>(undefined);
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);

  const handleSetCurrencyPrice = async () => {
    const result = await CurrencyAction.GetCurrency(
      CurrencyListEnum.usd // usd dulu
    );

    if (result.success) {
      const formattedPrice = GlobalUtility.ConvertionCurrencyFormat(
        selectedCartsTotalAmount,
        result.data,
        CurrencyListEnum.usd
      );

      setTotalPriceInFormattedCurrency(formattedPrice);
    }
  };

  useEffect(() => {
    if (selectedCartsTotalAmount) {
      let debounceTimeout: NodeJS.Timeout;
      debounceTimeout = setTimeout(() => {
        handleSetCurrencyPrice();
      }, 100); //delay a
      return () => clearTimeout(debounceTimeout); //clean debounce timeout
    }
  }, [selectedCartsTotalAmount]);

  useEffect(() => {
    if (selectedCarts.length == 0) {
      setSelectedCartsTotalAmount(0);
    }
  }, [selectedCarts.length]);

  const handlebookingAction = async () => {
    if (selectedCarts.length > 0) {
      console.log(selectedCarts)
      setIsLoading(true);
      const selectedUuidCarts: Array<string> = selectedCarts.flatMap(
        (cart) => cart.temporary_items
      );
      const stringCartPayload = JSON.stringify(selectedUuidCarts);
      const checkForFreeTourValidation = await CartAction.FreeTourValidation(
        stringCartPayload
      );
      console.log(checkForFreeTourValidation)
      console.log(selectedUuidCarts)
      setIsLoading(false);
      if (checkForFreeTourValidation.status_code == HttpStatus.OK) {
        router.push(
          `/customer/checkout?cart_data=${stringCartPayload}`
        );

      } else {

        toast({
          description: `${checkForFreeTourValidation.data}`,
          variant: "warning",
        });
        return false;
      }
    } else {
      toast({
        description: `Seems you not select any item yet!`,
        variant: "info",
      });
      return;
    }
  };

  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(GlobalUtility.CheckScreenOnMobile()); // Menentukan apakah perangkat mobile
    };

    handleResize(); // Cek saat pertama kali di-render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <TextLoader title="Hold a second" text="We are preparing your book!" />
      {!afterCleaningCart ? (
        <div className="mt-11 md:mt-24 lg:mt-11 px-5 pb-11 relative">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-6 md:gap-8 lg:w-[90%] mx-auto items-start">
            <MechanismRederCartItems items={items} />
            <div
              className={`checkout-button ${
                isMobile
                  ? "fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-4 z-10 flex flex-col"
                  : "md:col-span-2 h-auto bg-opacity-20 bg-gray-200 rounded-lg p-5 hidden md:flex flex-col gap-6 sticky top-36"
              }`}
            >
              <span className="text-2xl lg:text-xl font-extrabold text-black">
                {selectedCartsTotalAmount > 0
                  ? GlobalUtility.IdrCurrencyFormat(selectedCartsTotalAmount) +
                    (totalPriceInFormattedCurrency
                      ? ` (${totalPriceInFormattedCurrency})`
                      : "")
                  : "Rp.-"}
              </span>
              <button
                onClick={() => handlebookingAction()}
                className="mt-3 md:mt-0 md:px-4 lg:px-8 py-4 mx-auto w-1/2 md:w-full bg-gradient-to-r bg-[#EB5E00] text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ) : (
       <CartEmptyContent />
      )}
    </>
  );
}
