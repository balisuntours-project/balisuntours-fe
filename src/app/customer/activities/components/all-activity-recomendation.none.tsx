"use client"

import { ActivityAction } from "@/app/actions/activity/action"
import { BestCategoryActivityDrawer } from "@/app/global-components/utility-components/best-category-activity.drawer"
import { Activity } from "@/app/responses/activity/response"
import { useAllActivityStore } from "@/app/store/all-activity.store"
import { TentTree } from "lucide-react"
import React, { useEffect, useState } from "react"

export function AllActivityRecomendationWhenFilterNone({children} : {children: React.ReactNode}) {
    const recomendedActivities = useAllActivityStore((state) => state.recomendedActivities)
    

    function RecomendationSection() {
        return (
            <>
            {recomendedActivities.length > 0 ? (
                <BestCategoryActivityDrawer title={`Have no clue yet?`} description="Try these legit activities!" activities={recomendedActivities}> 
                <span className="text-blue-500 underline cursor-pointer">or whe have these recomendation for you!</span>
                </BestCategoryActivityDrawer>
            ) : ""}
            </>
        )
    }

    return (
        <>
        <div className="flex flex-col col-span-4 items-center justify-center p-4 text-center mx-auto">
              <TentTree strokeWidth={2.75} className="h-14 w-14 md:h-9 md:w-9 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800">
                No Activities Found
              </h2>
              <span className="text-gray-600 flex flex-col md:flex-row gap-1">
                Try adjusting your filters <RecomendationSection />
              </span>
              <div className="w-[220px] max-w-full mx-auto mt-3">
                {children}
              </div>
            </div>
        </>
    )
}