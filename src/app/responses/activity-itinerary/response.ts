
import { ActivityItineraryTypeEnum } from "../../enum/activity.enum";
import { ActivityCoordinateResponse } from "../activity/response";

export interface ActivityItineraryResponse {
    //activity_package_id: number,
    uuid: string,
    title: string,
    type: ActivityItineraryTypeEnum,
    zoom_map: number,
    order: number,
    map_location: null|string,
    map_coordinate: ActivityCoordinateResponse,
    description: string|null,
}