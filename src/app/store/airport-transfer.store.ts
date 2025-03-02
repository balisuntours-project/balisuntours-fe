import { create } from "zustand";
import { Activity } from "../responses/activity/response";
import { VechileRecomendationResponse } from "../responses/airport-transfer/response";
import {
  RangeVechilePrice,
  SelectedCarParamater,
} from "../paramaters/airport-transfer/paramater";

interface AirportTransferStore {
  onSearch: boolean;
  onInteractWithSearch: boolean;
  recomendedVechiles: Array<VechileRecomendationResponse>;
  idleRecomendedVechiles: Array<VechileRecomendationResponse>;
  selectedCar: Array<SelectedCarParamater>;
  rangeVechilePrice: RangeVechilePrice;
  sliderValue: number;
}

interface AirportTransferStoreAction {
  setOnSearch: (status: boolean) => void;
  setOnInteractWithSearch: (status: boolean) => void;
  setRecomendedVechiles: (data: Array<VechileRecomendationResponse>) => void;
  setIdleRecomendedVechiles: (
    data: Array<VechileRecomendationResponse>
  ) => void;
  setSelectedCar: (
    updateFn: (data: Array<SelectedCarParamater>) => Array<SelectedCarParamater>
  ) => void;
  setRangeVechilePrice: (range: RangeVechilePrice) => void;
  setSliderValue: (total: number) => void;
}

export const useAirportTransferStore = create<
  AirportTransferStore & AirportTransferStoreAction
>((set) => ({
  onSearch: false,
  setOnSearch: (status: boolean) => set({ onSearch: status }),
  onInteractWithSearch: false,
  setOnInteractWithSearch: (status: boolean) =>
    set({ onInteractWithSearch: status }),
  recomendedVechiles: [],
  setRecomendedVechiles: (data: Array<VechileRecomendationResponse>) =>
    set({ recomendedVechiles: data }),
  idleRecomendedVechiles: [],
  setIdleRecomendedVechiles: (data: Array<VechileRecomendationResponse>) =>
    set({ idleRecomendedVechiles: data }),
  selectedCar: [],
  setSelectedCar: (UpdateFn) =>
    set((state) => ({ selectedCar: UpdateFn(state.selectedCar) })),
  rangeVechilePrice: {
    lowest: 0,
    highest: 0,
  },
  setRangeVechilePrice: (range: RangeVechilePrice) =>
    set({ rangeVechilePrice: range }),
  sliderValue: 0,
  setSliderValue: (total: number) => set({ sliderValue: total }),
}));
