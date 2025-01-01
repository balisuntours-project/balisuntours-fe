"use client";

import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import {
  CartItemsResponse,
  CartValueItemResponse,
} from "@/app/responses/cart/response";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { DatePickerCart } from "./datepicker.cart";
import { QtyPlusMinusSection } from "@/app/global-components/utility-components/qty-plus-minus.section";
import { IncrementDecrementEnum } from "@/app/enums/activity/activity.enum";

import {
  ActivityPackagePriceResponse,
  CartPriceResponse,
} from "@/app/responses/activity-package-price/response";
import { Suspense, useEffect, useState } from "react";
import { UpdateCartParamater } from "@/app/paramaters/cart/paramater";
import { UpdatingCartType } from "@/app/enums/cart/cart.enum";
import { CartAction } from "@/app/actions/cart/action";
import {
  defaultScopedDatePickerState,
  useDatePickerScopedStore,
} from "@/app/store/date-picker-scoped.store";
import { GlobalUtility } from "@/lib/global.utility";
import { useToast } from "@/hooks/use-toast";
import { defaultCartScopedState, useCartStore } from "@/app/store/cart.store";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function ItemSection({
  item,
  orderId,
}: {
  item: CartValueItemResponse;
  orderId: string;
}) {
  const { toast } = useToast();

  const scopedState = useDatePickerScopedStore(
    (store) => store.scopedStates[orderId] || defaultScopedDatePickerState
  );
  const setCartScopedState = useCartStore((state) => state.setScopedState);
  const selectedCartsTotalAmount = useCartStore(
    (state) => state.selectedCartsTotalAmount
  );
  const setSelectedCartsTotalAmount = useCartStore(
    (state) => state.setSelectedCartsTotalAmount
  );
  const setSelectedCarts = useCartStore((state) => state.setSelectedCarts);
  const selectedCarts = useCartStore((state) => state.selectedCarts);
  const isOnFirstLoad = useCartStore((state) => state.isOnFirstLoad);
  const setIsOnFirstLoad = useCartStore((state) => state.setIsOnFirstLoad);

  const [localManipulatePrice, setLocalManipulatePrice] = useState<
    Array<CartPriceResponse>
  >(item.prices);

  const [updatedCart, setUpdatedCart] = useState<
    Array<UpdateCartParamater> | undefined
  >(undefined);

  const incrementDecrementQty = (
    selectedPrice: CartPriceResponse,
    action: IncrementDecrementEnum
  ) => {
    let newQty = 1;
    setLocalManipulatePrice((prevPrice) => {
      return prevPrice.map((price, key) => {
        if (
          price.uuid == selectedPrice.uuid &&
          price.cart_uuid == selectedPrice.cart_uuid
        ) {
          const isIncrement = action === IncrementDecrementEnum.increment;
          newQty = isIncrement
            ? price.qty < price.minimum_qty
              ? price.minimum_qty
              : 1
            : price.qty === price.minimum_qty
            ? 0
            : 1;

          const updatedQty = isIncrement
            ? Math.min(price.qty + newQty, price.maximum_qty)
            : Math.max(price.qty - newQty, price.minimum_qty);

          //set updated data cart
          if (isIncrement && price.qty < price.maximum_qty) {
            handlePushOrUpdateCartPayloads(price, updatedQty);
            handleCalculateTotalCartPrice(
              price,
              newQty,
              IncrementDecrementEnum.increment
            );
          } else if (!isIncrement && price.qty > price.minimum_qty) {
            handlePushOrUpdateCartPayloads(price, updatedQty);
            handleCalculateTotalCartPrice(
              price,
              newQty,
              IncrementDecrementEnum.decrement
            );
          }

          return {
            ...price, // Salin properti objek asli
            qty: updatedQty, // Perbarui jumlah
          };
        }

        return price;
      });
    });
  };

  const handlePushOrUpdateCartPayloads = (
    price: CartPriceResponse,
    updatedQty: number
  ) => {
    const newStackUpdatedCart = updatedCart ? [...updatedCart] : [];
    const existingCartIndex = newStackUpdatedCart.findIndex(
      (cart) => cart.cart_uuid == price.cart_uuid
    );

    if (existingCartIndex !== -1) {
      // Buat salinan dan perbarui
      newStackUpdatedCart[existingCartIndex] = {
        ...newStackUpdatedCart[existingCartIndex],
        qty: updatedQty,
      };
    } else {
      // Tambahkan entri baru jika tidak ditemukan
      newStackUpdatedCart.push({
        qty: updatedQty,
        cart_uuid: price.cart_uuid,
        temporary_order_id: orderId,
        type: UpdatingCartType.qty,
        activity_date: null,
      });
    }

    setUpdatedCart(newStackUpdatedCart);
  };

  const [localTotalPrice, setLocalTotalPrice] = useState(item.total_price);
  const [idlePrice, setIdlePrice] = useState<
    | {
        amount: number;
        action: IncrementDecrementEnum;
      }
    | undefined
  >(undefined);

  const handleCalculateTotalCartPrice = (
    price: CartPriceResponse,
    newQty: number,
    action: IncrementDecrementEnum
  ) => {
    const idlePrice = price.price * newQty;

    if (action == IncrementDecrementEnum.increment) {
      setLocalTotalPrice(localTotalPrice + idlePrice);
      setIdlePrice({
        amount: idlePrice,
        action: IncrementDecrementEnum.increment,
      });
    } else {
      setLocalTotalPrice(localTotalPrice - idlePrice);
      setIdlePrice({
        amount: idlePrice,
        action: IncrementDecrementEnum.decrement,
      });
    }
  };

  const handleUpdateCart = async () => {
    if (updatedCart && updatedCart.length > 0) {
      await Promise.allSettled(
        updatedCart.map((cart, _) => {
          return CartAction.UpdateCart(cart);
        })
      );
    }
  };

  const handleUpdateActivitydate = async () => {
    if (scopedState.selectedDate) {
      if (
        GlobalUtility.AllowedDates(scopedState.selectedDate, item.diff_days)
      ) {
        toast({
          description: `Ah you did pick an invalid date, pick the right one!`,
          variant: "danger",
        });

        return;
      }

      await CartAction.UpdateCart({
        cart_uuid: item.prices[0].cart_uuid, // gunakan sembarang karena di server yang dijadikan param adalah orderId
        temporary_order_id: orderId,
        qty: null,
        activity_date: scopedState.selectedDate,
        type: UpdatingCartType.date,
      });
    }
  };

  const checkedAction = (e: boolean | string) => {
    setSelectedCarts((prevSelectedCart) => {
      if (e == true) {
        // Tambahkan item jika belum ada dalam selectedCarts
        if (
          !prevSelectedCart.some(
            (cartItem) => cartItem.temporary_order_id == orderId
          )
        ) {
          setSelectedCartsTotalAmount(
            selectedCartsTotalAmount + localTotalPrice
          );
          return [
            ...prevSelectedCart,
            {
              ...item,
              temporary_order_id: orderId,
            },
          ];
        }

        return prevSelectedCart; // Tidak menambahkan duplikat
      } else {
        setSelectedCartsTotalAmount(selectedCartsTotalAmount - localTotalPrice);
        // Hapus item dari selectedCarts
        return prevSelectedCart.filter(
          (cartItem) => cartItem.temporary_order_id !== orderId
        );
      }
    });
  };

  useEffect(() => {
    if (scopedState.selectedDate && !isOnFirstLoad) {
      setIsOnFirstLoad(true);
      handleUpdateActivitydate();
    }
  }, [scopedState.selectedDate]);

  useEffect(() => {
    if (localTotalPrice) {
      setCartScopedState(orderId, "cartTotalPrice", localTotalPrice);
    }
  }, [localTotalPrice]);

  useEffect(() => {
    if (idlePrice) {
      const isThisItemSelected = selectedCarts.find(
        (cart) => cart.temporary_order_id == orderId
      );
      if (isThisItemSelected) {
        setSelectedCartsTotalAmount(
          idlePrice.action == IncrementDecrementEnum.increment
            ? selectedCartsTotalAmount + idlePrice.amount
            : selectedCartsTotalAmount - idlePrice.amount
        );
      }
    }
  }, [idlePrice]);

  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;
    if (updatedCart) {
      debounceTimeout = setTimeout(() => {
        handleUpdateCart();
        setUpdatedCart(undefined);
      }, 1000); //delay agar menghindari spam klik ke server
    }
    return () => clearTimeout(debounceTimeout); //clean debounce timeout
  }, [updatedCart]);

  return (
    <>
      <div className="p-3 md:p-6">
        <div className="md:grid md:grid-cols-5 md:gap-11 align-start">
          <div className="flex gap-4 md:col-span-5 lg:col-span-3 md:mr-auto relative">
            <Checkbox
              className="data-[state=checked]:bg-[#EB5E00]"
              disabled={
                GlobalUtility.AllowedDates(
                  GlobalUtility.SetFormattedStandartDate(
                    scopedState.selectedDate || item.activity_date
                  ),
                  item.diff_days
                ) || item.is_fully_booked_until ? true : false
              }
              onCheckedChange={(e) => checkedAction(e)}
              checked={
                selectedCarts.find(
                  (selectedCart) => selectedCart.temporary_order_id == orderId
                )
                  ? true
                  : false
              }
            />

            <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] aspect-square">
            <ImageWithLoader
              src={item.main_photo}
              alt={`Activity banner`}
              fallbackSrc="/fallback-image.png"
              classNameProp="rounded-lg w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover"
              skeletonClassName="rounded-lg"
              priority={false} // Gambar ini tidak diberi prioritas
              width={150}
              height={150}
            />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-black text-base md:text-lg font-extrabold">
                {item.activity_title}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base">
                  {item.package_title}
                </span>

               

              </div>
              <div className="hidden md:flex flex-col">
              {item.is_fully_booked_until && (
                 <TooltipProvider>
                 <Tooltip>
                   <TooltipTrigger asChild>
                   <Badge className="max-w-max" variant="destructive">Currently fully booked</Badge>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Available on { format(item.is_fully_booked_until, "PPPP")}</p>
                   </TooltipContent>
                 </Tooltip>
               </TooltipProvider>
                   
                )}

              <div className="relative mt-1 max-w-[250px]">
                <DatePickerCart
                  orderId={orderId}
                  diffDays={item.diff_days}
                  defaultSelectedDate={item.activity_date}
                />
              </div>
              </div>
            </div>
          </div>

          <div className="flex items-end md:hidden gap-1">
             
              <div className="relative mt-1 max-w-[250px]">
                <DatePickerCart
                  orderId={orderId}
                  diffDays={item.diff_days}
                  defaultSelectedDate={item.activity_date}
                />
              </div>

              {item.is_fully_booked_until && (
                 <TooltipProvider>
                 <Tooltip>
                   <TooltipTrigger asChild>
                   <Badge className="max-w-max self-center" variant="destructive">Fully booked</Badge>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Available on { format(item.is_fully_booked_until, "PPPP")}</p>
                   </TooltipContent>
                 </Tooltip>
               </TooltipProvider>
                   
                )}

              </div>

          <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-auto md:col-span-5 lg:col-span-2 ">
            {localManipulatePrice.map((price, key) => (
              <div key={key} className="flex justify-between gap-4">
                <span className="text-sm md:text-base lg:text-end ms-auto">
                  {price.title}
                </span>
                <QtyPlusMinusSection
                  qty={price.qty}
                  onClick={(action) => incrementDecrementQty(price, action)} // Meneruskan aksi ke fungsi
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
