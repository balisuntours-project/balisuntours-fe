import { subDays } from "date-fns";
import { create } from "zustand";
import { CoinHistoryFlterEnum } from "../enums/coin/coin.enum";

interface CoinStoreState {
  addedCoinAmount: string;
  coinDiscountAmount: number;
  filterFromDate: Date;
  filterToDate: Date;
  filterType: CoinHistoryFlterEnum
}

interface CoinStoreStateAction {
  setAddedCoinAmount: (coin: string) => void;
  setCoinDiscountAmount: (coin: number) => void;
  setFilterFromDate: (date: Date) => void;
  setFilterToDate: (date: Date) => void;
  setFilterType: (type: CoinHistoryFlterEnum) => void;
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
    filterType : CoinHistoryFlterEnum.All,
    setFilterType: (type: CoinHistoryFlterEnum) => set({filterType : type})
  })
);
