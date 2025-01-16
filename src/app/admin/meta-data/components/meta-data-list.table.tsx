"use client";

import { ActivityMetaDataResponse } from "@/app/responses/activity-metadata/response";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { AuthButton } from "@/components/custom-ui/auth.button";
import { useEffect, useState } from "react";
import { GlobalUtility } from "@/lib/global.utility";
import { usePaginationStore } from "@/app/store/pagination.store";
import { PaginationComponent } from "@/app/global-components/utility-components/pagination.component";
import { SkeletonTableBody } from "@/app/skeletons-component/table.skeleton";
import { FilteringListBox } from "../utility-components/filtering-list.box";
import { useMetaDataStore } from "@/app/store/metadata.store";
import { EditFormPopUp } from "./edit-form.popup";
import { MetaDataAction } from "@/app/actions/meta-data/action";

export function MetaDataListTable({
  metaDataLists,
}: {
  metaDataLists: Array<ActivityMetaDataResponse>;
}) {
  const currentPage = usePaginationStore((store) => store.currentPage);
  const setCurrentPage = usePaginationStore((store) => store.setCurrentPage);
  const itemsPerPage = 10; // Jumlah item per halaman
  const setTotalPage = usePaginationStore((store) => store.setTotalPage);
  const onChangePage = usePaginationStore((store) => store.onChangePage);
  const setOnChangePage = usePaginationStore((store) => store.setOnChangePage);
  const searchBoxValue = useMetaDataStore((store) => store.searchBoxValue);
  const triggerRefetchLists = useMetaDataStore(
    (store) => store.triggerRefetchLists
  );
  const setTriggerRefetchLists = useMetaDataStore(
    (store) => store.setTriggerRefetchLists
  );
  const setSearchBoxValue = useMetaDataStore(
    (store) => store.setSearchBoxValue
  );

  // Data yang akan ditampilkan berdasarkan halaman aktif
  const paginatedLists = metaDataLists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [filteredLists, setFilteredLists] = useState<
    Array<ActivityMetaDataResponse> | undefined
  >(undefined); // Halaman aktif
  const [filteredListsWithoutPagination, setFilteredListsWithoutPagination] =
    useState<Array<ActivityMetaDataResponse> | undefined>(undefined); // Halaman aktif

  const resetAllToDefault = (withCleanFilter?: boolean) => {
    setOnChangePage(true);
  
    setFilteredLists(undefined);
    setFilteredListsWithoutPagination(undefined);
    setTotalPage(
      GlobalUtility.CountMaxPaginationPage(metaDataLists.length, itemsPerPage)
    );

    if (withCleanFilter) {
      setSearchBoxValue(undefined);
    }

    setTimeout(() => {
      setOnChangePage(false);
    }, 400);
  };

  useEffect(() => {
    if (searchBoxValue) {
      setOnChangePage(true);
      let filteredData: Array<ActivityMetaDataResponse> = metaDataLists;
      setCurrentPage(1);

      //jika ada search
      if (searchBoxValue) {
        filteredData = filteredData.filter((metadata) =>
          metadata.meta_title
            ? metadata.meta_title
                .toLowerCase()
                .includes(searchBoxValue.toLowerCase())
            : null
        );
      }

      const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setTotalPage(
        GlobalUtility.CountMaxPaginationPage(filteredData.length, itemsPerPage)
      );
      setFilteredListsWithoutPagination(filteredData);
      setFilteredLists(paginatedData);
      setTimeout(() => {
        setOnChangePage(false);
      }, 400);
    } else {
      resetAllToDefault();
    }
  }, [searchBoxValue]);

  useEffect(() => {
    setTotalPage(
      GlobalUtility.CountMaxPaginationPage(metaDataLists.length, itemsPerPage)
    );
  }, []);

  useEffect(() => {
    if (currentPage && filteredListsWithoutPagination) {
      const paginatedData = filteredListsWithoutPagination.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setFilteredLists(paginatedData);
    }
  }, [currentPage, filteredListsWithoutPagination]);

  const handleRefetchLists = async () => {
    const result = await MetaDataAction.GetActivityMetaData();
   
    if (result.success) {
      const paginatedLists = result.data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setFilteredListsWithoutPagination(result.data)
      setFilteredLists(paginatedLists);
      setTotalPage(
        GlobalUtility.CountMaxPaginationPage(result.data.length, itemsPerPage)
      );
    }
  };

  useEffect(() => {
    if (triggerRefetchLists) {
      setTriggerRefetchLists(false);
      setOnChangePage(true);
      handleRefetchLists();
      setOnChangePage(false);
    }
  }, [triggerRefetchLists]);

  function TableBodyList() {
    if (filteredLists) {
      return (
        <>
          {!onChangePage ? (
            <TableBody>
              {filteredLists.length > 0 ? (
                filteredLists.map((metadata, key) => (
                  <TableRow key={metadata.uuid}>
                    <TableCell className="p-2 border border-gray-300 text-center">
                      {key + 1 + (currentPage - 1) * itemsPerPage}
                    </TableCell>
                    {[
                      metadata.meta_title,
                      metadata.meta_description,
                      metadata.slug,
                      metadata.og_title,
                      metadata.og_description,
                      metadata.og_image,
                    ].map((value, index) => (
                      <TableCell
                        key={index}
                        className="p-2 cursor-pointer border border-gray-300 truncate max-w-xs"
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="truncate block max-w-xs">
                              {value}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{value}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    ))}
                    <TableCell className="p-2 border border-gray-300 truncate max-w-xs">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={metadata.canonical_url ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate block text-blue-600 hover:underline"
                          >
                            {metadata.canonical_url}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          {metadata.canonical_url}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="p-2 border border-gray-300 truncate max-w-xs">
                      <EditFormPopUp metadata={metadata} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="p-4 border border-gray-300 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-base md:text-sm text-gray-600 mb-2">
                        Meta data not found!
                      </p>
                      <AuthButton
                        title="Reset filter"
                        onClick={() => resetAllToDefault(true)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <SkeletonTableBody rows={15} columns={9} />
          )}
        </>
      );
    } else {
      return (
        <>
          {!onChangePage ? (
            <TableBody>
              {paginatedLists.map((metadata, key) => (
                <TableRow key={metadata.uuid}>
                  <TableCell className="p-2 border border-gray-300 text-center">
                    {key + 1 + (currentPage - 1) * itemsPerPage}
                  </TableCell>
                  {[
                    metadata.meta_title,
                    metadata.meta_description,
                    metadata.slug,
                    metadata.og_title,
                    metadata.og_description,
                    metadata.og_image,
                  ].map((value, index) => (
                    <TableCell
                      key={index}
                      className="p-2 cursor-pointer border border-gray-300 truncate max-w-xs"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate block max-w-xs">
                            {value}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{value}</TooltipContent>
                      </Tooltip>
                    </TableCell>
                  ))}
                  <TableCell className="p-2 border border-gray-300 truncate max-w-xs">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={metadata.canonical_url ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate block text-blue-600 hover:underline"
                        >
                          {metadata.canonical_url}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{metadata.canonical_url}</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="p-2 border border-gray-300 truncate max-w-xs">
                    <EditFormPopUp metadata={metadata} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <SkeletonTableBody rows={15} columns={9} />
          )}
        </>
      );
    }
  }

  return (
    <div className="overflow-x-auto">
      <FilteringListBox />
      <TooltipProvider>
        <Table className="table-auto border-collapse border border-gray-300 w-full text-sm mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                No
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                Meta Title
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                Meta Description
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                Slug
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                OG Title
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                OG Description
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                OG Image
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                Canonical URL
              </TableHead>
              <TableHead className="p-2 border border-gray-300 whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBodyList />
        </Table>

        <PaginationComponent itemsPerPage={itemsPerPage} />
      </TooltipProvider>
    </div>
  );
}
