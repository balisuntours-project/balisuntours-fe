import { create } from 'zustand';

interface CoinStoreState {
    addedCoinAmount: string,
    coinDiscountAmount: number,
}

interface CoinStoreStateAction {
    setAddedCoinAmount: (coin: string) => void,
    setCoinDiscountAmount: (coin: number) => void,
}

export const useCoinStore = create<CoinStoreState & CoinStoreStateAction>((set) => ({
    addedCoinAmount: "",
    setAddedCoinAmount: (coin: string) => set({addedCoinAmount: coin}),
    coinDiscountAmount: 0,
    setCoinDiscountAmount: (coin: number) => set({coinDiscountAmount: coin}),
}))
