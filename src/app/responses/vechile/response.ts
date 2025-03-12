export interface VechileMainPhotoResponse {
    id: number,
    uuid: string,
    url: string,
    type: string
}

export interface VechileCategoryOfVechileResponse {
    vechile_category_name : string,
    vechile_category_uuid : string,
}

export interface GetSingleVechileResponse {
    uuid: string,
    name: string,
    short_description: string,
    total_seat: number,
    total_luggage: number,
    cut_off_time_in_hours: number,
    driver_free_waiting_time_in_minutes: number,
    price_per_km: number,
    vechile_category: VechileCategoryOfVechileResponse,
    vechile_main_photo_file: Omit<VechileMainPhotoResponse, "type"> | undefined
}