import { create } from "zustand";
import { GoogleMapViewParamater } from "../paramaters/google-map/paramater";
import { ActivityPackagePreviewDetailResponse } from "../responses/activity-package/response";
import {
  ItineraryListsParamater,
  PackageListsParamater,
  PriceListsParamater,
} from "../paramaters/activity/paramater";
import { GlobalUtility } from "@/lib/global.utility";

interface DetailActivityStore {
  packages: Array<PackageListsParamater>;
  selectedPackage: PackageListsParamater | undefined;
  selectedItinerary: ItineraryListsParamater | undefined;
  selectedPrices: Array<PriceListsParamater> | undefined;
  selectPackageLoadStatus: boolean;

  disabledCheckoutButton: boolean;
  totalPrice: number;
  totalPriceInFormattedCurrency: string | undefined;
}

interface DetailActivityStoreAction {
  setPackages: (payload: Array<PackageListsParamater>) => void;
  setSelectedPackage: (payload: PackageListsParamater | undefined) => void;
  setSelectedItinerary: (payload: ItineraryListsParamater | undefined) => void;
  setSelectedPrices: (
    updateFn: (
      prevSelectedPrices: Array<PriceListsParamater> | undefined
    ) => Array<PriceListsParamater> | undefined
  ) => void;

  setSelectPackageLoadStatus: (status: boolean) => void;
  setDisabledCheckutButton: (status: boolean) => void;
  setTotalPrice: (total: number) => void;
  setTotalPriceInFormattedCurrency: (formatted: string | undefined) => void;
}

export const useDetailActivityStore = create<
  DetailActivityStore & DetailActivityStoreAction
>((set) => ({
  packages: [],
  setPackages: (payload: Array<PackageListsParamater>) =>
    set({ packages: payload }),

  selectedPackage: undefined,
  setSelectedPackage: (payload: PackageListsParamater | undefined) =>
    set({ selectedPackage: payload }),

  selectedItinerary: undefined,
  setSelectedItinerary: (payload: ItineraryListsParamater | undefined) =>
    set({ selectedItinerary: payload }),

  selectedPrices: undefined,
  setSelectedPrices: (updateFn) =>
    set((state) => ({ selectedPrices: updateFn(state.selectedPrices) })),

  selectPackageLoadStatus: false,
  setSelectPackageLoadStatus: (status: boolean) =>
    set({ selectPackageLoadStatus: status }),

  disabledCheckoutButton: false,
  setDisabledCheckutButton: (status: boolean) =>
    set({ disabledCheckoutButton: status }),

  totalPrice: 0,
  setTotalPrice: (total: number) => set({ totalPrice: total }),

  totalPriceInFormattedCurrency: undefined,
  setTotalPriceInFormattedCurrency: (formatted: string | undefined) =>
    set({ totalPriceInFormattedCurrency: formatted }),
}));
