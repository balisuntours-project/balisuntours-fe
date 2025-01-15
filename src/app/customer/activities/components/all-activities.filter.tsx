"use client"

import { MultiSelectFilter } from "@/app/global-components/utility-components/multi-select.filter";
import { SearchBoxComponent } from "@/app/global-components/utility-components/searchbox";
import { useAllActivityStore } from "@/app/store/all-activity.store";

export function AllActivitiesFilterBox() {
    const totalFilteredActivity = useAllActivityStore((state) => state.totalFilteredActivity);

    function FilterMessage() {
        if(totalFilteredActivity) {
            return totalFilteredActivity > 0 ? `${totalFilteredActivity} elegant activities await you!` : ""
        }else if(totalFilteredActivity == undefined) {
            return "Just for you!"
        }
    }

    return (
        <>
        <div className="flex flex-col-reverse lg:flex-row w-full max-w-full justify-between gap-4">
            <div className="query-result w-full mt-auto">
                <h3 className="text-base text-center lg:text-start md:text-xl text-black">
                    <FilterMessage />
                </h3>
            </div>

            <div className="filters grid grid-cols-12 gap-3 w-full">
                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                <MultiSelectFilter />
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-5">
                <SearchBoxComponent className="w-full rounded-md border" inputClassName="w-full bg-white h-12 rounded-lg text-base md:text-sm line-clamp-1" listClassName="absolute top-full w-full bg-white border border-gray-200 z-50 max-h-[200px] scrollbar-hide overflow-y-auto text-xs" showSearchIcon={false} showListResult={false} />
                </div>
            </div>
        </div>
        </>
    )
}