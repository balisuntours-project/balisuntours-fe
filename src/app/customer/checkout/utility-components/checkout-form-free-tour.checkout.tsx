"use client";

import { CheckoutFreeTourTypeViewParamater } from "@/app/paramaters/booking/paramater";
import { Label } from "@/components/ui/label";
import { GlobalUtility } from "@/lib/global.utility";

export function CheckoutFormFreeTourType({
  pickupTimeList,
  minCost,
  baseUuid,
  finalPrice,
  totalQty,
  priceInformation,
}: CheckoutFreeTourTypeViewParamater) {
  return (
    <>
      <div className="mt-2 lg:mt-4">
        <Label
          htmlFor="map-input"
          className="text-xs mb-1 sm:text-sm text-gray-500"
        >
          *This is a free tour, cost start from
          <span className="font-bold">
            {GlobalUtility.IdrCurrencyFormat(minCost)}
            for
            {totalQty}
            {priceInformation}
          </span>
          , and you can go visit best attractions
        </Label>
        <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col col-span-2">
            <Label htmlFor="planned-place" className="font-bold">
              Please fill out your planning itinerary
            </Label>
            <textarea
              placeholder="Your planning itinerary, example: &#10;Monkey forest,&#10;Rice Terrace,&#10;Uluwatu Temple,&#10;etc,"
              v-model="
                                                packageOrderData[index]
                                                    .planned_place_to_visit
                                            "
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="departure-title" className="font-bold">
              How much is worth to pay for this service?
            </Label>
            <div className="flex flex-row items-stretch w-full border rounded-lg overflow-hidden">
              {/* Prefix RP */}
              <span className="bg-gray-100 text-gray-500 text-xs sm:text-sm min-h-full px-4 flex items-center justify-center">
                Rp
              </span>

              {/* Input Field */}
              <input
                /*  :placeholder="`Ex: 700000`"
                                                :value="
                                                    packageOrderData[index]
                                                        .free_tour_traveller_spend
                                                "
                                                required
                                                @change="
                                                    (e) => IdrToDollar(e, index)
                                                "
                                                @input="
                                                    (e) =>
                                                        validateInputFlatPrice(
                                                            e,
                                                            index
                                                        )
                                                " */
                className="flex-grow w-full px-4 py-2 focus:outline-none min-h-full"
              />

              {/* <!-- Conversion to USD --> */}
              <span className="bg-gray-100 text-gray-500 text-xs sm:text-sm min-h-full px-4 flex items-center justify-center">
                $
                {/* {{
                                                    packageOrderData[index]
                                                        .free_tour_traveller_spend_in_dollar
                                                }} */}
                USD
              </span>
            </div>

            <p
              v-if="
                                                freeTourMinSpendMessage == null
                                            "
              className="text-xs text-gray-400"
            >
              Price shown here is the minimum cost in Indonesian Rupiah (IDR),
              please input it manually as you wish (e.g 700000)
            </p>
            <p v-else className="text-xs text-red-400">
              {/* {{ freeTourMinSpendMessage }} */}
            </p>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="pickup-time" className="font-bold">
              *Select your preferred pickup time
            </Label>
            <input
              type="time"
              placeholder="Pickup time"
              required
              v-model="
                                                packageOrderData[index]
                                                    .pickup_time
                                            "
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <Label htmlFor="note" className="font-bold">
              Note
            </Label>
            <textarea
              v-model="
                                                packageOrderData[index].note
                                            "
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              id="note"
              placeholder="Any note..."
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
