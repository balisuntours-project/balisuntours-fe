import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { CheckoutDepartureResponse } from "@/app/responses/activity-package/response";
import {
  BookingDetailResponse,
  BookingPackageDetailResponse,
} from "@/app/responses/booking/response";

export interface CancelBookingParamater {
  activity: Array<string>;
}

export interface CheckoutUnconfirmedBookingParamater {
  order: BookingDetailResponse;
  package: {
    [key: string]: CheckoutUnconfirmedBookingPackageData;
  };
}

export interface CheckoutUnconfirmedBookingPackageData
  extends Omit<BookingPackageDetailResponse, "package_type"> {
  is_customer_set_pickup_information: ActivityPackageTypeEnum;
}

export interface CheckoutMappedPackageDataParamater {
  base_uuid: string;
  activity_package_uuid: string;
  activity_date: string;
  cart_uuids: Array<string>;
  package_title: string;
  package_type: ActivityPackageTypeEnum;
  final_price: number;
  total_qty_for_free_tour: number | null;
  price_information_for_free_tour: string | null;
  default_pickup_time: Array<string>;
  departure: CheckoutDepartureResponse | null;
  departure_title: string | null;
  pickup_coordinate: string | null;
  pickup_location: string | null;
  pickup_time: string | null;
  planned_place_to_visit: string | null;
  note: string | null;
  free_tour_minimum_spend: number | null;
  flat_traveller_price: number | null;
  free_tour_traveller_spend: number | null;
  free_tour_traveller_spend_in_dollar: string | number | null;
  lat: number;
  lng: number;
  zoom: number;
  auto_complete_value: string | null;
  input_id: string;
}

export interface CheckoutFreeTourTypeViewParamater {
  pickupTimeList: Array<string>;
  baseUuid: string;
  minCost: number;
  finalPrice: number;
  totalQty: number|null;
  priceInformation: string|null;
}
