import { ActivityPackageTypeEnum } from "@/app/enum/activity.enum";

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