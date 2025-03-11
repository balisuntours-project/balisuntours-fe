import { VechileCategoryPublishStatusEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";

export interface VechileCategoryResponse {
    uuid: string,
    name: string,
    is_published: VechileCategoryPublishStatusEnum
}