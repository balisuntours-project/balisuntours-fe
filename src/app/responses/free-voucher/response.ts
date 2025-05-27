import { FreeVoucherStatusEnum } from "@/app/enums/free-voucher/free-voucher.enum"

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

export interface FreePackageUnitResponse {
    title: string,
    uuid: string,
    expiry_time_in_day: number,
    slot: number
}

export interface AddVoucherPriceResponse {
  uuid: string;
  title: string;
  price: number;
  price_suffix: string;
  minimum_qty: number;
  maximum_qty: number;
};

export interface AddVoucherPackageResponse {
  uuid: string;
  title: string;
  selected_free_package_unit_uuid: string|null,
  affected_prices: Array<string>|null,
  prices: AddVoucherPriceResponse[];
};

export interface FreeActivityVoucherResponse {
    uuid: string,
    voucher_code: string,
    available_at: string,
    expired_at: string,
    slot: number,
    status: FreeVoucherStatusEnum,
    activity: string,
    sales_wa_number: string
}