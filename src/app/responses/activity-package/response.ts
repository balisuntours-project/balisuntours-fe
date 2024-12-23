import { ActivityPackageSelfConfirmationStatus, ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { ActivityItineraryResponse } from "../activity-itinerary/response";
import { ActivityPackagePriceResponse } from "../activity-package-price/response";



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