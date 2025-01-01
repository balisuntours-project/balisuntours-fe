import { create } from "zustand";

interface LoaderStoreState {
  isLoading: boolean;
  forceCloseDialog: boolean;
}

interface LoaderStoreStateAction {
  setIsLoading: (status: boolean) => void;
  setForceCloseDialog: (status: boolean) => void;
}

export const useLoaderStore = create<LoaderStoreState & LoaderStoreStateAction>(
  (set) => ({
    isLoading: false,
    setIsLoading: (status) => set({ isLoading: status }),

    forceCloseDialog: false,
    setForceCloseDialog: (status) => set({ forceCloseDialog: status }),
  })
);
