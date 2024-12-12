import { ActivityStatusEnum } from "@/app/enum/activity.enum"
import { ActivityCategoryResponse } from "../activity-category/response"
import { ActivityGalleryResponse } from "../activity-gallery/response"
import { ActivityMainPhotoResponse } from "../activity-main-photo/response"
import { ActivityPackagePreviewDetailResponse } from "../activity-package/response"
import { ActivityReviewResponse } from "../activity-review/response"

export interface Activity {
    uuid:string,
    title: string,
    slug: string,
    sub_title: string|null,
    ordered: string|null,
    hightlight: string|null,
    total_participant: string|null,
    total_star: string|null,
    total_review: string|null,
    rating: string,
    is_published: ActivityStatusEnum,
    description: string,
    additional_description: string|null,
    smaller_price: number,
    image: string,
    activity_address: string,
    departure_city:string,
    map_location:string,
    coordinate_location: ActivityCoordinateResponse,
    zoom_map: number,
    more_reviews_url: string|null
}

export interface ActivityCoordinateResponse {
    lat: number,
    lng: number
}


export interface ActivityOrderInfoResponse {
    uuid: string,
    //activity_id: string,
    total_canceled: number,
    total_ordered: number,
    total_paid: number,
}


export interface ActivityDetailResponse extends Activity {
    departure_city: string,
    description: string,
    destination_city: Array<string>,
    order_info: Array<ActivityOrderInfoResponse>,
    activity_categories: Array<ActivityCategoryResponse>,
    activity_galleries: Array<ActivityGalleryResponse>,
    activity_main_photo: ActivityMainPhotoResponse,
    activity_packages: Array<ActivityPackagePreviewDetailResponse>,
    reviews: Array<ActivityReviewResponse>

}


export interface ActivityTitleAndSlugResponse extends Pick<Activity, "uuid" | "title" | "slug"> {}

export interface ActivityDetailSitemap extends ActivityTitleAndSlugResponse {
    images: Array<{
        description: string|null,
        path: string
}>
}