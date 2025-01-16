import { create } from "zustand";

interface MetaDataStore {
  searchBoxValue: string | undefined;
  onFiltering: boolean;
  totalFilteredData: number | undefined;
  triggerRefetchLists: boolean;
}

interface MetaDataStoreAction {
  setSearchBoxValue: (value: string | undefined) => void;
  setOnFiltering: (value: boolean) => void;
  setTotalFilteredData: (total: number | undefined) => void;
  setTriggerRefetchLists: (value: boolean) => void;
}

export const useMetaDataStore = create<MetaDataStore & MetaDataStoreAction>(
  (set) => ({
    searchBoxValue: undefined,
    setSearchBoxValue: (value: string | undefined) =>
      set({ searchBoxValue: value }),

    onFiltering: false,
    setOnFiltering: (status: boolean) => set({ onFiltering: status }),

    totalFilteredData: undefined,
    setTotalFilteredData: (total: number | undefined) =>
      set({ totalFilteredData: total }),

    triggerRefetchLists: false,
    setTriggerRefetchLists: (status: boolean) =>
      set({ triggerRefetchLists: status }),
  })
);
