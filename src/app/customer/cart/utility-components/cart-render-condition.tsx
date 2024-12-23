import {
  CartScopedState,
  defaultCartScopedState,
  useCartStore,
} from "@/app/store/cart.store";
import { useEffect, useMemo } from "react";
import {
  CartItemsResponse,
  CartValueItemResponse,
} from "@/app/responses/cart/response";
import { CartItemDetail } from "./cart-item-detail.cart";
import { Trash } from "lucide-react";

import { GlobalUtility } from "@/lib/global.utility";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmationDialog } from "@/app/global-components/utility-components/confirmation.dialog";
import { CartAction } from "@/app/actions/cart/action";
import { useToast } from "@/hooks/use-toast";
import { useLoaderStore } from "@/app/store/loader.store";

export function MechanismRederCartItems({
  items,
}: {
  items: CartItemsResponse | null;
}) {
  const { toast } = useToast();
  const setSelectedCarts = useCartStore((state) => state.setSelectedCarts);
  const selectedCarts = useCartStore((state) => state.selectedCarts);
  const setSelectedCartsTotalAmount = useCartStore(
    (state) => state.setSelectedCartsTotalAmount
  );
  const setCartItems = useCartStore((state) => state.setCartItems);
  const useStateCartItems = useCartStore((state) => state.useStateCartItems);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartScopedStates = useCartStore((store) => store.cartScopedStates);
  const setAfterCleaningCart = useCartStore(
    (store) => store.setAfterCleaningCart
  );

  useEffect(() => {
    if (items) {
      setCartItems(() => items);
    }
  }, [items, setCartItems]);

  const sourceItems = useMemo(() => {
    return !useStateCartItems ? items : cartItems;
  }, [useStateCartItems, cartItems]);

  const checkAllItem = (
    e: boolean | string,
    cartScopedStates: Record<string, CartScopedState>
  ) => {
    if (e == true && sourceItems) {
      let countWholeTotalPrice: number = 0;
      const validCarts = Object.entries(sourceItems)
        .filter(([_, item]) => {
          const cartItem = item as unknown as CartValueItemResponse;
          const formattedDate = GlobalUtility.SetFormattedStandartDate(
            cartItem.activity_date
          );

          // Periksa apakah tanggal diperbolehkan
          return (
            !GlobalUtility.AllowedDates(formattedDate, cartItem.diff_days) &&
            !cartItem.is_fully_booked_until
          );
        })
        .map(([key, item]) => {
          const selectedCartData: CartValueItemResponse & {
            temporary_order_id: string;
          } = {
            ...(item as unknown as CartValueItemResponse),
            temporary_order_id: key,
          };

          const scopedState =
            cartScopedStates[selectedCartData.temporary_order_id] ||
            defaultCartScopedState;

          if (scopedState.cartTotalPrice != undefined) {
            countWholeTotalPrice += scopedState.cartTotalPrice;
          } else {
            console.log(
              "Some total item amounts were not read or are still in a fetched/loading state."
            );
          }
          return selectedCartData;
        }); // Ambil hanya item yang valid

      setSelectedCartsTotalAmount(countWholeTotalPrice);

      setSelectedCarts(() => validCarts); // Simpan valid carts ke state
    } else {
      setSelectedCartsTotalAmount(0);
      setSelectedCarts(() => []);
    }
  };

  const handleDestroyAllCart = async () => {
    if (sourceItems) {
      const orderIds: Array<string> = Object.entries(sourceItems).map(
        ([key, _]) => {
          return key;
        }
      );
      const result = await CartAction.DestroyAllCart(orderIds);

      if (result.success) {
        setAfterCleaningCart(true);
        setSelectedCarts(() => []);
        setCartItems(() => undefined);
        setSelectedCartsTotalAmount(0);
        toast({
          description: `Allright, your cart clean now!`,
          variant: "success",
        });
        return;
      } else {
        toast({
          description: `Failed cleaning cart, something might happen!?`,
          variant: "danger",
        });
        return;
      }
    } else {
      toast({
        description: `Your cart already clean!`,
        variant: "info",
      });
      return;
    }
  };

  return (
    <>
      <div className="sm:col-span-4 flex flex-col gap-5">
        <div className="h-[60px] bg-gray-200 bg-opacity-20 rounded-lg flex justify-between items-center p-3 lg:p-6">
          <div className="flex gap-2 items-center justify-normal">
            <Checkbox
              /* checked={selectedCarts.length > 0 ? true : false} */
              onCheckedChange={(e) => checkAllItem(e, cartScopedStates)}
              className="data-[state=checked]:bg-[#EB5E00]"
              id="select-all"
            />
            {selectedCarts.length > 0 && (
              <span className="text-sm md:text-base">
                {selectedCarts.length} Activity selected
              </span>
            )}
          </div>
          <ConfirmationDialog
            onClick={() => handleDestroyAllCart()}
            dialogTitle="Continue clean your cart?"
            dialogDescription="After this action, your cart gotta be clean!."
          >
            <Trash className="text-black w-[20px] h-[20px] underline cursor-pointer flex" />
          </ConfirmationDialog>
        </div>

        {sourceItems &&
          Object.entries(sourceItems).map(([key, item]) => (
            <CartItemDetail key={key} orderId={key} item={item} />
          ))}
      </div>
    </>
  );
}
