import { create } from "zustand";
import { BookingPackageDynamicPropertyResponse } from "../responses/booking/response";
import { ReviewDataParamater } from "../paramaters/activity-review/paramater";

interface BookingStoreState {
  selectedBooking: BookingPackageDynamicPropertyResponse | undefined;
  reviewItems: {
    [key: string]: ReviewDataParamater;
  };
  isOnSubmit: boolean
}

interface BookingStoreStateAction {
  setSelectedBooking: (
    booking: BookingPackageDynamicPropertyResponse | undefined
  ) => void;
  setReviewItems: (
    updateFn: (reviews: { [key: string]: ReviewDataParamater }) => { [key: string]: ReviewDataParamater }
  ) => void;
  setIsOnSubmit: (status: boolean) => void
}

export const useBookingStore = create<
  BookingStoreState & BookingStoreStateAction
>((set) => ({
  selectedBooking: undefined,
  setSelectedBooking: (
    booking: BookingPackageDynamicPropertyResponse | undefined
  ) => set({ selectedBooking: booking }),

  reviewItems: {},
  setReviewItems: (UpdateFn) => set((state) => ({reviewItems: UpdateFn(state.reviewItems)})),


  isOnSubmit: false,
  setIsOnSubmit: (status : boolean) => set({isOnSubmit: status})
}));
