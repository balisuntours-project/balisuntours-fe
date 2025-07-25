import { create } from "zustand";

interface LandingPageStoreState {
  showLoginDialog: boolean;
  onLoginDialog: boolean;
}

interface LandingPageStoreStateAction {
  setShowLoginDialog: (show: boolean) => void;
  setOnLoginDialog: (show: boolean) => void;
}

export const useLandingPageStore = create<
  LandingPageStoreState & LandingPageStoreStateAction
>((set) => ({
  showLoginDialog: false,
  setShowLoginDialog: (show: boolean) => set({ showLoginDialog: show }),
  onLoginDialog: true,
  setOnLoginDialog: (dialog: boolean) => set({ onLoginDialog: dialog }),
}));
