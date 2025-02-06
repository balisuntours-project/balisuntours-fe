/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface AuthStoreState {
  showBrowserPopupDialog: any;
  isLogin: boolean;
}

interface AuthStoreStateAction {
  setShowBrowserPopupDialog: (show: any) => void;
  setIsLogin: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreState & AuthStoreStateAction>(
  (set) => ({
    showBrowserPopupDialog: null,
    setShowBrowserPopupDialog: (show: any) =>
      set({ showBrowserPopupDialog: show }),

    isLogin: false,
    setIsLogin: (status) => set({ isLogin: status }),
  })
);
