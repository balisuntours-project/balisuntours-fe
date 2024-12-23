import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { UpdatingCartType } from "@/app/enums/cart/cart.enum";

export interface StoreCartParamater {
    activityPackageUuid: string,
    activityPackageType: ActivityPackageTypeEnum,
    activityDate: Date|string,
    prices: Array<CartPricesParamater>
}

export interface CartPricesParamater {
    qty: number,
    uuid: string,
    id: number,
    price: number
}

export interface UpdateCartParamater {
    type: UpdatingCartType,
    temporary_order_id: string,
    cart_uuid: string,
    activity_date: string|Date|null,
    qty: number|null
}