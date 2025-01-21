"use client";

import { useCartStore } from "@/app/store/cart.store";
import { defaultScopedDatePickerState, useDatePickerScopedStore } from "@/app/store/date-picker-scoped.store";
import { useDatePickerStore } from "@/app/store/date-picker.store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalUtility } from "@/lib/global.utility";
import { cn } from "@/lib/utils";
import { format, parseISO, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export function DatePickerCart({orderId, diffDays, defaultSelectedDate} : {orderId: string, diffDays: number, defaultSelectedDate?: string}) {
  const scopedState = useDatePickerScopedStore(
    (state) => state.scopedStates[orderId] || defaultScopedDatePickerState
  );
  const setScopedState = useDatePickerScopedStore((state) => state.setScopedState);
  const setIsOnFirstLoad = useCartStore((state) => state.setIsOnFirstLoad);

  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol Popover
  const [firstLoading, setFirstLoading] = useState(true); 

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setIsOnFirstLoad(false)
      // Pastikan hanya mengambil tanggal tanpa waktu, dan format ke UTC
      const formattedDate = GlobalUtility.SetFormattedStandartDate(selectedDate)
      console.log("Formatted Date:", formattedDate); 
      setScopedState(orderId, "selectedDate", formattedDate)  // Simpan tanggal yang diformat kembali ke state
    }
    setIsOpen(false); // Tutup Popover setelah tanggal dipilih
  };

  

  useEffect(() => {
    if(defaultSelectedDate) {
      const formattedDate = GlobalUtility.SetFormattedStandartDate(defaultSelectedDate)
      
      setScopedState(orderId, "selectedDate", formattedDate) // Simpan tanggal yang diformat kembali ke state
      setScopedState(orderId, 'diffDaysNumber', diffDays) // Simpan tanggal yang diformat kembali ke state
    }
  }, [defaultSelectedDate, orderId, diffDays])

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false)
    }, 50);
  }, [])

  return (
    <>
    {!firstLoading ? (
        <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left w-full flex items-center px-5 py-2 font-bold text-sm lg:text-base"
              )}
            >
              <CalendarIcon />
              {scopedState.selectedDate ? (
                format(scopedState.selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={scopedState.selectedDate}
              onSelect={handleDateSelect} // Gunakan handler yang menutup Popover
              disabled={(date) =>
                GlobalUtility.AllowedDates(date, scopedState.diffDaysNumber)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    ) : (
      <div>
        <Skeleton className= "justify-start text-left w-[200px] h-8 flex items-center px-5 py-2 font-bold text-sm lg:text-base" />
      </div>
    )}
    </>
  );
}
