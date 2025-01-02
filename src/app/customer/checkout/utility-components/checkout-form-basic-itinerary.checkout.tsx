"use client"

export function CheckoutFormBasicItineraryType({
    pickupTimeList,
    baseUuid,
  }: {
    pickupTimeList: Array<string>;
    baseUuid: string;
  }) {
    return (
        <>
             <div v-else className="mt-2 lg:mt-4">
                <label
                  htmlFor="map-input"
                  className="text-xs mb-1 sm:text-sm text-gray-500"
                >
                  *The following is the Pickup/Meet Up Information for this
                  activity
                </label>
                <div className="mt-4 p-5 border-2 rounded-lg flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="departure-title" className="font-bold">
                      Meet Up Information
                    </label>
                    <input
                      placeholder="Pickup/Meet Up Information"
                      readOnly
                      required
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="departure-title" className="font-bold">
                      Map Location
                    </label>

                    <div
                      // @click="
                      //     mapCoordinate(
                      //         packageData?.departure
                      //             ?.departure_map_coordinate
                      //     )
                      // "
                      className="relative cursor-pointer"
                    >
                      {/*  <!-- Ikon Map --> */}
                      <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        🗺️
                      </i>

                      {/*  <!-- Input Field --> */}
                      <input
                        placeholder="Departure Location"
                        /*   :value="
                                                    packageData?.departure
                                                        ?.departure_map_location
                                                " */
                        readOnly
                        required
                        className="pl-10 pr-4 py-2 border cursor-pointer rounded-lg focus:outline-none focus:ring focus:border-blue-300 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col col-span-2">
                    <label htmlFor="pickup-time" className="font-bold">
                      *Select Meetup Time (Required)
                    </label>
                    <select
                      v-model="
                                                packageOrderData[index]
                                                    .pickup_time
                                            "
                      required
                      /* placeholder="Select a time" */
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="" disabled selected>
                        Select a time
                      </option>
                      <option
                        v-if="
                                                    packageOrderData[index]
                                                        ?.default_pickup_time
                                                "
                        v-for="(
                                                    time, key
                                                ) in packageOrderData[index]
                                                    .default_pickup_time"
                        /* :key="key"
                                                :value="time" */
                      >
                        {/*  {{ time }} */}
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label htmlFor="departure-title" className="font-bold">
                      Additional Information
                    </label>
                    <div
                      v-if="
                                                packageData?.departure
                                                    ?.departure_description
                                            "
                      v-html="
                                                packageData?.departure
                                                    ?.departure_description
                                            "
                      className="px-4 py-2 text-gray-500"
                    ></div>

                    <div v-else className="px-4 py-2 text-gray-500">
                      No additional information...
                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}