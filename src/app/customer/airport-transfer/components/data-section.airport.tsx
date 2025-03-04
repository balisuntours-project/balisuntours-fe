"use client";

import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { AdvantagesAirportTransferSection } from "./advantages.airport";
import { VechileServiceAirportTransfer } from "./vechile-list.airport";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";

export function DataSectionAirportTransfer() {
  const onInteractWithSearch = useAirportTransferStore(
    (state) => state.onInteractWithSearch
  );
  const onSearch = useAirportTransferStore((state) => state.onSearch);

  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 3 ? 0 : prev + 1));
    }, 300); // Ubah durasi animasi sesuai keinginan

    return () => clearInterval(interval);
  }, []);
  return (
    <>
    <TextLoader title="Wait a second" text="Redirecting to checkout page..." />
      <div className="w-full max-w-[90%] mx-auto lg:mt-24">
        <div className="flex flex-col gap-4">
          {!onSearch ? (
            onInteractWithSearch ? (
              <VechileServiceAirportTransfer />
            ) : (
              <AdvantagesAirportTransferSection />
            )
          ) : (
            <div className="w-full flex justify-center">
              <Image
                src="/car-loader.gif"
                className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] object-cover"
                width={100}
                height={100}
                alt="Loader..."
              />
              <h2 className="text-base md:text-xl font-semibold items-center justify-center text-center flex text-gray-400">
                Car on going{".".repeat(dots)}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
