export interface MainPhotoParamater {
    file: number | File 
}

export interface NewVechileParamater {
    main_photo: MainPhotoParamater,
    vechile_category_uuid: string,
    name: string,
    short_description: string,
    total_seat: number,
    total_luggage: number,
    cut_off_time_in_hours: number,
    driver_free_waiting_time_in_minutes: number,
    price_per_km: number,
    minimum_charge: number,
    mininum_charge_applies_until_km: number,
    increment_start_km: number,
    increment_price_rate_percentage: number,
}