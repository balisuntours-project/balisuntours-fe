"use client";

import { act, useEffect, useState } from "react";
import ActivityCard from "@/app/global-components/utility-components/activity.card";
import { Activity } from "@/app/responses/activity/response";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useAllActivityStore } from "@/app/store/all-activity.store";
import { AllActivitiesParamater } from "@/app/paramaters/activity/paramater";
import { GlobalUtility } from "@/lib/global.utility";
import { ExpandedButton } from "@/components/custom-ui/expanded.button";
import { AllActivityRecomendationWhenFilterNone } from "./all-activity-recomendation.none";
import { ActivityAction } from "@/app/actions/activity/action";
import { ActivityCardSkeleton } from "@/app/skeletons-component/activity-card.skeleton";

export function AllActivitiesList({
  activities,
}: {
  activities: Array<AllActivitiesParamater>;
}) {
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif

  const [onChangePage, setOnChangePage] = useState(false); // Halaman aktif
  const [filteredActivity, setFilteredActivity] = useState<
    Array<AllActivitiesParamater> | undefined
  >(undefined); // Halaman aktif
  const [
    filteredActivityWithoutPagination,
    setFilteredActivityWithoutPagination,
  ] = useState<Array<AllActivitiesParamater> | undefined>(undefined); // Halaman aktif

  const itemsPerPage = 12; // Jumlah item per halaman

  const [totalPages, setTotalPages] = useState(
    GlobalUtility.CountMaxPaginationPage(activities.length, itemsPerPage)
  ); // Hitung jumlah halaman

  // Data yang akan ditampilkan berdasarkan halaman aktif
  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onFiltering = useAllActivityStore((state) => state.onFiltering);
  const searchBoxValue = useAllActivityStore((state) => state.searchBoxValue);
  const setSearchBoxValue = useAllActivityStore(
    (state) => state.setSearchBoxValue
  );
  const setSelectedCategories = useAllActivityStore(
    (state) => state.setSelectedCategories
  );
  const setRecomendedActivities = useAllActivityStore(
    (state) => state.setRecomendedActivities
  );
  const setTotalFilteredActivity = useAllActivityStore(
    (state) => state.setTotalFilteredActivity
  );
  const selectedCategories = useAllActivityStore(
    (state) => state.selectedCategories
  );

  // Fungsi untuk mengganti halaman
  const handlePageChange = (page: number, event: React.MouseEvent) => {
    if (page < 1) {
      event.preventDefault();
      return;
    } else if (page > totalPages) {
      event.preventDefault();
      return;
    }

    setOnChangePage(true);
    event.preventDefault(); // Mencegah reload atau scrolling ke atas
    if (page > 0 && page <= totalPages) {
      setOnChangePage(true); // Tampilkan efek loading
      setTimeout(() => {
        setCurrentPage(page); // Ubah halaman setelah delay
        if (filteredActivityWithoutPagination) {
          const paginatedData = filteredActivityWithoutPagination.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          );

          setFilteredActivity(paginatedData);
        }
        setOnChangePage(false); // Sembunyikan efek loading
      }, 500);
    }
  };

  // Fungsi untuk menentukan halaman yang akan ditampilkan
  const getPaginationRange = () => {
    const maxPageNumbers = 5; // Jumlah maksimum halaman yang ingin ditampilkan
    const range = [];

    // Tampilkan halaman di sekitar halaman aktif
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }

    // Menambahkan halaman yang akan ditampilkan
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const resetAllToDefault = (withCleanFilter?: boolean) => {
    setFilteredActivity(undefined);
    setTotalFilteredActivity(undefined);
    setFilteredActivityWithoutPagination(undefined);
    setTotalPages(
      GlobalUtility.CountMaxPaginationPage(activities.length, itemsPerPage)
    );

    if (withCleanFilter) {
      setSelectedCategories(undefined);
      setSearchBoxValue(undefined);
    }
  };

  const getRecomendedActivity = async () => {
    const response = await ActivityAction.GetRecomendedLatestsActivity();
    setRecomendedActivities(response.data);
  };

  useEffect(() => {
    getRecomendedActivity();
  }, []);

  useEffect(() => {
    if (searchBoxValue || selectedCategories) {
      let filteredData: Array<AllActivitiesParamater> = activities;
      setCurrentPage(1);

      //jika ada search
      if (searchBoxValue) {
        filteredData = filteredData.filter((activity) =>
          activity.title.toLowerCase().includes(searchBoxValue.toLowerCase())
        );
      }

      if (selectedCategories) {
        filteredData = filteredData.filter((activity) =>
          activity.activity_categories.some(
            (category) => selectedCategories.includes(category.uuid) // Cek apakah uuid ada di selectedCategories
          )
        );
      }

      const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      setTotalFilteredActivity(filteredData.length);
      setTotalPages(
        GlobalUtility.CountMaxPaginationPage(filteredData.length, itemsPerPage)
      );
      setFilteredActivityWithoutPagination(filteredData);
      setFilteredActivity(paginatedData);
    } else {
      resetAllToDefault();
    }
  }, [searchBoxValue, selectedCategories]);

  useEffect(() => {
    if (filteredActivity?.length == 0) {
      setTotalFilteredActivity(0);
    }
  }, [filteredActivity?.length]);

  function ActivityCardList() {
    if (filteredActivity) {
      return (
        <>
          {filteredActivity.length > 0 ? (
            filteredActivity.map((activity, index) => (
              <div key={index} className="p-1 col-span-1">
                <ActivityCard
                  activity={activity}
                  tags={{
                    first_tag: "Popular",
                    second_tag: "Best Experience",
                  }}
                  withStyledConfig={true}
                />
              </div>
            ))
          ) : (
            <AllActivityRecomendationWhenFilterNone>
              <ExpandedButton
                onClick={() => resetAllToDefault(true)}
                title="Reset filters"
              />
            </AllActivityRecomendationWhenFilterNone>
          )}
        </>
      );
    } else {
      return (
        <>
          {paginatedActivities.map((activity, index) => (
            <div key={index} className="p-1">
              <ActivityCard
                activity={activity}
                tags={{
                  first_tag: "Popular",
                  second_tag: "Best Experience",
                }}
                withStyledConfig={true}
              />
            </div>
          ))}
        </>
      );
    }
  }

  return (
    <>
      {/* Grid untuk aktivitas */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-5 lg:px-6 xl:px-6 2xl:px-0">
        {!onChangePage && !onFiltering ? (
          <ActivityCardList />
        ) : (
          [...Array(12)].map((_, index) => (
            <ActivityCardSkeleton withStyledConfig={true} key={index} />
          ))
        )}
      </div>

      {/* Komponen Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => handlePageChange(currentPage - 1, event)}
            />
          </PaginationItem>

          {/* Halaman sebelumnya (Ellipsis jika halaman jauh) */}
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(event) => handlePageChange(1, event)}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 4 && <PaginationEllipsis />}

          {/* Halaman sekitar halaman aktif */}
          {getPaginationRange().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(event) => handlePageChange(page, event)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Halaman berikutnya (Ellipsis jika halaman jauh) */}
          {currentPage < totalPages - 2 && <PaginationEllipsis />}
          {currentPage < totalPages - 3 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(event) => handlePageChange(totalPages, event)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => handlePageChange(currentPage + 1, event)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
