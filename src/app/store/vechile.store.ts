import { create } from "zustand";
import { VechileMainPhotoResponse } from "../responses/vechile/response";

interface VechileStore {
  selectedPostVechileImage: VechileMainPhotoResponse|File|null;
}

interface VechileStoreAction {
  setSelectedPostVechileImage: (image: VechileMainPhotoResponse|File|null) => void;
}

export const useVechileStore = create<VechileStore & VechileStoreAction>(
  (set) => ({
    selectedPostVechileImage: null,
    setSelectedPostVechileImage: (image) => set({ selectedPostVechileImage: image }),
  })
);
