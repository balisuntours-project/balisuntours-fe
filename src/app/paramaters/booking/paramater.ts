import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum"
import { BookingDetailResponse, BookingPackageDetailResponse } from "@/app/responses/booking/response"

export interface CancelBookingParamater {
    activity: Array<string>
}

export interface CheckoutUnconfirmedBookingParamater {
    order: BookingDetailResponse,
    package: {
        [key: string] : CheckoutUnconfirmedBookingPackageData
    }
}

export interface CheckoutUnconfirmedBookingPackageData extends Omit<BookingPackageDetailResponse, 'package_type'> {
    is_customer_set_pickup_information: ActivityPackageTypeEnum
}