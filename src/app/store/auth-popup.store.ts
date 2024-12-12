import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthPopupState {
  showAuthPopup: boolean;
  
}

interface AuthPopupStateAction {
  setShowAuthPopup: (show: boolean) => void;
  
}

export const useAuthPopupStore = create<AuthPopupState & AuthPopupStateAction>()(
  persist(
    (set) => ({
      showAuthPopup: false,
      setShowAuthPopup: (show: boolean) =>
        set({ showAuthPopup: show }),
    }),
    {
      name: "auth-popup-storage",
      storage: createJSONStorage(() => sessionStorage), // Gunakan sessionStorage sebagai penyimpanan
    }
  )
);
