import { subDays } from "date-fns";
import { create } from "zustand";
import { CoinHistoryFlterEnum } from "../enums/coin/coin.enum";

interface CoinStoreState {
  addedCoinAmount: string;
  coinDiscountAmount: number;
  filterFromDate: Date;
  filterToDate: Date;
  filterType: CoinHistoryFlterEnum;
  onTransferCoin: boolean;
  amountOnTransferCoin: number;
}

interface CoinStoreStateAction {
  setAddedCoinAmount: (coin: string) => void;
  setCoinDiscountAmount: (coin: number) => void;
  setFilterFromDate: (date: Date) => void;
  setFilterToDate: (date: Date) => void;
  setFilterType: (type: CoinHistoryFlterEnum) => void;
  setOnTransferCoin: (status: boolean) => void;
  setAmountOnTransferCoin: (coin: number) => void;
}

export const useCoinStore = create<CoinStoreState & CoinStoreStateAction>(
  (set) => ({
    addedCoinAmount: "",
    setAddedCoinAmount: (coin: string) => set({ addedCoinAmount: coin }),
    coinDiscountAmount: 0,
    setCoinDiscountAmount: (coin: number) => set({ coinDiscountAmount: coin }),
    filterFromDate: subDays(new Date(), 6),
    setFilterFromDate: (date: Date) => set({ filterFromDate: date }),
    filterToDate: new Date(),
    setFilterToDate: (date: Date) => set({ filterToDate: date }),
    filterType: CoinHistoryFlterEnum.All,
    setFilterType: (type: CoinHistoryFlterEnum) => set({ filterType: type }),
    onTransferCoin: false,
    setOnTransferCoin: (status: boolean) => set({ onTransferCoin: status }),
    amountOnTransferCoin: 0,
    setAmountOnTransferCoin: (coin: number) =>
      set({ amountOnTransferCoin: coin }),
  })
);
