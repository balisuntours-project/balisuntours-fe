import { GetPriceMethodTypeEnum, TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum"
import { BookingPaymentStatusEnum } from "@/app/enums/booking/booking.enum"
import { CoordinatParamater } from "@/app/paramaters/google-map/paramater"

export interface VechileRecomendationResponse {
    uuid: string,
    name: string,
    short_description: string,
    total_seat: number,
    total_luggage: number,
    cut_of_time_in_hours: number,
    driver_free_waiting_time_in_minutes: number,
    vechile_category: string,
    vechile_main_photo: string,
    price: number,
    price_per_km? : number,
    total_km?: string
}

export interface BookedVechileResponse {
    uuid: string,
    cut_off_time_in_hours: number,
    driver_free_waiting_time_in_minutes: number,
    name: string,
    qty: number,
    price: number,
    price_per_km: number,
    total_amount: number,
    total_seat: number,
    total_luggage: number,
    total_km: string,
    short_description: string,
    vechile_category: string,
    vechile_main_photo: string
}

export interface BookingDataResponse {
    origin: string
    destination: string
    origin_coordinate: CoordinatParamater
    destination_coordinate: CoordinatParamater
    total_amount: number,
    total_passanger: number,
    transfer_date_time: string,
    transfer_type: TransferTypeEnum,
    vechile_price_method_type: GetPriceMethodTypeEnum
}

export interface BookedVechileAndDataResponse {
    booked_vechiles: Array<BookedVechileResponse>,
    booking_data: BookingDataResponse
}

export interface AdditionalServiceItemResponse {
    uuid: string,
    name: string,
    short_description: string,
    price: number,
    min_qty: number,
    max_qty: number,
}

export interface AdditionalServiceItemResponseWithQty extends AdditionalServiceItemResponse {
    qty: number,
}

export interface TransactionStatusResponse {
    status: BookingPaymentStatusEnum,
    booking_id: string
    created_at: string
    paid_at: string
    amount: number
    customer_account_name: string
    customer_account_phone: string
    customer_account_email: string
}