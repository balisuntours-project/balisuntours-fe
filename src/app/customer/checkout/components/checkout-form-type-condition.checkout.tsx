"use client";

import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { CheckoutFormBasicItineraryType } from "../utility-components/checkout-form-basic-itinerary.checkout";
import { CheckoutFormFreeTourType } from "../utility-components/checkout-form-free-tour.checkout";
import { CheckoutMappedPackageDataParamater } from "@/app/paramaters/booking/paramater";
import { CheckoutBookingProvider } from "../provider/checkout-booking.provider";
import { CheckoutFormPickupTimeByTeamType } from "../utility-components/checkout-form-pickup-time-by-team.checkout";
import { CheckoutFormPickupTimeByTravellerType } from "../utility-components/checkout-form-pickup-time-by-traveller.checkout";

export function CheckoutFormTypeMechanism({
  itemPackage,
  minCost,
}: {
  itemPackage: CheckoutMappedPackageDataParamater,
  minCost: number,

}) {
  if (itemPackage.package_type == ActivityPackageTypeEnum.freeTour) {
    return (
      <>
       <CheckoutBookingProvider>
       <CheckoutFormFreeTourType minCost={minCost} finalPrice={itemPackage.final_price} totalQty={itemPackage.total_qty_for_free_tour} priceInformation={itemPackage.price_information_for_free_tour} baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time} defaultTravellerSpend={itemPackage.free_tour_traveller_spend} />
       </CheckoutBookingProvider>
      </>
    );
  } else if (itemPackage.package_type == ActivityPackageTypeEnum.pickupTimeByTeam) {
    return (
      <>
        <CheckoutBookingProvider>
        <CheckoutFormPickupTimeByTeamType baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time} />
        </CheckoutBookingProvider>
      </>
    );
  } else if (itemPackage.package_type == ActivityPackageTypeEnum.pickupTimeByTraveller) {
    return (
      <>
       <CheckoutBookingProvider>
       <CheckoutFormPickupTimeByTravellerType baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time}  />
       </CheckoutBookingProvider>
      </>
    );
  } else {
    return (
      <>
      <CheckoutBookingProvider>
      <CheckoutFormBasicItineraryType baseUuid={itemPackage.base_uuid} pickupTimeList={itemPackage.default_pickup_time} />
      </CheckoutBookingProvider>
      </>
    );
  }
}
