"use client";

import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { CheckoutFormBasicItineraryType } from "../utility-components/checkout-form-basic-itinerary.checkout";
import { CheckoutFormPickupTimeByTeamType } from "../utility-components/checkout-form-pickup-time-by-team.checkout";
import { CheckoutFormFreeTourType } from "../utility-components/checkout-form-free-tour.checkout";
import { CheckoutFormPickupTimeByTravellerType } from "../utility-components/checkout-form-pickup-time-by-traveller.checkout";
import { GoogleMapViewParamater } from "@/app/paramaters/google-map/paramater";
import { CheckoutMappedPackageDataParamater } from "@/app/paramaters/booking/paramater";

export function CheckoutFormTypeMechanism({

  itemPackage,
  minCost,
}: {
  itemPackage: CheckoutMappedPackageDataParamater,
  minCost: number

}) {
  if (itemPackage.package_type == ActivityPackageTypeEnum.freeTour) {
    return (
      <>
        <CheckoutFormFreeTourType minCost={minCost} finalPrice={itemPackage.final_price} totalQty={itemPackage.total_qty_for_free_tour} priceInformation={itemPackage.price_information_for_free_tour} baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time} />
      </>
    );
  } else if (itemPackage.package_type == ActivityPackageTypeEnum.pickupTimeByTeam) {
    return (
      <>
        <CheckoutFormPickupTimeByTeamType baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time} />
      </>
    );
  } else if (itemPackage.package_type == ActivityPackageTypeEnum.pickupTimeByTraveller) {
    return (
      <>
        <CheckoutFormPickupTimeByTravellerType baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time}  />
      </>
    );
  } else {
    return (
      <>
        <CheckoutFormBasicItineraryType baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time} />
      </>
    );
  }
}
