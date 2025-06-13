export interface StoreFreeVoucherParamater {
  price_uuid: string;
  expiry_time_in_day: number;
  slot: number;
}

export interface EditFreeVoucherParamater {
  expiry_time_in_day: number;
  slot: number;
  is_published: boolean
}

export interface UpdatePackageVoucherableParamater {
    affected_prices: Array<string>|null,
    selected_package_unit_uuid: string|null
}