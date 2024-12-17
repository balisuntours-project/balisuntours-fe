import { FileResponse } from "../file/response";

export interface ActivityMainPhotoResponse {
    uuid: string,
    description: string|null,
    files: FileResponse
}