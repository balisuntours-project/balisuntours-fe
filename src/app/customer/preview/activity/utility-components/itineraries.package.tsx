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
          </div>
        </div>
      )}
    </>
  );
}
