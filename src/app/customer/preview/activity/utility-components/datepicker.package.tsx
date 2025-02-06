"use client";

import { useDatePickerStore } from "@/app/store/date-picker.store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GlobalUtility } from "@/lib/global.utility";
import { cn } from "@/lib/utils";
import { format, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useActivityDate } from "../[slug]/provider/activity-booking-date.provider";

export function DatePickerPackage() {
 
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol Popover

  const selectedDate = useDatePickerStore((state) => state.selectedDate);
  const setSelectedDate = useDatePickerStore((state) => state.setSelectedDate);

  const diffDaysNumber = useDatePickerStore((state) => state.diffDaysNumber);
  const cleanCalendar = useDatePickerStore((state) => state.cleanCalendar);
  const setCleanCalender = useDatePickerStore(
    (state) => state.setCleanCalender
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Pastikan hanya mengambil tanggal tanpa waktu, dan format ke UTC
      const utcDate = startOfDay(selectedDate);
      const formattedDate = format(utcDate, "yyyy-MM-dd"); // Format tanggal ke string UTC
      console.log("Formatted Date:", formattedDate);
      setSelectedDate(new Date(formattedDate)); // Simpan tanggal yang diformat kembali ke state
    }
    setIsOpen(false); // Tutup Popover setelah tanggal dipilih
  };

  //diambil dari context provider
  const { activityDateRef } = useActivityDate();

  useEffect(() => {
    if (selectedDate) {
      if (activityDateRef.current) {
        activityDateRef.current.classList.remove("block");
        activityDateRef.current.classList.add("hidden");
      }
    }
  }, [selectedDate]);

  useEffect(() => {
    if (cleanCalendar) {
      setSelectedDate(undefined);
      setCleanCalender(false);
    }
  }, [cleanCalendar]);

  return (
    <>
      <div>
        <p
          className="activity-date-info text-sm text-red-500 hidden"
          ref={activityDateRef}
        >
          Oh, you did&quot;nt pick a date yet!
        </p>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left w-full flex items-center px-5 py-2 font-bold text-sm lg:text-base"
              )}
            >
              <CalendarIcon />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect} // Gunakan handler yang menutup Popover
              disabled={(date) =>
                GlobalUtility.AllowedDates(date, diffDaysNumber)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
