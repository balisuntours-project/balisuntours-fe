"use client";

import {
  ActivityItineraryTypeEnum,
  ActivityPackageSelfConfirmationStatus,
} from "@/app/enums/activity/activity.enum";
import { GoogleMapDialogComponent } from "@/app/global-components/utility-components/google-map.dialog";
import { useDetailActivityStore } from "@/app/store/detail-activity.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPinCheckInside, TreePalm, Utensils } from "lucide-react";
import { useEffect, useRef } from "react";

export function PackageItineraries() {
  const selectedPackage = useDetailActivityStore(
    (state) => state.selectedPackage
  );
  const selectedItinerary = useDetailActivityStore(
    (state) => state.selectedItinerary
  );

  const autoSelectOnPackageSearchParam = useDetailActivityStore(
    (state) => state.autoSelectOnPackageSearchParam
  );

  const itinerarySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoSelectOnPackageSearchParam) {
      if (itinerarySectionRef.current) {
        itinerarySectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [autoSelectOnPackageSearchParam]);

  function ItineraryIcon({
    itineraryType,
  }: {
    itineraryType: ActivityItineraryTypeEnum;
  }) {
    if (itineraryType == ActivityItineraryTypeEnum.departure) {
      return (
        <MapPinCheckInside
          strokeWidth={2.75}
          className="h-full w-full max-h-6 max-w-6 text-[#EB5E00] text-2xl items-center"
        />
      );
    } else if (itineraryType == ActivityItineraryTypeEnum.attraction) {
      return (
        <TreePalm
          strokeWidth={2.75}
          className="h-full w-full max-h-6 max-w-6 text-[#EB5E00] text-2xl items-center"
        />
      );
    } else if (itineraryType == ActivityItineraryTypeEnum.meal) {
      return (
        <Utensils
          strokeWidth={2.75}
          className="h-full w-full max-h-6 max-w-6 text-[#EB5E00] text-2xl items-center"
        />
      );
    } else if (itineraryType == ActivityItineraryTypeEnum.dropoff) {
      return (
        <MapPinCheckInside
          strokeWidth={2.75}
          className="h-full w-full max-h-6 max-w-6 text-[#EB5E00] text-2xl items-center"
        />
      );
    }
  }

  return (
    <>
      {selectedPackage && (
        <div ref={itinerarySectionRef} className="h-auto w-full md:mt-11">
          <span className="text-xl font-semibold text-black">
            Package Details
          </span>
          <div className="mt-4 flex flex-col md:flex-row flex-wrap gap-4 w-auto">
            <div className="flex-1 text-sm text-start md:text-center p-3 md:p-2 font-bold rounded bg-[#FFEDE0] text-[#D65600]">
              Free cancellation ({selectedPackage?.cancellation_policy})
            </div>
            <div className="flex-1 text-sm text-start md:text-center p-3 md:p-2 font-bold rounded bg-[#FFEDE0] text-[#D65600]">
              Confirmation ({selectedPackage?.self_confirmation_text})
            </div>
            {selectedPackage?.self_confirmation !=
              ActivityPackageSelfConfirmationStatus.self && (
              <div
                v-show="
                                  packageDetail.self_confirmation_text !=
                                  'Instant'
                              "
                className="flex-1 text-sm text-center p-2 font-bold rounded bg-[#FFEDE0] text-[#D65600]"
              >
                Confirmation time ({selectedPackage?.confirmation_time})
              </div>
            )}
          </div>

          <div className="md:my-6">
            <div className="py-2">
              <Accordion
                type="multiple"
                defaultValue={["itinerary"]}
                className="border-0"
              >
                <AccordionItem value="itinerary">
                  <AccordionTrigger className="text-xl font-semibold text-black">
                    Itinerary
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-hidden">
                      {selectedItinerary?.itineraries.map(
                        (itinerary, index) => (
                          <div className="flex flex-col gap-4 mt-4" key={index}>
                            <div>
                              <div className="flex gap-4">
                                <ItineraryIcon itineraryType={itinerary.type} />
                                <div className="flex flex-col gap-2 text-slate-700">
                                  <GoogleMapDialogComponent
                                    lat={itinerary.map_coordinate.lat}
                                    lng={itinerary.map_coordinate.lng}
                                    zoom={itinerary.zoom_map}
                                  >
                                    <span className="text-base font-extrabold underline cursor-pointer">
                                      {itinerary.title}
                                    </span>
                                  </GoogleMapDialogComponent>
                                  {itinerary.description && (
                                    <div
                                      className="0"
                                      dangerouslySetInnerHTML={{
                                        __html: itinerary.description,
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {selectedPackage.include && (
                  <AccordionItem className="text-slate-700" value="include">
                    <AccordionTrigger className="text-xl font-semibold text-black">
                      What Included ?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-4 mt-4">
                          <div
                            className="include"
                            dangerouslySetInnerHTML={{
                              __html: selectedPackage.include,
                            }}
                          ></div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                {selectedPackage.exclude && (
                  <AccordionItem className="text-slate-700" value="exclude">
                    <AccordionTrigger className="text-xl font-semibold text-black">
                      What Excluded ?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-4 mt-4">
                          <div
                            className="exclude"
                            dangerouslySetInnerHTML={{
                              __html: selectedPackage.exclude,
                            }}
                          ></div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                {selectedPackage.eligibility && (
                  <AccordionItem className="text-slate-700" value="eligibility">
                    <AccordionTrigger className="text-xl font-semibold text-black">
                      Eligibility
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-4 mt-4">
                          <div
                            className="eligibility"
                            dangerouslySetInnerHTML={{
                              __html: selectedPackage.eligibility,
                            }}
                          ></div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                {selectedPackage.additional_information && (
                  <AccordionItem
                    className="text-slate-700"
                    value="additional_information"
                  >
                    <AccordionTrigger className="text-xl font-semibold text-black">
                      Additional Information
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-4 mt-4">
                          <div
                            className="additional_information"
                            dangerouslySetInnerHTML={{
                              __html: selectedPackage.additional_information,
                            }}
                          ></div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>

            {/* <div className="py-2">
                              <h2>
                                  <button
                                      id="accordion-title-01"
                                      className="flex items-center justify-between w-full text-left font-semibold py-2"
                                      @click.prevent="
                                          accordionOpen1 = !accordionOpen1
                                      "
                                      :aria-expanded="accordionOpen1"
                                      aria-controls="accordion-text-01"
                                  >
                                      <span
                                          id="itinerary-data"
                                          className="text-xl font-semibold text-black"
                                          >Itinerary</span
                                      >
                                      <svg
                                          className="fill-black shrink-0 ml-8"
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              className="transform origin-center transition duration-200 ease-out"
                                              :className="{
                                                  'rotate-180': accordionOpen1,
                                              }"
                                              d="M8 2.71L2.71 8a1 1 0 0 0 1.42 1.42L8 5.83l3.87 3.87a1 1 0 0 0 1.42-1.42L8 2.71z"
                                          />
                                      </svg>
                                  </button>
                              </h2>
                              <div
                                  id="accordion-text-01"
                                  role="region"
                                  aria-labelledby="accordion-title-01"
                                  className="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                                  :className="
                                      accordionOpen1
                                          ? 'grid-rows-[1fr] opacity-100'
                                          : 'grid-rows-[0fr] opacity-0'
                                  "
                              >
                                  <div className="overflow-hidden">
                                      <div className="flex flex-col gap-4 mt-4">
                                          <div
                                              v-for="(
                                                  itinerary, index
                                              ) in packageDetail.itineraries"
                                          >
                                              <div className="flex gap-4">
                                                  <span
                                                      v-if="
                                                          itinerary.type ==
                                                          'Departure'
                                                      "
                                                      className="mdi mdi-map-marker-radius text-[#EB5E00] text-2xl items-center"
                                                  >
                                                      <!-- <img
                                                          :src="`/assets/icons/line.svg`"
                                                          alt="icon"
                                                          width="25"
                                                          height="25"
                                                          className=""
                                                      /> -->
                                                  </span>
                                                  <span
                                                      v-else-if="
                                                          itinerary.type ==
                                                          'Attractions'
                                                      "
                                                      className="text-[#EB5E00] text-2xl items-center"
                                                  >
                                                      <img
                                                          :src="`/assets/icons/hike.svg`"
                                                          alt="icon"
                                                          width="30"
                                                          height="30"
                                                          className="me-2"
                                                      />
                                                      <!-- <img
                                                          :src="`/assets/icons/line.svg`"
                                                          alt="icon"
                                                          width="50"
                                                          height="25"
                                                          className="mt-2"
                                                      /> -->
                                                  </span>
                                                  <span
                                                      v-else-if="
                                                          itinerary.type ==
                                                          'Meals'
                                                      "
                                                      className="text-[#EB5E00] text-2xl items-center"
                                                  >
                                                      <img
                                                          :src="`/assets/icons/food.svg`"
                                                          alt="icon"
                                                          width="30"
                                                          height="30"
                                                          className="me-2"
                                                      />
                                                      <!-- <img
                                                          :src="`/assets/icons/line.svg`"
                                                          alt="icon"
                                                          width="50"
                                                          height="25"
                                                          className="mt-2"
                                                      /> -->
                                                  </span>
                                                  <span
                                                      v-else-if="
                                                          itinerary.type ==
                                                          'Dropoff'
                                                      "
                                                      className="mdi mdi-map-marker-radius text-[#EB5E00] text-2xl items-center"
                                                  >
                                                  </span>
                                                  <div
                                                      className="flex flex-col gap-2"
                                                  >
                                                      <span
                                                          @click="
                                                              mapCoordinate(
                                                                  itinerary.map_coordinate,
                                                                  itinerary.zoom_map
                                                              )
                                                          "
                                                          className="text-base font-extrabold underline cursor-pointer"
                                                          >{{
                                                              itinerary.title
                                                          }}</span
                                                      >
                                                      <p
                                                          v-html="
                                                              itinerary.description
                                                          "
                                                      ></p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
            {/*    <div v-show="packageDetail.include" className="py-2">
                              <h2>
                                  <button
                                      id="accordion-title-02"
                                      className="flex items-center justify-between w-full text-left font-semibold py-2"
                                      @click.prevent="
                                          accordionOpen2 = !accordionOpen2
                                      "
                                      :aria-expanded="accordionOpen2"
                                      aria-controls="accordion-text-02"
                                  >
                                      <span
                                          className="text-xl font-semibold text-black"
                                          >What Included ?</span
                                      >
                                      <svg
                                          className="fill-black shrink-0 ml-8"
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              className="transform origin-center transition duration-200 ease-out"
                                              :className="{
                                                  'rotate-180': accordionOpen2,
                                              }"
                                              d="M8 2.71L2.71 8a1 1 0 0 0 1.42 1.42L8 5.83l3.87 3.87a1 1 0 0 0 1.42-1.42L8 2.71z"
                                          />
                                      </svg>
                                  </button>
                              </h2>
                              <div
                                  id="accordion-text-02"
                                  role="region"
                                  aria-labelledby="accordion-title-02"
                                  className="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                                  :className="
                                      accordionOpen2
                                          ? 'grid-rows-[1fr] opacity-100'
                                          : 'grid-rows-[0fr] opacity-0'
                                  "
                              >
                                  <div className="overflow-hidden">
                                      <div className="flex flex-col gap-4 mt-4">
                                          <div
                                              className="include"
                                              v-html="packageDetail.include"
                                          ></div>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
            {/*   <div v-show="packageDetail.exclude" className="py-2">
                              <h2>
                                  <button
                                      id="accordion-title-03"
                                      className="flex items-center justify-between w-full text-left font-semibold py-2"
                                      @click.prevent="
                                          accordionOpen3 = !accordionOpen3
                                      "
                                      :aria-expanded="accordionOpen3"
                                      aria-controls="accordion-text-03"
                                  >
                                      <span
                                          className="text-xl font-semibold text-black"
                                          >What Excluded ?</span
                                      >
                                      <svg
                                          className="fill-black shrink-0 ml-8"
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              className="transform origin-center transition duration-200 ease-out"
                                              :className="{
                                                  'rotate-180': accordionOpen3,
                                              }"
                                              d="M8 2.71L2.71 8a1 1 0 0 0 1.42 1.42L8 5.83l3.87 3.87a1 1 0 0 0 1.42-1.42L8 2.71z"
                                          />
                                      </svg>
                                  </button>
                              </h2>
                              <div
                                  id="accordion-text-03"
                                  role="region"
                                  aria-labelledby="accordion-title-03"
                                  className="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                                  :className="
                                      accordionOpen3
                                          ? 'grid-rows-[1fr] opacity-100'
                                          : 'grid-rows-[0fr] opacity-0'
                                  "
                              >
                                  <div className="overflow-hidden">
                                      <div className="flex flex-col gap-4 mt-4">
                                          <div
                                              className="exclude"
                                              v-html="packageDetail.exclude"
                                          ></div>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
            {/*     <div v-show="packageDetail.eligibility" className="py-2">
                              <h2>
                                  <button
                                      id="accordion-title-04"
                                      className="flex items-center justify-between w-full text-left font-semibold py-2"
                                      @click.prevent="
                                          accordionOpen4 = !accordionOpen4
                                      "
                                      :aria-expanded="accordionOpen4"
                                      aria-controls="accordion-text-04"
                                  >
                                      <span
                                          className="text-xl font-semibold text-black"
                                          >Eligibility</span
                                      >
                                      <svg
                                          className="fill-black shrink-0 ml-8"
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              className="transform origin-center transition duration-200 ease-out"
                                              :className="{
                                                  'rotate-180': accordionOpen4,
                                              }"
                                              d="M8 2.71L2.71 8a1 1 0 0 0 1.42 1.42L8 5.83l3.87 3.87a1 1 0 0 0 1.42-1.42L8 2.71z"
                                          />
                                      </svg>
                                  </button>
                              </h2>
                              <div
                                  id="accordion-text-04"
                                  role="region"
                                  aria-labelledby="accordion-title-04"
                                  className="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                                  :className="
                                      accordionOpen4
                                          ? 'grid-rows-[1fr] opacity-100'
                                          : 'grid-rows-[0fr] opacity-0'
                                  "
                              >
                                  <div className="overflow-hidden">
                                      <div className="flex flex-col gap-4 mt-4">
                                          <div
                                              className="eligibility"
                                              v-html="packageDetail.eligibility"
                                          ></div>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
            {/*  <div
                              v-show="packageDetail.additional_information"
                              className="py-2"
                          >
                              <h2>
                                  <button
                                      id="accordion-title-05"
                                      className="flex items-center justify-between w-full text-left font-semibold py-2"
                                      @click.prevent="
                                          accordionOpen5 = !accordionOpen5
                                      "
                                      :aria-expanded="accordionOpen5"
                                      aria-controls="accordion-text-05"
                                  >
                                      <span
                                          className="text-xl font-semibold text-black"
                                          >Additional Information</span
                                      >
                                      <svg
                                          className="fill-black shrink-0 ml-8"
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path
                                              className="transform origin-center transition duration-200 ease-out"
                                              :className="{
                                                  'rotate-180': accordionOpen5,
                                              }"
                                              d="M8 2.71L2.71 8a1 1 0 0 0 1.42 1.42L8 5.83l3.87 3.87a1 1 0 0 0 1.42-1.42L8 2.71z"
                                          />
                                      </svg>
                                  </button>
                              </h2>
                              <div
                                  id="accordion-text-05"
                                  role="region"
                                  aria-labelledby="accordion-title-05"
                                  className="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
                                  :className="
                                      accordionOpen5
                                          ? 'grid-rows-[1fr] opacity-100'
                                          : 'grid-rows-[0fr] opacity-0'
                                  "
                              >
                                  <div className="overflow-hidden">
                                      <div className="flex flex-col gap-4 mt-4">
                                          <div
                                              className="additional_information"
                                              v-html="
                                                  packageDetail.additional_information
                                              "
                                          ></div>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
          </div>
        </div>
      )}
    </>
  );
}
