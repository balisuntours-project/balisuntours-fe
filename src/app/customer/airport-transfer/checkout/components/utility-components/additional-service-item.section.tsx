"use client";

import { QtyPlusMinusSection } from "@/app/global-components/utility-components/qty-plus-minus.section";
import { AdditionalServiceItemResponseWithQty } from "@/app/responses/airport-transfer/response";
import { GlobalUtility } from "@/lib/global.utility";

export function AdditionalServiceItemSection({
  additionalServiceItems,
}: {
  additionalServiceItems: Array<AdditionalServiceItemResponseWithQty>;
}) {
  return (
    <>
      <div className="flex flex-col">
        <span className="text-bold text-black text-lg font-bold mb-2">
          Additional services (optional)
        </span>
        {additionalServiceItems.map((item, key) => (
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
                  onClick={(action) => null} // Meneruskan aksi ke fungsi
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
