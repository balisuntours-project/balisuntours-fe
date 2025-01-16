"use client";

import { useMetaDataStore } from "@/app/store/metadata.store";
import { AdormentInput } from "@/components/ui/adorment-input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export function FilteringListBox() {
  const setSearchBoxValue = useMetaDataStore(
    (state) => state.setSearchBoxValue
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchBoxValue(inputValue);
    }, 300); // Delay debounce dalam milidetik

    return () => {
      clearTimeout(handler); // Bersihkan timeout sebelumnya
    };
  }, [inputValue, setSearchBoxValue]);

  return (
    <div className="grid grid-cols-12 gap-3 w-full">
      <div className="col-span-12 md:col-span-6 lg:col-span-9">
        {/* Placeholder for other components */}
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <AdormentInput
          startAdornment={<Search className="ps-1" />}
          placeholder="Search by meta title"
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full focus:outline-none text-base md:text-sm"
        />
      </div>
    </div>
  );
}
