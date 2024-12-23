import { create } from "zustand";
import { UpdateCartParamater } from "../paramaters/cart/paramater";
import { CartItemsResponse, CartValueItemResponse } from "../responses/cart/response";

export interface CartScopedState {
  cartTotalPrice: number|undefined;
}

interface CartStore {
  cartScopedStates: Record<string, CartScopedState>;
 
  selectedCarts: Array<CartValueItemResponse & {temporary_order_id: string}>,
  selectedCartsTotalAmount: number,

  cartItems: CartItemsResponse|undefined
  useStateCartItems: boolean,
  isOnFirstLoad: boolean,
  afterCleaningCart: boolean,
}


interface CartStoreAction {
    setScopedState: (id: string, key: keyof CartScopedState, value: any) => void;
  getScopedState: (id: string) => CartScopedState;
  resetScopedState: (id: string) => void;

  setSelectedCarts: (
    updateFn: (carts: Array<CartValueItemResponse & {temporary_order_id: string}>) => Array<CartValueItemResponse & {temporary_order_id: string}>
  ) => void,

  setSelectedCartsTotalAmount: (totalAmount: number) => void,

  setCartItems: (
    updateFn: (items: CartItemsResponse|undefined) => CartItemsResponse|undefined
  ) => void,

  setUseStateCartItems: (status: boolean) => void,
  setIsOnFirstLoad: (status: boolean) => void,
  setAfterCleaningCart: (status: boolean) => void,

}
export const defaultCartScopedState = {
    cartTotalPrice: undefined
};

export const useCartStore = create<CartStore & CartStoreAction>((set, get) => ({
  cartScopedStates: {},

  setScopedState: (id, key, value) => {
    set((state) => ({
      cartScopedStates: {
        ...state.cartScopedStates,
        [id]: {
          ...state.cartScopedStates[id],
          [key]: value,
        },
      },
    }));
  },

  getScopedState: (id) => {
    const state = get().cartScopedStates[id];
    return (
      state || defaultCartScopedState
    );
  },

  resetScopedState: (id) => {
    set((state) => ({
      cartScopedStates: {
        ...state.cartScopedStates,
        [id]: defaultCartScopedState,
      },
    }));
  },

  selectedCarts: [],
  setSelectedCarts: (UpdateFn) => set((state) => ({selectedCarts: UpdateFn(state.selectedCarts)})),

  selectedCartsTotalAmount: 0,
  setSelectedCartsTotalAmount: (totalAmount: number) => set({selectedCartsTotalAmount: totalAmount}),

  cartItems: undefined,
  setCartItems: (UpdateFn) => set((state) => ({cartItems: UpdateFn(state.cartItems)})),

  useStateCartItems: false,
  setUseStateCartItems: (status: boolean) => set({useStateCartItems: status}),

  isOnFirstLoad: true,
  setIsOnFirstLoad: (status: boolean) => set({isOnFirstLoad: status}),

  afterCleaningCart: false,
  setAfterCleaningCart: (status: boolean) => set({afterCleaningCart: status})
  
}));
