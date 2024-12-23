import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { ActivityPackagePriceResponse, CartPriceResponse } from "../activity-package-price/response";

export interface CartItemsResponse {
    [key: string] : CartValueItemResponse
}

export interface CartValueItemResponse {
    activity_date: string,
    activity_title: string,
    diff_days: number,
    is_fully_booked_until: string | null,
    main_photo: string,
    package_title: string,
    package_type: ActivityPackageTypeEnum,
    show_toggle_date: boolean,
    temporary_items: Array<string>,
    total_price: number,
    prices: Array<CartPriceResponse>
}

export interface CartValueItemResponseWithOrderId extends CartValueItemResponse {
    temporary_order_id: string
}