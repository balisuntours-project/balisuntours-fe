export interface VechileRecomendationResponse {
    name: string,
    short_description: string,
    total_seat: number,
    total_luggage: number,
    cut_of_time_in_hours: number,
    driver_free_waiting_time_in_minutes: number,
    vechile_category: string,
    price: number,
    price_per_km? : number,
    total_km?: string
}