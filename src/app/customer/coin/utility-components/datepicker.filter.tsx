"use client"
import { format, subDays, isWithinInterval } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DatePopover({
  label,
  date,
  setDate,
  disable
}: {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
  disable?: boolean
}) {
  return (
    <div className="w-full sm:w-auto">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disable}
            variant="outline"
            className={cn(
              `w-full sm:w-[200px] justify-start text-left font-normal ${disable && "cursor-not-allowed`"}`
            )}
          >
            {format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            initialFocus
            disabled={disable}
           
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}