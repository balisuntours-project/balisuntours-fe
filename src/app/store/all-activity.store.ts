import { create } from "zustand";
import { Activity } from "../responses/activity/response";

interface AllActivityStore {
  selectedCategories: Array<string> | undefined;
  searchBoxValue: string | undefined;
  onFiltering: boolean
  totalFilteredActivity: number | undefined
  recomendedActivities: Array<Activity>
}

interface AllActivityStoreAction {
  setSelectedCategories: (categories: Array<string> | undefined) => void;
  setSearchBoxValue: (value: string | undefined) => void;
  setOnFiltering: (value: boolean) => void;
  setTotalFilteredActivity: (total: number | undefined) => void;
  setRecomendedActivities: (activities : Array<Activity>) => void;
}

export const useAllActivityStore = create<
  AllActivityStore & AllActivityStoreAction
>((set) => ({
  selectedCategories: undefined,
  setSelectedCategories: (categories: Array<string> | undefined) =>
    set({ selectedCategories: categories }),

  searchBoxValue: undefined,
  setSearchBoxValue: (value: string | undefined) =>
    set({ searchBoxValue: value }),

  onFiltering: false,
  setOnFiltering: (status: boolean) =>
    set({ onFiltering: status }),
  
  totalFilteredActivity: undefined,
  setTotalFilteredActivity: (total: number | undefined) =>
    set({ totalFilteredActivity: total }),

  recomendedActivities: [],
  setRecomendedActivities: (activities: Array<Activity>) =>
    set({ recomendedActivities: activities }),
}));
