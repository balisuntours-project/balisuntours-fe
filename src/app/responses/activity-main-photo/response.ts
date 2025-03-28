import { FileResponse } from "../file/response";

export interface ActivityMainPhotoResponse {
    uuid: string,
    description: string|null,
    files: FileResponse
}

export interface ActivityPreviewMainPhotoResponse {
    uuid: string,
    description: string|null,
    url: string
}