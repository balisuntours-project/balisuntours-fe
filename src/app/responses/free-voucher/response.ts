export interface ActivityListResponse {
    uuid: string,
    title: string
}

export interface PackageListResponse {
    uuid: string,
    title: string
}

export interface PriceListResponse {
    uuid: string,
    title: string
}

export interface NewFreeVoucherResponse {
    uuid: string,
    expiry_time_in_day: number,
    slot: number
}

export interface VoucherableDataCheckoutPage {
    package_title: string,
    price_title: string,
    activity_title: string,
    activity_slug: string,
    expiry_time_in_day: number,
    slot: number,
    uuid: string,
}