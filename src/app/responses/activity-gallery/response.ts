import { FileResponse } from "../file/response";

export interface ActivityGalleryResponse {
    uuid: string,
    is_banner: number|boolean,
    meta_tag: string|null,
    order: number,
    title: string|null,
    url: string

}