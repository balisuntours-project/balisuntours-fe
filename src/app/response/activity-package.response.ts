import { ActivityPackageSelfConfirmationStatus, ActivityPackageTypeEnum } from "../enum/activity.enum";


export interface ActivityPackage {
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
    flat_traveller_price: number|null,
    free_tour_stock: number|null,
    remaining_stock_daily_free_tours: number|null,
    include:string|null,
    exclude: string|null,
    eligibility: string|null,
    additional_information: string|null,

}