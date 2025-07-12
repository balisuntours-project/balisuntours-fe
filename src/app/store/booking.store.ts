import { create } from "zustand";
import { BookingPackageDynamicPropertyResponse } from "../responses/booking/response";
import { ReviewDataParamater } from "../paramaters/activity-review/paramater";
import { CheckoutMappedPackageDataParamater, UnconfirmedBookingDiscountCoinParamater } from "../paramaters/booking/paramater";
import { CheckoutDataActivityResponse } from "../responses/activity/response";
import { CheckoutDataPackageResponse } from "../responses/activity-package/response";
import { CurrencyAction } from "../actions/currency/action";
import { CurrencyListEnum } from "@/lib/global.enum";

export const defaultBookingScopedState: BookingScopedState = {
  checkoutPayload: undefined,
};

export interface BookingScopedState {
  checkoutPayload: CheckoutMappedPackageDataParamater | undefined;
}

interface BookingStoreState {
  bookingScopedState: Record<string, BookingScopedState>;

  selectedBooking: BookingPackageDynamicPropertyResponse | undefined;
  reviewItems: {
    [key: string]: ReviewDataParamater;
  };
  unconfirmedBookingDiscount: {
    [key: string] : UnconfirmedBookingDiscountCoinParamater
  }

  isOnSubmit: boolean;

  checkoutPackageBookingData: Array<CheckoutMappedPackageDataParamater>;

  currencyValue: number | undefined;

  checkoutAmount: number;

  checkoutActivities: Array<CheckoutDataActivityResponse>;
  checkoutPackages: Array<CheckoutDataPackageResponse>;
  checkoutCartData: Array<string>;
  isCheckoutButtonTriggered: boolean;
}

interface BookingStoreStateAction {
  setScopedState: <K extends keyof BookingScopedState>(
    id: string,
    key: K,
    value: BookingScopedState[K]
  ) => void;
  getScopedState: (id: string) => BookingScopedState;
  resetScopedState: (id: string) => void;
  cleanUpScopedState: () => void;

  setSelectedBooking: (
    booking: BookingPackageDynamicPropertyResponse | undefined
  ) => void;
  setReviewItems: (
    updateFn: (reviews: { [key: string]: ReviewDataParamater }) => {
      [key: string]: ReviewDataParamater;
    }
  ) => void;
  setUnconfirmedBookingDiscount: (
    updateFn: (bookings: { [key: string]: UnconfirmedBookingDiscountCoinParamater }) => {
      [key: string]: UnconfirmedBookingDiscountCoinParamater;
    }
  ) => void;
  setIsOnSubmit: (status: boolean) => void;

  setCheckoutPackageBookingData: (
    packages: Array<CheckoutMappedPackageDataParamater>
  ) => void;

  setCurrencyValue: (selectedCurrency: CurrencyListEnum) => Promise<void>;
  setCheckoutAmount: (amount: number) => void;

  setCheckoutActivities: (
    activities: Array<CheckoutDataActivityResponse>
  ) => void;
  setCheckoutPackages: (packages: Array<CheckoutDataPackageResponse>) => void;
  setCheckoutCartData: (carts: Array<string>) => void;
  setIsCheckoutButtonTriggered: (status: boolean) => void;
}

export const useBookingStore = create<
  BookingStoreState & BookingStoreStateAction
>((set, get) => ({
  bookingScopedState: {},

  setScopedState: (id, key, value) => {
    set((state) => ({
      bookingScopedState: {
        ...state.bookingScopedState,
        [id]: {
          ...state.bookingScopedState[id],
          [key]: value,
        },
      },
    }));
  },

  getScopedState: (id) => {
    const state = get().bookingScopedState[id];
    return state || defaultBookingScopedState;
  },

  resetScopedState: (id) => {
    set((state) => ({
      bookingScopedState: {
        ...state.bookingScopedState,
        [id]: defaultBookingScopedState,
      },
    }));
  },

  cleanUpScopedState: () => {
    set({ bookingScopedState: {} }); // Langsung reset ke objek kosong
  },

  selectedBooking: undefined,
  setSelectedBooking: (
    booking: BookingPackageDynamicPropertyResponse | undefined
  ) => set({ selectedBooking: booking }),

  reviewItems: {},
  setReviewItems: (UpdateFn) =>
    set((state) => ({ reviewItems: UpdateFn(state.reviewItems) })),

  unconfirmedBookingDiscount: {},
  setUnconfirmedBookingDiscount: (UpdateFn) =>
    set((state) => ({ unconfirmedBookingDiscount: UpdateFn(state.unconfirmedBookingDiscount) })),

  isOnSubmit: false,
  setIsOnSubmit: (status: boolean) => set({ isOnSubmit: status }),

  checkoutPackageBookingData: [],
  setCheckoutPackageBookingData: (
    packages: Array<CheckoutMappedPackageDataParamater>
  ) => set({ checkoutPackageBookingData: packages }),

  currencyValue: undefined,
  // setCurrencyValue: (currency: number | undefined) =>
  //   set({ currencyValue: currency }),
  setCurrencyValue: async (selectedCurrency: CurrencyListEnum) => {
    const result = await CurrencyAction.GetCurrency(
      selectedCurrency // usd dulu
    );

    if (result.success) {
      set({ currencyValue: result.data });
    }
  },

  checkoutAmount: 0,
  setCheckoutAmount: (amount: number) => set({ checkoutAmount: amount }),

  checkoutActivities: [],
  setCheckoutActivities: (activities: Array<CheckoutDataActivityResponse>) =>
    set({ checkoutActivities: activities }),

  checkoutPackages: [],
  setCheckoutPackages: (packages: Array<CheckoutDataPackageResponse>) =>
    set({ checkoutPackages: packages }),

  checkoutCartData: [],
  setCheckoutCartData: (carts: Array<string>) =>
    set({ checkoutCartData: carts }),

  isCheckoutButtonTriggered: false,
  setIsCheckoutButtonTriggered: (status: boolean) =>
    set({ isCheckoutButtonTriggered: status }),
}));
