import { create } from "zustand";
import { BookingPackageDynamicPropertyResponse } from "../responses/booking/response";
import { ReviewDataParamater } from "../paramaters/activity-review/paramater";
import { CheckoutDataPackageResponse } from "../responses/activity-package/response";
import { CheckoutMappedPackageDataParamater } from "../paramaters/booking/paramater";

export const defaultBookingScopedState: BookingScopedState = {
  checkoutPayload: undefined,
};

export interface BookingScopedState {
  checkoutPayload: Array<CheckoutMappedPackageDataParamater> | undefined;
}

interface BookingStoreState {
  bookingScopedState: Record<string, BookingScopedState>;

  selectedBooking: BookingPackageDynamicPropertyResponse | undefined;
  reviewItems: {
    [key: string]: ReviewDataParamater;
  };
  isOnSubmit: boolean;

  checkoutPackageBookingData: Array<CheckoutMappedPackageDataParamater>;
}

interface BookingStoreStateAction {
  setScopedState: (
    id: string,
    key: keyof BookingScopedState,
    value: any
  ) => void;
  getScopedState: (id: string) => BookingScopedState;
  resetScopedState: (id: string) => void;

  setSelectedBooking: (
    booking: BookingPackageDynamicPropertyResponse | undefined
  ) => void;
  setReviewItems: (
    updateFn: (reviews: { [key: string]: ReviewDataParamater }) => {
      [key: string]: ReviewDataParamater;
    }
  ) => void;
  setIsOnSubmit: (status: boolean) => void;

  setCheckoutPackageBookingData: (
    packages: Array<CheckoutMappedPackageDataParamater>
  ) => void;
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

  selectedBooking: undefined,
  setSelectedBooking: (
    booking: BookingPackageDynamicPropertyResponse | undefined
  ) => set({ selectedBooking: booking }),

  reviewItems: {},
  setReviewItems: (UpdateFn) =>
    set((state) => ({ reviewItems: UpdateFn(state.reviewItems) })),

  isOnSubmit: false,
  setIsOnSubmit: (status: boolean) => set({ isOnSubmit: status }),

  checkoutPackageBookingData: [],
  setCheckoutPackageBookingData: (
    packages: Array<CheckoutMappedPackageDataParamater>
  ) => set({ checkoutPackageBookingData: packages }),
}));
