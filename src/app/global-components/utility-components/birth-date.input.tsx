"use client";

import { useBirthDayStore } from "@/app/store/birth-day.store";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function BirthDateInput() {
  return (
    <>
      <FormField
        name="birth_day"
        render={({ field }) => {
          const [birthMonth, setBirthMonth] = useState<string>("");
          const [birthDay, setBirthDay] = useState<string>("");
          const setBirthDayMonth = useBirthDayStore(
            (state) => state.setBirthDayMonth
          );
          const birthDayMonth = useBirthDayStore(
            (state) => state.birthDayMonth
          );

          const handleChangeBirthMonth = (value: string) => {
            setBirthMonth(value);
            if (!birthDay) {
              setBirthDay("01");
            }
          };

          const handleChangeBirthDay = (value: string) => {
            if (value == "0" && !birthDay) {
              value = "1";
            }
            setBirthDay(value);
            if (!birthMonth) {
              setBirthMonth("01");
            }
          };

          useEffect(() => {
            setBirthDayMonth(
              `${birthMonth}-${
                birthDay.length == 1 ? `0${birthDay}` : birthDay
              }`
            );
          }, [birthMonth, birthDay]);

          useEffect(() => {
            if (birthDayMonth == "-") {
              setBirthDayMonth("");
            }
          }, [birthDayMonth]);

          return (
            <FormItem>
              <FormLabel className="font-bold">Birth Date (Optional)</FormLabel>
              <div className="flex gap-2">
                {/* Month Select */}
                <Select
                  value={birthMonth}
                  onValueChange={(value) => handleChangeBirthMonth(value)}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="01">January</SelectItem>
                    <SelectItem value="02">February</SelectItem>
                    <SelectItem value="03">March</SelectItem>
                    <SelectItem value="04">April</SelectItem>
                    <SelectItem value="05">May</SelectItem>
                    <SelectItem value="06">June</SelectItem>
                    <SelectItem value="07">July</SelectItem>
                    <SelectItem value="08">August</SelectItem>
                    <SelectItem value="09">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                    {/* ... other months ... */}
                  </SelectContent>
                </Select>

                {/* Day Input */}
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Day"
                    value={birthDay}
                    onChange={(e) => handleChangeBirthDay(e.target.value)}
                    className=""
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
