import { BookingPaymentStatusEnum } from "@/app/enums/booking/booking.enum"
import { ActivityCoordinateResponse, CheckoutDataActivityResponse } from "../activity/response"
import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum"
import { BookingPriceResponse } from "../activity-package-price/response"
import { CheckoutDataPackageResponse } from "../activity-package/response"
import { PaymentGatewayEnum } from "@/lib/global.enum"

export interface BookingResponse {
    bookings: Array<BookingDetailResponse>,
    packages: BookingPackageResponse
}

export interface BookingDetailResponse {
    amount: string,
    buyer_email: string,
    buyer_name: string,
    buyer_phone: string,
    expired_at: string|null,
    is_reviewed: boolean|number,
    order_id: string,
    payment_url: string,
    itineraries_path: string|null,
    pickup_coordinate: ActivityCoordinateResponse|null,
    pickup_location: string|null,
    refund_available_until: string|null,
    status: BookingPaymentStatusEnum,
    uuid: string

}

export interface BookingPackageResponse {
    [key: string] : BookingPackageDynamicPropertyResponse
}

export interface BookingPackageDynamicPropertyResponse {
    packages: {
        [key: string] : BookingPackageDetailResponse
    }
}

export interface BookingPackageDetailResponse {
    activity_date: string,
    activity_id: number,
    activity_title: string,
    activity_slug: string,
    activity_uuid: string,
    additional_information: string|null,
    eligibility: string|null,
    include: string|null,
    exclude: string|null,
    departure_title: string|null,
    free_tour_person: string|null,
    free_tour_traveller_spend: number,
    package_type: ActivityPackageTypeEnum,
    main_photo: string,
    note: string|null,
    package_id: number,
    package_title: string,
    pickup_coordiate: string|null,
    pickup_coordinate_object: ActivityCoordinateResponse|null,
    pickup_location: string|null,
    pickup_time: string|null,
    planned_place_to_visit: string|null,
    prices: Array<BookingPriceResponse>
}

export interface CheckoutUnconfirmedBookingResponse {
    message: string,
    next_url: string
}

export interface CheckoutDataResponse {
    activity: Array<CheckoutDataActivityResponse>,
    package: Array<CheckoutDataPackageResponse>,
    user_data: CheckoutUserDataRespnse,
    min_cost: number,
    cart_data: string

}

export interface CheckoutUserDataRespnse {
    avatar_id: number,
    city: string,
    country: string,
    country_id: null|string|number,
    email: string,
    name: string,
    phone: string,
    uuid: string,
}

export interface CheckoutBookingResponse{
    payment_gateway : PaymentGatewayEnum|null,
    payload: CheckoutBookingIpay88Response | CheckoutBookingIpaymuResponse
}

export interface CheckoutBookingIpaymuResponse {
    next_url : string,
    session_id?: string
}

export interface CheckoutBookingIpay88Response {
    checkout_id: string,
    signature: string,
    checkout_url: string,
}

export interface TransactionStatusResponse {
    status: BookingPaymentStatusEnum,
    order_id: string
    created_at: string
    paid_at: string
    amount: number
    name: string
    email: string
}