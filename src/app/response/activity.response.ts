import { ActivityStatusEnum } from "../enum/activity.enum";

export interface Activity {
    uuid:string,
    title: string,
    sub_title: string|null,
    ordered: string|null,
    hightlight: string|null,
    total_participant: string|null,
    total_star: string|null,
    rating: string,
    is_published: ActivityStatusEnum,
    description: string,
    additional_description: string|null,
    smaller_price: number,
    image: string,
    activity_address: string,
    departure_city:string,
    map_location:string,
    coordinate_location: ActivityCoordinate,
    zoom_map: number,
    more_reviews_url: string|null
}

export interface ActivityCoordinate {
    lat: number,
    lng: number
}


export interface ActivityOrderInfo {
    uuid: string,
    //activity_id: string,
    total_canceled: number,
    total_ordered: number,
    total_paid: number,
}