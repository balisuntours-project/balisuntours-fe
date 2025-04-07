"use client";

import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { FilterCard } from "../utility-components/filter.card";
import { CheckoutCard } from "../utility-components/checkout.card";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import { Bus, Luggage, User } from "lucide-react";
import { GlobalUtility } from "@/lib/global.utility";
import { Button } from "@/components/ui/button";
import { VechileRecomendationResponse } from "@/app/responses/airport-transfer/response";
import { SelectedCarParamater } from "@/app/paramaters/airport-transfer/paramater";
import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { ToolTipText } from "../utility-components/tooltip.text";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { DetailServiceContent } from "../utility-components/detail-service.content";

export function VechileServiceAirportTransfer() {
  const recomendedVechiles = useAirportTransferStore(
    (state) => state.recomendedVechiles
  );
  const setSelectedCar = useAirportTransferStore(
    (state) => state.setSelectedCar
  );

  const handleSelectedCar = (vechile: VechileRecomendationResponse) => {
    setSelectedCar((prevSelectedCar) => {
      // Cek apakah vehicle sudah ada di dalam selectedCar
      const alreadyStoredIndex = prevSelectedCar.findIndex(
        (car) => car.uuid == vechile.uuid
      );

      if (alreadyStoredIndex !== -1) {
        // Jika sudah ada, tambahkan qty-nya
        const updatedSelectedCar = [...prevSelectedCar];
        updatedSelectedCar[alreadyStoredIndex].qty += 1;
        return updatedSelectedCar;
      } else {
        // Jika belum ada, tambahkan vehicle baru dengan qty 1
        const newVehicle: SelectedCarParamater = {
          ...vechile,
          qty: 1,
        };
        return [...prevSelectedCar, newVehicle];
      }
    });
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 hidden lg:flex flex-col gap-4 md:sticky md:top-[18%] md:max-h-[550px] md:overflow-auto">
          <div className="">
            <FilterCard />
          </div>
          <CheckoutCard />
        </div>
        <div className="block lg:hidden">
        <CheckoutCard />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="rounded-lg px-6 flex flex-col gap-4">
            {recomendedVechiles.length > 0 ? (
              recomendedVechiles.map((vechile, key) => (
                <div
                  key={key}
                  className="grid grid-cols-12 gap-3 border-b border-gray-200 pb-2"
                >
                  <div className="col-span-12 md:col-span-3">
                    <ImageWithLoader
                      src={vechile.vechile_main_photo}
                      alt={vechile.name}
                      fallbackSrc="/fallback-image.png"
                      position="relative md:static lg:relative"
                      classNameProp="rounded-md w-full md:w-[250px] h-[150px] md:h-[150px] object-cover"
                      skeletonClassName="rounded-md"
                      priority={false} // Gambar ini tidak diberi prioritas
                      width={250}
                      height={150}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                      <ActivityTitleCard
                        customSizeText="text-base md:text-base"
                        title={vechile.name}
                      />
                      <span className="text-gray-500 my-auto">
                        ({vechile.vechile_category})
                      </span>
                    </div>
                    <div>
                      <span className="text-sm md:text-base">
                        {vechile.short_description}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-1 items-center">
                        <User className="h-4 w-4" />
                        <span className="text-gray-500 my-auto">
                          {vechile.total_seat}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Luggage className="h-4 w-4" />
                        <span className="text-gray-500 my-auto">
                          {vechile.total_luggage}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <DynamicDialog
                        trigger={
                          <ToolTipText
                            title={
                              <span className="rounded-md text-start text-sm md:text-base  bg-gray-100 text-green-600 px-1">
                                Instant confirmation
                              </span>
                            }
                          >
                            <p>
                              You'll get your booking confirmation in minutes
                              after your payment is complete
                            </p>
                          </ToolTipText>
                        }
                      >
                        <DetailServiceContent
                          waitingTime={
                            vechile.driver_free_waiting_time_in_minutes
                          }
                        />
                      </DynamicDialog>
                      <DynamicDialog
                        trigger={
                          <ToolTipText
                            title={
                              <span className="rounded-md text-start text-sm md:text-base  bg-gray-100 text-green-600 px-1 ">
                                Free waiting time
                              </span>
                            }
                          >
                            <p>
                              You will get a free waiting time of{" "}
                              {vechile.driver_free_waiting_time_in_minutes}{" "}
                              minutes!
                            </p>
                          </ToolTipText>
                        }
                      >
                        <DetailServiceContent
                          waitingTime={
                            vechile.driver_free_waiting_time_in_minutes
                          }
                        />
                      </DynamicDialog>
                    </div>
                    <div className="flex gap-2">
                      <DynamicDialog
                        trigger={
                          <ToolTipText
                            title={
                              <span className="rounded-md text-start text-sm md:text-base bg-gray-100 text-secondary px-1">
                                Meet & Greet
                              </span>
                            }
                          >
                            <p>
                              Driver will be waiting to escort you to your
                              vehicle upon your arrival
                            </p>
                          </ToolTipText>
                        }
                      >
                        <DetailServiceContent
                          waitingTime={
                            vechile.driver_free_waiting_time_in_minutes
                          }
                        />
                      </DynamicDialog>
                      <DynamicDialog
                        trigger={
                          <ToolTipText
                            title={
                              <span className="rounded-md text-start text-sm md:text-base bg-gray-100 text-secondary px-1">
                                English-speaking driver
                              </span>
                            }
                          >
                            Driver can communicate in English, in addition to
                            their local language
                          </ToolTipText>
                        }
                      >
                        <DetailServiceContent
                          waitingTime={
                            vechile.driver_free_waiting_time_in_minutes
                          }
                        />
                      </DynamicDialog>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-3 my-auto">
                    <div className="flex ml-auto w-1/2 md:ml-0 md:w-full items-center justify-center md:flex-col gap-2">
                      <span className="ml-auto text-black text-end font-bold text-base md:text-lg">
                        {GlobalUtility.IdrCurrencyFormat(vechile.price)}
                      </span>
                      <Button
                        onClick={() => handleSelectedCar(vechile)}
                        variant="default"
                        className="ml-auto rounded-lg flex-1 w-[80px] px-8 md:px-3 lg:px-6 py-2 h-6 bg-gradient-to-r bg-[#65AD2E] hover:bg-[#65AD2E]/80 text-white font-bold hover:shadow-lg"
                      >
                        Add car
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyContent emptyText="No car availlable for the query">
                <Bus className="w-full h-full" />
              </EmptyContent>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
