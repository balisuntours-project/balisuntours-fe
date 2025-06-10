"use client";

import { IncrementDecrementEnum } from "@/app/enums/activity/activity.enum";
import { QtyPlusMinusSection } from "@/app/global-components/utility-components/qty-plus-minus.section";
import { AdditionalServiceItemResponseWithQty } from "@/app/responses/airport-transfer/response";
import { useAirportTransferStore } from "@/app/store/airport-transfer.store";
import { GlobalUtility } from "@/lib/global.utility";
import { useEffect, useState } from "react";

export function AdditionalServiceItemSection({
  additionalServiceItems,
}: {
  additionalServiceItems: Array<AdditionalServiceItemResponseWithQty>;
}) {
  const [additionalServiceItemsState, setAdditionalServiceItemsState] =
    useState<Array<AdditionalServiceItemResponseWithQty>>(
      additionalServiceItems
    );

  const setSelectedAdditionalService = useAirportTransferStore(
    (state) => state.setSelectedAdditionalService
  );

  const incrementDecrementQty = (
    serviceUuid: string,
    action: IncrementDecrementEnum
  ) => {
    setAdditionalServiceItemsState((prevService) => {
      const serviceIndex = prevService.findIndex(
        (service) => service.uuid === serviceUuid
      );
      if (serviceIndex === -1) {
        return prevService;
      }

      const updatedService = [...prevService];
      if (action === IncrementDecrementEnum.increment) {
        const newQty =
          updatedService[serviceIndex].qty >=
          updatedService[serviceIndex].min_qty
            ? Math.min(
                updatedService[serviceIndex].qty + 1,
                updatedService[serviceIndex].max_qty
              )
            : updatedService[serviceIndex].qty +
              updatedService[serviceIndex].min_qty;

        updatedService[serviceIndex] = {
          ...updatedService[serviceIndex],
          qty: newQty,
        };
      } else {
        const newQty =
          updatedService[serviceIndex].qty >
          updatedService[serviceIndex].min_qty
            ? updatedService[serviceIndex].qty - 1
            : Math.max(
                updatedService[serviceIndex].qty -
                  updatedService[serviceIndex].min_qty,
                0
              );
        updatedService[serviceIndex] = {
          ...updatedService[serviceIndex],
          qty: newQty, // Jangan biarkan qty kurang dari 0
        };
      }

      return updatedService;
    });
  };

  useEffect(() => {
    setSelectedAdditionalService((prevSelectedService) => {
      let updatedSelectedService: Array<AdditionalServiceItemResponseWithQty> =
        [...prevSelectedService];
      additionalServiceItemsState.forEach((service) => {
        const prevServiceIndex = prevSelectedService.findIndex(
          (prevService) => prevService.uuid == service.uuid
        );
        if (service.qty > 0) {
          if (prevServiceIndex === -1) {
            updatedSelectedService.push(service);
          } else {
            updatedSelectedService[prevServiceIndex] = service;
          }
        } else {
          if (prevServiceIndex !== -1) {
            updatedSelectedService = prevSelectedService.filter(
              (prevService) => prevService.uuid != service.uuid
            );
          }
        }
      });

      return updatedSelectedService;
    });
  }, [additionalServiceItemsState]);
  return (
    <>
      <div className="flex flex-col">
        <span className="text-bold text-black text-lg font-bold mb-2">
          Additional services (optional)
        </span>
        {additionalServiceItemsState.map((item, key) => (
          <div
            className="p-3 w-full mb-2 border border-gray-200 rounded-lg"
            key={key}
          >
            <div className="flex gap-3">
              <div className="flex flex-col w-full">
                <span className="text-base">{item.name}</span>
                <p className="text-gray-400 text-base">
                  {item.short_description}
                </p>
              </div>

              <div className="flex flex-col ml-auto w-full lg:ml-0 lg:w-full items-end justify-end lg:flex-col gap-2">
                <span className="ml-auto text-black text-end font-bold text-base lg:text-lg">
                  {GlobalUtility.IdrCurrencyFormat(item.price)}
                </span>
                <QtyPlusMinusSection
                  qty={item.qty}
                  onClick={(action) => incrementDecrementQty(item.uuid, action)} // Meneruskan aksi ke fungsi
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
