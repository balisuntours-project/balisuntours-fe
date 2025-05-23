import { create } from 'zustand';

interface FreeVoucherStoreState {
    selectedPriceUuid: string,
}

interface FreeVoucherStoreStateAction {
    setSelectedPriceUid: (show: string) => void,
}

export const useFreeVoucherStore = create<FreeVoucherStoreState & FreeVoucherStoreStateAction>((set) => ({
    selectedPriceUuid: "",
    setSelectedPriceUid: (priceUuid: string) => set({selectedPriceUuid: priceUuid}),
}))
