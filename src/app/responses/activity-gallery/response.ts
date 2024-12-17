import { FileResponse } from "../file/response";

export interface ActivityGalleryResponse {
    uuid: string,
    is_banner: number|boolean,
    meeta_tag: string|null,
    order: number,
    title: string|null,
    files: FileResponse

}