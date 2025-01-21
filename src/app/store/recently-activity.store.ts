import { create } from "zustand";
import { RecentlyOrRecomendedActivityParamater } from "../paramaters/activity/paramater";
import { createJSONStorage, persist } from "zustand/middleware";
import { ActivityLocalStorageEnum } from "../enums/activity/activity.enum";

interface RecentlyActivityStore {
  recentlyViewedActivity: Array<RecentlyOrRecomendedActivityParamater>;
  _hasHydrated: boolean; // Tambahkan properti ini
}

interface RecentlyActivityStoreAction {
  setRecentlyViewedActivity: (
    activities: Array<RecentlyOrRecomendedActivityParamater>
  ) => void;
}

export const useRecentlyActivityStore = create<
  RecentlyActivityStore & RecentlyActivityStoreAction
>()(
  persist(
    (set) => ({
      recentlyViewedActivity: [],
      setRecentlyViewedActivity: (activities) =>
        set({ recentlyViewedActivity: activities }),
      _hasHydrated: false, // Tambahkan properti ini ke default state
    }),
    {
      name: ActivityLocalStorageEnum.recentlyViewed,
      storage: createJSONStorage(() => localStorage), // Gunakan localStorage sebagai penyimpanan
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true; // Update saat state selesai dimuat
        }
      },
    }
  )
);
