"use client";

import { IncrementDecrementEnum } from "@/app/enums/activity/activity.enum";
import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import { QtyPlusMinusSection } from "@/app/global-components/utility-components/qty-plus-minus.section";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { SelectedCarParamater } from "@/app/paramaters/airport-transfer/paramater";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { GlobalUtility } from "@/lib/global.utility";
import { Luggage, Trash, User } from "lucide-react";

export function SelectedCarDetail({
  selectedVechile,
}: {
  selectedVechile: SelectedCarParamater;
}) {
  const setSelectedCar = useAirportTransferStore(
    (state) => state.setSelectedCar
  );

  const incrementDecrementQty = (
    uuid: string,
    action: IncrementDecrementEnum
  ) => {
    setSelectedCar((prevSelectedCar) => {
      // Cari index dari car yang sesuai dengan uuid
      const carIndex = prevSelectedCar.findIndex((car) => car.uuid === uuid);

      if (carIndex === -1) {
        // Jika car tidak ditemukan, kembalikan state sebelumnya tanpa perubahan
        return prevSelectedCar;
      }

      // Buat salinan dari selectedCar untuk menghindari mutasi langsung
      const updatedSelectedCar = [...prevSelectedCar];

      if (action === IncrementDecrementEnum.increment) {
        // Increment qty
        updatedSelectedCar[carIndex] = {
          ...updatedSelectedCar[carIndex],
          qty: updatedSelectedCar[carIndex].qty + 1,
        };
      } else if (action === IncrementDecrementEnum.decrement) {
        // Decrement qty, pastikan qty tidak kurang dari 1 (atau 0, tergantung kebutuhan)
        updatedSelectedCar[carIndex] = {
          ...updatedSelectedCar[carIndex],
          qty: Math.max(updatedSelectedCar[carIndex].qty - 1, 1), // Jangan biarkan qty kurang dari 1
        };
      }

      return updatedSelectedCar;
    });
  };

  const handleDeleteSelectedCar = (uuid: string) => {
    setSelectedCar((prevSelectedCar) => {
      return prevSelectedCar.filter((car) => car.uuid != uuid);
    });
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-3 border-b border-gray-200 pb-2">
        <div className="col-span-12 lg:col-span-3 relative">
          <ImageWithLoader
            src={selectedVechile.vechile_main_photo}
            alt={selectedVechile.name}
            fallbackSrc="/fallback-image.png"
            classNameProp="rounded-md w-full lg:w-[250px] h-[200px] md:h-[220px] lg:h-[150px] object-cover"
            skeletonClassName="rounded-md"
            priority={false} // Gambar ini tidak diberi prioritas
            width={250}
            height={150}
          />

          <div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md">
            <Trash
              className="h-4 w-4 cursor-pointer text-red-500"
              onClick={() => handleDeleteSelectedCar(selectedVechile.uuid)}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
          <div className="flex flex-col md:flex-row gap-1 items-start">
            <ActivityTitleCard
              customSizeText="text-base lg:text-base"
              title={selectedVechile.name}
            />
            <span className="text-gray-500 my-auto">
              ({selectedVechile.vechile_category})
            </span>
          </div>
          <div className="text-start">
            <div
              className="text-xs md:text-sm"
              dangerouslySetInnerHTML={{
                __html: selectedVechile.short_description,
              }}
            />
            {/* <span className="text-sm md:text-base">
              {selectedVechile.short_description}
            </span> */}
          </div>
          <div className="flex gap-2 items-center text-xs md:text-sm">
            <div className="flex gap-1 items-center">
              <User className="h-4 w-4" />
              <span className="text-gray-500 my-auto">
                {selectedVechile.total_seat}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Luggage className="h-4 w-4" />
              <span className="text-gray-500 my-auto">
                {selectedVechile.total_seat}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="rounded-md text-start text-xs lg:text-sm  bg-gray-100 text-green-600 px-1">
              Instant confirmation
            </span>
            <span className="rounded-md text-start text-xs lg:text-sm  bg-gray-100 text-green-600 px-1 ">
              Free waiting time
            </span>
          </div>
          <div className="flex gap-2">
            <span className="rounded-md text-start text-xs lg:text-sm bg-gray-100 text-secondary px-1">
              Meet & Greet
            </span>
            <span className="rounded-md text-start text-xs lg:text-sm bg-gray-100 text-secondary px-1">
              English-speaking driver
            </span>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3 my-auto">
          <div className="flex ml-auto w-full lg:ml-0 lg:w-full items-end justify-end lg:flex-col gap-2">
            <span className="ml-auto text-black text-end font-bold text-base lg:text-lg">
              {GlobalUtility.IdrCurrencyFormat(
                selectedVechile.price * selectedVechile.qty
              )}
            </span>
            <QtyPlusMinusSection
              qty={selectedVechile.qty}
              onClick={(action) =>
                incrementDecrementQty(selectedVechile.uuid, action)
              } // Meneruskan aksi ke fungsi
            />
          </div>
        </div>
      </div>
    </>
  );
}
