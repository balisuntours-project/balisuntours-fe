"use client";

import { ActivityStatusEnum } from "@/app/enums/activity/activity.enum";
import { CartButton } from "@/app/global-components/utility-components/cart.button";
import { CheckoutButton } from "@/app/global-components/utility-components/checkout.button";
import { useDatePickerStore } from "@/app/store/date-picker.store";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import { GlobalUtility } from "@/lib/global.utility";
import { useActivityDate } from "../provider/activity-booking-date.provider";
import { CartPricesParamater } from "@/app/paramaters/cart/paramater";
import { CartAction } from "@/app/actions/cart/action";
import { HttpStatus } from "@/lib/global.enum";
import { useRouter } from "next/navigation";
import { useAuthPopupStore } from "@/app/store/auth-popup.store";
import { useEffect, useState } from "react";
import { useLoaderStore } from "@/app/store/loader.store";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { useToast } from "@/hooks/use-toast";
import ReactDOM from "react-dom";

export function CheckoutSectionPackage(props: {
  is_published: ActivityStatusEnum;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const selectedPackage = useDetailActivityStore(
    (state) => state.selectedPackage
  );
  const disabledCheckoutButton = useDetailActivityStore(
    (state) => state.disabledCheckoutButton
  );
  const totalPrice = useDetailActivityStore((state) => state.totalPrice);
  const totalPriceInFormattedCurrency = useDetailActivityStore(
    (state) => state.totalPriceInFormattedCurrency
  );

  const selectedDate = useDatePickerStore((state) => state.selectedDate);
  const selectedPrices = useDetailActivityStore(
    (state) => state.selectedPrices
  );

  const setShowAuthPopup = useAuthPopupStore((state) => state.setShowAuthPopup);
  const showAuthPopup = useAuthPopupStore((state) => state.showAuthPopup);

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);

  //diambil dari context provider
  const { activityDateRef, priceQtyEmptyRef } = useActivityDate();

  const makeSureDateAndQtyNotEmpty = (): boolean => {
    if(!selectedPackage) {
      toast({
          description: `Please select a package first!`,
          variant: "info",
        });

        return false
  }

    const validSelectedDate = GlobalUtility.checkDateInput(selectedDate);

    if (!validSelectedDate) {
      if (activityDateRef.current) {
        activityDateRef.current.classList.remove("hidden");
        activityDateRef.current.classList.add("block");
        activityDateRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return false;
    }

    // if(!selectedPackage) {
    //     toast({
    //         description: `Please select a package first!`,
    //         variant: "info",
    //       });

    //       return false
    // }

    let allPriceEmpty: boolean = true;
    if (selectedPrices) {
      allPriceEmpty = selectedPrices.some((price) => price.qty > 0);

      if (!allPriceEmpty) {
        if (priceQtyEmptyRef.current) {
          priceQtyEmptyRef.current.classList.remove("hidden");
          priceQtyEmptyRef.current.classList.add("block");
          priceQtyEmptyRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  const storeCartAction = async () => {
    const cartPriceData: Array<CartPricesParamater> = [];

    selectedPrices?.map((price) => {
      if (price.qty > 0) {
        cartPriceData.push({
          qty: price.qty,
          id: price.id,
          uuid: price.uuid,
          price: price.price,
        });
      }
    });

    const storeCart = await CartAction.StoreToCart({
      activityPackageUuid: selectedPackage!.uuid,
      activityPackageType: selectedPackage!.package_type,
      activityDate: selectedDate!,
      prices: cartPriceData,
    });

    return storeCart;
  };

  const handleAddToCartAction = async () => {
    const saveFromValidation = makeSureDateAndQtyNotEmpty();

    if (!saveFromValidation) {
      return;
    }

    //tambahkan state loading dan component nanti
    setIsLoading(true);

    const storeCart = await storeCartAction();

    if (storeCart.status_code == HttpStatus.CREATED) {
    
      setIsLoading(false);
      router.push(`/customer/cart`);
    } else {
      setIsLoading(false);
      if (storeCart.status_code == HttpStatus.FORBIDDEN) {
        toast({
          description: `${storeCart.data}`,
          variant: "danger",
        });
        return;
      }

      if (storeCart.status_code == HttpStatus.UNAUTHORIZED) {
        setShowAuthPopup(true);

        return;
      }

      toast({
        description: `Any invalid or empty part, double check or try to refresh page`,
        variant: "danger",
      });
    }
  };

  const handleBookAction = async () => {
    const saveFromValidation = makeSureDateAndQtyNotEmpty();

    if (!saveFromValidation) {
      return;
    }

    //tambahkan state loading dan component nanti
    setIsLoading(true);

    const storeCart = await storeCartAction();
    
    if (storeCart.status_code == HttpStatus.CREATED) {
      const stringCartPayload = JSON.stringify(storeCart.data);
      const checkForFreeTourValidation = await CartAction.FreeTourValidation(
        stringCartPayload
      );

      setIsLoading(false);
      
      if (checkForFreeTourValidation.status_code == HttpStatus.OK) {
        router.push(
          `/customer/experiences/checkout?cart_data=${stringCartPayload}`
        );
      } else {
        toast({
          description: `${checkForFreeTourValidation.data}`,
          variant: "warning",
        });
        return false;
      }
    } else {
      setIsLoading(false);
      if (storeCart.status_code == HttpStatus.FORBIDDEN) {
        toast({
          description: `${storeCart.data}`,
          variant: "danger",
        });
        return;
      }

      if (storeCart.status_code == HttpStatus.UNAUTHORIZED) {
        setShowAuthPopup(true);

        return;
      }

      toast({
        description: `Any invalid or empty part, double check or try to refresh page`,
        variant: "danger",
      });
    }
  };

  const [isMobile, setIsMobile] = useState<undefined|boolean>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Menunggu hingga komponen dirender di sisi client
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(GlobalUtility.CheckScreenOnMobile()); // Menentukan apakah perangkat mobile
    };

    handleResize(); // Cek saat pertama kali di-render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CheckoutButtonContent = (
    <div
      className={`${
        isMobile
        ? "fixed bottom-0 left-0 w-full rounded-t-2xl border-t border-gray-300 bg-white h-auto p-6 z-10"
        : "w-full"
      }`}
    >
      <div className="text-xl font-extrabold mb-3">
        Total:
        <span className="text-[#EB5E00] ms-2">
          {totalPrice && totalPrice > 0
            ? GlobalUtility.IdrCurrencyFormat(totalPrice) +
              (totalPriceInFormattedCurrency
                ? ` (${totalPriceInFormattedCurrency})`
                : "")
            : "Rp.-"}
        </span>
      </div>

      {!selectedPackage?.is_fully_booked_until ? (
        <div>
          {!disabledCheckoutButton ? (
            <div className="flex gap-2">
              <CartButton onClick={() => handleAddToCartAction()}>
                Add to Cart
              </CartButton>

              <CheckoutButton onClick={() => handleBookAction()}>
                Book Now
              </CheckoutButton>
            </div>
          ) : (
            <div className="flex gap-2">
             <CartButton disabled={true}>
                Add to Cart
             </CartButton>

              <CheckoutButton disabled={true}>
                Book Now
              </CheckoutButton>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 px-8 py-3 bg-gradient-to-r bg-gray-400 text-white font-bold rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg italic">
          <span>
            This package is fully booked until{" "}
            {GlobalUtility.FormatBeautifullDate(selectedPackage.is_fully_booked_until, true)}, but availability can change
            at any time
          </span>
        </div>
      )}
    </div>
  );

  function ButtonBehaviorOnDifferentScreen() {
    if (isClient && isMobile) {
      return ReactDOM.createPortal(CheckoutButtonContent, document.body);
    }

    return CheckoutButtonContent; // Untuk desktop tetap dalam alur komponen yang ada
  }

  return (
    <>
      <TextLoader title="Hold a second" text="We are preparing your book!" />
      <hr className="my-7 hidden md:block" />
      {(props.is_published && isMobile != undefined) && <ButtonBehaviorOnDifferentScreen />}
    </>
  );
}
