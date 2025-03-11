import { VechileCategoryPublishStatusEnum } from "@/app/enums/airport-transfer/airport-transfer.enum"

export interface NewVechileCategoryParamater {
    name: string
}

export interface UpdateVechileCategoryParamater extends NewVechileCategoryParamater {
    is_published: VechileCategoryPublishStatusEnum
}