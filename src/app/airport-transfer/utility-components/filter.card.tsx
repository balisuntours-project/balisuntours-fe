"use client";

import { VechileRecomendationResponse } from "@/app/responses/airport-transfer/response";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { Slider } from "@/components/ui/slider";
import { GlobalUtility } from "@/lib/global.utility";
import { useEffect, useRef } from "react";

export function FilterCard({fromPopup} : {fromPopup?: boolean}) {
  const rangeVechilePrice = useAirportTransferStore(
    (state) => state.rangeVechilePrice
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setRecomendedVechiles = useAirportTransferStore(
    (state) => state.setRecomendedVechiles
  );
  const idleRecomendedVechiles = useAirportTransferStore(
    (state) => state.idleRecomendedVechiles
  );
  const sliderValue = useAirportTransferStore((state) => state.sliderValue);
  const setSliderValue = useAirportTransferStore(
    (state) => state.setSliderValue
  );

  // Update state saat rangeVechilePrice.highest berubah
  useEffect(() => {
    if(!fromPopup){
        setSliderValue(rangeVechilePrice.highest);
    }
  }, [rangeVechilePrice.highest]);

  const handleSliderChange = (value: number[]) => {
    const newHighest = value[0];
    setSliderValue(newHighest); // Update state lokal

    // Clear timeout sebelumnya jika ada
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout baru
    timeoutRef.current = setTimeout(() => {
      const mappingVechiles: Array<VechileRecomendationResponse> =
        idleRecomendedVechiles.filter((vechile) => {
          return vechile.price <= newHighest; // Filter berdasarkan harga tertinggi baru
        });

      // Lakukan sesuatu dengan mappingVechiles, misalnya update state
      setRecomendedVechiles(mappingVechiles);
    }, 1000); // Tunggu 1 detik sebelum menjalankan proses mapping
  };

  return (
    <>
      <div className="border  border-gray-300 rounded-lg p-6">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col">
            <span className="mr-auto text-black text-end font-bold text-base">
              Price range
            </span>
            <div className="flex gap-3">
              <span className="mr-auto text-end text-base">
                {GlobalUtility.IdrCurrencyFormat(rangeVechilePrice.lowest)}
              </span>
              <span className="ml-auto text-end text-base">
                {GlobalUtility.IdrCurrencyFormat(sliderValue)}
              </span>
            </div>
          </div>
          <div className="w-full">
            {rangeVechilePrice.lowest == 0 && rangeVechilePrice.highest == 0 ? (
              <Slider
                disabled={true}
                min={rangeVechilePrice.lowest}
                max={rangeVechilePrice.highest}
                step={1}
              />
            ) : (
              <Slider
                inverted={false}
                min={rangeVechilePrice.lowest}
                max={rangeVechilePrice.highest}
                step={1}
                value={[sliderValue]}
                onValueChange={handleSliderChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
