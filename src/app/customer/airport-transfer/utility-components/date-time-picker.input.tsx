import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { GlobalUtility } from "@/lib/global.utility";

interface DateTimePickerProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function DateTimePicker({
  selectedDate,
  onSelect,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const newDate = new Date(date);
      if (time) {
        const [hours, minutes] = time.split(":");
        newDate.setHours(parseInt(hours, 10));
        newDate.setMinutes(parseInt(minutes, 10));
      }
      onSelect(newDate);
    } else {
      onSelect(undefined);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      const [hours, minutes] = newTime.split(":");
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      onSelect(newDate);
    }
  };

  // useEffect(() => {
  //   if (selectedDate && time) {
  //     //setIsOpen(false);
  //   }
  // }, [selectedDate, time]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left w-full flex items-center px-5 py-2 text-base",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP HH:mm")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) => GlobalUtility.AllowedDates(date, 0)}
          initialFocus
        />
        <div className="p-3 border-t">
          <Input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="border text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
