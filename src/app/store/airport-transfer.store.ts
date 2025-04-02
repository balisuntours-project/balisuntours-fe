import { create } from "zustand";
import { Activity } from "../responses/activity/response";
import {
  AdditionalServiceItemResponseWithQty,
  TransactionListResponse,
  VechileRecomendationResponse,
} from "../responses/airport-transfer/response";
import {
  CheckoutBookingCarDataParamater,
  CheckoutToPaymentParamater,
  RangeVechilePrice,
  SelectedCarParamater,
} from "../paramaters/airport-transfer/paramater";
import { CoordinatParamater } from "../paramaters/google-map/paramater";
import { TransferTypeEnum } from "../enums/airport-transfer/airport-transfer.enum";

interface AirportTransferStore {
  onSearch: boolean;
  onInteractWithSearch: boolean;
  transferType: TransferTypeEnum;
  recomendedVechiles: Array<VechileRecomendationResponse>;
  idleRecomendedVechiles: Array<VechileRecomendationResponse>;
  selectedCar: Array<SelectedCarParamater>;
  rangeVechilePrice: RangeVechilePrice;
  sliderValue: number;
  originCoordinate: CoordinatParamater | undefined;
  destinationCoordinate: CoordinatParamater | undefined;
  bookingBaseData: CheckoutBookingCarDataParamater | undefined;
  selectedAdditionalService: Array<AdditionalServiceItemResponseWithQty>;
  checkoutPaymentData: CheckoutToPaymentParamater | undefined;
  onClickCheckout: boolean;
  selectedBooking: Pick<TransactionListResponse, "booking_vechile">|undefined
}

interface AirportTransferStoreAction {
  setOnSearch: (status: boolean) => void;
  setOnInteractWithSearch: (status: boolean) => void;
  setTransferType: (type: TransferTypeEnum) => void;
  setRecomendedVechiles: (data: Array<VechileRecomendationResponse>) => void;
  setIdleRecomendedVechiles: (
    data: Array<VechileRecomendationResponse>
  ) => void;
  setSelectedCar: (
    updateFn: (data: Array<SelectedCarParamater>) => Array<SelectedCarParamater>
  ) => void;
  setRangeVechilePrice: (range: RangeVechilePrice) => void;
  setSliderValue: (total: number) => void;
  setOriginCoordinate: (coordinate: CoordinatParamater | undefined) => void;
  setDestinationCoordinate: (
    coordinate: CoordinatParamater | undefined
  ) => void;
  setBookingBaseData: (
    data: CheckoutBookingCarDataParamater | undefined
  ) => void;
  setSelectedAdditionalService: (
    updateFn: (
      data: Array<AdditionalServiceItemResponseWithQty>
    ) => Array<AdditionalServiceItemResponseWithQty>
  ) => void;
  setCheckoutPaymentData: (
    data: CheckoutToPaymentParamater | undefined
  ) => void;
  setOnClickCheckout: (status: boolean) => void;
  setSelectedBooking: (booking: Pick<TransactionListResponse, "booking_vechile">|undefined) => void;
}

export const useAirportTransferStore = create<
  AirportTransferStore & AirportTransferStoreAction
>((set) => ({
  onSearch: false,
  setOnSearch: (status: boolean) => set({ onSearch: status }),
  onInteractWithSearch: false,
  setOnInteractWithSearch: (status: boolean) =>
    set({ onInteractWithSearch: status }),
  transferType: TransferTypeEnum.airportToHotel,
  setTransferType: (type: TransferTypeEnum) =>
    set({ transferType: type }),
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
  originCoordinate: undefined,
  setOriginCoordinate: (coordinte: CoordinatParamater | undefined) =>
    set({ originCoordinate: coordinte }),
  destinationCoordinate: undefined,
  setDestinationCoordinate: (coordinte: CoordinatParamater | undefined) =>
    set({ destinationCoordinate: coordinte }),
  bookingBaseData: undefined,
  setBookingBaseData: (data: CheckoutBookingCarDataParamater | undefined) =>
    set({ bookingBaseData: data }),
  selectedAdditionalService: [],
  setSelectedAdditionalService: (UpdateFn) =>
    set((state) => ({
      selectedAdditionalService: UpdateFn(state.selectedAdditionalService),
    })),
  checkoutPaymentData: undefined,
  setCheckoutPaymentData: (data: CheckoutToPaymentParamater | undefined) =>
    set({ checkoutPaymentData: data }),
  onClickCheckout: false,
  setOnClickCheckout: (status: boolean) => set({ onClickCheckout: status }),
  selectedBooking: undefined,
  setSelectedBooking: (booking: Pick<TransactionListResponse, "booking_vechile">|undefined) => set({ selectedBooking: booking }),
}));
