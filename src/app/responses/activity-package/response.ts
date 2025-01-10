import { ActivityItineraryTypeEnum, ActivityPackageSelfConfirmationStatus, ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { ActivityItineraryResponse } from "../activity-itinerary/response";
import { ActivityPackagePriceResponse, CheckoutActivityPackagePriceResponse } from "../activity-package-price/response";
import { ActivityCoordinateResponse } from "../activity/response";



export interface ActivityPackageResponse {
    uuid: string,
    title: string,
   // activity_id: string,
    package_type: ActivityPackageTypeEnum,
    about: string|null,
    cancellation_policy: string,
    confirmation_time: string,
    contact: string|null,
    default_pickup_time: Array<string>|null,
    cut_off_time_in_hours: string,
    minimum_booking: string,
    maximum_booking: string|null,
    is_fully_booked_until: string,
    order_position: string,
    self_confirmation: ActivityPackageSelfConfirmationStatus,
    self_confirmation_text?: string,
    flat_traveller_price: number|null,
    free_tour_stock: number|null,
    remaining_stock_daily_free_tours: number|null,
    include:string|null,
    exclude: string|null,
    eligibility: string|null,
    additional_information: string|null,

}

export interface ActivityPackagePreviewDetailResponse extends ActivityPackageResponse {
    itineraries: Array<ActivityItineraryResponse>,
    prices: Array<ActivityPackagePriceResponse>
}


export interface CheckoutDataPackageResponse {
    activity_main_photo: string,
    activity_package_uuid: string,
    activity_title: string,
    base_uuid: string,
    cancellation_policy: string,
    cart_uuids: Array<string>,
    confirmation_time: string,
    cut_off_time_in_hours: number,
    default_pickup_time: Array<string>,
    departure: CheckoutDepartureResponse|null,
    final_price: number,
    flat_traveller_price: number|null,
    package_type: ActivityPackageTypeEnum,
    package_title: string,
    price_information_for_free_tour: string|null,
    prices: Array<CheckoutActivityPackagePriceResponse>,
    self_confirmation: ActivityPackageSelfConfirmationStatus,
    total_qty_for_free_tour: number|null,
    
}

export interface CheckoutDepartureResponse {
    activity_package_uuid: string,
    type: ActivityItineraryTypeEnum,
    departure_title: string,
    departure_description: string|null,
    departure_map_location: string|null,
    departure_map_coordinate: ActivityCoordinateResponse,
}