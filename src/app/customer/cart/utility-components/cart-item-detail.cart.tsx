"use client";

import { CartValueItemResponse } from "@/app/responses/cart/response";
import { ItemSection } from "./item-section.item";
import { GlobalUtility } from "@/lib/global.utility";
import { Trash } from "lucide-react";
import { defaultCartScopedState, useCartStore } from "@/app/store/cart.store";
import { useEffect } from "react";
import { CartAction } from "@/app/actions/cart/action";
import { ConfirmationDialog } from "@/app/global-components/utility-components/confirmation.dialog";
import { useToast } from "@/hooks/use-toast";
import { HttpStatus } from "@/lib/global.enum";

export function CartItemDetail({
  item,
  orderId,
}: {
  item: CartValueItemResponse;
  orderId: string;
}) {
  const { toast } = useToast();
  const scopedCartState = useCartStore(
    (state) => state.cartScopedStates[orderId] || defaultCartScopedState
  );

  const setScopedState = useCartStore((state) => state.setScopedState);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setUseStateCartItems = useCartStore(
    (state) => state.setUseStateCartItems
  );
  const useStateCartItems = useCartStore((state) => state.useStateCartItems);
  const setIsOnFirstLoad = useCartStore((state) => state.setIsOnFirstLoad);
  const selectedCartsTotalAmount = useCartStore(
    (state) => state.selectedCartsTotalAmount
  );
  const setSelectedCartsTotalAmount = useCartStore(
    (state) => state.setSelectedCartsTotalAmount
  );
  const setSelectedCarts = useCartStore((state) => state.setSelectedCarts);
  const selectedCarts = useCartStore((state) => state.selectedCarts);

  const handleDestroySingleCart = async () => {
    const result = await CartAction.DestroySingleCart(orderId);

    if (result.status_code == HttpStatus.OK) {
      if (cartItems) {
        setIsOnFirstLoad(true);
        setCartItems((prevItems) => {
          if (!prevItems) return prevItems; // Jika prevItems undefined, kembalikan apa adanya

          return Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(prevItems).filter(([key, item]) => {
              return key != orderId;
            })
          );
        });

        const includeOnSelectedCart = selectedCarts.find(
          (cart) => cart.temporary_order_id == orderId
        );
        if (includeOnSelectedCart) {
          setSelectedCartsTotalAmount(
            selectedCartsTotalAmount - includeOnSelectedCart.total_price
          );
          setSelectedCarts((selectedCarts) => {
            return selectedCarts.filter(
              (cart) =>
                cart.temporary_order_id !==
                includeOnSelectedCart.temporary_order_id
            );
          });
        }
      }
      if (!useStateCartItems) {
        setUseStateCartItems(true);
      }
      toast({
        description: `Succesfully deleting item from cart!`,
        variant: "success",
      });
    } else {
      toast({
        description: `Failed deleting item, something might happen!?`,
        variant: "danger",
      });

      return;
    }
  };

  useEffect(() => {
    setScopedState(orderId, "cartTotalPrice", item.total_price);
  }, [item]);

  return (
    <>
      <div className="h-auto bg-gray-200 bg-opacity-20 rounded-lg">
        <ItemSection orderId={orderId} item={item} />

        <hr />

        <div className="py-4 px-6">
          <div className="mx-auto grid grid-cols-5 gap-11">
            <div className="flex gap-8 items-start col-span-3 mr-auto">
              <ConfirmationDialog
                onClick={() => handleDestroySingleCart()}
                dialogTitle="Continue to scrub this activity?"
                dialogDescription="After this action, you gotta add this activity again if you want to book it."
              >
                <Trash className="text-black w-[20px] h-[20px] underline cursor-pointer flex" />
              </ConfirmationDialog>
            </div>

            <div className="ml-auto col-span-2 flex justify-center items-center gap-1">
              <div v-show="cart.activity_package_type == 4">
                {/*    <v-tooltip
                                          location="top"
                                          :text="`You add a free tour, and ${idrCurrencyFormat(
                                              cart.total_price
                                          )} are the minimum spend for ${
                                              cart.total_qty
                                          } ${cart.price_information}`"
                                      >
                                          <template v-slot:activator="{ props }">
                                              <v-icon
                                                  :size="
                                                      checkScreenIsMobile()
                                                          ? 'x-small'
                                                          : 'small'
                                                  "
                                                  className="text-blue-500 text-xs"
                                                  v-bind="props"
                                                  v-on="on"
                                                  >mdi-help-circle</v-icon
                                              >
                                          </template>
                                      </v-tooltip> */}
              </div>
              {scopedCartState.cartTotalPrice != undefined ? (
                <span className="text-base sm:text-lg font-extrabold text-black text-end">
                  {GlobalUtility.IdrCurrencyFormat(
                    scopedCartState.cartTotalPrice
                  )}
                </span>
              ) : (
                <span className="text-sm sm:text-base text-black text-end">
                  Calculating...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
