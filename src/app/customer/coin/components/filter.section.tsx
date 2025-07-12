"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DatePopover } from "../utility-components/datepicker.filter";
import { useCoinStore } from "@/app/store/coin.store";
import { CoinHistoryFlterEnum } from "@/app/enums/coin/coin.enum";
import { CoinHistoryTransactionParamater } from "@/app/paramaters/coin/paramater";
import { differenceInCalendarDays, isWithinInterval } from "date-fns";
import { CoinHistoryList } from "./coin-history.list";
import { useEffect, useState } from "react";
import { CoinHistoryTransactionResponse } from "@/app/responses/coin/response";
import { CoinAction } from "@/app/actions/coin/action";
import CoinHistorySkeleton from "@/app/skeletons-component/coin-history.skeleton";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function CoinHistoryFilterSection() {
  const { toast } = useToast();

  const filterFromDate = useCoinStore((state) => state.filterFromDate);
  const filterToDate = useCoinStore((state) => state.filterToDate);
  const filterType = useCoinStore((state) => state.filterType);
  const setFilterFromDate = useCoinStore((state) => state.setFilterFromDate);
  const setFilterToDate = useCoinStore((state) => state.setFilterToDate);
  const setFilterType = useCoinStore((state) => state.setFilterType);

  const [filterSubDayRange, setFilterSubDayRange] = useState<number>(7); //default 7

  const [onFetchHistories, setOnFetchHistories] = useState<boolean>(true);
  const [coinHiistories, setCoinHistories] = useState<
    Array<CoinHistoryTransactionResponse>
  >([]);
  const [reservedCoinHistories, setReservedCoinHistories] = useState<
    Array<CoinHistoryTransactionResponse>
  >([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Array<CoinHistoryTransactionResponse>
  >([]);
  const handleFetchCoinHistory = async () => {
    setOnFetchHistories(true);
    const result = await CoinAction.CoinHistory(filterSubDayRange);
    const result2 = await CoinAction.ReservedCoinHistory();
    if (result.success) {
      setCoinHistories(result.data);
      setFilteredTransactions(
        filterType == CoinHistoryFlterEnum.All
          ? result.data
          : result.data.filter((t) => t.category_status === filterType)
      );
    }

    if (result2.success) {
      setReservedCoinHistories(result2.data);
    }
    setOnFetchHistories(false);
  };

  useEffect(() => {
    handleFetchCoinHistory();
  }, []);

  useEffect(() => {
    if (filterFromDate && filterToDate) {
      const dayRange = differenceInCalendarDays(filterToDate, filterFromDate); // tambah 1 agar hari ini juga dihitung
      console.log("Total range in days:", dayRange);
      setFilterSubDayRange(dayRange);
    }
  }, [filterFromDate, filterToDate]);

  useEffect(() => {
    setFilteredTransactions(
      filterType == CoinHistoryFlterEnum.All
        ? coinHiistories
        : coinHiistories.filter((t) => t.category_status === filterType)
    );
  }, [filterType]);

  useEffect(() => {
    if (filterSubDayRange > 0) {
      handleFetchCoinHistory();
    } else {
      setCoinHistories([]);
      setFilteredTransactions([]);
      toast({
        description:
          "Please make sure the start date is before or the same as the end date!",
        variant: "warning",
      });
    }
  }, [filterSubDayRange]);

  return (
    <>
      {/* 🗓️ Date Range Filter */}
      <div className="flex sm:flex-row items-center justify-center gap-4 mb-4">
        <DatePopover
          label="From"
          date={filterFromDate}
          setDate={setFilterFromDate}
          disable={filterType === CoinHistoryFlterEnum.Reserved}
        />
        <DatePopover
          label="To"
          date={filterToDate}
          setDate={setFilterToDate}
          disable={filterType === CoinHistoryFlterEnum.Reserved}
        />
      </div>

      {/* Tabs Filter */}
      <Tabs
        value={filterType}
        onValueChange={(val: string) =>
          setFilterType(val as CoinHistoryFlterEnum)
        }
      >
        <ScrollArea className="w-full pr-3">
          <TabsList className="w-full flex justify-center mb-4 bg-white border">
            <TabsTrigger
              value="all"
              className="flex-1 data-[state=active]:bg-[#008000] data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="in"
              className="flex-1 data-[state=active]:bg-[#008000] data-[state=active]:text-white"
            >
              Incoming
            </TabsTrigger>
            <TabsTrigger
              value="out"
              className="flex-1 data-[state=active]:bg-[#008000] data-[state=active]:text-white"
            >
              Outgoing
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 data-[state=active]:bg-[#008000] data-[state=active]:text-white"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="reserved"
              className="flex-1 data-[state=active]:bg-[#008000] data-[state=active]:text-white"
            >
              Reserved
            </TabsTrigger>
          </TabsList>
           <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {onFetchHistories ? (
          <CoinHistorySkeleton count={5} />
        ) : (
          <div>
            <TabsContent value={CoinHistoryFlterEnum.All}>
              <CoinHistoryList transactions={filteredTransactions} />
            </TabsContent>
            <TabsContent value={CoinHistoryFlterEnum.In}>
              <CoinHistoryList transactions={filteredTransactions} />
            </TabsContent>
            <TabsContent value={CoinHistoryFlterEnum.Out}>
              <CoinHistoryList transactions={filteredTransactions} />
            </TabsContent>
            <TabsContent value={CoinHistoryFlterEnum.Pending}>
              <CoinHistoryList transactions={filteredTransactions} />
            </TabsContent>
            <TabsContent value={"reserved"}>
              <CoinHistoryList transactions={reservedCoinHistories} />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </>
  );
}
