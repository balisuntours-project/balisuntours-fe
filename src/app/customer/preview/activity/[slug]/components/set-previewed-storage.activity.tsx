"use client";

import { RecentlyOrRecomendedActivityParamater } from "@/app/paramaters/activity/paramater";
import { useRecentlyActivityStore } from "@/app/store/recently-activity.store";
import { useEffect } from "react";

export function SetRecentlyViewedActivityToStorage({
  activity,
}: {
  activity: RecentlyOrRecomendedActivityParamater;
}) {
  const recentlyViewedActivity = useRecentlyActivityStore(
    (state) => state.recentlyViewedActivity
  );
  const setRecentlyViewedActivity = useRecentlyActivityStore(
    (state) => state.setRecentlyViewedActivity
  );

  const hasHydrated = useRecentlyActivityStore((state) => state._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return; // Tunggu sampai state terhydrate

    //console.log("Recently Viewed Activity (Before):", recentlyViewedActivity);

    try {
      // Cek apakah activity dengan slug yang sama sudah ada
      const existingIndex = recentlyViewedActivity.findIndex(
        (item) => item.slug === activity.slug
      );

      let updatedActivities;

      if (existingIndex !== -1) {
        // Jika sudah ada, pindahkan ke posisi pertama
        const existingActivity = recentlyViewedActivity[existingIndex];
        updatedActivities = [
          existingActivity,
          ...recentlyViewedActivity.filter((_, idx) => idx !== existingIndex),
        ];
      } else {
        // Jika belum ada, tambahkan ke posisi pertama
        updatedActivities = [activity, ...recentlyViewedActivity];

        // Jika panjang array melebihi 10, hapus elemen terakhir
        if (updatedActivities.length > 10) {
          updatedActivities.pop();
        }
      }

      //console.log("Recently Viewed Activity (Updated):", updatedActivities);
      // Simpan kembali ke state
      setRecentlyViewedActivity(updatedActivities);
    } catch (error) {
      console.error("Error updating recently viewed activity:", error);
    }
  }, [activity, hasHydrated]);

  return null;
}
